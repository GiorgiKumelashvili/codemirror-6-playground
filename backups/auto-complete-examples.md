```tsx
async function myCompletions(context: CompletionContext): Promise<CompletionResult | null> {
  let word = context.matchBefore(/.*/s); // matches everything

  context.state.update({
    selection: { anchor: 1 },
  });

  if (word?.from == word?.to && !context.explicit) return null;

  // context.state.

  return {
    from: word?.from as number,
    options: [
      {
        label: `<h1></h1>`,
        type: `variable`,
        apply: (view, _completion, from, to) => {
          const text = `<h1></h1>`;
          const cursorPosition = text.length / 2;

          view.dispatch({
            ...insertCompletionText(view.state, text, from, to),
            selection: {
              anchor: from + cursorPosition,
              // head: from + cursorPosition + 3, // <- if this is active then instead of cursor it is selection
            },
          });
        },
      },
      { label: `bold`, type: `variable`, apply: '***' }, //
      { label: `@`, type: `variable`, displayLabel: 'Table', apply: 'Table example @' }, //
      { label: `@`, type: `variable`, displayLabel: 'H1', apply: 'H! example @' }, //

      { label: `/`, type: `util`, displayLabel: 'Text', apply: '' }, //
      { label: `/`, type: `util`, displayLabel: 'Text Bold', apply: '***' }, //

      { label: `custom`, type: `custom` },
      { label: `class`, type: `class` },
      { label: `constant`, type: `constant` },
      { label: `enum`, type: `enum` },
      { label: `function`, type: `function` },
      { label: `interface`, type: `interface` },
      { label: `keyword`, type: `keyword` },
      { label: `method`, type: `method` },
      { label: `namespace`, type: `namespace` },
      { label: `property`, type: `property` },
      { label: `text`, type: `text` },
      { label: `type`, type: `type` },
      { label: `variable`, type: `variable`, info: 'Addiotional', detail: 'Addiotional text' },
      { label: `variable1`, type: `variable`, info: 'Addiotional', detail: 'Addiotional text' },
      { label: `variable2`, type: `variable`, info: 'Addiotional', detail: 'Addiotional text' },
      { label: `variable3`, type: `variable`, info: 'Addiotional', detail: 'Addiotional text' },

      {
        label: 'username',
        type: 'keyword',
        apply: '{{ username }}',
        info: 'primitive wordlist - usernames from danielmiessler seclist',
      },

      { label: 'now', type: 'util', apply: new Date().toISOString() },
      { label: 'now2', type: 'util', apply: new Date().toUTCString() },
      { label: 'l unique', type: 'class', apply: 'l unique' },
      { label: 'match something', type: 'keyword', apply: 'haha' },
      { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' },
      { label: 'maaaa2', type: 'text', apply: 'test2', detail: 'Override' },
      { label: 'maaaa1', type: 'text', apply: 'test1', detail: 'macro' },
      { label: 'hello', type: 'variable', info: '(World)' },
      { label: '/x', type: 'variable', info: '(World)', apply: 'Hello World!' },
    ],
  };
}
```