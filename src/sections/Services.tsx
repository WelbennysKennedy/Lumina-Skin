import { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart, GraduationCap, ArrowRight } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  image: string;
}

const services: Service[] = [
  {
    icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: 'EDITORIAL MAKEUP',
    description: 'High-fashion looks for photoshoots, runway, and campaigns. Bold, artistic, unforgettable.',
    price: 'From $250',
    image: '/images/service 1.jpeg'
  },
  {
    icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: 'BRIDAL BEAUTY',
    description: 'Your perfect look for the most important day. Elegant, timeless, radiant.',
    price: 'From $400',
    image: '/images/mekup 7.png'
  },
  {
    icon: <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: 'MASTER CLASSES',
    description: 'Learn techniques from industry professionals. Elevate your skills.',
    price: 'From $150',
    image: '/images/mekup 8.png'
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="relative w-full py-16 sm:py-20 lg:py-32 bg-[#7A7A6A] overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-24">
          <div className="overflow-hidden mb-3 sm:mb-4">
            <h2 
              className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light transition-all duration-800 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              OUR SERVICES
            </h2>
          </div>
          <div 
            className={`transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.2s' }}
          >
            <p className="text-white/60 tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase">
              Every look tells a story
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative h-full transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionTimingFunction: 'var(--ease-expo-out)', 
                transitionDelay: `${0.3 + index * 0.15}s` 
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`relative h-full overflow-hidden rounded-sm bg-white/5 border border-white/10 p-6 sm:p-8 lg:p-10 transition-all duration-500 ${
                  hoveredIndex === index ? 'bg-white/10 border-white/30 scale-[1.02]' : ''
                } ${hoveredIndex !== null && hoveredIndex !== index ? 'scale-[0.98] opacity-70' : ''}`}
                style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
              >
                {/* Service Image */}
                <div className="relative aspect-[4/3] mb-6 sm:mb-8 overflow-hidden rounded-sm bg-white/10">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`w-full h-full object-contain object-center p-2 sm:p-3 transition-all duration-700 ${
                      hoveredIndex === index ? 'scale-105 brightness-110' : 'scale-100'
                    }`}
                    style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#7A7A6A] to-transparent transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-60' : 'opacity-80'
                  }`} />
                  
                  {/* Icon overlay */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-500 group-hover:bg-white group-hover:text-[#7A7A6A]">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-1 flex-col">
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-white mb-3 sm:mb-4 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {service.description}
                  </p>
                  
                  {/* Price and CTA */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-display text-lg sm:text-xl text-white/80">
                      {service.price}
                    </span>
                    <button className="group/btn flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase text-white/60 hover:text-white transition-all duration-300">
                      <span>Book Now</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                    </button>
                  </div>
                </div>

                {/* Hover border effect */}
                <div className={`absolute inset-0 border-2 border-white/0 rounded-sm transition-all duration-500 pointer-events-none ${
                  hoveredIndex === index ? 'border-white/20' : ''
                }`} />

                {/* Corner decorations */}
                <div className={`absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 transition-all duration-500 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 sm:w-8 h-px bg-white/40" />
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-px h-6 sm:h-8 bg-white/40" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-10 sm:mt-16 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.8s' }}
        >
          <button className="group btn-elegant inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span>VIEW ALL SERVICES</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
