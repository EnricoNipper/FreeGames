import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Interface para a resposta da API GamerPower
interface GamerPowerGame {
  id: number;
  title: string;
  worth: string;
  thumbnail: string;
  image: string;
  description: string;
  instructions: string;
  open_giveaway_url: string;
  published_date: string;
  type: string;
  platforms: string;
  end_date: string;
  users: number;
  status: string;
  gamerpower_url: string;
  open_giveaway: string;
}

export async function POST(request: Request) {
  try {
    // Proteção: apenas requisições autenticadas podem executar o CRON
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log('🎮 Iniciando sincronização de jogos grátis...');

    // 1. Buscar dados da API GamerPower
    const res = await fetch('https://www.gamerpower.com/api/giveaways', {
      next: { revalidate: 0 } // Não cachear
    });

    if (!res.ok) {
      throw new Error(`GamerPower API retornou: ${res.status}`);
    }

    const data: GamerPowerGame[] = await res.json();
    console.log(`📦 Encontrados ${data.length} jogos na API`);

    // 2. Processar e salvar no banco
    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const game of data) {
      try {
        // Aceitar todos os tipos agora (Game, DLC, Loot, etc)
        // Não vamos mais pular nenhum tipo
        
        // Extrair preço original
        const priceOriginal = parseFloat(game.worth.replace(/[^0-9.]/g, '')) || 0;

        // Determinar data de expiração
        let endDate: Date | null = null;
        if (game.end_date && game.end_date !== 'N/A') {
          endDate = new Date(game.end_date);
        }

        // Upsert (cria ou atualiza)
        const result = await prisma.game.upsert({
          where: { 
            externalId: game.id.toString() 
          },
          update: {
            title: game.title,
            description: game.description,
            image: game.image,
            thumbnail: game.thumbnail,
            platform: game.platforms,
            url: game.open_giveaway_url, // Aqui você pode interceptar para afiliados
            endDate: endDate,
            status: game.status === 'Active' ? 'Active' : 'Expired',
            worth: game.worth,
            instructions: game.instructions,
            type: game.type, // Salvar o tipo (Game, DLC, Loot, etc)
            updatedAt: new Date(),
          },
          create: {
            externalId: game.id.toString(),
            title: game.title,
            description: game.description,
            image: game.image,
            thumbnail: game.thumbnail,
            platform: game.platforms,
            priceOriginal: priceOriginal,
            priceCurrent: 0, // É grátis
            url: game.open_giveaway_url,
            endDate: endDate,
            status: game.status === 'Active' ? 'Active' : 'Expired',
            worth: game.worth,
            instructions: game.instructions,
            type: game.type, // Salvar o tipo (Game, DLC, Loot, etc)
            isHot: game.users > 500, // Marca como destaque se tem muitos usuários interessados
          },
        });

        if (result.createdAt.getTime() === result.updatedAt.getTime()) {
          created++;
        } else {
          updated++;
        }

      } catch (error) {
        console.error(`Erro ao processar jogo "${game.title}":`, error);
      }
    }

    // 3. Marcar jogos expirados que não vieram na API
    const expiredCount = await prisma.game.updateMany({
      where: {
        status: 'Active',
        endDate: {
          lt: new Date()
        }
      },
      data: {
        status: 'Expired'
      }
    });

    console.log('✅ Sincronização completa!');
    console.log(`   Criados: ${created}`);
    console.log(`   Atualizados: ${updated}`);
    console.log(`   Ignorados: ${skipped}`);
    console.log(`   Expirados: ${expiredCount.count}`);

    return NextResponse.json({
      success: true,
      stats: {
        created,
        updated,
        skipped,
        expired: expiredCount.count,
        total: data.length
      }
    });

  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

// Permitir GET também (mais fácil para testes)
export async function GET(request: Request) {
  return POST(request);
}
