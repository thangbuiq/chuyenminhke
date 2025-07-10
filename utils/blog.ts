import fs from "fs";
import matter from "gray-matter";
import { dateToDateString, splitDateString } from "./helper";
import { notFound } from "next/navigation";

export const getPostMetadata = (basePath: string) => {
  try {
    const folder = basePath + "/";
    const files = fs.readdirSync(folder);
    const markdownPosts = files.filter((file) => file.endsWith(".md"));

    // get the file data
    const posts = markdownPosts
      .map((filename) => {
        const fileContents = fs.readFileSync(`${basePath}/${filename}`, "utf8");
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
      })
      .sort((a, b) => b.publish_date - a.publish_date);
    return posts;
  } catch (error) {
    return notFound();
  }
};

export const toSlug = (str: string): string => {
  str = str.toLowerCase();
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  str = str.replace(/[đĐ]/g, "d");
  str = str.replace(/([^0-9a-z-\s])/g, "");
  str = str.replace(/(\s+)/g, "-");
  str = str.replace(/-+/g, "-");
  str = str.replace(/^-+|-+$/g, "");

  return str;
};

export const getPostContent = (slug: string) => {
  const folder = "blogs/";
  const date = slug.split("-").pop() as string;
  const file = folder + `${splitDateString(date)}.md`;
  const content = fs.readFileSync(file, "utf-8");
  const matterResult = matter(content);
  return matterResult;
};
