import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const game = await prisma.game.findUnique({
      where: { id }
    });

    if (!game) {
      return NextResponse.json(
        { error: 'Jogo não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(game);

  } catch (error) {
    console.error('Erro ao buscar jogo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar jogo' },
      { status: 500 }
    );
  }
}
