'use server';
import fs from 'fs';
// import pinyin from 'pinyin';
import path from 'path';
import matter from 'gray-matter';
import type { PostDetail } from '@/types/posts';
import { revalidatePath } from 'next/cache';

const rootDirectory = path.join(process.cwd(), 'src', 'posts');

async function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const getAllPostsMeta = async () => {
  const dirs = fs
    .readdirSync(rootDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const datas = await Promise.all(
    dirs.map(async (dir) => {
      return await getPostBySlug(dir);
    })
  );
  datas.sort((a, b) => {
    return a.meta.stats.birthtime < b.meta.stats.birthtime ? 1 : -1;
  });
  return datas;
};

export const getPostBySlug = async (dir: string) => {
  const filePath = path.join(rootDirectory, dir, 'index.mdx');
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const fileStats = fs.statSync(filePath);
  const { data } = matter(fileContent);

  // const id=pinyin(dir,{})

  return {
    meta: { ...data, slug: dir, id: dir, stats: fileStats },
    content: fileContent,
  } as PostDetail;
};

export const getPost = async (slug: string) => {
  const posts = await getAllPostsMeta();
  const post = posts.find((post) => post.meta.slug === slug);
  // if (!post) {
  //   throw new Error('not found');
  // }
  return post;
};

export const updatePost = async ({
  content,
  slug,
}: {
  content: string;
  slug: string;
}) => {
  const filePath = path.join(rootDirectory, slug, 'index.mdx');
  fs.writeFileSync(filePath, content);
  revalidatePath('/', 'page');
  revalidatePath(`/post/${slug}`);
  await sleep(500);
  return {
    success: true,
  };
};

export const savePost = async ({
  content,
  slug,
}: {
  content: string;
  slug: string;
}) => {
  if (fs.existsSync(path.join(rootDirectory, slug))) {
    throw new Error('文件已存在');
  }
  fs.mkdirSync(path.join(rootDirectory, slug));
  const filePath = path.join(rootDirectory, slug, 'index.mdx');
  fs.writeFileSync(filePath, content);
  revalidatePath('/');
  await sleep(500);
  return {
    success: true,
  };
};

export const deletePost = async (slug: string) => {
  if (fs.existsSync(path.join(rootDirectory, slug))) {
    deleteDirectoryRecursive(path.join(rootDirectory, slug));
  }
  revalidatePath('/');
  await sleep(500);
  return {
    success: true,
  };
};

function deleteDirectoryRecursive(directoryPath: string) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach(function (file) {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteDirectoryRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
}
