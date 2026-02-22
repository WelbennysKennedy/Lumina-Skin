import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Glassmorphism effect after 50px
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass' : 'bg-transparent'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Logo */}
            <a 
              href="#" 
              className="group flex flex-col items-start"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="font-brand-signature text-2xl sm:text-3xl lg:text-4xl text-white group-hover:opacity-90 transition-all duration-400">
                Lumina Skin
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
              <button 
                onClick={() => scrollToSection('gallery')}
                className="menu-item text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/90 hover:text-white"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="menu-item text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/90 hover:text-white"
              >
                Contact
              </button>
              <button 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#8B8B7A] transition-all duration-300"
                onClick={() => scrollToSection('gallery')}
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#8B8B7A]/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8">
          <button 
            onClick={() => scrollToSection('gallery')}
            className="font-display text-2xl sm:text-3xl tracking-[0.12em] sm:tracking-[0.15em] uppercase text-white hover:tracking-[0.25em] transition-all duration-300"
          >
            Gallery
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="font-display text-2xl sm:text-3xl tracking-[0.12em] sm:tracking-[0.15em] uppercase text-white hover:tracking-[0.25em] transition-all duration-300"
          >
            Contact
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="font-display text-2xl sm:text-3xl tracking-[0.12em] sm:tracking-[0.15em] uppercase text-white hover:tracking-[0.25em] transition-all duration-300"
          >
            Services
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
