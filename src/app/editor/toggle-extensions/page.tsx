'use client';

import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror, { EditorView, Extension, Text } from '@uiw/react-codemirror';
import { useEffect, useMemo, useRef, useState } from 'react';
import { EditorTheme } from '@/lib/types';
import { ChangeTheme, ToggleAutoComplete } from '@/app/editor/components';
import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  autoCompleteCompartment,
  autoCompleteExtension,
  basicSetupOption,
  getAllExtension,
  getAllTheme,
} from '@/app/editor/extensions';
import { tempText } from '@/app/editor/data';

export default function EditorToggleExtensionPage(): JSX.Element {
  const editor = useRef<{ view: EditorView }>(null);

  const [theme, setTheme] = useState<EditorTheme>('dark');
  const [isAutocompleteActive, setIsAutocompleteActive] = useState(true);

  const extensions: Extension[] = useMemo(() => getAllExtension(), []);
  const themeOptions = useMemo(() => getAllTheme(), []);
  const activeTheme = useMemo(
    () => (themes[theme as keyof typeof themes] || theme) as EditorTheme,
    [theme]
  );

  //! This is how to activate extension without rerendering component
  useEffect(() => {
    if (!editor.current?.view) {
      return;
    }

    editor.current.view.dispatch({
      effects: autoCompleteCompartment.reconfigure(
        isAutocompleteActive ? autoCompleteExtension : []
      ),
    });
  }, [isAutocompleteActive, editor]);

  return (
    <>
      <div className="mb-5 flex gap-2 items-center">
        <ChangeTheme theme={theme} setTheme={setTheme} themeOptions={themeOptions} />
        <Separator />
        <ToggleAutoComplete
          isAutocompleteActive={isAutocompleteActive}
          setIsAutocompleteActive={setIsAutocompleteActive}
        />
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
