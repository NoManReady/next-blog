import Editor from '@/components/markdown/Editor';
import { getPost } from '@/data/post';
import { PostDetail } from '@/types/posts';

export default async function EditorLayout({
  params,
}: {
  params: { slug?: string };
}) {
  let post: PostDetail | undefined;
  const slug = decodeURI(params.slug || '');
  if (slug) {
    post = await getPost(slug);
  }
  return (
    <div className="editor-container h-full flex flex-col">
      <Editor slug={slug} content={post?.content} id={post?.meta.id} />
    </div>
  );
}
