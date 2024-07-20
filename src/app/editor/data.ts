import { Text } from '@uiw/react-codemirror';

export const tempText = Text.of([
  'Hello',
  'World',
  'Hello'.repeat(10),
  ...Array.from({ length: 10 }, (_, i) => `Test ${i}`),
]).toString();

export const tempTextMarkdown = Text.of([
  'Hello'.repeat(25),
  'Hello'.repeat(25),
  '',
  "\n\n```javascript\nlet x = 'y'\n```",
  ...Array.from({ length: 200 }, (_, i) => `i + ${i}`),
]).toString();
