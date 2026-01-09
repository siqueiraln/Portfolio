import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou a versão IA deste portfólio. Pergunte-me sobre minhas habilidades, projetos ou experiência com No-Code!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const stream = await sendMessageToGemini(userMessage);
      
      // Create a placeholder for the AI response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      let fullResponse = '';
      
      for await (const chunk of stream) {
        const chunkText = (chunk as GenerateContentResponse).text;
        if (chunkText) {
            fullResponse += chunkText;
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'model') {
                    lastMessage.text = fullResponse;
                }
                return newMessages;
            });
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, não consegui processar sua pergunta agora. Verifique a chave da API.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-lg shadow-brand-600/30 transition-all hover:scale-110 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl w-80 sm:w-96 shadow-2xl flex flex-col max-h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/50 rounded-t-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="bg-brand-500/20 p-2 rounded-lg">
                <Bot className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Assistente Virtual</h3>
                <span className="text-xs text-brand-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80 min-h-[300px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-sm'
                      : msg.isError 
                        ? 'bg-red-900/50 text-red-200 border border-red-800 rounded-bl-sm'
                        : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 border border-slate-700">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-800 bg-slate-900 rounded-b-2xl">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Pergunte sobre minha experiência..."
                disabled={isLoading}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-2 p-1.5 bg-brand-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;