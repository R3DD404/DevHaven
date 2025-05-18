import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Send } from 'lucide-react';

interface ChatInterfaceProps {
  initialMessages: { content: string; isUser: boolean }[];
  onFeelingBetter: () => void;
  onMessageSend: (message: string) => Promise<string>; // expects a string response from AI
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialMessages,
  onFeelingBetter,
  onMessageSend,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isTyping) return;

    const userMessage = newMessage.trim();
    setNewMessage('');

    setMessages((prev) => [...prev, { content: userMessage, isUser: true }]);
    setIsTyping(true);

    try {
      const aiResponse = await onMessageSend(userMessage); // expects full string
      setMessages((prev) => [...prev, { content: aiResponse, isUser: false }]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/90 via-purple-900/40 to-black/90 flex flex-col h-full w-full p-4 z-50 animate-fade-in">
      <div className="flex flex-col h-full w-full bg-black/30 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.content}
                isUser={msg.isUser}
                animate={index === messages.length - 1}
              />
            ))}

            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="chat-bubble-ai bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-gray-100 border border-white/5 mb-6 px-6 py-5 rounded-2xl rounded-tl-sm max-w-[85%] mr-auto flex items-center gap-2"
                >
                  <div className="typing-dots flex space-x-1">
                    <motion.div
                      animate={{ scale: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
                      className="w-2 h-2 bg-indigo-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-400 select-none">DevHaven is thinking</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-gray-800 p-4 bg-black/30 backdrop-blur-lg">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="haven-input flex-1 text-white placeholder:text-gray-400"
              disabled={isTyping}
            />
            <Button
              type="submit"
              className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              disabled={!newMessage.trim() || isTyping}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>

          <div className="flex justify-center mt-6">
            <Button
              onClick={onFeelingBetter}
              className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 rounded-full text-white px-8 py-3 flex items-center gap-2 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-all hover:scale-[1.02]"
            >
              <Heart className="w-5 h-5 mr-1" />
              <span className="text-lg font-medium">End Chat</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
