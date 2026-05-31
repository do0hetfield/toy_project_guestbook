import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { GuestbookSection } from './components/GuestbookSection';

export default function App() {
    return (
    <div className="min-h-screen bg-slate-900">
        <Navigation />
        <HeroSection />
        <GuestbookSection />
    </div>
  );
}
