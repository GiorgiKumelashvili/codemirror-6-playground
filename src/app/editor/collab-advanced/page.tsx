'use client';

import * as themes from '@uiw/codemirror-themes-all';
import { useMemo, useRef, useState } from 'react';
import { basicSetupOption, getAllExtension, getAllTheme } from '@/app/editor/extensions';
import { EditorTheme } from '@/lib/types';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { ChangeTheme } from '@/app/editor/components';
import CodeMirror, {
  Decoration,
  DecorationSet,
  EditorView,
  Extension,
  Facet,
  Range,
  RangeSet,
  Text,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from '@uiw/react-codemirror';
import { Button } from '@/components/ui/button';
import { EventBus } from '@/app/editor/collab-advanced/event-bus';
import { Input } from '@/components/ui/input';

const eventBus = new EventBus();

//! resource - https://github.dev/yjs/y-codemirror.next

const caretBaseTheme = EditorView.baseTheme({
  '& .cm-x-cursor-line': {
    position: 'relative',
    'border-left': '1px solid',
    'border-right': '1px solid',
    'margin-left': '-1px',
    'margin-right': '-1px',
    'box-sizing': 'border-box',
    display: 'inline',
  },

  '& .cm-x-cursor-head': {
    'border-radius': '50%',
    position: 'absolute',
    width: '.4em',
    height: '.4em',
    top: '-.2em',
    left: '-.2em',
    'background-color': 'inherit',
    transition: 'transform .3s ease-in-out',
    'box-sizing': 'border-box',
  },

  '& .cm-x-cursor-name-container': {
    'font-size': '10px',
    position: 'absolute',
    width: 'fit-content',
    background: 'red',
    left: '5px',
    right: '0px',
    top: '-13px',
    margin: 'auto',
    'z-index': '10',
    color: 'white',
    padding: '0 5px',
    'border-radius': '8px 10px 10px 0',
  },
});

class CaretWidget extends WidgetType {
  private color: string;
  private name: string;

  constructor(color: string, name: string) {
    super();
    this.color = color;
    this.name = name;
  }

  toDOM(_view: EditorView): HTMLElement {
    const span = document.createElement('span');
    span.className = 'cm-x-cursor-line';
    span.style.backgroundColor = this.color;
    span.style.borderColor = this.color;

    const dot = document.createElement('div');
    dot.className = 'cm-x-cursor-head';
    span.appendChild(dot);

    const nameContainer = document.createElement('div');
    nameContainer.className = 'cm-x-cursor-name-container';
    nameContainer.style.backgroundColor = this.color;
    nameContainer.textContent = this.name;
    span.appendChild(nameContainer);

    return span;
  }

  eq(widget: CaretWidget): boolean {
    return widget.color === this.color;
  }

  compare(widget: CaretWidget): boolean {
    return widget.color === this.color;
  }

  updateDOM() {
    return false;
  }

  get estimatedHeight() {
    return -1;
  }

  ignoreEvent() {
    return true;
  }
}

const caretPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = RangeSet.of([]);

      eventBus.subscribe('test', (obj: { decorations: Range<Decoration>[] }) => {
        this.decorations = Decoration.set(obj.decorations);

        // update view
        view.dispatch();
      });
      eventBus.subscribe('clear', () => {
        this.decorations = Decoration.set([]);

        // update view
        view.dispatch();
      });
    }

    update(_view: ViewUpdate) {}
  },
  { decorations: v => v.decorations }
);

const caretExtension = [caretPlugin, caretBaseTheme];

function randomInRange(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}

export default function EditorMarkdown(): JSX.Element {
  const [theme, setTheme] = useState<EditorTheme>('dark');
  const editor = useRef<{ view: EditorView }>(null);
  const [number, setNumber] = useState<number | null>(null);

  const themeOptions = useMemo(() => getAllTheme(), []);
  const extensions: Extension[] = useMemo(
    () => getAllExtension().concat(markdown({ codeLanguages: languages })),
    []
  );

  const test = () => {
    const num = number ?? randomInRange(1, 5);

    eventBus.publish('test', {
      decorations: [
        {
          from: num,
          to: num,
          value: Decoration.widget({
            side: -1,
            block: false,
            widget: new CaretWidget('#ff0012', 'hello'),
          }),
        },
      ] as Range<Decoration>[],
    });
  };

  const clear = () => {
    eventBus.publish('clear');
  };

  return (
    <>
      <div className="mb-5 flex gap-2">
        <ChangeTheme theme={theme} setTheme={setTheme} themeOptions={themeOptions} />

        <Button onClick={test}>test</Button>
        <Input className="w-56" onChange={e => setNumber(Number(e.target.value))} />
        <Button onClick={clear}>clear</Button>
      </div>

      <div className="max-w-[850px]">
        <CodeMirror
          ref={editor}
          value={Text.of([
            'Hello'.repeat(25),
            'Hello'.repeat(25),
            '',
            "\n\n```javascript\nlet x = 'y'\n```",
            ...Array.from({ length: 200 }, (_, i) => 'i + 1'),
          ]).toString()}
          height="600px"
          autoFocus
          spellCheck
          readOnly={false}
          basicSetup={basicSetupOption}
          extensions={extensions.concat(caretExtension)}
          theme={(themes[theme as keyof typeof themes] || theme) as EditorTheme}
        />
      </div>
    </>
  );
}
