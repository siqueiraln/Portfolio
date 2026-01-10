import React from 'react';
import { MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const ChatWidget: React.FC = () => {
  return (
    <a
      href={PERSONAL_INFO.socials.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-lg shadow-brand-600/30 transition-all hover:scale-110 flex items-center justify-center animate-wiggle"
      aria-label="Falar no WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
    </a>
  );
};

export default ChatWidget;