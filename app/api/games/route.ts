import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Construir filtros
    const where: any = {
      status: 'Active',
    };

    // SQLite não suporta 'mode: insensitive' nativamente
    // Vamos buscar todos os jogos ativos e filtrar em memória se necessário
    if (platform && platform !== 'all') {
      // Para SQLite, usar contains direto (case-sensitive)
      // Se não funcionar, vamos filtrar depois
      where.platform = {
        contains: platform
      };
    }

    // Filtro por tipo
    if (type && type !== 'all') {
      where.type = type;
    }

    // Buscar jogos ativos
    const games = await prisma.game.findMany({
      where,
      orderBy: [
        { isHot: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit,
      skip: offset,
    });

    // Contar total para paginação
    const total = await prisma.game.count({ where });

    return NextResponse.json({
      games,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });

  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar jogos' },
      { status: 500 }
    );
  }
}
