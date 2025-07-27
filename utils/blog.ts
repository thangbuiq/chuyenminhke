// utils/blog.ts
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

import { dateToDateString, splitDateString } from "./helper";

export const getPostMetadata = (basePath: string) => {
  try {
    // Use path.resolve to get absolute path and normalize separators
    const folder = path.resolve(process.cwd(), basePath);

    // Check if directory exists before trying to read it
    if (!fs.existsSync(folder)) {
      console.warn(`Blog directory not found: ${folder}`);
      return [];
    }

    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file) => file.endsWith(".md"));

    // get the file data
    const posts = markdownPosts
      .map((filename) => {
        try {
          // Use path.join for cross-platform file paths
          const filePath = path.join(folder, filename);
          const fileContents = fs.readFileSync(filePath, "utf8");
          const matterResult = matter(fileContents);

          // Validate required fields and provide defaults
          const title = matterResult.data.title || filename.replace(".md", "");
          const isPublished = matterResult.data.is_published !== false; // default to true if not specified

          let publishDate;
          if (matterResult.data.publish_date) {
            publishDate = new Date(matterResult.data.publish_date);
          } else {
            // Use file modification time as fallback
            const stats = fs.statSync(filePath);
            publishDate = stats.mtime;
          }

          // Validate that we have a valid date
          if (isNaN(publishDate.getTime())) {
            publishDate = new Date(0);
          }

          return {
            title,
            is_published: isPublished,
            publish_date: publishDate,
            slug: `${toSlug(title)}-${dateToDateString(publishDate)}`,
          };
        } catch (fileError) {
          console.error(`Error reading file ${filename}:`, fileError);
          return null;
        }
      })
      .filter(
        (
          post,
        ): post is {
          title: string;
          is_published: boolean;
          publish_date: Date;
          slug: string;
        } => !!post,
      ) // Remove null entries from failed file reads
      .sort((a, b) => {
        if (
          !(
            a &&
            b &&
            a.publish_date instanceof Date &&
            b.publish_date instanceof Date
          )
        )
          return 0;
        return b.publish_date.getTime() - a.publish_date.getTime();
      });

    return posts;
  } catch (error) {
    console.error("Error in getPostMetadata:", error);
    return [];
  }
};

export const toSlug = (str: string | undefined): string => {
  // Handle undefined, null, or empty strings
  if (!str || typeof str !== "string") {
    return "untitled";
  }

  str = str.toLowerCase();
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  str = str.replace(/[đĐ]/g, "d");
  str = str.replace(/([^0-9a-z-\s])/g, "");
  str = str.replace(/(\s+)/g, "-");
  str = str.replace(/-+/g, "-");
  str = str.replace(/^-+|-+$/g, "");

  return str || "untitled";
};

export const getPostContent = (slug: string) => {
  try {
    // Use path.resolve and path.join for cross-platform compatibility
    const folder = path.resolve(process.cwd(), "blogs");
    const date = slug.split("-").pop() as string;
    const filename = `${splitDateString(date)}.md`;
    const filePath = path.join(folder, filename);

    // Check if file exists before trying to read it
    if (!fs.existsSync(filePath)) {
      console.error(`Blog post file not found: ${filePath}`);
      throw new Error(`Blog post not found: ${slug}`);
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    console.error("Error in getPostContent:", error);
    throw error;
  }
};

// Alternative approach using glob pattern matching (install glob package)
// npm install glob @types/glob
/*
import { glob } from 'glob';

export const getPostMetadataWithGlob = async (basePath: string) => {
  try {
    const pattern = path.join(basePath, '*.md').replace(/\\/g, '/');
    const files = await glob(pattern);
    
    const posts = await Promise.all(
      files.map(async (filePath) => {
        try {
          const fileContents = fs.readFileSync(filePath, "utf8");
          const matterResult = matter(fileContents);

          if (matterResult.data.publish_date) {
            matterResult.data.publish_date = new Date(
              matterResult.data.publish_date,
            );
          } else {
            matterResult.data.publish_date = new Date(0);
          }

          return {
            title: matterResult.data.title,
            is_published: matterResult.data.is_published,
            publish_date: matterResult.data.publish_date,
            slug: `${toSlug(matterResult.data.title)}-${dateToDateString(matterResult.data.publish_date)}`,
          };
        } catch (fileError) {
          console.error(`Error reading file ${filePath}:`, fileError);
          return null;
        }
      })
    );
    
    return posts
      .filter(Boolean)
      .sort((a, b) => b.publish_date - a.publish_date);
  } catch (error) {
    console.error("Error in getPostMetadataWithGlob:", error);
    return [];
  }
};
*/
