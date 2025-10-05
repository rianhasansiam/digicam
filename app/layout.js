import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./redux/provider";
import Navbar from "./componets/navbar/Navbar";
import Footer from "./componets/footer/Footer";
import ErrorBoundary from "./componets/shared/ErrorBoundary";
import ErrorSuppression from "./componets/shared/ErrorSuppression";
import AuthProvider from "../lib/AuthProvider";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import { LoadingProvider } from "../lib/LoadingProvider";
import CustomerChatButton from "./componets/chat/CustomerChatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Digicam - Premium Camera Store",
  description: "Discover professional cameras and photography equipment at Digicam. Quality cameras and accessories for photographers of all levels.",
  keywords: "cameras, DSLR, mirrorless, photography, digital cameras, camera lenses, photography equipment, online camera store, Digicam",
  authors: [{ name: "Digicam" }],
  creator: "Digicam",
  publisher: "Digicam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://digicam.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorSuppression />
        <AuthProvider>
          <StoreProvider>
            <ReactQueryProvider>
              <LoadingProvider>
                <div className="flex flex-col min-h-screen bg-white text-black">
                  <Navbar />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                  <CustomerChatButton />
                </div>
              </LoadingProvider>
            </ReactQueryProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
