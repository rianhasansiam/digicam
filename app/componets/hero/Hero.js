'use client';

import React, { useMemo } from 'react';
import HeroClient from './HeroClient';

export default function Hero({ productsData, usersData, reviewsData }) {
  // Calculate real statistics from database data (passed as props)
  const heroStats = useMemo(() => {
    const productCount = Array.isArray(productsData) ? productsData.length : 0;
    const userCount = Array.isArray(usersData) ? usersData.length : 0;
    const reviewCount = Array.isArray(reviewsData) ? reviewsData.length : 0;

    // Calculate average rating from reviews
    const averageRating = reviewCount > 0 
      ? reviewsData.reduce((sum, review) => sum + (review.rating || 0), 0) / reviewCount
      : 0;

    const satisfactionRate = averageRating > 0 ? Math.round((averageRating / 5) * 100) : 95;

    return [
      { 
        number: productCount > 0 ? `${productCount}+` : "500+", 
        label: "Premium Cameras" 
      },
      { 
        number: userCount > 0 ? `${userCount > 1000 ? Math.round(userCount/1000) + 'K' : userCount}+` : "50K+", 
        label: "Happy Photographers" 
      },
      { 
        number: `${satisfactionRate}%`, 
        label: "Satisfaction Rate" 
      }
    ];
  }, [productsData, usersData, reviewsData]);

  // Static hero content
  const heroData = {
    title: "Discover",
    subtitle: "Professional", 
    mainTitle: "Cameras",
    description: "Capture every moment with our collection of professional cameras. Quality, performance, and innovation in every shot.",
    productName: "Professional Cameras",
    productPrice: "৳8,500",
    productEmoji: "�"
  };

  return (
    <HeroClient 
      title={heroData.title}
      subtitle={heroData.subtitle}
      mainTitle={heroData.mainTitle}
      description={heroData.description}
      stats={heroStats}
      productName={heroData.productName}
      productPrice={heroData.productPrice}
      productEmoji={heroData.productEmoji}
    />
  );
}
