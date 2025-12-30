import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, ExternalLink, Tag, TrendingUp, Clock, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import GameInstructions from '@/components/GameInstructions';
import { SimilarGames } from '@/components/SimilarGames';
import { AdSenseBannerTop, AdSenseRectangle, AdSenseInFeed } from '@/components/AdSense';

// Metadados dinâmicos para SEO avançado
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const game = await prisma.game.findUnique({
    where: { id },
  });

  if (!game) {
    return {
      title: 'Jogo não encontrado | FreeGames Hub',
    };
  }

  const description = game.description 
    ? `${game.description.slice(0, 155)}...`
    : `Pegue ${game.title} GRÁTIS na ${game.platform}!`;

  return {
    title: `${game.title} - Grátis | FreeGames Hub`,
    description,
    keywords: [game.title, 'jogo grátis', game.platform, (game as any).type || 'Game'].join(', '),
    openGraph: {
      title: `🎮 ${game.title} - GRÁTIS!`,
      description,
      images: [{ url: game.image || '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

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

  // JSON-LD Schema.org
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description || `Jogo grátis na ${game.platform}`,
    image: game.image,
    gamePlatform: game.platform.split(',').map(p => p.trim()),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: game.url,
    },
  };

  // Conteúdo rico para SEO
  const richContent = `
    ${game.title} está disponível GRATUITAMENTE! 
    ${game.description || ''} 
    
    Como resgatar:
    1. Clique em "PEGAR GRÁTIS"
    2. Faça login na ${game.platform}
    3. Confirme o resgate
    4. Pronto! Jogue quando quiser
    
    Por que aproveitar?
    • 100% Gratuito
    • Fica para sempre
    • Fácil e rápido
  `.trim();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
            ← Voltar
          </Link>

          {/* Banner AdSense Topo */}
          <div className="hidden md:flex justify-center mb-8">
            <AdSenseBannerTop />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-96">
                  <Image src={imageUrl} alt={game.title} fill className="object-cover" priority />
                  {game.isHot && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      POPULAR
                    </div>
                  )}
                </div>

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

                  {/* AdSense In-Feed */}
                  <div className="my-8">
                    <AdSenseInFeed />
                  </div>

                  {/* Conteúdo Rico */}
                  <div className="prose dark:prose-invert max-w-none mb-8">
                    <h2 className="text-2xl font-bold mb-4">Sobre {game.title}</h2>
                    <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {richContent}
                    </div>
                  </div>

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

              {/* Jogos Similares */}
              <SimilarGames currentGameId={game.id} platform={game.platform} type={(game as any).type || 'Game'} />
            </div>

            {/* Sidebar AdSense */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                  <p className="text-xs text-gray-500 mb-2 text-center">Publicidade</p>
                  <AdSenseRectangle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
