import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsPage(): Promise<JSX.Element> {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}
