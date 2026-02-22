import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';

const galleryImages = [
  { src: `${import.meta.env.BASE_URL}images/mekup 1.png`, title: 'Ethereal Beauty', category: 'Editorial' },
  { src: `${import.meta.env.BASE_URL}images/mekup 2.png`, title: 'Green Goddess', category: 'Spa' },
  { src: `${import.meta.env.BASE_URL}images/mekup 3.png`, title: 'Natural Glow', category: 'Beauty' },
  { src: `${import.meta.env.BASE_URL}images/mekup 4.png`, title: 'Golden Hour', category: 'Editorial' },
  { src: `${import.meta.env.BASE_URL}images/mekup 5.png`, title: 'Fresh Face', category: 'Spa' },
  { src: `${import.meta.env.BASE_URL}images/mekup 6.png`, title: 'Bridal Dream', category: 'Bridal' },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % galleryImages.length
      : (selectedImage - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(newIndex);
  };

  return (
    <>
      <section 
        ref={sectionRef}
        id="gallery"
        className="relative w-full py-16 sm:py-20 lg:py-32 bg-[#8B8B7A] overflow-hidden"
      >
        {/* Section Header */}
        <div className="w-full px-4 sm:px-6 lg:px-12 mb-10 sm:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between max-w-7xl mx-auto">
            <div>
              <div className="overflow-hidden mb-3 sm:mb-4">
                <h2 
                  className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light transition-all duration-800 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                >
                  OUR WORK
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
            
            <div 
              className={`mt-4 sm:mt-6 lg:mt-0 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.3s' }}
            >
              <button className="group flex items-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-white/70 hover:text-white transition-all duration-300">
                <span>View All Projects</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group relative cursor-pointer transition-all duration-800 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionTimingFunction: 'var(--ease-expo-out)', 
                  transitionDelay: `${0.3 + index * 0.1}s` 
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openLightbox(index)}
              >
                <div 
                  className={`relative aspect-[4/5] overflow-hidden rounded-sm transition-all duration-500 ${
                    hoveredIndex === index ? 'scale-[1.02]' : 'scale-100'
                  }`}
                >
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredIndex === index ? 'scale-110 grayscale-0' : 'scale-100 grayscale-[30%]'
                    }`}
                    style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#8B8B7A]/90 via-[#8B8B7A]/20 to-transparent transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Content */}
                  <div className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-6 transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-white/60 uppercase mb-1 sm:mb-2">
                      {image.category}
                    </span>
                    <h3 className="font-display text-lg sm:text-2xl text-white">
                      {image.title}
                    </h3>
                  </div>

                  {/* View indicator */}
                  <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>

                  {/* Border */}
                  <div className={`absolute inset-0 border-2 border-white/0 rounded-sm transition-all duration-500 pointer-events-none ${
                    hoveredIndex === index ? 'border-white/30' : ''
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-px h-20 sm:h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-1/4 right-0 w-px h-20 sm:h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-10"
            onClick={closeLightbox}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Navigation */}
          <button 
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <button 
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Image */}
          <div 
            className="relative max-w-4xl max-h-[70vh] sm:max-h-[80vh] mx-8 sm:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].title}
              className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-sm"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-white/60 uppercase">
                {galleryImages[selectedImage].category}
              </span>
              <h3 className="font-display text-xl sm:text-3xl text-white mt-1 sm:mt-2">
                {galleryImages[selectedImage].title}
              </h3>
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs sm:text-sm tracking-wider">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
