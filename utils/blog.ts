import fs from "fs";
import matter from "gray-matter";
import { dateToDateString, splitDateString } from "./helper";

export const getPostMetadata = (basePath: string) => {
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
};

export const toSlug = (str: string): string => {
  // Convert to lowercase
  str = str.toLowerCase();

  // Remove accents
  str = str
    .normalize("NFD") // convert string to unicode character combinations
    .replace(/[\u0300-\u036f]/g, ""); // remove accent characters after decomposition

  // Replace đĐ characters
  str = str.replace(/[đĐ]/g, "d");

  // Remove special characters
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Replace spaces with -
  str = str.replace(/(\s+)/g, "-");

  // Remove consecutive dashes
  str = str.replace(/-+/g, "-");

  // Remove dashes at the beginning and end
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
