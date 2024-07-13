'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MixIcon } from '@radix-ui/react-icons';
import { themes, useCustomTheme } from '@/components/theme/custom-theme-provider';

const themeKeys = Object.keys(themes);

export function CustomThemeModeToggle() {
  const { setTheme } = useCustomTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MixIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Custom theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeKeys.map(key => (
          <DropdownMenuItem key={key} onClick={() => setTheme(themes[key])}>
            {key}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
