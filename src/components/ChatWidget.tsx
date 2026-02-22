import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: React.ReactNode;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: <>Hello! Welcome to <span className="font-brand-signature text-lg align-middle">Lumina Skin</span>. How can I help you today?</>,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Thank you for your message! One of our beauty consultants will get back to you shortly.",
        "We'd love to help you with that! Would you like to schedule a consultation?",
        "That's a great question! Our team specializes in creating personalized looks just for you.",
        "You can book an appointment through our contact form or call us directly at +1 (555) 123-4567."
      ];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    "Book appointment",
    "Services & prices",
    "Location & hours"
  ];

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#8B8B7A] shadow-xl flex items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
          style={{ animation: 'pulse 2s infinite' }}
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-80 lg:w-96 bg-[#8B8B7A] rounded-lg shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 flex flex-col ${
            isMinimized ? 'h-14' : 'h-[calc(100dvh-2rem)] max-h-[500px]'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)', maxWidth: '24rem' }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border-b border-white/10 cursor-pointer"
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-green-400 rounded-full border-2 border-[#8B8B7A]" />
              </div>
              <div>
                <div className="font-brand-signature text-lg sm:text-xl text-white leading-none">Lumina Skin</div>
                <div className="text-[10px] sm:text-xs text-white/60">Typically replies in minutes</div>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
              >
                <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm ${
                        message.isUser
                          ? 'bg-white text-[#8B8B7A] rounded-br-md'
                          : 'bg-white/10 text-white rounded-bl-md'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="px-3 sm:px-4 py-2 flex gap-2 overflow-x-auto">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-white/10 text-white/80 rounded-full whitespace-nowrap hover:bg-white/20 transition-colors duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-white placeholder-white/50 outline-none focus:border-white/40 transition-colors duration-200"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-[#8B8B7A] flex items-center justify-center hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
                  >
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </>
  );
};

export default ChatWidget;
