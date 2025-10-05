import AddToCartPageWrapper from './AddToCartPageWrapper';

// Metadata for SEO (Server-side)
export async function generateMetadata() {
  return {
  title: "Shopping Cart - Digicam | Premium Fashion",
  description: "Review your selected premium fashion items, adjust quantities, and proceed to secure checkout at Digicam.",
  keywords: "shopping cart, fashion checkout, Digicam cart, premium clothing cart",
    openGraph: {
  title: "Shopping Cart - Digicam | Premium Fashion",
  description: "Review your selected premium fashion items, adjust quantities, and proceed to secure checkout at Digicam.",
      type: 'website'
    },
    twitter: {
      card: 'summary',
  title: "Shopping Cart - Digicam | Premium Fashion",
  description: "Review your selected premium fashion items, adjust quantities, and proceed to secure checkout at Digicam."
    }
  };
}

export default function AddToCartPage() {
  return <AddToCartPageWrapper />;
}
