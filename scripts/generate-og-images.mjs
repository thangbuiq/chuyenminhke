import { readdirSync, readFileSync } from "fs";
import fs from "fs/promises";
import matter from "gray-matter";
import fetch from "node-fetch";
import path from "path";

function dateToDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function toSlug(str) {
  str = str.toLowerCase();
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/[đĐ]/g, "d");
  str = str.replace(/([^0-9a-z-\s])/g, "");
  str = str.replace(/(\s+)/g, "-");
  str = str.replace(/-+/g, "-");
  str = str.replace(/^-+|-+$/g, "");
  return str;
}

function getPostMetadata(basePath) {
  const folder = `${basePath}/`;
  const files = readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  const posts = markdownPosts
    .map((filename) => {
      const fileContents = readFileSync(`${basePath}/${filename}`, "utf8");
      const matterResult = matter(fileContents);

      const publishDate = matterResult.data.publish_date
        ? new Date(matterResult.data.publish_date)
        : new Date(0);

      return {
        title: matterResult.data.title,
        is_published: matterResult.data.is_published,
        publish_date: publishDate,
        cover: matterResult.data.cover,
        cover_alt: matterResult.data.cover_alt,
        tags: matterResult.data.tags,
        slug: `${toSlug(matterResult.data.title)}-${dateToDateString(publishDate)}`,
      };
    })
    .filter((post) => post.is_published)
    .sort((a, b) => b.publish_date - a.publish_date);

  return posts;
}

async function waitForServerReady(url, timeout = 30000) {
  const start = Date.now();
  console.log(
    `Checking and waiting for server at ${url} to be ready... (tips: bun dev)`,
  );

  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (_) {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timeout waiting for ${url}`);
}

async function generateOgImages() {
  try {
    const outputDir = path.join(process.cwd(), "public", "og-images");
    await fs.mkdir(outputDir, { recursive: true });

    const baseUrl = "http://localhost:3000";
    await waitForServerReady(baseUrl);

    const posts = getPostMetadata("blogs");

    for (const post of posts) {
      const { slug, title, cover } = post;
      const outputPath = path.join(outputDir, `${slug}.png`);

      try {
        await fs.access(outputPath);
        console.log(`OG image already exists for ${slug}, skipping...`);
        continue;
      } catch (_) {
        console.log(`Generating OG image for ${slug}...`);
      }

      const cleanTitle = title.replace(/[^\p{L}\p{N}\s.,!?-]/gu, "");
      const coverUrl = cover ? `${baseUrl}${cover}` : `${baseUrl}/icon.png`;
      const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(cleanTitle)}&cover=${encodeURIComponent(coverUrl)}&layout=left`;

      const response = await fetch(ogImageUrl);
      if (!response.ok) {
        console.error(
          `Failed to fetch OG image for ${slug}: ${response.statusText}`,
        );
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(outputPath, buffer);
      console.log(`Saved OG image for ${slug} at ${outputPath}`);
    }

    console.log("OG image generation complete!");
  } catch (error) {
    console.error("Error generating OG images:", error);
    process.exit(1);
  }
}

generateOgImages();
