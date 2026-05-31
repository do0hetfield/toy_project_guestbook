import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function Navigation() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: '홈', href: '#hero' },
        { name: '방명록', href: '#guestbook' }
    ];

    return (
        <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
            scrolled 
            ? 'bg-slate-900/90 backdrop-blur-md shadow-2xl' 
            : 'bg-slate-800/40 backdrop-blur-sm'
        } border border-amber-500/30 rounded-full px-8 py-3`}
        >
        <ul className="flex space-x-8">
            {navItems.map((item) => (
            <li key={item.name}>
                <a
                href={item.href}
                className="text-amber-200 hover:text-white transition-colors duration-300 font-bold"
                style={{ fontFamily: 'Georgia, serif' }}
                >
                {item.name}
                </a>
            </li>
            ))}
        </ul>
        </motion.nav>
    );
}
