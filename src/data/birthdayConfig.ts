// =========================================================================
// CUSTOMIZATION AREA - ROMANTIC LOVE THEME FOR KUCHUPUCHU'S BIRTHDAY SURPRISE
// =========================================================================

export interface MemoryPhoto {
  id: number;
  title: string;
  caption: string;
  story: string;
  dateTag: string;
  imagePath: string;
  fallbackGradient: string;
  accentEmoji: string;
}

export interface QuizQuestion {
  question: string;
  options: {
    text: string;
    reaction: string;
    isBestieAnswer?: boolean;
  }[];
}

export interface WheelOption {
  id: string;
  label: string;
  emoji: string;
  color: string;
  challenge: string;
}

export const BIRTHDAY_DATA = {
  // 1. BASIC INFORMATION
  name: "Kuchupuchu",
  nickname: "Meri Kuchupuchu / My Love",
  birthDateString: "02/10/2003", // DD/MM/YYYY
  birthDay: 2,
  birthMonth: 10, // October (1-indexed)
  birthYear: 2003,
  
  // Passcode for secret entry
  passcode: "0209",
  relationship: "THE LOVE OF MY LIFE 💍❤️",

  // 2. AUDIO & MUSIC CONFIGURATION
  musicPath: "/music/birthday-song.mp3",
  songTitle: "Our Love Story 🎵💖",

  // 3. COUNTDOWN & WELCOME COPY
  countdownMessage: "Something truly magical is waiting for my Kuchupuchu... 💗",
  unlockCelebrationHeadline: "IT'S YOUR DAY, KUCHUPUCHU! 💍❤️",
  unlockCelebrationSubtext: "The universe is officially celebrating the most beautiful soul and the queen of my heart today!",

  secretScreenHeading: "Before we begin, my love... 💌",
  secretScreenSubtext: "Only the queen of my heart has the key to unlock this romantic realm.",
  secretScreenHint: "(your special date)",
  welcomeTitle: "Welcome, Meri Kuchupuchu 💗",
  welcomeSubtitle: "A world of endless love crafted just for you...",

  // 4. HEARTFELT LOVE LETTER (Line by Line reveal)
  letter: {
    title: "A little love letter for the queen of my heart 💌",
    salutation: "Dear Kuchupuchu,",
    paragraphs: [
      "In a world full of billions of people, my heart found its home in you. You are not just my love—you are my happiest thought, my greatest peace, and my sweetest dream come true.",
      "From your adorable smiles to the cute little ways you get angry, every single detail about you makes me fall in love with you all over again every day.",
      "Thank you for being my strength, my laughter, my safe haven, and the most precious person in my entire existence. Life with you is pure poetry.",
      "Today is 100% all about celebrating YOU, my love. I promise to hold your hand through every storm, cherish every smile, and love you beyond forever. Happy Birthday, Meri Kuchupuchu! 💍💖"
    ],
    closing: "With all my heart, soul, and endless love,",
    signature: "Yours Forever & Always ❤️"
  },

  // 5. 3 PHOTO MEMORIES
  photos: [
    {
      id: 1,
      title: "Queen of My Heart 👑❤️",
      caption: "The moment my heart skipped a beat 💗",
      story: "Look at how breathtakingly beautiful you are! That radiant smile of yours can light up the entire world in a heartbeat.",
      dateTag: "Kuchupuchu Portrait 1",
      imagePath: "/photos/photo1.jpg",
      fallbackGradient: "from-pink-400 via-rose-300 to-pink-200",
      accentEmoji: "👑"
    },
    {
      id: 2,
      title: "Pure Cuteness Overload 🎀",
      caption: "My favorite smile in the whole universe...",
      story: "100% natural, 100% adorable! This picture captures your cute, playful, and charming side that I am endlessly obsessed with.",
      dateTag: "Kuchupuchu Portrait 2",
      imagePath: "/photos/photo2.jpg",
      fallbackGradient: "from-rose-400 via-pink-300 to-amber-200",
      accentEmoji: "💖"
    },
    {
      id: 3,
      title: "My Forever Girl ✨",
      caption: "The one who stole my heart completely 💍",
      story: "The prettiest soul I know, inside and out. Thank you for making my life so magical just by being in it, Kuchupuchu.",
      dateTag: "Kuchupuchu Portrait 3",
      imagePath: "/photos/photo3.jpg",
      fallbackGradient: "from-fuchsia-400 via-pink-400 to-rose-200",
      accentEmoji: "✨"
    }
  ] as MemoryPhoto[],

  // 6. MINI HEART GAME
  game: {
    title: "Catch My Love Hearts 💗",
    subtitle: "Collect 10 love hearts & roses to unlock the next chapter!",
    targetScore: 10,
    durationSeconds: 20,
    winMessage: "LOVE LEVEL: INFINITY & BEYOND 💍❤️"
  },

  // 7. LOVE & SOULMATE QUIZ
  quiz: {
    title: "How Connected Are Our Hearts? 👀❤️",
    subtitle: "5 quick questions to test our soulmate telepathy!",
    questions: [
      {
        question: "What is my absolute favorite thing about you? 💖",
        options: [
          { text: "Your warm, cute, heart-melting smile", reaction: "Yes! It brightens my darkest days! 🥺❤️", isBestieAnswer: true },
          { text: "Your innocent drama and cute giggles", reaction: "Too cute to handle honestly! 🥰" },
          { text: "How caring and loving your heart is", reaction: "A heart of pure gold! ✨" },
          { text: "Literally everything, head to toe!", reaction: "THE TRUE ANSWER! Everything about you is perfect! 💍💖", isBestieAnswer: true }
        ]
      },
      {
        question: "When do I miss you the most?",
        options: [
          { text: "Late nights when everything is quiet", reaction: "Under the stars wishing you were beside me! 🌙" },
          { text: "Every time something funny happens", reaction: "Because you're the first person I want to tell! 😂" },
          { text: "Literally 24/7 with every single heartbeat", reaction: "1000% TRUE! You never leave my thoughts! 💖", isBestieAnswer: true },
          { text: "Whenever I eat your favorite food", reaction: "Saving the best bite for you always! 🍰" }
        ]
      },
      {
        question: "Who is the certified clingy baby in our relationship? 🥺",
        options: [
          { text: "Kuchupuchu when she wants attention", reaction: "Cutest baby in the world! 🧸" },
          { text: "Me because I can never get enough of you", reaction: "Guilty! Always obsessed with you! 🙋‍♂️❤️" },
          { text: "Both of us clinging onto each other forever", reaction: "CORRECT! Inseparable love forever! 🔒💖", isBestieAnswer: true },
          { text: "Depends on who misses who more", reaction: "A daily love competition! 🏆" }
        ]
      },
      {
        question: "What does our future look like together? 🏡✨",
        options: [
          { text: "Endless adventures, road trips, and laughter", reaction: "Exploring the world hand in hand! 🌍" },
          { text: "Cozy nights, late movies, and sweet hugs", reaction: "My favorite definition of home! ☕" },
          { text: "A beautiful lifetime of unconditional love", reaction: "AMEN! Forever and always! 💍💖", isBestieAnswer: true },
          { text: "All of the above and so much more", reaction: "YES! The sweetest forever ever written! 🌟" }
        ]
      },
      {
        question: "How much do I love you, Kuchupuchu? 🌹",
        options: [
          { text: "To the moon and back", reaction: "Way beyond that! 🚀" },
          { text: "More than all the stars in the universe", reaction: "Still not enough to measure it! ✨" },
          { text: "More than words could ever describe", reaction: "THE ABSOLUTE TRUTH! Beyond infinity! 💖💍", isBestieAnswer: true },
          { text: "Infinitely with every beat of my heart", reaction: "Forever yours, my love! ❤️" }
        ]
      }
    ] as QuizQuestion[],
    resultScoreText: "Soulmate Match: 10000% ❤️",
    resultDescription: "True soulmate telepathy confirmed. Two hearts destined for an eternal, breathtaking love story!"
  },

  // 8. SOULMATE HONORS CEREMONY
  award: {
    title: "THE OFFICIAL SOULMATE AWARDS 🏆",
    recipient: "KUCHUPUCHU",
    awardName: "QUEEN OF MY HEART & SOUL",
    officialDate: "2 October 2026",
    categories: [
      { icon: "👑", title: "Prettiest Smile in the Universe", desc: "Instantly brings sunshine and butterflies to my life." },
      { icon: "💖", title: "Permanent Owner of My Heart", desc: "No refunds, no returns, my heart is officially yours forever." },
      { icon: "🏡", title: "My Safe Place & Forever Home", desc: "In your arms is where I belong, today and always." },
      { icon: "✨", title: "Most Precious Blessing in My Life", desc: "Meeting you is the greatest gift God ever gave me." },
      { icon: "💍", title: "Lifetime Soulmate Distinction", desc: "Certified love of my life, through all of eternity." }
    ]
  },

  // 9. SPIN THE LOVE WHEEL
  wheel: {
    title: "Spin Your Love Wheel 🎡",
    subtitle: "A romantic little wheel for sweet treats & love dares!",
    options: [
      { id: "hug", label: "Tight Hug", emoji: "🫂", color: "#FF8FB8", challenge: "A warm, tight, long cuddle is officially owed right now! ❤️" },
      { id: "kiss", label: "Sweet Kiss", emoji: "💋", color: "#FFB3D9", challenge: "A sweet kiss on the forehead for my birthday queen! 👑" },
      { id: "date", label: "Dream Date", emoji: "🌹", color: "#FF65A3", challenge: "Your choice of romantic dinner date anywhere you want! 🍽️" },
      { id: "compliment", label: "Love Note", emoji: "💌", color: "#FF9EC7", challenge: "You are the most breathtaking, kind, and precious girl in existence! ✨" },
      { id: "promise", label: "Forever Promise", emoji: "💍", color: "#F472B6", challenge: "I promise to always hold your hand and stand by your side forever! 🔒" },
      { id: "wish", label: "Make a Wish", emoji: "✨", color: "#EC4899", challenge: "Make a secret wish in your heart right now, and I will make it come true! 🌟" }
    ] as WheelOption[]
  },

  // 10. SURPRISE BOX & FINAL EMOTIONAL CLIMAX
  surpriseBox: {
    prompt: "One last romantic surprise... 🎁",
    hint: "Tap the box gently to unwrap the love"
  },

  finalMessage: {
    headline: "Happy Birthday, My Kuchupuchu! 🎂💍❤️",
    paragraphs: [
      "To the girl who holds my whole world in her hands, my sweetest dream, my greatest blessing, and the love of my life...",
      "May this special year bring you boundless happiness, peace, every single dream you hold in your heart coming true, and love that never fades.",
      "You have touched my soul in ways I never knew were possible. Thank you for your warmth, your gentleness, and the pure joy you bring into my existence.",
      "No matter what tomorrow brings, know that you are deeply, madly, and unconditionally loved by me—today, tomorrow, and across all lifetimes."
    ],
    toast: "Forever yours, with all my heart... 🥂💍💖",
    finalButtonText: "Our Love Story Continues ❤️"
  },

  // 11. THEME PALETTE
  theme: {
    primaryPink: "#FF8FB8",
    softBlush: "#FFE8EE",
    hotPink: "#FF4F91",
    deepRose: "#C2185B",
    softLavender: "#F3E8FF",
    darkPlum: "#2D1226"
  }
};
