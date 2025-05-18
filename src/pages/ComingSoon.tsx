import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col w-full p-0 md:p-4">
      <header className="w-full text-center py-6 px-4">
      <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-sky-400 drop-shadow-sm"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            DevHaven
          </h1>
        <p className="text-haven-text text-lg md:text-xl animate-fade-in opacity-75">
          Where tech meets heart — a cozy corner for devs to thrive mentally & emotionally 💻🧠
        </p>
      </header>

      <main className="w-full flex-1 flex flex-col">
        <div className="haven-card flex-1 p-8 md:p-12 flex flex-col gap-8 bg-black/60">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            What’s Brewing ☕
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-900/30 backdrop-blur-md p-6 rounded-xl border border-yellow-700/30 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-xl font-bold text-yellow-200 mb-3">Interactive Twitter Replies
              </h3>
              <p className="text-gray-300">Your tweets deserve replies that get you. Expect context-aware, personal, and sometimes cheeky responses that actually sound human — maybe even your kind of human.

</p>
            </div>

            <div className="bg-green-900/30 backdrop-blur-md p-6 rounded-xl border border-green-700/30 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-xl font-bold text-green-200 mb-3">Dashboard & Chat History
              </h3>
              <p className="text-gray-300">Track your convos, revisit your favorite AI moments, and reflect on your mental dev-journey. Like a time capsule, but with sass.

</p>
            </div>

            <div className="bg-indigo-900/30 backdrop-blur-md p-6 rounded-xl border border-indigo-700/30 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-xl font-bold text-indigo-200 mb-3">Smarter, More Accurate Replies
              </h3>
              <p className="text-gray-300">The AI’s getting an upgrade. Expect smoother convos, better emotional reads, and more relevant insights — no more “huh?” moments.

.</p>
            </div>

            <div className="bg-pink-900/30 backdrop-blur-md p-6 rounded-xl border border-pink-700/30 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-xl font-bold text-pink-200 mb-3">Custom Languages (yes, including bhai mode 👀)
              </h3>
              <p className="text-gray-300">Flip the switch between serious, casual, or full-on desi chaos. Whether you want calm affirmations or “bhai, tu pagal hai kya?!” — the vibe is yours to pick.

</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-xl border border-white/10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <h3 className="text-2xl font-bold text-white mb-4">Want a Say in This?</h3>
            <p className="text-gray-300 mb-6">
              I’m building this for devs like *you*. Got feature ideas, roast requests, or just wanna vibe? Drop a DM or tag me —
              I’m all ears 👇
            </p>
            <div className="flex justify-center">
              <a
                href="https://twitter.com/r3dd404"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Send Feedback on Twitter
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-4 py-4 text-center text-sm text-gray-500">
        <p>DevHaven © {new Date().getFullYear()} • Built with heart, for devs by a dev 💜</p>
      </footer>
    </div>
  );
};

export default ComingSoon;
