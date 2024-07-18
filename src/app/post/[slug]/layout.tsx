import HomeLink from '@/components/base/HomeLink';
import './markdown.css';

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <footer className="mt-12 text-center py-10">
        <HomeLink />
      </footer>
    </>
  );
}
