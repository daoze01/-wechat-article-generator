'use client';

import { useEffect } from 'react';

interface SidebarAdProps {
  slot: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function SidebarAd({ slot, className = '' }: SidebarAdProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`sidebar-ad ${className}`}>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="text-center text-sm text-gray-500 mb-3">推广</div>
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block',
            width: '300px',
            height: '250px'
          }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // 替换为您的AdSense发布商ID
          data-ad-slot={slot}
          data-ad-format="rectangle"
        />
      </div>
    </div>
  );
} 