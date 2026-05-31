import { useState } from 'react';
//import { Navigation } from './components/Navigation';
//import { HeroSection } from './components/HeroSection';
import { GuestbookSection } from './components/GuestbookSection';
import { GuestbookFormModal } from './components/GuestbookFormModal';

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
    <div className="min-h-screen bg-slate-900">
        <div className="text-center pt-10">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-full hover:bg-amber-400"
            >
            방명록 작성하기
            </button>
        </div>

        {/*<Navigation />
        <HeroSection />*/}
        <GuestbookSection />

        <GuestbookFormModal 
            open={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
        />
    </div>
  );
}
