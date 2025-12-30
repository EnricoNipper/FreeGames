import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | FreeGames Hub',
  description: 'Política de Privacidade do FreeGames Hub. Saiba como coletamos, usamos e protegemos seus dados.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
          ← Voltar para home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Última atualização: 30 de dezembro de 2024
          </p>

          <div className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Introdução
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                O <strong>FreeGames Hub</strong> ("nós", "nosso" ou "site") está comprometido em proteger sua privacidade. 
                Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando 
                você visita nosso site <strong>freegameshub-eight.vercel.app</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Informações que Coletamos
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                2.1 Informações Coletadas Automaticamente
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Quando você acessa nosso site, podemos coletar automaticamente:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Endereço IP</li>
                <li>Tipo de navegador</li>
                <li>Sistema operacional</li>
                <li>Páginas visitadas</li>
                <li>Tempo de permanência</li>
                <li>Referências de sites externos</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                2.2 Cookies e Tecnologias Similares
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego do site e 
                personalizar conteúdo. Você pode configurar seu navegador para recusar cookies, mas isso pode limitar 
                algumas funcionalidades do site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Como Usamos Suas Informações
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Usamos as informações coletadas para:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Analisar o uso do site e tendências</li>
                <li>Personalizar sua experiência</li>
                <li>Prevenir fraudes e abusos</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Google AdSense
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Este site usa o <strong>Google AdSense</strong> para exibir anúncios. O Google usa cookies para veicular 
                anúncios baseados em suas visitas anteriores a este site e outros sites na web.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Você pode desativar anúncios personalizados visitando as 
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" className="text-blue-600 hover:underline ml-1">
                  Configurações de Anúncios do Google
                </a>.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Para mais informações sobre como o Google coleta e processa dados, consulte a 
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener" className="text-blue-600 hover:underline ml-1">
                  Política de Privacidade do Google
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Links Externos
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Nosso site contém links para sites de terceiros (como Steam, Epic Games, GOG, etc.). 
                Não somos responsáveis pelas práticas de privacidade desses sites. Recomendamos que você leia as 
                políticas de privacidade de cada site que visitar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Segurança dos Dados
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Implementamos medidas de segurança apropriadas para proteger suas informações contra acesso não autorizado, 
                alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet é 100% seguro.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Seus Direitos (LGPD - Brasil)
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Confirmar se processamos seus dados</li>
                <li>Acessar seus dados</li>
                <li>Corrigir dados incompletos ou imprecisos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar seu consentimento</li>
                <li>Portar seus dados a outro fornecedor</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                Para exercer esses direitos, entre em contato conosco em: <strong>contato@freegameshub.com</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Menores de Idade
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Nosso site não é direcionado a menores de 13 anos. Não coletamos intencionalmente informações de crianças. 
                Se você acredita que coletamos dados de um menor, entre em contato imediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Alterações nesta Política
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos que você revise esta página 
                regularmente. As alterações entram em vigor imediatamente após a publicação.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                10. Contato
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> contato@freegameshub.com<br />
                  <strong>Site:</strong> freegameshub-eight.vercel.app
                </p>
              </div>
            </section>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Resumo:</strong> Respeitamos sua privacidade. Coletamos apenas dados essenciais para melhorar 
                sua experiência. Você tem total controle sobre suas informações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
