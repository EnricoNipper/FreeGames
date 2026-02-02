'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

export function AdSense({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = '' 
}: AdSenseProps) {
  useEffect(() => {
    try {

      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`adsense-wrapper ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}

// Componentes específicos para facilitar o uso
export function AdSenseBannerTop() {
  return (
    <AdSense 
      slot="1545669198" 
      format="auto"
      className="mb-6"
    />
  );
}

export function AdSenseRectangle() {
  return (
    <AdSense 
      slot="6618467249" 
      format="rectangle"
      responsive={false}
      className="my-6"
    />
  );
}

export function AdSenseInFeed() {
  return (
    <AdSense 
      slot="1545669198" 
      format="auto"
      className="my-8"
    />
  );
}

export function AdSenseSidebar() {
  return (
    <div className="sticky top-4">
      <AdSense 
        slot="1545669198" 
        format="vertical"
        responsive={false}
        className="mb-6"
      />
    </div>
  );
}
