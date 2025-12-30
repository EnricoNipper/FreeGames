import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ExternalLink, Tag, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import GameInstructions from '@/components/GameInstructions';

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await prisma.game.findUnique({
    where: { id },
  });

  if (!game) {
    notFound();
  }

  const imageUrl = game.image || game.thumbnail || '/placeholder-game.jpg';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
        >
          ← Voltar para home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Imagem */}
          <div className="relative h-96">
            <Image
              src={imageUrl}
              alt={game.title}
              fill
              className="object-cover"
              priority
            />
            {game.isHot && (
              <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                POPULAR
              </div>
            )}
          </div>

          {/* Conteúdo */}
          <div className="p-8">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              {game.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Tag className="w-4 h-4" />
                {game.platform}
              </div>
              {game.endDate && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  Expira{' '}
                  {formatDistanceToNow(new Date(game.endDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </div>
              )}
            </div>

            {game.description && (
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {game.description}
              </p>
            )}

            {/* Instruções e Códigos Promocionais */}
            {game.instructions && (
              <GameInstructions 
                instructions={game.instructions} 
                description={game.description}
              />
            )}

            {/* Se não houver instruções mas houver descrição com códigos, mostrar também */}
            {!game.instructions && game.description && (
              <GameInstructions 
                instructions="Veja os códigos acima na descrição." 
                description={game.description}
              />
            )}

            <div className="flex items-center gap-4 mb-8">
              {game.worth && (
                <span className="text-gray-500 line-through">{game.worth}</span>
              )}
              <span className="text-3xl font-black text-green-600">GRÁTIS</span>
            </div>

            <a
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-lg',
                'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
                'text-white shadow-lg hover:shadow-xl transition-all'
              )}
            >
              <ExternalLink className="w-5 h-5" />
              PEGAR GRÁTIS AGORA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
