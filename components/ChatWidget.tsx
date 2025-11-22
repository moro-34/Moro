import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';
import { sendMessageToGemini, initializeChat } from '../services/geminiService';
import { ChatMessage, Car, Language } from '../types';
import { CARS } from '../constants';

interface ChatWidgetProps {
  currentView: string;
  selectedCar: Car | null;
  language: Language;
  t: any;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ currentView, selectedCar, language, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: t.chat.greeting }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([{ role: 'model', text: t.chat.greeting }]);
  }, [language, t]);

  // Re-initialize chat when context or language changes
  useEffect(() => {
    let context = "";
    if (selectedCar) {
      context = `User is viewing a specific car:\n
      Make: ${selectedCar.make}\n
      Model: ${selectedCar.model}\n
      Year: ${selectedCar.year}\n
      Price: €${selectedCar.price}\n
      Mileage: ${selectedCar.mileage}km\n
      Description: ${selectedCar.description}\n
      Location: ${selectedCar.location}`;
    } else {
      // Summary of inventory for general context
      const inventorySummary = CARS.map(c => `- ${c.year} ${c.make} ${c.model} (€${c.price})`).join('\n');
      context = `User is browsing the inventory. Available cars:\n${inventorySummary}`;
    }

    initializeChat(context, language);
  }, [selectedCar, currentView, language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: t.chat.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={`fixed bottom-6 z-50 flex flex-col ${language === 'ar' ? 'left-6 items-start' : 'right-6 items-end'}`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-fade-in-up transition-all duration-300 h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-yellow-400 rounded-full">
                <Bot size={16} className="text-slate-900" />
              </div>
              <div>
                <h3 className="font-bold text-sm">{t.chat.botName}</h3>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  {t.chat.online}
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t.chat.placeholder}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} className={language === 'ar' ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-slate-700 rotate-90 scale-0 opacity-0' : 'bg-gradient-to-tr from-yellow-400 to-yellow-500 scale-100 opacity-100'} text-slate-900 p-4 rounded-full shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 flex items-center justify-center group relative`}
        aria-label="Chat with AI"
      >
        {!isOpen && (
            <>
                <MessageSquare size={28} className="group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
            </>
        )}
      </button>
    </div>
  );
};
