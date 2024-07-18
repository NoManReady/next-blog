export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="editor-layout max-w-4xl mx-auto bg-[--background]">
      {children}
    </div>
  );
}
