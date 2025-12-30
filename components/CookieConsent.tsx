'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Verificar se já deu consentimento
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    // Aceitar todos os cookies
    localStorage.setItem('cookie-consent', 'all');
    
    // Google Consent Mode v2
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }
    
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    // Rejeitar cookies não essenciais
    localStorage.setItem('cookie-consent', 'rejected');
    
    // Google Consent Mode v2
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      });
    }
    
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowDetails(true);
  };

  const handleSavePreferences = (preferences: {
    analytics: boolean;
    ads: boolean;
    personalization: boolean;
  }) => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    
    // Google Consent Mode v2
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        ad_storage: preferences.ads ? 'granted' : 'denied',
        ad_user_data: preferences.ads ? 'granted' : 'denied',
        ad_personalization: preferences.personalization ? 'granted' : 'denied',
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
      });
    }
    
    setShowBanner(false);
    setShowDetails(false);
  };

  if (!showBanner) return null;

  if (showDetails) {
    return <DetailedConsentModal onSave={handleSavePreferences} onClose={() => setShowDetails(false)} />;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t-2 border-blue-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              🍪 Cookies e Privacidade
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Usamos cookies para melhorar sua experiência, personalizar anúncios e analisar o tráfego. 
              Ao clicar em "Consentir", você aceita o uso de todos os cookies. 
              <a href="/privacidade" className="text-blue-600 hover:underline ml-1">
                Saiba mais
              </a>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Não Consentir
            </button>
            <button
              onClick={handleCustomize}
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              Gerenciar Opções
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg transition-all"
            >
              Consentir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailedConsentModal({ 
  onSave, 
  onClose 
}: { 
  onSave: (preferences: any) => void;
  onClose: () => void;
}) {
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);
  const [personalization, setPersonalization] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gerenciar Preferências de Cookies
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Essenciais (sempre ativos) */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Cookies Essenciais
              </h3>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                Sempre Ativos
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Necessários para o funcionamento básico do site. Incluem navegação, segurança e preferências de idioma.
            </p>
          </div>

          {/* Analytics */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Cookies Analíticos
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Coletam dados sobre como você usa o site para nos ajudar a melhorar a experiência. Não identificamos você pessoalmente.
            </p>
          </div>

          {/* Publicidade */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Cookies de Publicidade
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={ads}
                  onChange={(e) => setAds(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Utilizados pelo Google AdSense para exibir anúncios. Ajudam a manter o site gratuito.
            </p>
          </div>

          {/* Personalização */}
          <div className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Cookies de Personalização
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={personalization}
                  onChange={(e) => setPersonalization(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Permitem exibir anúncios relevantes aos seus interesses e melhorar sua experiência personalizada.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave({ analytics, ads, personalization })}
            className="flex-1 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow-lg transition-all"
          >
            Salvar Preferências
          </button>
        </div>
      </div>
    </div>
  );
}
