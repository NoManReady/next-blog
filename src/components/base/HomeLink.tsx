import Link from 'next/link';

export default function HomeLink() {
  return (
    <Link
      href="/"
      className="text-gray-700 dark:text-gray-500 hover:text-purple-500 text-base hover:underline underline-offset-4 py-2 px-4 text-sm"
    >
      回到首页
    </Link>
  );
}
