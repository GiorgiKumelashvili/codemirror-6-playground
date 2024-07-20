'use client';

import * as themes from '@uiw/codemirror-themes-all';
import CodeMirror, { Extension, Text } from '@uiw/react-codemirror';
import { useEffect, useMemo, useState } from 'react';
import { getAllExtension, getAllTheme } from '@/app/editor/extensions';
import { EditorTheme } from '@/lib/types';
import { ChangeTheme, Separator, SocketStatus } from '@/app/editor/components';
import { socket } from '@/app/editor/collab/socket';
import { getDocument, peerExtension } from '@/app/editor/collab/collab-and-ext';

/**
 * ! Important thing is that you need to run socket.js file for collaborative editing to work
 */
export default function EditorCollabPage(): JSX.Element {
  const [theme, setTheme] = useState<EditorTheme>('dark');
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  const [version, setVersion] = useState<number>();
  const [doc, setDoc] = useState<Text>();

  const themeOptions = useMemo(() => getAllTheme(), []);
  const activeTheme = useMemo(
    () => (themes[theme as keyof typeof themes] || theme) as EditorTheme,
    [theme]
  );
  const extensions: Extension[] = useMemo(() => {
    const tempExtensions = getAllExtension();

    if (doc !== undefined && version !== undefined) {
      console.log('executing here ' + '+'.repeat(20));

      tempExtensions.push(peerExtension(socket, version));
    }

    return tempExtensions;
  }, [doc, version]);

  useEffect(() => {
    async function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on('upgrade', transport => {
        setTransport(transport.name);
      });

      const { version, doc } = await getDocument(socket);

      setVersion(version);
      setDoc(doc);
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    ///======================
    if (socket.connected) {
      onConnect();
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pullUpdateResponse');
      socket.off('pushUpdateResponse');
      socket.off('getDocumentResponse');
    };
  }, []);

  return (
    <>
      <div className="mb-5 flex gap-2 items-center">
        <ChangeTheme theme={theme} setTheme={setTheme} themeOptions={themeOptions} />
        <Separator />
        <SocketStatus isConnected={isConnected} transport={transport} />
      </div>

      <div className="max-w-[850px]">
        {doc !== undefined && version !== undefined ? (
          <CodeMirror
            value={doc.toString()}
            height="600px"
            autoFocus
            spellCheck
            readOnly={false}
            extensions={extensions}
            theme={activeTheme}
          />
        ) : (
          <p>...loading</p>
        )}
      </div>
    </>
  );
}
