import BlogList from '@/components/blog-list/List';
import { getAllPostsMeta } from '@/data/post';

export const revalidate = 0;
export default async function Home() {
  const posts = await getAllPostsMeta();
  return (
    <div>
      <BlogList posts={posts} />
    </div>
  );
}
