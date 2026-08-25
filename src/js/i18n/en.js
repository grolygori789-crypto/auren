export default {
  nav: { today: 'Today', rhythm: 'Rhythm', signals: 'Signals', archive: 'Archive', you: 'You' },
  opening: { tagline: 'Your body, understood.', studio: 'By Benedict Interactive' },
  today: {
    eyebrow: 'Today', morning: 'Good morning.', afternoon: 'Good afternoon.', evening: 'Good evening.', sub: 'A quiet moment to notice how you are.',
    stateKicker: 'Your daily state', emptyTitle: 'Your baseline begins here.', emptyCopy: 'Auren starts with what you notice. A brief check-in gives today context without pretending to know more than you’ve told it.',
    checkin: 'Start daily check-in', savedTitle: 'Today, captured.', savedCopy: 'Saved. Auren will keep learning your personal baseline as the days add up.', editCheckin: 'Update today’s check-in', observed: 'Observed today', observedLevels: { veryLow:'Very low', low:'Low', steady:'Steady', high:'High', excellent:'Excellent', calm:'Calm', light:'Light', moderate:'Moderate', highStress:'High', veryHighStress:'Very high' },
    haloEyebrow: 'Auren Halo', haloTitle: { building: 'Building your context', learning: 'Auren is learning you', strong: 'Strong balance', excellent: 'Excellent balance' },
    haloCopy: {
      building: 'Complete your body profile and today’s check-in to begin a transparent view of your current context.',
      learning: 'Auren has enough information to begin describing your context, but not enough to overstate certainty.',
      strong: 'Your available body profile and today’s self-report are well aligned. Keep what is working.',
      excellent: 'Your available profile, today’s state and recent continuity are all strongly aligned. Maintain—don’t chase change.'
    },
    haloDetails: 'Why this?',
    haloSegments: { body: 'Body range', daily: 'Daily state', movement: 'Movement', continuity: 'Continuity' },
    bodySection: 'Body context', bodyPrivate: 'Stored on this device', bodyMissingTitle: 'Add your body profile', bodyMissingCopy: 'Age, height, weight, activity and goal give Auren the context needed to interpret your body without guessing.', bodySetup: 'Set up body profile',
    bodyWithinTitle: 'Within the general adult reference range', bodyBelowTitle: 'Below the general adult reference range', bodyAboveTitle: 'Above the general adult reference range', bodyWellAboveTitle: 'Well above the general adult reference range', bodyYouthTitle: 'Age-specific context required',
    bodyWithinCopy: 'From height and weight alone, no weight change is suggested by the general adult BMI reference. Auren will still consider your own trend and daily state.',
    bodyBelowCopy: 'Your current height and weight sit below the general adult BMI reference. Auren will not prescribe a target from this number alone.',
    bodyAboveCopy: 'Your current height and weight sit above the general adult BMI reference. If weight change matters to you, Auren will favor gradual, sustainable change over a hard target.',
    bodyWellAboveCopy: 'Your current height and weight sit well above the general adult BMI reference. This is context, not a diagnosis; broader health factors matter.',
    bodyYouthCopy: 'Auren will not apply adult BMI ranges before age 20. Youth interpretation requires an age-appropriate growth reference, so this build keeps the result deliberately limited.',
    bodyBmi: 'BMI', bodyReference: 'General reference', bodyAge: 'Age', bodyYears: 'yr',
    oneActionTitle: 'One useful move', oneActionBasis: { observed: 'Based on today', combined: 'Based on available context' },
    oneActions: {
      checkin: ['Check in before changing anything', 'Auren needs today’s state before it can offer a useful next move.'],
      recovery: ['Protect recovery tonight', 'Your reported sleep is low today. Favor a calmer evening and a consistent sleep window rather than pushing harder.'],
      decompress: ['Create a little room', 'Stress is high today. A short low-pressure break, gentle walk or quiet reset may be more useful than adding another demand.'],
      move: ['Add a little easy movement', 'Movement is low today. If it feels comfortable, a short easy walk or mobility break is enough—no heroic workout required.'],
      pace: ['Spend energy carefully', 'Energy is low today. Keep the important things, reduce the optional ones, and let recovery do some work.'],
      maintain: ['Maintain—don’t chase change', 'Your available body context and today’s observations do not suggest that you need to force a change. Keep the basics steady.'],
      observe: ['Keep observing the pattern', 'There is no single high-confidence adjustment to push today. Keep the day simple and give Auren more continuity.']
    },
    understand: 'What Auren will understand', private: 'Private by design', patternTitle: 'Your patterns, over time', patternDesc: 'Auren compares your days with your own recent baseline before drawing conclusions.', evidenceTitle: 'Evidence before advice', evidenceDesc: 'Signals explain what changed, how much data supports it, and how confident Auren is.',
    trust: [['No diagnosis','Wellbeing, not medicine'],['Your baseline','You compared with you'],['Explainable','See why Auren thinks so']],
  },
  checkin: {
    title: 'Daily check-in', intro: 'Report how today feels. These are observations, not a medical assessment.', sleep: 'Sleep quality', energy: 'Energy', stress: 'Stress', mood: 'Mood', movement: 'Movement', low: 'Low', high: 'High', calm: 'Calm', stressed: 'High', save: 'Save today’s observations', close: 'Not now', saved: 'Saved privately on this device.', error: 'Auren could not save this check-in on this device.'
  },
  bodyProfile: {
    title: 'Body profile', intro: 'Auren asks only for information it can use transparently. No account is required, and this profile stays on this device in this build.', age: 'Age', ageHint: 'Used to choose the appropriate reference model—not to judge you.', height: 'Height', weight: 'Current weight', activity: 'Typical activity', goal: 'What would you like Auren to help with?',
    activityOptions: { low: 'Mostly seated / low movement', light: 'Some regular movement', moderate: 'Moderately active', high: 'Highly active' },
    goalOptions: { understand: 'Understand my body first', maintain: 'Maintain where I am', lose: 'Consider losing weight', gain: 'Consider gaining weight' },
    save: 'Save body profile', close: 'Not now', saved: 'Body profile saved on this device.', error: 'Auren could not save this profile.', adultNote: 'For adults 20+, this build uses general BMI reference ranges as one context signal. BMI cannot distinguish muscle from body fat or describe overall health.', youthNote: 'For people under 20, Auren does not apply adult BMI ranges. An age-appropriate growth reference is required for interpretation.'
  },
  halo: {
    title: 'Why your Halo looks this way', intro: 'The Halo shows what Auren knows, what it calculated, and where it still needs continuity. It is not a medical score.',
    observed: 'Observed', calculated: 'Calculated', inferred: 'Inferred', confidence: 'Confidence',
    status: { good: 'Aligned', attention: 'Worth attention', developing: 'Developing', missing: 'Not enough data', limited: 'Reference limited' },
    evidenceBody: 'Body range uses age, height and weight. For adults 20+, BMI is calculated as a general reference—not an ideal-weight verdict.',
    evidenceDaily: 'Daily state comes only from today’s self-report: sleep, energy, stress, mood and movement.',
    evidenceMovement: 'Movement reflects today’s self-reported movement level, not steps or wearable data.',
    evidenceContinuity: 'Continuity reflects how many daily check-ins are available in the recent 14-day window.',
    close: 'Close'
  },
  rhythm: { title: 'Rhythm', sub: 'See how the shape of your days changes over time.', emptyTitle: 'Your rhythm needs a little time.', emptyCopy: 'After several check-ins, Auren can begin showing how sleep, energy, stress, mood and movement travel together.' },
  signals: { title: 'Signals', sub: 'Patterns worth your attention, with the evidence behind them.', emptyTitle: 'No signal before the data.', emptyCopy: 'Auren will wait until there is enough continuity to say something useful—and show you why.' },
  archive: { title: 'Archive', sub: 'A calm history of your reported state—not a leaderboard.', emptyTitle: 'Your first portrait will appear here.', emptyCopy: 'Complete a daily check-in to begin your private state archive.' },
  you: {
    title: 'You', sub: 'Your body profile, settings, data and Auren preferences in one quiet place.', bodyProfile: 'Body profile', bodyProfileMissing: 'Age · height · weight · activity · goal', bodyProfileReady: 'Edit the context Auren uses about your body', identityEyebrow:'Personal identity', identityTitle:'Make Auren feel yours', identityNamedCopy:'Auren uses your display name only to make the experience feel personal. Your photo stays on this device and is never used to analyze your body.', identityCopy:'Choose a display name and profile photo to make Auren feel unmistakably yours. Both stay on this device in this build.', identityNameLabel:'Display name', identityNamePlaceholder:'What should Auren call you?', identityNameSave:'Save name', identityNameSaved:'Name updated.', identityNameError:'Auren could not save that name.', identityUpload:'Add photo', identityChange:'Change photo', identityRemove:'Remove', identitySaved:'Profile photo updated.', identityRemoved:'Profile photo removed.', identityError:'Auren could not use that image.', avatarEditorEyebrow:'Profile photo', avatarEditorTitle:'Frame it your way', avatarEditorIntro:'Drag to position your photo, then use the zoom control to choose exactly what appears inside the circle.', avatarZoomLabel:'Zoom', avatarCropHint:'Drag the image to reposition it. The circular preview is exactly how it will appear in Auren.', avatarCropSave:'Use this photo', avatarCropReset:'Reset', avatarCropCancel:'Cancel', avatarCropSaving:'Saving your photo…', language: 'Language', languageSub: 'Native English / ภาษาไทย', appearance: 'Auren Atmospheres', appearanceSub: 'Five curated tonal environments', privacy: 'Data & Privacy', privacySub: 'Export, delete and understand your data', motion: 'Motion', motionSub: 'Respect system Reduced Motion', noAccount: 'No account required', noAccountSub: 'Cloud backup can be added later without blocking V1', about: 'About Auren', aboutSub: 'Personal Health Intelligence',
    themes: { pearl:{name:'Pearl Dawn',desc:'Warm ivory · champagne · soft blush'}, mineral:{name:'Mineral Mist',desc:'Pearl · pale aqua · cool grey-blue'}, rose:{name:'Rose Veil',desc:'Warm cream · nude rose · dusty blush'}, sage:{name:'Sage Haze',desc:'Ivory · pale sage · mineral green'}, dusk:{name:'Quiet Dusk',desc:'Champagne · mauve-grey · blue-grey'} }
  },
  common: { build: 'Personal Presence & Living Core', system: 'System' }
};
