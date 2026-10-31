import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Heart, ArrowRight, Eye, X } from 'lucide-react';
import { BIRTHDAY_DATA, MemoryPhoto } from '../data/birthdayConfig';
import { PhotoCard } from '../components/PhotoCard';
import { audioManager } from '../utils/audioManager';

interface StagePhotoMemoriesProps {
  onNext: () => void;
}

export const StagePhotoMemories: React.FC<StagePhotoMemoriesProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inspectingPhoto, setInspectingPhoto] = useState<MemoryPhoto | null>(null);

  const photos = BIRTHDAY_DATA.photos;
  const currentPhoto = photos[currentIndex];

  const handleNext = () => {
    audioManager.playClick();
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    audioManager.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(photos.length - 1);
    }
  };

  const handleOpenModal = () => {
    audioManager.playSparkle();
    setInspectingPhoto(currentPhoto);
  };

  const handleProceed = () => {
    audioManager.playPop();
    onNext();
  };

  return (
    <div className="w-full max-w-md mx-auto my-auto flex flex-col items-center justify-center py-2 px-3 text-center select-none">
      {/* Title */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sadaf's Spotlight Vault ✨</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800">
          Sadaf in the Spotlight 📸
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Swipe or tap Next to admire Sadaf's 3 iconic photos!
        </p>
      </div>

      {/* Main Interactive Carousel Card */}
      <div className="w-full relative max-w-sm mb-6">
        <div className="transition-all duration-300 transform">
          <PhotoCard memory={currentPhoto} onSelect={handleOpenModal} />
        </div>

        {/* Floating Carousel Navigation Buttons */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrev}
            aria-label="Previous memory"
            className="w-11 h-11 rounded-full bg-white shadow-md border border-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-50 active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2">
            {photos.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  audioManager.playClick();
                  setCurrentIndex(idx);
                }}
                aria-label={`Jump to memory ${idx + 1}`}
                className={`transition-all rounded-full ${
                  idx === currentIndex
                    ? 'w-7 h-2.5 bg-pink-500'
                    : 'w-2.5 h-2.5 bg-pink-200 hover:bg-pink-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next memory"
            className="w-11 h-11 rounded-full bg-white shadow-md border border-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-50 active:scale-95 transition-transform"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-2.5">
        <button
          onClick={handleOpenModal}
          className="w-full py-2.5 px-4 rounded-xl bg-pink-100/80 hover:bg-pink-200/80 text-pink-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Read Memory Story & Details</span>
        </button>

        <button
          onClick={handleProceed}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-400 text-white font-bold text-base shadow-lg shadow-pink-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Memory Journey ✨</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Memory Inspect Modal */}
      {inspectingPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setInspectingPhoto(null)}
        >
          <div
            className="glass-pink p-6 rounded-3xl max-w-md w-full relative border border-white text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setInspectingPhoto(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{inspectingPhoto.accentEmoji}</span>
              <span className="text-xs font-bold tracking-widest text-pink-600 uppercase">
                {inspectingPhoto.dateTag}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-slate-800 mb-1">
              {inspectingPhoto.title}
            </h3>
            <p className="text-base font-bold text-pink-600 mb-4">
              {inspectingPhoto.caption}
            </p>

            <div className="bg-white/80 p-4 rounded-2xl border border-pink-100 mb-5">
              <p className="text-sm text-slate-700 leading-relaxed">
                {inspectingPhoto.story}
              </p>
            </div>

            <button
              onClick={() => setInspectingPhoto(null)}
              className="w-full py-3 rounded-xl bg-pink-500 text-white font-bold text-sm hover:bg-pink-600"
            >
              Close Memory 💗
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
