import { sans } from '@/fonts/fonts';
import type { PostDetail } from '@/types/posts';
import Color from 'colorjs.io';

export default function PostTitle({ post }: { post: PostDetail }) {
  const lightStart = new Color('lab(63 59.32 -1.47)');
  const lightEnd = new Color('lab(33 42.09 -43.19)');
  const lightRange = lightStart.range(lightEnd);
  const darkStart = new Color('lab(81 32.36 -7.02)');
  const darkEnd = new Color('lab(78 19.97 -36.75)');
  const darkRange = darkStart.range(darkEnd);
  const today = new Date();
  const timeSinceFirstPost = (
    today.valueOf() - new Date(2024, 1, 1).valueOf()
  ).valueOf();
  const timeSinceThisPost = (
    today.valueOf() - post.meta.stats.birthtime.valueOf()
  ).valueOf();
  const staleness = timeSinceThisPost / timeSinceFirstPost;
  return (
    <h2
      className={[
        sans.className,
        'text-[28px] font-black',
        'text-[--light-link] dark:text-[--dark-link]',
      ].join(' ')}
      style={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        '--light-link': lightRange(staleness).toString(),
        '--dark-link': darkRange(staleness).toString(),
      }}
    >
      {post.meta.title || post.meta.slug}
    </h2>
  );
}
