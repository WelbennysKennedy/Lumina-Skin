import { useEffect, useState } from 'react';

interface Brush {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  duration: number;
  delay: number;
  direction: 'clockwise' | 'counterclockwise';
}

const FloatingBrushes = () => {
  const [brushes, setBrushes] = useState<Brush[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Generate random brushes
    const generateBrushes = (): Brush[] => {
      const newBrushes: Brush[] = [];
      for (let i = 0; i < 8; i++) {
        newBrushes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          rotation: Math.random() * 360,
          scale: 0.3 + Math.random() * 0.4,
          opacity: 0.08 + Math.random() * 0.12,
          duration: 15 + Math.random() * 20,
          delay: Math.random() * 10,
          direction: Math.random() > 0.5 ? 'clockwise' : 'counterclockwise'
        });
      }
      return newBrushes;
    };

    setBrushes(generateBrushes());

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {brushes.map((brush) => (
        <div
          key={brush.id}
          className="absolute"
          style={{
            left: `${brush.x}%`,
            top: `${brush.y}%`,
            transform: `translate(-50%, -50%) rotate(${brush.rotation + scrollY * (brush.direction === 'clockwise' ? 0.1 : -0.1)}deg) scale(${brush.scale})`,
            opacity: brush.opacity,
            animation: `floatBrush${brush.id} ${brush.duration}s ease-in-out ${brush.delay}s infinite`,
            transition: 'transform 0.1s linear'
          }}
        >
          <svg
            width="120"
            height="200"
            viewBox="0 0 120 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Brush handle */}
            <rect
              x="50"
              y="80"
              width="20"
              height="100"
              rx="2"
              fill="url(#handleGradient)"
            />
            {/* Brush ferrule */}
            <rect
              x="45"
              y="60"
              width="30"
              height="25"
              rx="2"
              fill="url(#ferruleGradient)"
            />
            {/* Brush bristles */}
            <ellipse
              cx="60"
              cy="35"
              rx="35"
              ry="40"
              fill="url(#bristleGradient)"
            />
            {/* Brush tip highlight */}
            <ellipse
              cx="60"
              cy="25"
              rx="20"
              ry="25"
              fill="url(#tipGradient)"
              opacity="0.6"
            />
            
            <defs>
              <linearGradient id="handleGradient" x1="60" y1="80" x2="60" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#C9A962" />
                <stop offset="50%" stopColor="#D4B896" />
                <stop offset="100%" stopColor="#B8956A" />
              </linearGradient>
              <linearGradient id="ferruleGradient" x1="60" y1="60" x2="60" y2="85" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E8D4A8" />
                <stop offset="50%" stopColor="#F5E6C8" />
                <stop offset="100%" stopColor="#D4C094" />
              </linearGradient>
              <radialGradient id="bristleGradient" cx="60" cy="35" r="35" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F5F0E8" />
                <stop offset="60%" stopColor="#E8E0D4" />
                <stop offset="100%" stopColor="#D4C8B8" />
              </radialGradient>
              <radialGradient id="tipGradient" cx="60" cy="25" r="25" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      ))}

      <style>{`
        ${brushes.map((brush, i) => `
          @keyframes floatBrush${i} {
            0%, 100% {
              transform: translate(-50%, -50%) rotate(${brush.rotation}deg) scale(${brush.scale}) translateY(0);
            }
            25% {
              transform: translate(-50%, -50%) rotate(${brush.rotation + (brush.direction === 'clockwise' ? 15 : -15)}deg) scale(${brush.scale}) translateY(-20px);
            }
            50% {
              transform: translate(-50%, -50%) rotate(${brush.rotation + (brush.direction === 'clockwise' ? 5 : -5)}deg) scale(${brush.scale * 1.05}) translateY(-10px);
            }
            75% {
              transform: translate(-50%, -50%) rotate(${brush.rotation + (brush.direction === 'clockwise' ? -10 : 10)}deg) scale(${brush.scale}) translateY(-25px);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default FloatingBrushes;
