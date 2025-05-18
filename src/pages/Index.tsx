import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WelcomeForm from '@/components/WelcomeForm';
import ChatInterface from '@/components/ChatInterface';
import VibeCard from '@/components/VibeCard';
import MoodSelector from '@/components/MoodSelector';
import TestimonialScroll from '@/components/TestimonialScroll';
import { generateResponse, extractQuote } from '@/services/aiService';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const Index = () => {
  const [stage, setStage] = useState<'welcome' | 'mood' | 'chat' | 'card'>('welcome');
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([]);
  const [quoteForCard, setQuoteForCard] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const { toast } = useToast();

  const handleWelcomeSubmit = async (name: string, feeling: string) => {
    setUserName(name);
    setStage('mood');
  };

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood);
    const initialUserMessage = `I'm feeling ${mood} today as a developer.`;
    setMessages([{ content: initialUserMessage, isUser: true }]);

    try {
      setStage('chat');
      const aiResponse = await generateResponse(initialUserMessage);
      setMessages(current => [...current, { content: aiResponse, isUser: false }]);
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: 'Oops!',
        description: "We couldn't start the conversation. Please try again.",
        variant: 'destructive',
      });
    }
  };

  const handleSendMessage = async (message: string): Promise<string> => {
    setMessages(current => [...current, { content: message, isUser: true }]);
    const previousMessages = messages.map(msg => msg.content);
    previousMessages.push(message);

    try {
      const aiResponse = await generateResponse(message, previousMessages);
      setMessages(current => [...current, { content: aiResponse, isUser: false }]);
      return aiResponse;
    } catch (error) {
      console.error('Error getting response:', error);
      toast({
        title: 'Message Error',
        description: "We couldn't get a response. Please try again.",
        variant: 'destructive',
      });
      throw error;
    }
  };

  const handleEndChat = () => {
    const quote = extractQuote(messages);
    setQuoteForCard(quote);
    setStage('card');
  };

  const handleCloseCard = () => {
    setMessages([]);
    setSelectedMood('');
    setStage('welcome');
  };

  const handleBackToWelcome = () => {
    if (stage === 'chat' && messages.length > 2) {
      const confirmed = window.confirm('Going back will end your current session. Continue?');
      if (!confirmed) return;
    }
    setStage('welcome');
    setMessages([]);
    setSelectedMood('');
  };

  return (
    <div className="min-h-screen flex flex-col w-full p-0 md:p-4 bg-gradient-to-br from-black via-purple-900/10 to-black/90 font-sans">
      <header className="w-full flex justify-between items-center py-6 px-6">
        <div className="flex items-center gap-3">
          {stage !== 'welcome' && (
            <Button
              onClick={handleBackToWelcome}
              variant="ghost"
              className="p-2 hover:bg-white/5 rounded-full transition-all duration-300 animate-fade-in"
            >
              <ArrowLeft className="w-5 h-5 text-purple-300" />
              <span className="sr-only">Back</span>
            </Button>
          )}

          <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-sky-400 drop-shadow-sm"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            DevHaven
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/coming-soon"
            className="flex items-center gap-1 text-white text-lg font-semibold tracking-wide relative group"
          >
            <span className="border-b border-transparent group-hover:border-purple-500 transition-all duration-300">
              Coming Soon
            </span>
            <ChevronRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <a
            href="https://x.com/R3DD404"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white text-lg font-semibold tracking-wide relative group"
            title="Made by R3DD"
          >
            <span className="border-b border-transparent group-hover:border-purple-500 transition-all duration-300">
              Made by R3DD
            </span>
            <ChevronRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </header>

      <main className="w-full flex-1 flex flex-col px-4">
        <div className="haven-card flex-1 overflow-hidden flex flex-col bg-black/80 backdrop-blur-xl">
          {stage === 'welcome' && (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 md:p-10 bg-gradient-to-br from-black/90 via-purple-900/40 to-black/90 animate-fade-in z-10">
              <h2
                className="text-5xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mb-6 text-center max-w-3xl leading-tight tracking-wide animate-fade-in"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Welcome to your safe space
              </h2>

              <p className="text-lg md:text-md text-white/80 text-center max-w-3xl font-light leading-relaxed animate-fade-in delay-200">
                DevHaven is your sanctuary when coding gets overwhelming. <br className="hidden md:inline" />
                Share how you're feeling, and we'll be here to listen, support, and help you find your calm again.
              </p>

              <WelcomeForm onSubmit={handleWelcomeSubmit} />
            </div>
          )}

          {stage === 'mood' && <MoodSelector onMoodSelect={handleMoodSelect} />}
          {stage === 'chat' && (
            <ChatInterface
              initialMessages={messages}
              onFeelingBetter={handleEndChat}
              onMessageSend={handleSendMessage}
            />
          )}
          {stage === 'card' && (
            <VibeCard
              quote={quoteForCard}
              name={userName || 'Dev'}
              onClose={handleCloseCard}
            />
          )}
        </div>
      </main>

      {stage === 'welcome' && <TestimonialScroll className="my-8" />}

      <footer className="mt-4 py-4 text-center text-sm text-gray-500">
        <p>DevHaven © {new Date().getFullYear()} • Built with heart, for devs by a dev 💜</p>
      </footer>

      <Toaster />
    </div>
  );
};

export default Index;
