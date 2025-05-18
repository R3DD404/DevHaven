import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Download, X, Twitter } from 'lucide-react';

interface VibeCardProps {
  quote: string;
  name: string;
  onClose: () => void;
}

const VibeCard: React.FC<VibeCardProps> = ({ quote, name, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [randomPfpIndex, setRandomPfpIndex] = useState<number | null>(null);

  // Hash function to get deterministic avatar index from name
  const getAvatarIndexFromName = (name: string): number => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }
    const index = Math.abs(hash) % 5; // We have 5 avatars (1 to 5)
    return index + 1;
  };

  useEffect(() => {
    if (name) {
      setRandomPfpIndex(getAvatarIndexFromName(name));
    } else {
      // fallback if no name provided
      setRandomPfpIndex(Math.floor(Math.random() * 5) + 1);
    }
  }, [name]);

  const downloadImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'devhaven-vibecard.png';
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const shareOnTwitter = () => {
    const text = `"${quote}" - DevHaven\n\nCheck out this vibe card made with:`;
    const url = 'https://devhaven.vercel.app';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareNative = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      const image = canvas.toDataURL('image/png');
      const blob = await (await fetch(image)).blob();
      const file = new File([blob], 'devhaven-vibecard.png', { type: blob.type });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My DevHaven Vibe Card',
          text: `"${quote}" - ${name || 'Anonymous Dev'}`,
          url: 'https://devhaven.vercel.app',
        });
      } else {
        shareOnTwitter(); // Fallback to Twitter if native sharing isn't available
      }
    } catch (error) {
      console.error('Error sharing:', error);
      shareOnTwitter(); // Fallback to Twitter if there's an error
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/90 via-purple-900/40 to-black/90 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="max-w-md w-full">
        <div
          ref={cardRef}
          className="p-10 rounded-3xl bg-gradient-to-br from-blue-900/70 via-purple-900/70 to-indigo-900/70 shadow-2xl backdrop-blur-xl transform transition-all duration-500 hover:scale-[1.02]"
        >
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/10 relative">
            <div className="absolute top-8 right-8">
              <Heart className="text-pink-500 w-8 h-8 floating-element" />
            </div>

            <p className="text-gray-100 text-xl font-medium italic mb-8 leading-relaxed">
              "{quote}"
            </p>

            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-lg flex items-center">
                <Avatar className="mr-3 w-10 h-10 border-2 border-indigo-400">
                  {randomPfpIndex ? (
                    <AvatarImage
                      src={`/pfp/image-${randomPfpIndex}.png`}
                      alt={`${name}'s profile`}
                    />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-r from-indigo-400 to-purple-400">
                      {name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                {name || 'Anonymous Dev'}
              </p>

              <div className="flex items-center text-xs text-gray-400">
                <span>powered by</span>
                <a
                  href="https://devhaven.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 font-semibold hover:text-purple-300 transition-colors"
                >
                  DevHaven
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <Button
            onClick={downloadImage}
            className="flex items-center gap-2 px-6 py-5 bg-white text-gray-900 hover:bg-gray-100 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </Button>

          <Button
            onClick={shareOnTwitter}
            className="flex items-center gap-2 px-6 py-5 bg-blue-500 text-white hover:bg-blue-600 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Twitter className="w-5 h-5" />
            <span>Share on X</span>
          </Button>

          <Button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-5 bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/50 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <X className="w-5 h-5" />
            <span>Close</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VibeCard;
