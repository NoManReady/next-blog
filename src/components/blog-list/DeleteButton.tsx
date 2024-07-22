'use client';
import { deletePost } from '@/data/post';
import { useSession } from 'next-auth/react';
import { useFormStatus } from 'react-dom';

export default function DeleteButton({ slug }: { slug: string }) {
  const status = useFormStatus();
  const session = useSession();
  async function onDeletePost(evt: any) {
    evt.preventDefault();
    const isOk = confirm('是否确认删除？');
    if (isOk) {
      await deletePost(slug);
    }
  }
  return session.status === 'authenticated' ? (
    <button
      disabled={status.pending}
      onClick={onDeletePost}
      className="text-sm text-[--text-color-2] hover:text-red-400 active:text-red-600"
    >
      {status.pending ? '删除中' : '删除'}
    </button>
  ) : null;
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
