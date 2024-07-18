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
    <div className="flex flex-col gap-5 mb-10">
      <div className="flex justify-between items-center bg-[--layer-1] py-3 px-2 rounded-sm text-sm sticky top-16 z-20">
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
              className="rounded-sm px-3 py-1 text-gray-700"
              value={titleValue}
              onInput={(evt: any) => setTitleValue(evt.target.value)}
            />
          )}
        </div>
        <div>
          <button
            className="text-purple-500 px-3 py-1 border border-purple-600 rounded hover:text-white hover:bg-purple-500"
            onClick={onSavePost}
          >
            保存
          </button>
        </div>
      </div>
      <div
        ref={editorRef}
        className="flex-1 min-h-0 rounded-sm overflow-hidden"
      ></div>
    </div>
  );
}
