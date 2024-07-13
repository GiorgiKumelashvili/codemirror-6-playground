import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CodeSandboxLogoIcon, MagnifyingGlassIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/mode-toggle';
import { CustomThemeModeToggle } from '@/components/theme/theme-mode-toggle';
import { constants } from '@/lib/constants';

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = (props: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href={constants.path.root}
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <CodeSandboxLogoIcon className="h-6 w-6" />
          </Link>

          <Link
            href={constants.path.root}
            className="text-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href={constants.path.settings}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
          <Link
            href={constants.path.editor.root}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Editor
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <HamburgerMenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <CodeSandboxLogoIcon className="h-6 w-6" />
              </Link>

              <Link href="/" className="hover:text-foreground">
                Dashboard
              </Link>

              <Link href="/settings" className="text-muted-foreground hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>

          <ModeToggle />
          <CustomThemeModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarFallback>Gio</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        {props.children}
      </main>
    </div>
  );
};
