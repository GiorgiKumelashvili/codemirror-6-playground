'use client';

import Link from 'next/link';
import { constants } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type LinkItemProps = {
  href: string;
  text: string;
  isActive: boolean;
};

const LinkItem = ({ href, text, isActive }: LinkItemProps) => {
  return (
    <Link
      href={href}
      className={cn('transition-colors hover:text-foreground', {
        'text-foreground': isActive,
        'text-muted-foreground': !isActive,
      })}
    >
      {text}
    </Link>
  );
};

export const EditorLayoutLinks = () => {
  const pathName = usePathname();
  const linkItems: LinkItemProps[] = [
    {
      text: 'All Extension',
      href: constants.path.editor.root,
      isActive: pathName === constants.path.editor.root,
    },
    {
      text: 'Toggle Extensions',
      href: constants.path.editor.toggleExtensions,
      isActive: pathName === constants.path.editor.toggleExtensions,
    },
    {
      text: 'Hook',
      href: constants.path.editor.hook,
      isActive: pathName === constants.path.editor.hook,
    },
    {
      text: 'Markdown',
      href: constants.path.editor.markdown,
      isActive: pathName === constants.path.editor.markdown,
    },
    {
      text: 'Collab',
      href: constants.path.editor.collab,
      isActive: pathName === constants.path.editor.collab,
    },
  ];

  return (
    <nav className="hidden flex-col justify-start gap-6  text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      {linkItems.map(e => (
        <LinkItem key={e.href} {...e} />
      ))}
    </nav>
  );
};
