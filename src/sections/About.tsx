import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-32 bg-[#8B8B7A] overflow-hidden"
    >
      {/* Diagonal background accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(165deg, transparent 50%, rgba(122,122,106,0.3) 50%)'
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            {/* Headline */}
            <div className="overflow-hidden mb-4 sm:mb-6">
              <h2 
                className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight transition-all duration-800 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
              >
                BEAUTY IS AN
              </h2>
            </div>
            <div className="overflow-hidden mb-6 sm:mb-8">
              <h2 
                className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight transition-all duration-800 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.1s' }}
              >
                ART FORM
              </h2>
            </div>

            {/* Subheadline */}
            <div 
              className={`mb-4 sm:mb-6 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.3s' }}
            >
              <p className="font-display text-lg sm:text-xl lg:text-2xl text-white/80 italic">
                We don't just apply makeup. We create masterpieces.
              </p>
            </div>

            {/* Body text */}
            <div 
              className={`mb-8 sm:mb-10 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.5s' }}
            >
              <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg">
                Every face is a canvas, every brushstroke a deliberate choice. Our artists blend 
                technique with intuition to reveal your unique essence. With years of experience 
                in editorial, bridal, and avant-garde makeup, we transform your vision into reality.
              </p>
            </div>

            {/* CTA Button */}
            <div 
              className={`transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.7s' }}
            >
              <button className="group btn-elegant inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </button>
            </div>

            {/* Stats */}
            <div 
              className={`grid grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-16 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.9s' }}
            >
              {[
                { number: '15+', label: 'Years Experience' },
                { number: '5000+', label: 'Happy Clients' },
                { number: '50+', label: 'Awards Won' }
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="font-display text-2xl sm:text-3xl lg:text-4xl text-white mb-1">{stat.number}</div>
                  <div className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] text-white/60 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2">
            <div 
              className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.4s' }}
            >
              <div className="relative group">
                {/* Decorative frame */}
                <div className="absolute -inset-3 sm:-inset-4 border border-white/20 rounded-sm transition-all duration-500 group-hover:border-white/40" />
                
                {/* Main image */}
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={`${import.meta.env.BASE_URL}images/mekup 8.webp`}
                    alt="Makeup artistry"
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B8B7A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating accent */}
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-white/10 rounded-sm backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all duration-500">
                  <span className="font-display text-2xl sm:text-3xl lg:text-4xl text-white/80">✦</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
