'use client';

import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror, { EditorState, EditorView, Extension } from '@uiw/react-codemirror';
import { basicSetupOption, getAllExtension, getAllTheme } from '@/app/editor/extensions';
import { useCallback, useMemo, useRef, useState } from 'react';
import { EditorTheme } from '@/lib/types';
import { ChangeTheme } from '@/app/editor/components';
import { tempText } from '@/app/editor/data';
import { Button } from '@/components/ui/button';

export default function EditorPage(): JSX.Element {
  const editor = useRef<{ view: EditorView; state: EditorState }>(null);
  const [theme, setTheme] = useState<EditorTheme>('dark');

  const themeOptions = useMemo(() => getAllTheme(), []);
  const extensions: Extension[] = useMemo(() => getAllExtension(), []);
  const activeTheme = useMemo(
    () => (themes[theme as keyof typeof themes] || theme) as EditorTheme,
    [theme]
  );
  const selectCursor = useCallback(() => {
    editor.current?.view.dispatch({
      selection: { anchor: 13, head: 18 },
    });
  }, []);

  return (
    <>
      <div className="mb-5 flex gap-2">
        <ChangeTheme theme={theme} setTheme={setTheme} themeOptions={themeOptions} />
        <Button onClick={selectCursor}>Cursor Selection</Button>
      </div>

      <div className="max-w-[850px]">
        <CodeMirror
          ref={editor}
          value={tempText}
          height="600px"
          autoFocus
          spellCheck
          basicSetup={basicSetupOption}
          readOnly={false}
          extensions={extensions}
          theme={activeTheme}
        />
      </div>
    </>
  );
}
