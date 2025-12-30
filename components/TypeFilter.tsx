'use client';

import { cn } from '@/lib/utils';

const types = [
  { id: 'all', name: 'Todos', icon: '🎮', description: 'Jogos, DLCs e mais' },
  { id: 'Game', name: 'Jogos Completos', icon: '🎯', description: 'Jogos completos grátis' },
  { id: 'DLC', name: 'DLCs', icon: '📦', description: 'Conteúdo adicional' },
  { id: 'Early Access', name: 'Early Access', icon: '🚀', description: 'Acesso antecipado' },
  { id: 'Other', name: 'Outros', icon: '✨', description: 'Itens, Loot e mais' },
];

interface TypeFilterProps {
  selected: string;
  onSelect: (type: string) => void;
}

export function TypeFilter({ selected, onSelect }: TypeFilterProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 py-6 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <span className="text-xl">🎨</span>
          Filtrar por Tipo de Conteúdo
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all duration-200 border-2',
                selected === type.id
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white border-purple-400 shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:shadow-md'
              )}
            >
              <span className="text-3xl">{type.icon}</span>
              <span className="font-bold text-center leading-tight">{type.name}</span>
              <span className={cn(
                "text-xs text-center leading-tight",
                selected === type.id
                  ? "text-purple-100"
                  : "text-gray-500 dark:text-gray-400"
              )}>
                {type.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
