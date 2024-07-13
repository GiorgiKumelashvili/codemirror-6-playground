'use client';

import * as themes from '@uiw/codemirror-themes-all';
import { Extension, Text, useCodeMirror } from '@uiw/react-codemirror';
import { useMemo, useRef, useState } from 'react';
import { getAllExtension, getAllTheme } from '@/app/editor/extensions';
import { EditorTheme } from '@/lib/types';
import { ChangeTheme } from '@/app/editor/components';

export default function EditorWithHookPage() {
  const editor = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<EditorTheme>('dark');

  const themeOptions = useMemo(() => getAllTheme(), []);
  const extensions: Extension[] = useMemo(() => getAllExtension(), []);

  const {
    view: _view,
    container: _container,
    setContainer: _setContainer,
    setState: _setState,
    setView: _setView,
    state: _state,
  } = useCodeMirror({
    container: editor.current,
    value: Text.of(['Hello']).toString(),
    height: '600px',
    autoFocus: true,
    spellCheck: true,
    readOnly: false,
    extensions,
    theme: (themes[theme as keyof typeof themes] || theme) as EditorTheme,
  });

  return (
    <>
      <div className="mb-5 flex gap-2">
        <ChangeTheme theme={theme} setTheme={setTheme} themeOptions={themeOptions} />
      </div>

      <div ref={editor} className="max-w-[850px]" />
    </>
  );
}
