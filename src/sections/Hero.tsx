import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#8B8B7A]"
    >
      {/* Diagonal decorative line */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="0"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          className={`transition-all duration-1500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            strokeDasharray: '2000',
            strokeDashoffset: isLoaded ? '0' : '2000',
            transition: 'stroke-dashoffset 1.5s var(--ease-expo-out), opacity 0.8s'
          }}
        />
      </svg>

      <div className="relative z-20 w-full min-h-screen px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-8rem)]">
          
          {/* Left Column - Title & CTA */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
            {/* Main Title */}
            <div className="overflow-hidden mb-1 sm:mb-2">
              <h1 
                className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light tracking-wide leading-none transition-all duration-800 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.6s' }}
              >
                CHOOSE
              </h1>
            </div>
            <div className="overflow-hidden mb-1 sm:mb-2">
              <h1 
                className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light tracking-wide leading-none transition-all duration-800 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.7s' }}
              >
                YOUR
              </h1>
            </div>
            <div className="overflow-hidden mb-4 sm:mb-6">
              <h1 
                className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light tracking-wide leading-none transition-all duration-800 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.8s' }}
              >
                NEW LOOK
              </h1>
            </div>

            {/* CTA Button */}
            <div 
              className={`mb-8 lg:mb-12 transition-all duration-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '1s' }}
            >
              <button 
                onClick={scrollToContact}
                className="group relative inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/90 hover:text-white transition-all duration-300"
              >
                <span className="relative">
                  MAKE APPOINTMENT
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white/60 group-hover:w-[120%] transition-all duration-300" />
                </span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </button>
            </div>

            {/* Social Links */}
            <div 
              className={`flex items-center justify-center lg:justify-start gap-4 sm:gap-6 transition-all duration-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '1.2s' }}
            >
              {['Instagram', 'Facebook', 'Youtube'].map((social, index) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] text-white/60 hover:text-white transition-all duration-300 hover:tracking-[0.2em]"
                  style={{ transitionDelay: `${1.2 + index * 0.08}s` }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Center Column - Main Image */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 px-4 sm:px-0">
            <div 
              className={`relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transition-all duration-1000 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ 
                transitionTimingFunction: 'var(--ease-expo-out)', 
                transitionDelay: '0.2s'
              }}
            >
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B8B7A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-sm" />
                <img
                  src="/images/hero-turtle.jpg"
                  alt="Beauty portrait with turtle"
                  className="w-full h-auto object-cover rounded-sm shadow-2xl group-hover:scale-[1.02] group-hover:brightness-110 transition-all duration-600"
                  style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                />
                {/* Decorative frame corners */}
                <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-6 sm:w-8 h-6 sm:h-8 border-t border-l border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-6 sm:w-8 h-6 sm:h-8 border-t border-r border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 w-6 sm:w-8 h-6 sm:h-8 border-b border-l border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-6 sm:w-8 h-6 sm:h-8 border-b border-r border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          {/* Right Column - Secondary Content */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center order-3">
            {/* Be Part of Art Text */}
            <div 
              className={`mb-4 sm:mb-6 text-center lg:text-right transition-all duration-800 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '1.1s' }}
            >
              <p className="font-display text-base sm:text-lg lg:text-xl text-white/80 tracking-[0.15em] sm:tracking-[0.2em]">
                BE PART OF ART
              </p>
            </div>

            {/* Secondary Image */}
            <div 
              className={`relative mb-4 sm:mb-6 transition-all duration-800 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.9s' }}
            >
              <div className="group cursor-pointer overflow-hidden rounded-sm">
                <img
                  src="/images/hero-mask.jpg"
                  alt="Beauty treatment"
                  className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-cover shadow-xl group-hover:scale-110 transition-transform duration-500"
                  style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8B8B7A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* See All Link */}
            <div 
              className={`transition-all duration-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '1.3s' }}
            >
              <button 
                onClick={scrollToGallery}
                className="group flex items-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-white/70 hover:text-white transition-all duration-300"
              >
                <span>See All</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-[#8B8B7A] to-transparent pointer-events-none z-30" />
    </section>
  );
};

export default Hero;
