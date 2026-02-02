import { Hero } from '@/components/Hero';
import { GamesList } from '@/components/GamesList';
import { AdSenseBannerTop, AdSenseSidebar } from '@/components/AdSense';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <div className="container mx-auto px-4 py-6">
        <AdSenseBannerTop />
      </div>
      
      {/* Layout com sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar esquerda - Desktop only */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <AdSenseSidebar />
          </aside>
          
          {/* Conteúdo principal */}
          <div className="flex-1 min-w-0">
            <GamesList />
          </div>
          
          {/* Sidebar direita - Desktop only */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <AdSenseSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
