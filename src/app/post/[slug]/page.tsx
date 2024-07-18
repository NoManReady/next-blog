import { getAllPostsMeta, getPost } from '@/data/post';
import { sans } from '@/fonts/fonts';
import { dateFormatter } from '@/utils/time';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({
    slug: post.meta.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = decodeURI(params.slug);
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  let postComponents = {};

  try {
    postComponents = await import(`@/posts/${slug}/components.ts`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (!error || error.code !== 'MODULE_NOT_FOUND') {
      throw error;
    }
  }

  return (
    <article className="p-4">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h1
            className={[
              sans.className,
              'text-[26px] font-black leading-[40px]',
            ].join(' ')}
          >
            {post.meta.title}
          </h1>
          <Link
            href={'/'}
            className="text-[--text-color-2] hover:text-[--text-color-3] active:text-[--text-color-1] text-sm"
          >
            ＜返回
          </Link>
        </div>
        <div className="mt-2 text-[13px] text-gray-700 dark:text-gray-300 flex flex-row justify-between items-center">
          <div className="space-x-2">
            <span>创建时间</span>
            <span>{dateFormatter(post.meta.stats.birthtime)}</span>
          </div>
          <div className="space-x-2 text-xs">
            <span>最后修改时间</span>
            <span>{dateFormatter(post.meta.stats.mtime)}</span>
            <Link
              className="text-purple-500 hover:text-purple-400 active:text-purple-600 hover:underline underline-offset-4"
              href={`/editor/drafts/${slug}`}
            >
              编辑
            </Link>
          </div>
        </div>
      </header>
      <div className="markdown p-6">
        <MDXRemote
          source={post.content}
          components={postComponents}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                rehypeKatex,
                [
                  rehypePrettyCode,
                  {
                    theme: 'material-theme-palenight',
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
