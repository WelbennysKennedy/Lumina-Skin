import { useState } from 'react';
import { Toaster } from 'sonner';
import Preloader from './components/Preloader';
import FloatingBrushes from './components/FloatingBrushes';
import Header from './components/Header';
import ChatWidget from './components/ChatWidget';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#8B8B7A]">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#7A7A6A',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)'
          }
        }}
      />
      
      {/* Main content - shown after preloader */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Floating Brushes Effect */}
        <FloatingBrushes />
        
        <Header />
        <main className="relative z-10">
          <Hero />
          <About />
          <Services />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </div>
  );
}

export default App;
