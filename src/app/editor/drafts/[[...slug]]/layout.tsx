export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="editor-layout mx-auto max-w-4xl bg-[--background]">
      {children}
    </div>
  );
}
