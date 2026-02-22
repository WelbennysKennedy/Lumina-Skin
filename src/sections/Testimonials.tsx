import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  quote: React.ReactNode;
  author: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "They didn't just do my makeup—they transformed how I see myself. The attention to detail is unmatched.",
    author: "Alexandra Chen",
    role: "Fashion Editor, Vogue",
    rating: 5
  },
  {
    quote: <>Every brushstroke is intentional. I've worked with top artists worldwide, and <span className="font-brand-signature text-2xl sm:text-3xl lg:text-4xl align-middle">Lumina Skin</span> stands above them all.</>,
    author: "Maria Santos",
    role: "Bridal Client",
    rating: 5
  },
  {
    quote: "The master class changed my career. I learned techniques I never knew existed. Absolutely transformative.",
    author: "James Wright",
    role: "Creative Director",
    rating: 5
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        navigate('next');
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const navigate = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const newIndex = direction === 'next'
      ? (activeIndex + 1) % testimonials.length
      : (activeIndex - 1 + testimonials.length) % testimonials.length;
    
    setActiveIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-[#7A7A6A] overflow-hidden"
    >
      {/* Background decoration - behind content */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="overflow-hidden mb-4">
            <h2 
              className={`font-display text-4xl sm:text-5xl lg:text-6xl text-white font-light transition-all duration-800 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              CLIENT STORIES
            </h2>
          </div>
          <div 
            className={`transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.2s' }}
          >
            <p className="text-white/60 tracking-[0.2em] text-sm uppercase">
              What they say about us
            </p>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.4s' }}
        >
          <div className="relative">
            {/* Quote Icon - positioned ABOVE the card, not overlapping */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <span className="font-display text-4xl text-white/40">"</span>
              </div>
            </div>

            {/* Main Card */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8 lg:p-12">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-600 ${
                    index === activeIndex 
                      ? 'opacity-100 relative' 
                      : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                >
                  {index === activeIndex && (
                    <div className="flex flex-col items-center">
                      {/* Rating */}
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-white/80 text-white/80" />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl text-white text-center leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="text-center">
                        <div className="font-display text-lg sm:text-xl text-white mb-1">
                          {testimonial.author}
                        </div>
                        <div className="text-xs sm:text-sm tracking-[0.15em] text-white/60 uppercase">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => navigate('prev')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#7A7A6A] transition-all duration-300"
                disabled={isAnimating}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2 sm:gap-3 mx-2 sm:mx-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setActiveIndex(index);
                        setTimeout(() => setIsAnimating(false), 600);
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-white w-6 sm:w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate('next')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#7A7A6A] transition-all duration-300"
                disabled={isAnimating}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Side testimonials preview - hidden on mobile */}
        <div className="hidden lg:flex justify-center gap-6 xl:gap-8 mt-10 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 600);
                }
              }}
              className={`text-left p-4 xl:p-6 rounded-sm border transition-all duration-500 ${
                index === activeIndex 
                  ? 'bg-white/10 border-white/30' 
                  : 'bg-transparent border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <div className="font-display text-base xl:text-lg text-white/80 mb-1 line-clamp-1">
                {testimonial.author}
              </div>
              <div className="text-xs tracking-[0.15em] text-white/50 uppercase">
                {testimonial.role}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
