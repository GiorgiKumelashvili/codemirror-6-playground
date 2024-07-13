import { EditorLayoutLinks } from '@/components/app/editor-layout-links';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor',
};

export default async function EditorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="mb-5">
        <h1 className="mb-2 font-semibold text-2xl">CodeMirror Editor Examples</h1>

        <EditorLayoutLinks />

        <hr className="border-t-2 border-gray-700 mt-5" />
      </div>

      {children}
    </div>
  );
}
