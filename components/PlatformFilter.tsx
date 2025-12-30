'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const platforms = [
  { id: 'all', name: 'Todas', icon: '🎮' },
  { id: 'PC', name: 'PC', icon: '💻' },
  { id: 'Steam', name: 'Steam', icon: '🎯' },
  { id: 'Epic Games Store', name: 'Epic Games', icon: '🎪' },
  { id: 'Itch.io', name: 'Itch.io', icon: '🎲' },
  { id: 'Xbox', name: 'Xbox', icon: '🎮' },
  { id: 'PlayStation', name: 'PlayStation', icon: '🎮' },
  { id: 'Nintendo Switch', name: 'Switch', icon: '🕹️' },
  { id: 'Android', name: 'Android', icon: '📱' },
  { id: 'iOS', name: 'iOS', icon: '🍎' },
  { id: 'VR', name: 'VR', icon: '🥽' },
];

interface PlatformFilterProps {
  selected: string;
  onSelect: (platform: string) => void;
}

export function PlatformFilter({ selected, onSelect }: PlatformFilterProps) {
  return (
    <div id="plataformas" className="bg-white dark:bg-gray-800 py-8 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Filtrar por Plataforma
        </h2>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => onSelect(platform.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-200',
                selected === platform.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              <span className="text-lg">{platform.icon}</span>
              {platform.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
