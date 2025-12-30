'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ExternalLink, TrendingUp, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Game {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  thumbnail: string | null;
  platform: string;
  priceOriginal: number;
  priceCurrent: number;
  url: string;
  endDate: Date | null;
  isHot: boolean;
  worth: string | null;
  instructions: string | null;
}

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const imageUrl = game.thumbnail || game.image || '/placeholder-game.jpg';
  const hasPromoCode = game.instructions?.toLowerCase().includes('code') || 
                       game.instructions?.toLowerCase().includes('key') ||
                       game.instructions?.toLowerCase().includes('código');
  
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Badge de Destaque */}
      {game.isHot && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <TrendingUp className="w-3 h-3" />
          POPULAR
        </div>
      )}

      {/* Badge de Código Promocional */}
      {hasPromoCode && (
        <div className="absolute top-12 left-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Tag className="w-3 h-3" />
          CÓDIGO
        </div>
      )}

      {/* Badge de Plataforma */}
      <div className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
        {game.platform}
      </div>

      {/* Imagem */}
      <Link href={`/jogo/${game.id}`} className="block relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Image
          src={imageUrl}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay no hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Título */}
        <Link href={`/jogo/${game.id}`}>
          <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {game.title}
          </h3>
        </Link>

        {/* Descrição */}
        {game.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {game.description}
          </p>
        )}

        {/* Preço */}
        <div className="flex items-center gap-2 mb-3">
          {game.worth && (
            <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
              {game.worth}
            </span>
          )}
          <span className="text-2xl font-black text-green-600 dark:text-green-400">
            GRÁTIS
          </span>
        </div>

        {/* Data de Expiração */}
        {game.endDate && (
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <Calendar className="w-3 h-3" />
            <span>
              Expira{' '}
              {formatDistanceToNow(new Date(game.endDate), {
                addSuffix: true,
                locale: ptBR,
              })}
            </span>
          </div>
        )}

        {/* Botão de Ação */}
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-sm transition-all duration-200",
            "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
            "text-white shadow-lg hover:shadow-xl active:scale-95"
          )}
        >
          <ExternalLink className="w-4 h-4" />
          PEGAR GRÁTIS AGORA
        </a>
      </div>
    </div>
  );
}
