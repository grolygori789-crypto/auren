export default {
  nav: { today: 'Today', rhythm: 'Rhythm', signals: 'Signals', archive: 'Archive', you: 'You' },
  opening: { tagline: 'Your body, understood.', studio: 'By Benedict Interactive' },
  today: {
    eyebrow: 'Today',
    morning: 'Good morning.', afternoon: 'Good afternoon.', evening: 'Good evening.',
    sub: 'A quiet moment to notice how you are.',
    stateKicker: 'Your daily state',
    emptyTitle: 'Your baseline begins here.',
    emptyCopy: 'Auren starts with what you notice. A brief check-in gives today context without pretending to know more than you’ve told it.',
    checkin: 'Start daily check-in',
    savedTitle: 'Today is recorded.',
    savedCopy: 'These are your own observations for today. Auren will wait for continuity before inferring patterns.',
    editCheckin: 'Update today’s check-in',
    observed: 'Observed today',
    understand: 'What Auren will understand',
    private: 'Private by design',
    patternTitle: 'Your patterns, over time',
    patternDesc: 'Auren compares your days with your own recent baseline before drawing conclusions.',
    evidenceTitle: 'Evidence before advice',
    evidenceDesc: 'Signals explain what changed, how much data supports it, and how confident Auren is.',
    trust: [
      ['No diagnosis', 'Wellbeing, not medicine'],
      ['Your baseline', 'You compared with you'],
      ['Explainable', 'See why Auren thinks so'],
    ],
  },
  checkin: {
    title: 'Daily check-in',
    intro: 'Report how today feels. These are observations, not a medical assessment.',
    sleep: 'Sleep quality', energy: 'Energy', stress: 'Stress', mood: 'Mood', movement: 'Movement',
    low: 'Low', high: 'High', calm: 'Calm', stressed: 'High',
    save: 'Save today’s observations', close: 'Not now', saved: 'Saved privately on this device.', error: 'Auren could not save this check-in on this device.'
  },
  rhythm: {
    title: 'Rhythm', sub: 'See how the shape of your days changes over time.',
    emptyTitle: 'Your rhythm needs a little time.',
    emptyCopy: 'After several check-ins, Auren can begin showing how sleep, energy, stress, mood and movement travel together.'
  },
  signals: {
    title: 'Signals', sub: 'Patterns worth your attention, with the evidence behind them.',
    emptyTitle: 'No signal before the data.',
    emptyCopy: 'Auren will wait until there is enough continuity to say something useful—and show you why.'
  },
  archive: {
    title: 'Archive', sub: 'A calm history of your reported state—not a leaderboard.',
    emptyTitle: 'Your first portrait will appear here.',
    emptyCopy: 'Complete a daily check-in to begin your private state archive.'
  },
  you: {
    title: 'You', sub: 'Your settings, data and Auren preferences in one quiet place.',
    language: 'Language', languageSub: 'Native English / ภาษาไทย',
    appearance: 'Auren Atmospheres', appearanceSub: 'Five curated tonal environments',
    privacy: 'Data & Privacy', privacySub: 'Export, delete and understand your data',
    motion: 'Motion', motionSub: 'Respect system Reduced Motion',
    noAccount: 'No account required', noAccountSub: 'Cloud backup can be added later without blocking V1',
    about: 'About Auren', aboutSub: 'Personal Health Intelligence',
    themes: {
      pearl: { name: 'Pearl Dawn', desc: 'Warm ivory · champagne · soft blush' },
      mineral: { name: 'Mineral Mist', desc: 'Pearl · pale aqua · cool grey-blue' },
      rose: { name: 'Rose Veil', desc: 'Warm cream · nude rose · dusty blush' },
      sage: { name: 'Sage Haze', desc: 'Ivory · pale sage · mineral green' },
      dusk: { name: 'Quiet Dusk', desc: 'Champagne · mauve-grey · blue-grey' },
    },
  },
  common: { build: 'Auren Atmospheres', system: 'System' }
};
