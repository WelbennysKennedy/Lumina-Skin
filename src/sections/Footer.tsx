import { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative w-full py-12 sm:py-16 lg:py-24 bg-[#7A7A6A] overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 20s ease infinite'
          }}
        />
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div 
            className={`mb-4 sm:mb-6 transition-all duration-600 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group"
            >
              <span className="font-brand-signature text-3xl sm:text-4xl lg:text-5xl text-white group-hover:opacity-90 transition-all duration-400">
                Lumina Skin
              </span>
            </a>
          </div>

          {/* Tagline */}
          <div 
            className={`mb-6 sm:mb-10 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.2s' }}
          >
            <p className="font-display text-base sm:text-xl text-white/70 italic">
              Where beauty becomes art
            </p>
          </div>

          {/* Navigation */}
          <nav 
            className={`flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 mb-6 sm:mb-10 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.4s' }}
          >
            {[
              { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
              { label: 'Gallery', action: () => scrollToSection('gallery') },
              { label: 'Services', action: () => scrollToSection('services') },
              { label: 'Contact', action: () => scrollToSection('contact') }
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="relative text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase text-white/60 hover:text-white transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Social Icons */}
          <div 
            className={`flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.6s' }}
          >
            {[
              { icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Instagram', href: 'https://instagram.com' },
              { icon: <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Facebook', href: 'https://facebook.com' },
              { icon: <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Youtube', href: 'https://youtube.com' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#7A7A6A] hover:border-white hover:scale-110 hover:rotate-6 transition-all duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 sm:w-24 h-px bg-white/20 mx-auto mb-6 sm:mb-8" />

          {/* Copyright */}
          <div 
            className={`transition-all duration-600 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.8s' }}
          >
            <p className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] text-white/40">
              © 2024 <span className="font-brand-signature text-sm sm:text-base align-middle">Lumina Skin</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
