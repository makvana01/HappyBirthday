import React, { useState, useEffect } from 'react';
import { BIRTHDAY_DATA } from './data/birthdayConfig';
import { FloatingParticles } from './components/FloatingParticles';
import { AudioControl } from './components/AudioControl';
import { JourneyHeader } from './components/JourneyHeader';

// Stage components
import { StageCountdown } from './stages/StageCountdown';
import { StagePasscode } from './stages/StagePasscode';
import { StageWelcome } from './stages/StageWelcome';
import { StageLetterEnvelope } from './stages/StageLetterEnvelope';
import { StagePhotoMemories } from './stages/StagePhotoMemories';
import { StageMemoryJourney } from './stages/StageMemoryJourney';
import { StageHeartGame } from './stages/StageHeartGame';
import { StageBestFriendQuiz } from './stages/StageBestFriendQuiz';
import { StageArrowShoot } from './stages/StageArrowShoot';
import { StageBloomingTree } from './stages/StageBloomingTree';
import { StageCakeCutting } from './stages/StageCakeCutting';
import { StageAwardCeremony } from './stages/StageAwardCeremony';
import { StageSpinWheel } from './stages/StageSpinWheel';
import { StageSurpriseBox } from './stages/StageSurpriseBox';
import { StageFinalMessage } from './stages/StageFinalMessage';
import { StageMemoryGallery } from './stages/StageMemoryGallery';

export type StageId =
  | 'countdown'
  | 'passcode'
  | 'welcome'
  | 'envelope'
  | 'photomemories'
  | 'memoryjourney'
  | 'heartgame'
  | 'quiz'
  | 'arrowshoot'
  | 'bloomingtree'
  | 'cakecutting'
  | 'award'
  | 'wheel'
  | 'surprisebox'
  | 'finalmessage'
  | 'gallery';

const STAGES_ORDER: { id: StageId; title: string }[] = [
  { id: 'passcode', title: 'Secret Entry 🔐' },
  { id: 'countdown', title: 'Birthday Countdown ⏳' },
  { id: 'welcome', title: 'Welcome Sadaf 💗' },
  { id: 'envelope', title: 'Special Letter 💌' },
  { id: 'photomemories', title: 'Photo Memories 📸' },
  { id: 'memoryjourney', title: 'Memory Journey ✨' },
  { id: 'heartgame', title: 'Bestie Challenge 🎮' },
  { id: 'quiz', title: 'Bestie Quiz 👀' },
  { id: 'arrowshoot', title: 'Birthday Arrow 🏹' },
  { id: 'bloomingtree', title: 'Blooming Heart 🌸❤️' },
  { id: 'cakecutting', title: 'Royal Cake Cutting 🎂' },
  { id: 'award', title: 'Awards Ceremony 🏆' },
  { id: 'wheel', title: 'Bestie Wheel 🎡' },
  { id: 'surprisebox', title: 'Mystery Surprise 🎁' },
  { id: 'finalmessage', title: 'Birthday Message 🎂' },
  { id: 'gallery', title: 'Memory Gallery 📸' },
];

export default function App() {
  const [currentStageId, setCurrentStageId] = useState<StageId>('passcode');

  const currentIndex = STAGES_ORDER.findIndex((s) => s.id === currentStageId);
  const currentStageInfo = STAGES_ORDER[currentIndex] || STAGES_ORDER[0];

  const isDarkSection = currentStageId === 'finalmessage';

  const goToNextStage = () => {
    if (currentIndex < STAGES_ORDER.length - 1) {
      setCurrentStageId(STAGES_ORDER[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevStage = () => {
    if (currentIndex > 0) {
      setCurrentStageId(STAGES_ORDER[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setCurrentStageId('passcode');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top on stage change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStageId]);

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-between transition-colors duration-700 ${
        isDarkSection
          ? 'bg-[#1C0D20] text-slate-100'
          : 'bg-gradient-to-b from-[#FFF7F4] via-[#FFF0F2] to-[#FFE6EC] text-[#2D121F]'
      }`}
    >
      {/* Background Floating Hearts & Sparkles */}
      <FloatingParticles isDarkTheme={isDarkSection} />

      {/* Floating Audio Manager (Always available) */}
      <AudioControl />

      {/* Discrete Journey Header (Shown after Passcode stage) */}
      {currentStageId !== 'passcode' ? (
        <JourneyHeader
          currentStage={currentIndex + 1}
          totalStages={STAGES_ORDER.length}
          stageTitle={currentStageInfo.title}
          onPrev={goToPrevStage}
          onRestart={handleRestart}
          showNavControls={true}
        />
      ) : null}

      {/* Main Interactive Stage Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-3 py-4 max-w-xl mx-auto">
        {currentStageId === 'passcode' && (
          <StagePasscode onSuccess={() => setCurrentStageId('countdown')} />
        )}

        {currentStageId === 'countdown' && (
          <StageCountdown onUnlock={() => setCurrentStageId('welcome')} />
        )}

        {currentStageId === 'welcome' && (
          <StageWelcome onContinue={() => setCurrentStageId('envelope')} />
        )}

        {currentStageId === 'envelope' && (
          <StageLetterEnvelope onNext={() => setCurrentStageId('photomemories')} />
        )}

        {currentStageId === 'photomemories' && (
          <StagePhotoMemories onNext={() => setCurrentStageId('memoryjourney')} />
        )}

        {currentStageId === 'memoryjourney' && (
          <StageMemoryJourney onNext={() => setCurrentStageId('heartgame')} />
        )}

        {currentStageId === 'heartgame' && (
          <StageHeartGame onSuccess={() => setCurrentStageId('quiz')} />
        )}

        {currentStageId === 'quiz' && (
          <StageBestFriendQuiz onComplete={() => setCurrentStageId('arrowshoot')} />
        )}

        {currentStageId === 'arrowshoot' && (
          <StageArrowShoot onNext={() => setCurrentStageId('bloomingtree')} />
        )}

        {currentStageId === 'bloomingtree' && (
          <StageBloomingTree onNext={() => setCurrentStageId('cakecutting')} />
        )}

        {currentStageId === 'cakecutting' && (
          <StageCakeCutting onNext={() => setCurrentStageId('award')} />
        )}

        {currentStageId === 'award' && (
          <StageAwardCeremony onNext={() => setCurrentStageId('wheel')} />
        )}

        {currentStageId === 'wheel' && (
          <StageSpinWheel onNext={() => setCurrentStageId('surprisebox')} />
        )}

        {currentStageId === 'surprisebox' && (
          <StageSurpriseBox onOpenFinal={() => setCurrentStageId('finalmessage')} />
        )}

        {currentStageId === 'finalmessage' && (
          <StageFinalMessage onProceedToGallery={() => setCurrentStageId('gallery')} />
        )}

        {currentStageId === 'gallery' && (
          <StageMemoryGallery onReplay={handleRestart} />
        )}
      </main>

      {/* Discreet Footer Note */}
      <footer className="relative z-10 py-3 text-center text-[11px] font-medium text-pink-400/80 pointer-events-none">
        Handcrafted for {BIRTHDAY_DATA.name} · Happy Birthday 2026 💗
      </footer>
    </div>
  );
}
