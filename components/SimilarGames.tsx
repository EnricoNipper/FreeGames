'use client';

import { GameCard } from './GameCard';

interface SimilarGamesProps {
  currentGameId: string;
  platform: string;
  type: string;
}

export function SimilarGames({ currentGameId, platform, type }: SimilarGamesProps) {
  const [games, setGames] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchSimilar() {
      try {
        const response = await fetch(
          `/api/games?platform=${platform}&type=${type}&limit=4&exclude=${currentGameId}`
        );
        const data = await response.json();
        setGames(data.games || []);
      } catch (error) {
        console.error('Erro ao buscar jogos similares:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSimilar();
  }, [currentGameId, platform, type]);

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">🎮 Jogos Similares</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800 rounded-lg h-80 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (games.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">
        🎮 Jogos Similares que Você Pode Gostar
      </h2>
      <p className="text-gray-400 mb-6">
        Outros jogos grátis disponíveis na mesma plataforma
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game: any) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

import * as React from 'react';
