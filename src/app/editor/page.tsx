'use client';

import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror, {
  EditorState,
  EditorView,
  Extension,
  showTooltip,
  StateField,
  Text,
  Tooltip,
  closeHoverTooltips,
} from '@uiw/react-codemirror';
import { useMemo, useState } from 'react';
import { basicSetupOption, getAllExtension, getAllTheme } from '@/app/editor/extensions';
import { EditorTheme } from '@/lib/types';
import { ChangeTheme } from '@/app/editor/components';

const cursorTooltipField = StateField.define<readonly Tooltip[]>({
  create: state => {
    return getCursorTooltips(state, 2);
  },
  update(tooltips, editor) {
    console.log('='.repeat(20));
    // console.log(editor);
    console.log(editor.state.selection);
    console.log(editor.state.selection.main.head);

    if (!editor.docChanged && !editor.selection) {
      const x = editor.state.selection.ranges
        .filter(e => e.empty)
        .map(e => {
          let line = editor.state.doc.lineAt(e.head);
          let text = line.number + ':' + (e.head - line.from);

          return {
            pos: e.head,
            text,
          };
        });

      return tooltips;
    }

    return getCursorTooltips(editor.state);
  },

  provide: f => showTooltip.computeN([f], state => state.field(f)),
});

function getCursorTooltips(state: EditorState, x?: number): readonly Tooltip[] {
  return state.selection.ranges
    .filter(range => range.empty)
    .map(range => {
      let line = state.doc.lineAt(range.head);
      let text =
        'xxxxxxxxxxxxxxx' + line.number + ':' + (range.head - line.from) + 'xxxxxxxxxxxxxxx';

      return {
        pos: x ?? range.head,
        above: true,
        strictSide: true,
        arrow: true,
        create: () => {
          let dom = document.createElement('div');
          dom.className = 'cm-tooltip-cursor';
          dom.textContent = text;

          let cursor = document.createElement('div');
          cursor.className = 'cm-tooltip-cursor-indicator';
          dom.appendChild(cursor);

          return { dom };
        },
      };
    });
}

const cursorTooltipBaseTheme = EditorView.baseTheme({
  '.cm-tooltip.cm-tooltip-cursor': {
    backgroundColor: '#66b',
    color: 'white',
    border: 'none',
    padding: '2px 7px',
    borderRadius: '4px',
    '& .cm-tooltip-arrow:before': {
      borderTopColor: '#66b',
    },
    '& .cm-tooltip-arrow:after': {
      borderTopColor: 'transparent',
    },

    '& .cm-tooltip-arrow': {
      bottom: '-4px',
      left: '6.5px !important',
    },
  },
});

const toolTipExtension = [cursorTooltipField, cursorTooltipBaseTheme];

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
          value={Text.of(['Hello', 'World']).toString()}
          height="600px"
          autoFocus
          spellCheck
          basicSetup={basicSetupOption}
          readOnly={false}
          extensions={extensions.concat(toolTipExtension)}
          theme={(themes[theme as keyof typeof themes] || theme) as EditorTheme}
        />
      </div>
    </>
  );
}
