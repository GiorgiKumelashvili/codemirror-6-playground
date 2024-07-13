import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage(): JSX.Element {
  return (
    <>
      <h1>Home Page</h1>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <Button>Hello</Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="p-5 mt-5 bg-gradient">
        <h1>Hello</h1>
      </Card>
    </>
  );
}
