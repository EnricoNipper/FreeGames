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
      console.log('🔵 AdSense: Tentando carregar anúncio', { slot, format });
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log('✅ AdSense: Push executado com sucesso');
    } catch (err) {
      console.error('❌ AdSense error:', err);
    }
  }, [slot, format]);

  return (
    <div className={`adsense-wrapper ${className}`}>
      {/* Debug info */}
      <div className="text-xs text-gray-400 mb-1">
        📢 AdSense
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '100px', background: '#f0f0f0' }}
        data-ad-client="ca-pub-6749640246497731"
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
