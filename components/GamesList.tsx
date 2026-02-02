'use client';

import { useState, useEffect } from 'react';
import { GameCard } from './GameCard';
import { PlatformFilter } from './PlatformFilter';
import { TypeFilter } from './TypeFilter';
import { Loader2 } from 'lucide-react';

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
  type: string;
}

export function GamesList() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchGames();
  }, [selectedPlatform, selectedType]);

  const fetchGames = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        platform: selectedPlatform,
        type: selectedType,
        limit: '50',
      });
      
      const response = await fetch(`/api/games?${params}`);
      const data = await response.json();
      setGames(data.games || []);
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PlatformFilter 
        selected={selectedPlatform} 
        onSelect={setSelectedPlatform} 
      />
      
      <TypeFilter 
        selected={selectedType} 
        onSelect={setSelectedType} 
      />

      <section id="jogos" className="py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Carregando jogos incríveis...
            </p>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Nenhum jogo encontrado para esta plataforma.
              <br />
              Tente selecionar outra plataforma!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {games.length} Jogos Grátis Disponíveis
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
