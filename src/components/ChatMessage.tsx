
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  animate?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, animate = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "max-w-[90%] w-fit",
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      <Card 
        className={cn(
          "mb-4 px-5 py-4 transition-all text-base shadow-lg hover:shadow-xl",
          isUser 
            ? "chat-bubble-user bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 text-white border-none shadow-indigo-600/20" 
            : "chat-bubble-ai bg-gradient-to-br from-gray-800/90 via-purple-900/20 to-gray-900/90 text-gray-100 border border-white/5 shadow-purple-500/5",
          animate && "animate-fade-in"
        )}
      >
        <div className={cn(
          isUser ? "" : "prose prose-sm prose-invert max-w-none"
        )}>
          {message.split('\n').map((paragraph, i) => (
            paragraph ? <p key={i}>{paragraph}</p> : <br key={i} />
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default ChatMessage;
