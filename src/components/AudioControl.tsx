import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';

export const AudioControl: React.FC = () => {
  const [status, setStatus] = useState(audioManager.getStatus());

  useEffect(() => {
    const unsubscribe = audioManager.subscribe(() => {
      setStatus(audioManager.getStatus());
    });
    return unsubscribe;
  }, []);

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.playClick();
    audioManager.togglePlay(BIRTHDAY_DATA.musicPath);
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioManager.playClick();
    audioManager.toggleMute();
  };

  return (
    <div className="fixed top-2 sm:top-3 right-2 sm:right-4 z-50 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-pink-200">
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayToggle}
        aria-label={status.isPlaying ? 'Pause background melody' : 'Play background melody'}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        title={status.isPlaying ? 'Pause music' : 'Play music'}
      >
        {status.isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Music className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        ) : (
          <Play className="w-4 h-4 ml-0.5" />
        )}
      </button>

      {/* Mute/Unmute Button */}
      <button
        onClick={handleMuteToggle}
        aria-label={status.isMuted ? 'Unmute sound' : 'Mute sound'}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-pink-600 hover:text-pink-700 hover:bg-pink-50 transition-colors cursor-pointer"
        title={status.isMuted ? 'Unmute' : 'Mute'}
      >
        {status.isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Track Label on Desktop */}
      <span className="hidden sm:inline-block pr-2 text-xs font-medium text-pink-700 dark:text-pink-300 max-w-[120px] truncate">
        {status.isPlaying ? (status.isProcedural ? 'Music Box 🎀' : 'Friendship Song') : 'Melody Paused'}
      </span>
    </div>
  );
};
