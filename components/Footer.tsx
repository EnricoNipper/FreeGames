'use client';

import Link from 'next/link';
import { Gamepad2, Heart, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-black text-xl text-white">
                  FreeGames Hub
                </div>
              </div>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              O melhor agregador de jogos grátis do Brasil. Encontre jogos AAA, indie e muito mais, totalmente grátis e legal.
              Atualizado diariamente com as melhores ofertas.
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              Feito com <Heart className="w-4 h-4 text-red-500 mx-1" /> para gamers
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-blue-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-blue-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacidade" className="hover:text-blue-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-blue-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FreeGames Hub. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="mailto:contato@freegameshub.com"
              className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
