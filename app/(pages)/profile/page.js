import SimpleProfilePageWrapper from './SimpleProfilePageWrapper';

export const metadata = {
  title: 'My Profile - Digicam | Account Dashboard',
  description: 'Manage your Digicam account, view orders, and customize your preferences.',
  keywords: 'profile, account, orders, Digicam account, user dashboard',
  openGraph: {
    title: 'My Profile - Digicam | Account Dashboard',
    description: 'Manage your Digicam account, view orders, and customize your preferences.',
    type: 'website',
  },
};

export default function ProfilePage() {
  return <SimpleProfilePageWrapper />;
}