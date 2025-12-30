import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nós | FreeGames Hub',
  description: 'Conheça o FreeGames Hub, a plataforma que reúne os melhores jogos grátis de PC, Steam, Epic Games e muito mais.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
          ← Voltar para home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6">
            Sobre o FreeGames Hub
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">🎮 Nossa Missão</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              O <strong>FreeGames Hub</strong> nasceu com uma missão simples: democratizar o acesso aos melhores jogos sem custo algum. 
              Acreditamos que todos merecem jogar títulos incríveis, independentemente do orçamento.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">🔍 O Que Fazemos</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Nós agregamos e organizamos ofertas de jogos gratuitos das principais plataformas digitais:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li><strong>Epic Games Store</strong> - Jogos AAA grátis toda semana</li>
              <li><strong>Steam</strong> - Promoções temporárias e free-to-play</li>
              <li><strong>GOG</strong> - Clássicos DRM-free</li>
              <li><strong>Itch.io</strong> - Jogos indie criativos</li>
              <li><strong>Xbox</strong> e <strong>PlayStation</strong> - Ofertas exclusivas</li>
              <li>E muito mais!</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">⚡ Por Que Somos Diferentes</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🔄 Atualização Constante</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nosso sistema sincroniza automaticamente com as fontes oficiais várias vezes ao dia.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">✅ 100% Legal</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Todos os jogos são ofertas oficiais das próprias desenvolvedoras e plataformas.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🎯 Filtros Inteligentes</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Encontre exatamente o que procura: por plataforma, tipo de conteúdo e muito mais.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🔐 Códigos Promocionais</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Detectamos e facilitamos a cópia de códigos promocionais automaticamente.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">🌟 Nossos Valores</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Transparência:</strong> Nunca escondemos nada. Todos os links redirecionam para as lojas oficiais.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Qualidade:</strong> Curamos apenas ofertas legítimas de fontes confiáveis.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              <strong>Comunidade:</strong> Construímos este site pensando em você, jogador que busca economia e diversão.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">📊 Nossa História</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Lançado em dezembro de 2024, o FreeGames Hub rapidamente se tornou referência para gamers brasileiros que buscam 
              jogos gratuitos. Com uma interface moderna, responsiva e rápida, ajudamos milhares de jogadores a descobrirem 
              novos títulos sem gastar nada.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">🤝 Contato</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Tem alguma sugestão, dúvida ou parceria em mente?
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> contato@freegameshub.com<br />
                <strong>GitHub:</strong> <a href="https://github.com/EnricoNipper/FreeGames" className="text-blue-600 hover:underline">EnricoNipper/FreeGames</a>
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">⚖️ Compromisso com a Legalidade</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              O FreeGames Hub <strong>NÃO</strong> hospeda, distribui ou promove pirataria de jogos. 
              Todas as ofertas listadas são promoções oficiais das próprias desenvolvedoras, publishers ou plataformas digitais. 
              Respeitamos os direitos autorais e incentivamos os usuários a fazerem o mesmo.
            </p>

            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold mb-3">🎮 Junte-se a Nós!</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Explore nossa coleção atualizada diariamente e nunca mais perca uma promoção de jogo grátis!
              </p>
              <Link
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Ver Jogos Disponíveis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
