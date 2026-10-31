import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { KeyRound, Sparkles, Heart, Delete, Lock, Unlock } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';
import { audioManager } from '../utils/audioManager';

interface StagePasscodeProps {
  onSuccess: () => void;
}

export const StagePasscode: React.FC<StagePasscodeProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Normalizes entered code (removes slashes, dashes, spaces)
  const normalize = (val: string) => val.replace(/[\/\-\s]/g, '').trim();

  const verifyCode = (inputToTest: string) => {
    const rawNormalized = normalize(inputToTest);
    const targetNormalized = normalize(BIRTHDAY_DATA.passcode);
    const altTarget = '209';

    if (rawNormalized === targetNormalized || rawNormalized === altTarget) {
      setErrorMessage('');
      setIsUnlocked(true);
      audioManager.playSuccess();
      audioManager.startMusic(BIRTHDAY_DATA.musicPath);

      try {
        confetti({
          particleCount: 85,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF8FB8', '#FF4F91', '#F472B6', '#FFFFFF']
        });
      } catch {}

      setTimeout(() => {
        onSuccess();
      }, 1200);
    } else {
      audioManager.playPop();
      setIsShaking(true);
      setErrorMessage("Oopsie... that's not the magic code 💕 Try again!");
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (code.length >= 6 || isUnlocked) return;
    audioManager.playClick();
    const newCode = code + digit;
    setCode(newCode);
    setErrorMessage('');

    // Check automatically when 4 digits are entered
    if (newCode.length === 4) {
      verifyCode(newCode);
    }
  };

  const handleDelete = () => {
    audioManager.playClick();
    setCode((prev) => prev.slice(0, -1));
    setErrorMessage('');
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(code);
  };

  return (
    <div className="w-full max-w-md mx-auto my-auto flex flex-col items-center justify-center py-2 px-3 text-center select-none">
      <div
        className={`glass-pink p-5 sm:p-7 rounded-3xl w-full text-center relative border border-white transition-all shadow-xl ${
          isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
        }`}
      >
        {/* Animated Icon Header */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-pink-200 to-rose-100 flex items-center justify-center shadow-inner">
          {isUnlocked ? (
            <Unlock className="w-8 h-8 text-pink-500 animate-bounce" />
          ) : (
            <Lock className="w-8 h-8 text-pink-500 animate-pulse" />
          )}
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1 tracking-tight">
          {BIRTHDAY_DATA.secretScreenHeading}
        </h2>
        <p className="text-base sm:text-lg font-bold text-pink-600 mb-1">
          {BIRTHDAY_DATA.secretScreenSubtext}
        </p>
        
        {/* Hint displaying: (your born day) */}
        <div className="inline-block px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-xs font-semibold text-pink-700 mb-5">
          Hint: {BIRTHDAY_DATA.secretScreenHint}
        </div>

        {/* Display 4 dots for 0209 passcode */}
        <div className="flex justify-center items-center gap-3 mb-5 h-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                i < code.length
                  ? 'bg-pink-500 scale-125 shadow-sm shadow-pink-400'
                  : 'bg-pink-100 border border-pink-200'
              }`}
            />
          ))}
        </div>

        {/* Feedback message */}
        {errorMessage ? (
          <div className="text-xs font-semibold text-rose-500 bg-rose-50 border border-rose-100 py-1.5 px-3 rounded-full mb-4 inline-block">
            {errorMessage}
          </div>
        ) : null}

        {/* Input field (keyboard accessible) */}
        <form onSubmit={handleInputSubmit} className="mb-4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="0209"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setErrorMessage('');
              if (e.target.value.length === 4) {
                verifyCode(e.target.value);
              }
            }}
            className="w-full text-center text-xl font-mono font-bold tracking-widest py-2.5 px-4 rounded-xl bg-white/90 border border-pink-200 text-pink-700 placeholder:text-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner"
            maxLength={4}
          />
        </form>

        {/* Touch Number Pad for Phone */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto mb-4 select-none">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKeypadPress(digit)}
              className="h-12 rounded-xl bg-white/90 hover:bg-pink-50 active:bg-pink-100 font-mono text-xl font-bold text-slate-700 shadow-xs border border-pink-100 flex items-center justify-center transition-transform active:scale-90 touch-manipulation cursor-pointer select-none"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={handleDelete}
            className="h-12 rounded-xl bg-pink-50 hover:bg-pink-100 active:bg-pink-200 text-pink-600 flex items-center justify-center transition-transform active:scale-90 touch-manipulation cursor-pointer select-none"
            title="Backspace"
          >
            <Delete className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => handleKeypadPress('0')}
            className="h-12 rounded-xl bg-white/90 hover:bg-pink-50 active:bg-pink-100 font-mono text-xl font-bold text-slate-700 shadow-xs border border-pink-100 flex items-center justify-center transition-transform active:scale-90 touch-manipulation cursor-pointer select-none"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => verifyCode(code)}
            className="h-12 rounded-xl bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-sm transition-transform active:scale-90 touch-manipulation cursor-pointer select-none"
            title="Submit passcode"
          >
            <KeyRound className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => verifyCode(code)}
          disabled={code.length === 0}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-sm shadow-md shadow-pink-500/20 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isUnlocked ? 'Magic Unlocked! ✨' : 'Unlock Birthday Surprise 🔐'}
        </button>

        <p className="mt-3 text-[11px] text-pink-400 flex items-center justify-center gap-1 font-medium">
          <Heart className="w-3 h-3 fill-pink-400" />
          <span>Made with love for Sadaf</span>
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
};
