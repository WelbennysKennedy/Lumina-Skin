import { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after brief delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Start exit animation
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 1200);
    }, 2500);

    return () => {
      clearTimeout(contentTimer);
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-1000 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ 
        background: 'linear-gradient(135deg, #8B8B7A 0%, #7A7A6A 50%, #8B8B7A 100%)',
        transitionTimingFunction: 'var(--ease-expo-out)'
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div 
        className={`relative flex flex-col items-center transition-all duration-800 ${
          showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
      >
        {/* Makeup Brush Animation */}
        <div className="relative mb-12">
          {/* Brush container with rotation animation */}
          <div 
            className="relative"
            style={{
              animation: 'brushFloat 3s ease-in-out infinite'
            }}
          >
            <img
              src="/images/makeup-brush.png"
              alt="Makeup Brush"
              className="w-32 h-48 lg:w-40 lg:h-60 object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                animation: 'brushRotate 4s ease-in-out infinite'
              }}
            />
            
            {/* Sparkle effects around brush */}
            <div className="absolute -top-4 -right-4 w-3 h-3 bg-white/80 rounded-full animate-pulse" />
            <div className="absolute top-1/2 -left-6 w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-2 right-1/2 w-2.5 h-2.5 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Circular progress ring around brush */}
          <svg 
            className="absolute -inset-8 w-48 h-48 lg:w-56 lg:h-56"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray={`${progress * 2.83} 283`}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dasharray 0.1s ease-out' }}
            />
          </svg>
        </div>

        {/* Logo */}
        <div 
          className="text-center mb-8"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.5s both'
          }}
        >
          <h1 className="font-brand-signature text-5xl lg:text-6xl text-white font-medium tracking-[0.06em]">
            Lumina Skin
          </h1>
        </div>

        {/* Tagline */}
        <p 
          className="text-white/60 text-sm tracking-[0.2em] uppercase mb-10"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.8s both'
          }}
        >
          Where beauty becomes art
        </p>

        {/* Progress bar */}
        <div className="w-48 h-px bg-white/20 relative overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-white/60 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <p className="mt-4 text-white/40 text-xs tracking-[0.15em]">
          {progress}%
        </p>
      </div>

      {/* Exit animation overlay */}
      <div 
        className={`absolute inset-0 bg-white transition-transform duration-1000 ${
          isExiting ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          transitionTimingFunction: 'var(--ease-expo-out)',
          transitionDelay: '0.3s'
        }}
      />

      {/* Additional exit wipe */}
      <div 
        className={`absolute inset-0 bg-[#8B8B7A] transition-transform duration-1000 ${
          isExiting ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ 
          transitionTimingFunction: 'var(--ease-expo-out)',
          transitionDelay: '0.5s'
        }}
      />

      <style>{`
        @keyframes brushFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes brushRotate {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
