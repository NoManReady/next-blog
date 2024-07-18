import Link from 'next/link';
import PostTitle from './PostTitle';
import type { PostDetail } from '@/types/posts';
import { dateFormatter } from '@/utils/time';
import DeleteButton from './DeleteButton';

export default function BlogList({ posts }: { posts: PostDetail[] }) {
  return (
    <div className="relative flex flex-col">
      {posts.map((item) => {
        return (
          <Link
            className="block px-6 hover:bg-[--layer-3] group"
            key={item.meta.id}
            href={`/post/${item.meta.slug}/`}
          >
            <article className="py-4 border-b border-[--layer-2] group-last-of-type:border-none">
              <div className="flex items-center justify-between">
                <PostTitle post={item} />
                <DeleteButton slug={item.meta.slug} />
              </div>
              <div className="text-sm text-[--text-color-3] flex justify-between items-center mt-1">
                <span>
                  创建时间：{dateFormatter(item.meta.stats.birthtime)}
                </span>
                <span>
                  最后更新时间：{dateFormatter(item.meta.stats.mtime)}
                </span>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
