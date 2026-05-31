// src/app/components/HeroSection.jsx
import { motion } from 'motion/react'; 
import { useState } from 'react';
import { GuestbookFormModal } from './GuestbookFormModal';

export function HeroSection() {
  const [open, setOpen] = useState(false); 

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1550379964-cc8e907256a1?q=80&w=1080"
          alt="Hogwarts Castle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-800/40 to-slate-900/80" />
      </div>

      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300 rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 
            className="text-6xl md:text-8xl mb-6 font-bold"
            style={{ 
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Magical Guestbook
          </h1>
          
          <p className="text-lg text-amber-200/80 mb-12 italic" style={{ fontFamily: 'Georgia, serif' }}>
            "I solemnly swear I am up to no good..."
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="px-8 py-4 border-2 border-amber-500 text-amber-200 hover:bg-amber-500 hover:text-slate-900 font-bold transition-all duration-300 rounded-full"
          >
            방명록 작성
          </motion.button>
          
          <GuestbookFormModal open={open} onClose={() => setOpen(false)} />
        </motion.div>
      </div>
    </section>
  );
}
