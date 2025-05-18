
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Smile, 
  Frown, 
  Meh, 
  AlertTriangle, 
  BatteryCharging, 
  Coffee,
  Brain, 
  Loader
} from 'lucide-react';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

const moods = [
  { 
    id: "burnout", 
    label: "Burnout", 
    description: "Feeling exhausted and overwhelmed by coding",
    icon: <BatteryCharging className="w-8 h-8 text-red-400" />,
    color: "from-red-400 to-pink-500"
  },
  { 
    id: "stressed", 
    label: "Stressed", 
    description: "Under pressure with deadlines or bugs",
    icon: <AlertTriangle className="w-8 h-8 text-orange-400" />,
    color: "from-orange-400 to-amber-500"
  },
  { 
    id: "frustrated", 
    label: "Frustrated", 
    description: "Stuck on a problem that won't go away",
    icon: <Frown className="w-8 h-8 text-yellow-400" />,
    color: "from-yellow-400 to-amber-500"
  },
  { 
    id: "unmotivated", 
    label: "Unmotivated", 
    description: "Lacking drive to write code or solve problems",
    icon: <Meh className="w-8 h-8 text-blue-400" />,
    color: "from-blue-400 to-indigo-500"
  },
  { 
    id: "distracted", 
    label: "Distracted", 
    description: "Can't focus on coding tasks",
    icon: <Brain className="w-8 h-8 text-purple-400" />,
    color: "from-purple-400 to-indigo-500"
  },
  { 
    id: "imposter", 
    label: "Imposter Syndrome", 
    description: "Feeling inadequate as a developer",
    icon: <Loader className="w-8 h-8 text-indigo-400" />,
    color: "from-indigo-400 to-purple-500"
  },
  { 
    id: "tired", 
    label: "Just Tired", 
    description: "Need some energy and motivation",
    icon: <Coffee className="w-8 h-8 text-green-400" />,
    color: "from-green-400 to-teal-500"
  },
  { 
    id: "ok", 
    label: "Just Need to Talk", 
    description: "Want some guidance or encouragement",
    icon: <Smile className="w-8 h-8 text-teal-400" />,
    color: "from-teal-400 to-cyan-500"
  }
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = React.useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/90 via-purple-900/40 to-black/90 flex items-center justify-center p-4 z-50 animate-fade-in">

    <div className="flex flex-col items-center p-6 md:p-10 animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-4">How are you feeling today?</h2>
      <p className="text-gray-300 mb-8 text-center max-w-lg">
        Select how you're feeling right now, and we'll tailor our conversation to help you find your center.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        {moods.map((mood) => (
          <div 
            key={mood.id}
            onClick={() => setSelectedMood(mood.label)}
            className={`
              p-4 rounded-xl border cursor-pointer transition-all duration-300
              ${selectedMood === mood.label 
                ? `border-white/30 bg-gradient-to-br ${mood.color} shadow-lg transform scale-[1.03]` 
                : 'border-white/10 bg-black/30 hover:bg-black/40 hover:border-white/20'}
            `}
          >
            <div className="flex flex-col items-center text-center">
              {mood.icon}
              <h3 className="mt-3 font-bold text-lg">{mood.label}</h3>
              <p className="text-sm text-gray-300 mt-1">{mood.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={!selectedMood}
        className="mt-10 px-10 py-6 text-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl shadow-xl shadow-purple-500/20 hover:shadow-purple-500/30 transform transition-all hover:scale-105 disabled:opacity-50"
      >
        Let's Talk About It
      </Button>

    </div>
    </div>
  );
};

export default MoodSelector;
