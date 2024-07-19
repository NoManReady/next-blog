'use client';
import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import './editor.css';
import Link from 'next/link';
import { savePost, updatePost } from '@/data/post';
import { useRouter } from 'next/navigation';

export default function MarkdownEditor({
  content,
  slug,
  id,
}: {
  content?: string;
  slug?: string;
  id?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const codeMirrorRef = useRef<CodeMirror.Editor | null>(null);

  const [titleValue, setTitleValue] = useState<string>(slug || '');
  const router = useRouter();
  useEffect(() => {
    codeMirrorRef.current = CodeMirror(
      (host) => {
        while (editorRef.current!.childElementCount > 0) {
          editorRef.current!.firstElementChild?.remove();
        }
        editorRef.current!.appendChild(host);
      },
      {
        mode: 'markdown',
        value: content || '',
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
          Enter: 'newlineAndIndentContinueMarkdownList',
        },
      }
    );
  }, [content]);

  const onSavePost = async () => {
    if (!titleValue) {
      alert('请输入标题');
      return;
    }
    if (slug) {
      await updatePost({
        content: codeMirrorRef.current?.getValue() || '',
        slug: slug!,
      });
      router.back();
      alert('保存成功');
    } else {
      await savePost({
        content: codeMirrorRef.current?.getValue() || '',
        slug: titleValue!,
      });
      alert('保存成功');
      router.replace('/');
    }
  };
  return (
    <div className="mb-10 flex flex-col gap-5">
      <div className="sticky top-16 z-20 flex items-center justify-between rounded-sm bg-[--layer-1] px-2 py-3 text-sm">
        <div className="flex items-center gap-3">
          <Link
            href={slug ? `/post/${slug}` : '/'}
            className="text-[--text-color-2] hover:text-[--text-color-3] active:text-[--text-color-1]"
          >
            ＜返回
          </Link>
          {id ? (
            <span>{slug!}</span>
          ) : (
            <input
              className="rounded border border-black/50 bg-white px-3 py-1 text-black/80 placeholder-black/50 focus-visible:outline-none"
              value={titleValue}
              onInput={(evt: any) => setTitleValue(evt.target.value)}
              placeholder="请输入标题"
            />
          )}
        </div>
        <div>
          <button
            className="rounded border border-purple-600 px-3 py-1 text-purple-500 hover:bg-purple-500 hover:text-white"
            onClick={onSavePost}
          >
            保存
          </button>
        </div>
      </div>
      <div
        ref={editorRef}
        className="min-h-0 flex-1 overflow-hidden rounded-sm"
      ></div>
    </div>
  );
}
