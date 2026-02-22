import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Youtube } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message sent successfully! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    { icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Address', value: '123 Beauty Lane, New York, NY 10001' },
    { icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Email', value: 'hello@luminaskin.com' },
    { icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Hours', value: 'Mon-Sat: 9AM - 7PM' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative w-full py-16 sm:py-20 lg:py-32 bg-[#8B8B7A] overflow-hidden"
    >
      {/* Diagonal background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(165deg, rgba(122,122,106,0.3) 40%, transparent 40%)'
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="overflow-hidden mb-3 sm:mb-4">
            <h2 
              className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light transition-all duration-800 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              GET IN TOUCH
            </h2>
          </div>
          <div 
            className={`transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.2s' }}
          >
            <p className="text-white/60 tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm uppercase">
              Let's create something beautiful together
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <div 
            className={`transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.3s' }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Name Field */}
              <div className="relative">
                <label 
                  className={`absolute left-0 transition-all duration-300 text-xs sm:text-sm ${
                    focusedField === 'name' || formData.name 
                      ? '-top-5 sm:-top-6 text-white/80' 
                      : 'top-3 sm:top-4 text-white/50'
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="input-elegant text-white text-sm sm:text-base"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <label 
                  className={`absolute left-0 transition-all duration-300 text-xs sm:text-sm ${
                    focusedField === 'email' || formData.email 
                      ? '-top-5 sm:-top-6 text-white/80' 
                      : 'top-3 sm:top-4 text-white/50'
                  }`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="input-elegant text-white text-sm sm:text-base"
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label 
                  className={`absolute left-0 transition-all duration-300 text-xs sm:text-sm ${
                    focusedField === 'phone' || formData.phone 
                      ? '-top-5 sm:-top-6 text-white/80' 
                      : 'top-3 sm:top-4 text-white/50'
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className="input-elegant text-white text-sm sm:text-base"
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <label 
                  className={`absolute left-0 transition-all duration-300 text-xs sm:text-sm ${
                    focusedField === 'message' || formData.message 
                      ? '-top-5 sm:-top-6 text-white/80' 
                      : 'top-3 sm:top-4 text-white/50'
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={4}
                  className="input-elegant text-white resize-none text-sm sm:text-base"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full btn-elegant flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 text-xs sm:text-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Info */}
          <div 
            className={`transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)', transitionDelay: '0.5s' }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:bg-white group-hover:text-[#8B8B7A] transition-all duration-300 flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] text-white/50 uppercase mb-0.5 sm:mb-1">
                      {info.label}
                    </div>
                    <div className="text-white/90 text-sm sm:text-base">
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mb-8 sm:mb-10">
              <div className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] text-white/50 uppercase mb-3 sm:mb-4">
                Follow Us
              </div>
              <div className="flex gap-3 sm:gap-4">
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
                    className="social-icon w-9 h-9 sm:w-10 sm:h-10"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative h-36 sm:h-48 rounded-sm overflow-hidden bg-white/5 border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white/40 mx-auto mb-2" />
                  <p className="text-white/60 text-xs sm:text-sm">123 Beauty Lane, New York</p>
                </div>
              </div>
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
