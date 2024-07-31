import { Text } from '@uiw/react-codemirror';

export const tempText = Text.of([
  'Hello',
  'World',
  'Hello'.repeat(10),
  ...Array.from({ length: 10 }, (_, i) => `Test ${i}`),
]).toString();

export const tempTextMarkdown = Text.of([
  'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHell9oHelloHelloHelloHelloHelloHelloHelloHelloHello1',
  'Hello'.repeat(25) + 2,
  'Hello'.repeat(25) + 3,
  '',
  "\n\n```javascript\nlet x = 'y'\n```",
  ...Array.from({ length: 200 }, (_, i) => `i + ${i}`),
]).toString();
