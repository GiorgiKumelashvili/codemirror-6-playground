'use client';

import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror, { Extension, Text } from '@uiw/react-codemirror';
import { useMemo, useState } from 'react';
import { getAllExtension, getAllTheme } from '@/app/editor/extensions';
import { EditorTheme } from '@/lib/types';
import { ChangeTheme } from '@/app/editor/components';

export default function EditorPage(): JSX.Element {
  const [theme, setTheme] = useState<EditorTheme>('dark');

  const themeOptions = useMemo(() => getAllTheme(), []);
  const extensions: Extension[] = useMemo(() => getAllExtension(), []);

  return (
    <>
      <div className="mb-5 flex gap-2">
        <ChangeTheme theme={theme} setTheme={setTheme} themeOptions={themeOptions} />
      </div>

      <div className="max-w-[850px]">
        <CodeMirror
          value={Text.of(['Hello']).toString()}
          height="600px"
          autoFocus
          spellCheck
          readOnly={false}
          extensions={extensions}
          theme={(themes[theme as keyof typeof themes] || theme) as EditorTheme}
        />
      </div>
    </>
  );
}
