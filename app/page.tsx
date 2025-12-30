import { Hero } from '@/components/Hero';
import { GamesList } from '@/components/GamesList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <GamesList />
    </div>
  );
}
