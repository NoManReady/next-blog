import Editor from '@/components/markdown/Editor';
import { getPost } from '@/data/post';
import { PostDetail } from '@/types/posts';
interface IProps {
  params: {
    slug: string;
  };
}
export async function generateMetadata({ params }: IProps) {
  const slug = decodeURI(params.slug);
  const post = await getPost(slug);
  return {
    title: post?.meta.slug,
  };
}

export default async function EditorLayout({ params }: IProps) {
  let post: PostDetail | undefined;
  const slug = decodeURI(params.slug || '');
  if (slug) {
    post = await getPost(slug);
  }
  return (
    <div className="editor-container flex h-full flex-col">
      <Editor slug={slug} content={post?.content} id={post?.meta.id} />
    </div>
  );
}
