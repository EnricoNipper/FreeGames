'use client';

import Image from 'next/image';
import { Sparkles, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      {/* Padrão de fundo animado */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-semibold">
              Atualizado diariamente
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Jogos Grátis Para PC
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
              Economize Milhares
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Descubra jogos AAA grátis da Epic Games, Steam, GOG e muito mais.
            <br />
            <span className="font-semibold">Sem pegadinhas. 100% Legal.</span>
          </p>

          {/* Estatísticas */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-black mb-1">500+</div>
              <div className="text-sm text-blue-200">Jogos Rastreados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-1">R$ 0</div>
              <div className="text-sm text-blue-200">Investimento</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-3xl font-black mb-1">
                <TrendingUp className="w-8 h-8" />
                100%
              </div>
              <div className="text-sm text-blue-200">Grátis Sempre</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#jogos"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Ver Jogos Grátis Agora
            </a>
            <a
              href="#plataformas"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg font-bold text-lg hover:bg-white/20 transition-all duration-200"
            >
              Escolher Plataforma
            </a>
          </div>
        </div>
      </div>

      {/* Decoração inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 45C480 50 600 40 720 35C840 30 960 30 1080 35C1200 40 1320 50 1380 55L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="currentColor"
            className="text-white dark:text-gray-900"
          />
        </svg>
      </div>
    </div>
  );
}
