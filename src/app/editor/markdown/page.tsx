'use client';

import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror, { Extension, Text } from '@uiw/react-codemirror';
import { useMemo, useState } from 'react';
import { basicSetupOption, getAllExtension, getAllTheme } from '@/app/editor/extensions';
import { EditorTheme } from '@/lib/types';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { ChangeTheme } from '@/app/editor/components';

export default function EditorMarkdown(): JSX.Element {
  const [theme, setTheme] = useState<EditorTheme>('dark');

  const themeOptions = useMemo(() => getAllTheme(), []);
  const extensions: Extension[] = useMemo(
    () => getAllExtension().concat(markdown({ codeLanguages: languages })),
    []
  );

  return (
    <>
      <div className="mb-5 flex gap-2">
        <ChangeTheme theme={theme} setTheme={setTheme} themeOptions={themeOptions} />
      </div>

      <div className="max-w-[850px]">
        <CodeMirror
          value={Text.of(["Hello\n\n```javascript\nlet x = 'y'\n```"]).toString()}
          height="600px"
          autoFocus
          spellCheck
          readOnly={false}
          basicSetup={basicSetupOption}
          extensions={extensions}
          theme={(themes[theme as keyof typeof themes] || theme) as EditorTheme}
        />
      </div>
    </>
  );
}
