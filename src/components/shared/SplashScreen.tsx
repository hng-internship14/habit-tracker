import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black text-white z-50 overflow-hidden"
      data-testid="splash-screen"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-black to-purple-900/20 animate-pulse" />
      
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          Habit Tracker
        </h1>
        <p className="text-indigo-400/80 font-medium tracking-widest text-xs uppercase">
          Stage 3 Implementation
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
