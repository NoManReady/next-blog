import Link from 'next/link';

export default function HomeLink() {
  return (
    <Link
      href="/"
      className="px-4 py-2 text-base text-sm text-gray-700 underline-offset-4 hover:text-purple-500 hover:underline dark:text-gray-500"
    >
      回到首页
    </Link>
  );
}
