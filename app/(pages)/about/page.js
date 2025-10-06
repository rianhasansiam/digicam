import AboutPageClient from './AboutPageClient';

// Metadata for SEO
export const metadata = {
  title: "About Us - Digicam | Professional Camera Store Since 2025",
  description: "Discover the story behind Digicam and our commitment to professional photography equipment. Learn about our journey, values, and expertise since 2025.",
  keywords: "about Digicam, camera store, photography equipment, professional cameras, camera shop history, DSLR store",
  openGraph: {
    title: "About Us - Digicam | Professional Camera Store",
    description: "Discover the story behind Digicam and our commitment to professional photography equipment.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606240724602-5b21f896eae8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        width: 1200,
        height: 630,
        alt: "Digicam Camera Store"
      }
    ]
  },
  alternates: {
    canonical: '/about',
  },
};

// Simple about page
export default function AboutPage() {
  // Company information (server-side data)
  const aboutData = {
    hero: {
      title: "About Digicam",
      subtitle: "Professional Photography Equipment Since 2025",
      description: "We empower photographers to capture their vision with premium cameras and expert guidance.",
      backgroundImage: "https://images.unsplash.com/photo-1606240724602-5b21f896eae8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    
    story: {
      title: "Our Story",
      subtitle: "A Journey of Photography Excellence",
      content: [
        "Digicam was founded in 2025 with a vision to provide professional photography equipment that's accessible to everyone. We believe that quality cameras and expert guidance should empower every photographer's creative vision.",
        "Our journey began with a passion for photography and a commitment to helping others capture their perfect moments. From DSLR cameras to mirrorless systems, lenses, and accessories, we carefully curate each product with attention to detail and dedication to excellence.",
        "Today, we continue to grow as Bangladesh's trusted camera retailer while staying true to our core values of quality products, expert knowledge, and exceptional customer service."
      ],
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
    },
    
    mission: {
      title: "Our Mission & Values",
      subtitle: "What Drives Us Forward",
      values: [
        {
          iconName: "Camera",
          title: "Premium Quality",
          description: "We offer only authentic cameras and equipment from trusted brands like Canon, Nikon, Sony, and Fujifilm."
        },
        {
          iconName: "ShieldCheck",
          title: "Expert Guidance", 
          description: "Our knowledgeable team provides personalized advice to help you choose the perfect camera for your needs."
        },
        {
          iconName: "Users",
          title: "Customer Focus",
          description: "Your photography journey and satisfaction are our top priorities. We're here to support you every step of the way."
        },
        {
          iconName: "Zap",
          title: "Fast & Reliable",
          description: "Quick delivery, hassle-free returns, and responsive customer service ensure a smooth shopping experience."
        },
        {
          iconName: "Eye",
          title: "Photography Passion",
          description: "We're photographers ourselves, passionate about helping you capture life's precious moments perfectly."
        },
        {
          iconName: "Aperture",
          title: "Latest Technology",
          description: "Stay ahead with the newest camera models, lenses, and photography accessories as soon as they launch."
        }
      ]
    },
    
    team: {
  title: "Meet Our Team",
  subtitle: "The Creative Minds Behind Digicam",
      members: [
        {
          name: "Sarah Johnson",
          role: "Founder & CEO",
          bio: "Leading Digicam with vision and passion for premium fashion.",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=400&h=400&fit=crop&auto=format",
          social: {
            linkedin: "https://linkedin.com/in/sarah-johnson",
            twitter: "https://twitter.com/sarah_johnson",
            instagram: "https://instagram.com/sarah.johnson"
          }
        },
        {
          name: "Michael Chen", 
          role: "Head Designer",
          bio: "Creating innovative designs that define modern fashion trends.",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format",
          social: {
            linkedin: "https://linkedin.com/in/michael-chen",
            twitter: "https://twitter.com/michael_chen",
            instagram: "https://instagram.com/michael.chen"
          }
        },
        {
          name: "Emily Davis",
          role: "Creative Director", 
          bio: "Bringing creative excellence to every fashion collection.",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format",
          social: {
            linkedin: "https://linkedin.com/in/emily-davis",
            twitter: "https://twitter.com/emily_davis",
            instagram: "https://instagram.com/emily.davis"
          }
        }
      ]
    },

    stats: {
      title: "Our Journey in Numbers",
      subtitle: "Milestones that Define Our Success",
      achievements: [
        {
          number: "15K+",
          label: "Happy Photographers",
          description: "Satisfied customers nationwide"
        },
        {
          number: "500+",
          label: "Camera Products",
          description: "Cameras, lenses & accessories"
        },
        {
          number: "7+",
          label: "Years Experience",
          description: "In camera retail industry"
        },
        {
          number: "50+",
          label: "Top Brands",
          description: "Canon, Nikon, Sony & more"
        },
        {
          number: "24/7",
          label: "Support",
          description: "Always here to help you"
        },
        {
          number: "99%",
          label: "Satisfaction Rate",
          description: "Customer happiness guaranteed"
        }
      ]
    },

    awards: {
      title: "Recognition & Achievements",
      subtitle: "Celebrating Excellence in Photography Retail",
      awards: [
        {
          title: "Best Camera Retailer 2024",
          organization: "Bangladesh Retailers Association",
          year: "2024",
          description: "Recognized for outstanding product quality, authentic equipment, and exceptional customer service."
        },
        {
          title: "Authorized Premium Dealer",
          organization: "Canon, Nikon, Sony & Fujifilm",
          year: "2023",
          description: "Official authorized dealer status from leading camera manufacturers, ensuring genuine products and warranties."
        },
        {
          title: "Customer Choice Award",
          organization: "Photography Community Bangladesh",
          year: "2023",
          description: "Voted best camera shop by Bangladesh's photography community for expert guidance and reliable service."
        },
        {
          title: "Excellence in E-Commerce",
          organization: "Digital Commerce Association",
          year: "2022",
          description: "Awarded for innovative online shopping experience and seamless delivery of photography equipment."
        }
      ]
    },

    cta: {
      title: "Ready to Start Your Photography Journey?",
      subtitle: "Join thousands of satisfied photographers who trust us for their camera needs",
      description: "Browse our collection of professional cameras, lenses, and accessories. Get expert advice and competitive prices on all your photography equipment.",
      buttonText: "Shop Cameras",
      buttonLink: "/allProducts",
      secondaryButtonText: "Contact Us",
      secondaryButtonLink: "/contact"
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <AboutPageClient aboutData={aboutData} />
    </main>
  );
}
