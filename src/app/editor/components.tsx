import { EditorTheme } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const ChangeTheme = (params: {
  theme: EditorTheme;
  setTheme: React.Dispatch<React.SetStateAction<EditorTheme>>;
  themeOptions: string[];
}) => {
  return (
    <Select onValueChange={e => params.setTheme(e as EditorTheme)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {params.themeOptions.map(e => (
          <SelectItem key={e} value={e}>
            {e}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const Separator = () => <div className="w-px h-10 bg-slate-300" />;

export const ToggleAutoComplete = (params: {
  isAutocompleteActive: boolean;
  setIsAutocompleteActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="isAutocompleteActive"
        checked={params.isAutocompleteActive}
        onCheckedChange={() => params.setIsAutocompleteActive(prev => !prev)}
      />
      <Label htmlFor="isAutocompleteActive" className="cursor-pointer">
        Toggle autocomplete
      </Label>
    </div>
  );
};

export const SocketStatus = (params: { isConnected: boolean; transport: string }) => {
  return (
    <div className="flex flex-col">
      <p className="flex items-center">
        Status: {params.isConnected ? 'connected' : 'disconnected'}
        {params.isConnected ? (
          <span className="h-5 w-5 bg-green-500 inline-block rounded-full border border-white ml-2" />
        ) : (
          <span className="h-5 w-5 bg-red-500 inline-block rounded-full border border-white ml-2" />
        )}
      </p>
      <p>Transport: {params.transport}</p>
    </div>
  );
};
