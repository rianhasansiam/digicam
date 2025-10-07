export async function generateMetadata() {
  return {
  title: "My Profile - Digicam | Account Management",
  description: "Manage your Digicam account, view order history, update personal information, and customize your camera preferences.",
  keywords: "profile, account, user settings, order history, Digicam account management",
    robots: 'noindex, nofollow', // Private page
    openGraph: {
  title: "My Profile - Digicam | Account Management",
  description: "Manage your Digicam account, view order history, update personal information, and customize your camera preferences.",
      type: 'website'
    }
  };
}

export default function ProfileLayout({ children }) {
  return children;
}