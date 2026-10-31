import React, { useState } from 'react';
import { Camera, Download, Sparkles, Heart, RotateCcw, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { BIRTHDAY_DATA, MemoryPhoto } from '../data/birthdayConfig';
import { downloadMemoryCard } from '../utils/canvasGenerators';
import { audioManager } from '../utils/audioManager';

interface StageMemoryGalleryProps {
  onReplay: () => void;
}

export const StageMemoryGallery: React.FC<StageMemoryGalleryProps> = ({ onReplay }) => {
  const photos = BIRTHDAY_DATA.photos;
  const [activePreviewIndex, setActivePreviewIndex] = useState<number | null>(null);
  const [downloadingCard, setDownloadingCard] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadKeepsake = async (photo: MemoryPhoto) => {
    audioManager.playSparkle();
    setDownloadingCard(true);
    try {
      await downloadMemoryCard(
        BIRTHDAY_DATA.name,
        BIRTHDAY_DATA.birthDateString,
        photo.imagePath,
        photo.caption
      );
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch {
      // Safe fallback
    } finally {
      setDownloadingCard(false);
    }
  };

  const handleReplayClick = () => {
    audioManager.playPop();
    onReplay();
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-start px-4 py-8 max-w-lg mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sadaf's Birthday Portrait Archive</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold text-slate-800">
          SADAF'S BIRTHDAY GALLERY 📸
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          3 iconic pictures celebrating our favorite girl on her special day.
        </p>
      </div>

      {/* Grid of 3 Photos */}
      <div className="w-full space-y-6 mb-8">
        {photos.map((item, idx) => (
          <div
            key={item.id}
            className="glass-pink p-4 sm:p-5 rounded-3xl border border-white shadow-xl hover:shadow-2xl transition-all"
          >
            {/* Washi tape */}
            <div className="flex items-center justify-between mb-3 text-xs text-pink-500 font-semibold">
              <span className="uppercase tracking-widest">{item.dateTag}</span>
              <span>{item.accentEmoji}</span>
            </div>

            {/* Photo frame */}
            <div
              onClick={() => {
                audioManager.playClick();
                setActivePreviewIndex(idx);
              }}
              className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 border border-pink-100 cursor-pointer group"
            >
              <img
                src={item.imagePath}
                alt={item.title}
                onError={(e) => {
                  // Fallback styling handled gracefully
                  (e.target as HTMLElement).style.display = 'none';
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Styled Fallback container behind img */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.fallbackGradient} flex flex-col items-center justify-center p-6 text-white text-center -z-10`}>
                <Camera className="w-8 h-8 mb-2 opacity-80" />
                <p className="font-display text-xl font-bold">{item.title}</p>
                <p className="text-xs text-white/80">{item.caption}</p>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-2xs">
                <Eye className="w-4 h-4" />
                <span>Tap for Full View</span>
              </div>
            </div>

            {/* Details */}
            <div className="mt-4">
              <h3 className="font-display text-xl font-bold text-slate-800">
                {item.title}
              </h3>
              <p className="text-sm font-bold text-pink-600 mt-0.5">
                {item.caption}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {item.story}
              </p>
            </div>

            {/* Download Keepsake Button */}
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between">
              <button
                onClick={() => handleDownloadKeepsake(item)}
                disabled={downloadingCard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save This Memory Keepsake</span>
              </button>

              <span className="text-xs text-pink-400">💗 Bestie Memory</span>
            </div>
          </div>
        ))}
      </div>

      {/* Success alert */}
      {downloadSuccess && (
        <div className="fixed bottom-6 z-50 bg-slate-900 text-white text-xs py-2 px-4 rounded-full shadow-lg animate-fade-in flex items-center gap-2">
          <span>✨</span>
          <span>Digital Memory Keepsake saved to your downloads!</span>
        </div>
      )}

      {/* Final Replay Journey Button */}
      <div className="w-full max-w-sm text-center mb-10">
        <button
          onClick={handleReplayClick}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-base shadow-lg shadow-pink-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Replay Surprise Journey ↻</span>
        </button>
        <p className="text-xs text-pink-500 mt-2 flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 fill-pink-500" />
          <span>Dedicated to Sadaf with endless love</span>
          <Heart className="w-3 h-3 fill-pink-500" />
        </p>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePreviewIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setActivePreviewIndex(null)}
        >
          <button
            onClick={() => setActivePreviewIndex(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-lg w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-black/40 shadow-2xl border border-white/20">
              <img
                src={photos[activePreviewIndex].imagePath}
                alt={photos[activePreviewIndex].title}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-contain"
              />
              {/* Fallback in lightbox if photo missing */}
              <div className={`absolute inset-0 bg-gradient-to-br ${photos[activePreviewIndex].fallbackGradient} flex flex-col items-center justify-center p-6 text-white text-center -z-10`}>
                <Camera className="w-10 h-10 mb-2 opacity-80" />
                <p className="font-display text-2xl font-black">{photos[activePreviewIndex].title}</p>
                <p className="text-sm text-white/90">{photos[activePreviewIndex].caption}</p>
              </div>
            </div>

            {/* Captions in lightbox */}
            <div className="mt-4 text-center text-white px-2">
              <h3 className="font-display text-2xl font-bold">
                {photos[activePreviewIndex].title}
              </h3>
              <p className="text-base font-bold text-pink-300 mt-0.5">
                {photos[activePreviewIndex].caption}
              </p>
              <p className="text-xs text-white/70 mt-1 max-w-sm">
                {photos[activePreviewIndex].story}
              </p>
            </div>

            {/* Prev/Next in Lightbox */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => {
                  audioManager.playClick();
                  setActivePreviewIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : photos.length - 1
                  );
                }}
                className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => handleDownloadKeepsake(photos[activePreviewIndex])}
                className="py-2.5 px-4 rounded-full bg-pink-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Save Keepsake</span>
              </button>

              <button
                onClick={() => {
                  audioManager.playClick();
                  setActivePreviewIndex((prev) =>
                    prev !== null && prev < photos.length - 1 ? prev + 1 : 0
                  );
                }}
                className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
