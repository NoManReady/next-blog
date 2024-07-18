'use client';
import { deletePost } from '@/data/post';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

export default function DeleteButton({ slug }: { slug: string }) {
  const status = useFormStatus();
  const router = useRouter();
  async function onDeletePost() {
    await deletePost(slug);
    router.replace('/');
  }
  console.log(status.pending);
  return (
    <button
      disabled={status.pending}
      onClick={onDeletePost}
      className="text-[--text-color-2] hover:text-red-400 active:text-red-600 text-sm"
    >
      {status.pending ? '删除中' : '删除'}
    </button>
  );
}

// export default function DeleteButton({ action }: { action: VoidFunction }) {
//   const router = useRouter();

//   async function onSubmit() {
//     await action();
//     router.replace('/');
//   }
//   return (
//     <form action={onSubmit}>
//       <Submit onSubmit={onSubmit} />
//     </form>
//   );
// }

// function Submit(props) {
//   const { pending } = useFormStatus();
//   return (
//     <button
//       type="submit"
//       onClick={props.onSubmit}
//       disabled={pending}
//       className="text-[--text-color-2] hover:text-red-400 active:text-red-600 text-sm"
//     >
//       {pending ? '删除中' : '删除'}
//     </button>
//   );
// }
