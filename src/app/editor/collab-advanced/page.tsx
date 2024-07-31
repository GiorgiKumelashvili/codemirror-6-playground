'use client';

import * as themes from '@uiw/codemirror-themes-all';
import { useCallback, useMemo, useRef, useState } from 'react';
import { basicSetupOption, getAllExtension, getAllTheme } from '@/app/editor/extensions';
import { EditorTheme } from '@/lib/types';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { ChangeTheme } from '@/app/editor/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { tempTextMarkdown } from '@/app/editor/data';
import { getRandomInt } from '@/lib/utils';
import { v4 as uuid } from 'uuid';
import CodeMirror, {
  BlockInfo,
  EditorState,
  EditorView,
  Extension,
  Rect,
} from '@uiw/react-codemirror';
import { Card } from '@/components/ui/card';

type CursorData = {
  color: string;
  text: string;
  id: string;
  pos: number;
};

const arrOfCursors: CursorData[] = [
  { color: '#ff0012', text: 'Giorgi', id: uuid(), pos: 12 },
  { color: '#ADFA1B', text: 'Gela', id: uuid(), pos: 85 }, //TODO: issue with 86 when there is line break
];

export default function EditorMarkdown(): JSX.Element {
  const editor = useRef<{ view: EditorView; state: EditorState }>(null);
  const [theme, setTheme] = useState<EditorTheme>('dark');
  const [maxForRand, setMaxForRand] = useState<number | null>(null);

  const themeOptions = useMemo(() => getAllTheme(), []);
  const extensions: Extension[] = useMemo(
    () => getAllExtension().concat(markdown({ codeLanguages: languages })),
    []
  );
  const activeTheme = useMemo(
    () => (themes[theme as keyof typeof themes] || theme) as EditorTheme,
    [theme]
  );

  const test = () => {
    const editorDom = document.querySelector('.cm-editor');

    if (!editorDom) {
      console.log('no editor element');
      return;
    }

    for (const cursor of arrOfCursors) {
      const randomNumber = maxForRand ? getRandomInt(0, maxForRand) : null;

      const { left, lineHeight, top } = calculateCords({
        characterPosition: randomNumber ?? cursor.pos, // randomnumber is for testing
        editorDom,
      });

      document.getElementById(cursor.id)?.remove();

      renderCursor({ lineHeight, left, top, ...cursor });
    }
  };

  const calculateCords = useCallback((props: { characterPosition: number; editorDom: Element }) => {
    const { characterPosition, editorDom } = props;

    // Get coordinates for left position calculation, this gives positions for
    const cords = editor.current?.view.coordsAtPos(characterPosition) as Rect;
    const cordsBlock = editor.current?.view.lineBlockAt(characterPosition) as BlockInfo;
    const defaultLineHeight = editor.current?.view.defaultLineHeight as number;

    // How much is root editor dom from left and top
    const rootEditorDistanceFromLeft = editorDom.getBoundingClientRect().left + window.scrollX; // px
    const currentLineAbsPosFromEditorLeft = cords.left - rootEditorDistanceFromLeft;

    return {
      left: currentLineAbsPosFromEditorLeft,
      top: cordsBlock.top,
      lineHeight: defaultLineHeight,
    };
  }, []);

  const renderCursor = useCallback(
    (props: { left: number; top: number; lineHeight: number } & CursorData) => {
      const { left, lineHeight, color, text, id } = props;
      let { top } = props;

      top = top + 30;

      const span = document.createElement('span');
      span.className = 'cm-x-cursor-line';
      span.style.left = `${left}px`;
      span.style.top = `${top}px`;
      span.style.borderLeft = `1px solid ${color}`;
      span.style.borderRight = `1px solid ${color}`;
      span.style.height = lineHeight + 'px';
      span.id = id;

      const dot = document.createElement('div');
      dot.className = 'cm-x-cursor-head';
      dot.style.backgroundColor = color;
      span.appendChild(dot);

      const nameContainer = document.createElement('div');
      nameContainer.className = 'cm-x-cursor-name-container';
      nameContainer.style.backgroundColor = color;
      nameContainer.textContent = text;
      span.appendChild(nameContainer);

      //! Must be scroller in order for positions to work accordingly if for example you use in
      //! cm-editor instead of cm-scroller then cursor div will not respect scrolling and stay in one place fixed on screen
      document.querySelector('.cm-scroller')?.appendChild(span);
    },
    []
  );

  return (
    <>
      <div className="mb-5 flex gap-2">
        <ChangeTheme theme={theme} setTheme={setTheme} themeOptions={themeOptions} />
        <Button onClick={test}>Test</Button>
        <Input
          placeholder="Enter max number for random"
          className="w-64"
          onChange={e => setMaxForRand(Number(e.target.value))}
          value={maxForRand?.toString() ?? ''}
        />
      </div>

      <div className="flex">
        <CodeMirror
          ref={editor}
          value={tempTextMarkdown}
          height="600px"
          width="750px"
          className="cm-custom"
          autoFocus
          spellCheck
          readOnly={false}
          basicSetup={basicSetupOption}
          extensions={extensions}
          theme={activeTheme}
        />
        <Card className="p-4 mx-4 rounded-none border-none flex-1">
          <h1 className="font-bold">Example data rendering on the page</h1>
          <br />
          <pre className="text-xs">{JSON.stringify(arrOfCursors, null, 2)}</pre>
        </Card>
      </div>
    </>
  );
}
