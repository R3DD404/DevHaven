
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Smile, MessageCircle } from 'lucide-react';

interface WelcomeFormProps {
  onSubmit: (name: string, feeling: string) => void;
}

const WelcomeForm: React.FC<WelcomeFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [feeling, setFeeling] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feeling.trim()) {
      setError('Please share how you\'re feeling today');
      return;
    }
    
    setError('');
    onSubmit(name.trim() || 'Developer', feeling.trim());
  };

  // Handle Enter key in textarea to submit the form
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-lg animate-fade-in">
      <div className="space-y-3">
        <label htmlFor="name" className="block text-base font-medium text-gray-300 flex items-center">
          <span className="bg-indigo-500/10 p-2 rounded-lg mr-3">
            <Smile className="w-5 h-5 text-indigo-300" />
          </span>
          Your Name (optional)
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="How should we call you?"
          className="haven-input text-white placeholder:text-gray-500"
        />
      </div>
      
      <div className="space-y-3">
        <label htmlFor="feeling" className="block text-base font-medium text-gray-300 flex items-center">
          <span className="bg-purple-500/10 p-2 rounded-lg mr-3">
            <MessageCircle className="w-5 h-5 text-purple-300" />
          </span>
          How are you feeling today?
        </label>
        <Textarea
          id="feeling"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="I'm feeling overwhelmed by the pace of new frameworks and technologies..."
          rows={5}
          className="haven-input text-white placeholder:text-gray-500 resize-none"
        />
        {error && <p className="text-sm text-red-400 mt-1 pl-2">{error}</p>}
      </div>
      
      <Button type="submit" className="haven-button w-full h-16 text-xl">
        Let's Talk Together
      </Button>
    </form>
  );
};

export default WelcomeForm;
