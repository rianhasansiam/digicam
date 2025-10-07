import AddToCartPageWrapper from './AddToCartPageWrapper';

// Metadata for SEO (Server-side)
export async function generateMetadata() {
  return {
  title: "Shopping Cart - Digicam | Premium Cameras",
  description: "Review your selected premium camera items, adjust quantities, and proceed to secure checkout at Digicam.",
  keywords: "shopping cart, camera checkout, Digicam cart, premium camera cart",
    openGraph: {
  title: "Shopping Cart - Digicam | Premium Cameras",
  description: "Review your selected premium camera items, adjust quantities, and proceed to secure checkout at Digicam.",
      type: 'website'
    },
    twitter: {
      card: 'summary',
  title: "Shopping Cart - Digicam | Premium Cameras",
  description: "Review your selected premium camera items, adjust quantities, and proceed to secure checkout at Digicam."
    }
  };
}

export default function AddToCartPage() {
  return <AddToCartPageWrapper />;
}
