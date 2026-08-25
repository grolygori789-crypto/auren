export default {
  nav: { today: 'Today', rhythm: 'Rhythm', signals: 'Signals', archive: 'Archive', you: 'You' },
  opening: { tagline: 'Your body, understood.', studio: 'By Benedict Interactive' },
  today: {
    eyebrow: 'Today', morning: 'Good morning.', afternoon: 'Good afternoon.', evening: 'Good evening.', sub: 'A quiet moment to notice what your body is telling you.',
    stateKicker: 'Your daily state', emptyTitle: 'Nothing to fix yet.', emptyCopy: 'Start with what you can observe. A short check-in gives Auren today’s context without pretending to know more than you shared.', checkin: 'Start today’s check-in',
    savedTitle: 'Today, captured.', savedCopy: 'Auren has one more piece of your personal baseline.', editCheckin: 'Edit today’s check-in', observed: 'Observed today',
    observedLevels: { veryLow:'Very low', low:'Low', steady:'Steady', high:'High', excellent:'Excellent', calm:'Calm', light:'Light', moderate:'Moderate', highStress:'High', veryHighStress:'Very high' },
    haloEyebrow: 'Auren Halo',
    haloTitle: { building:'Building your context', learning:'Auren is learning you', strong:'Strong balance', excellent:'Excellent balance' },
    haloCopy: {
      building:'The Halo stays quiet until there is enough real information to support each segment.',
      learning:'Auren can begin describing your context, while keeping uncertainty visible.',
      strong:'The body context and today’s observations are broadly aligned. Keep what is working.',
      excellent:'Body context, today’s state, movement and recent continuity are strongly aligned. No change needs to be chased.'
    },
    haloDetails:'Why this?', haloSegments:{ body:'Body context', daily:'Daily state', movement:'Movement', trend:'Personal trend' },
    bodySection:'Body context', bodyPrivate:'Stored on this device',
    bodyMissingTitle:'Add your body context', bodyMissingCopy:'Age, height, weight, activity and training context help Auren interpret your numbers without guessing.',
    bodyAlignedTitle:'General reference aligned', bodyAlignedCopy:'Your height and weight sit within the general adult BMI reference. That is context, not a diagnosis, and Auren will keep looking at your own trend.',
    bodyAthleticTitle:'Training context changes the picture', bodyAthleticCopy:'Your BMI is above the general reference, but regular resistance or athletic training plus the available waist context may mean muscularity contributes to body weight. Auren will not recommend weight loss from BMI alone.',
    bodyMuscularTitle:'Muscularity may be part of the picture', bodyMuscularCopy:'Your BMI is above the general reference and your training pattern can raise body weight through lean mass. More context such as waist or body composition can improve interpretation.',
    bodyAboveTitle:'More context will improve this reading', bodyAboveCopy:'Your BMI is above the general adult reference. Auren treats this as a screening signal, not a conclusion about body fat or a reason by itself to lose weight.',
    bodyAboveWaistTitle:'Body context worth reviewing', bodyAboveWaistCopy:'Both BMI and the supplied waist measure sit above their general reference. This is still not a diagnosis, but it is stronger context than BMI alone.',
    bodyBelowTitle:'Below the general adult BMI reference', bodyBelowCopy:'Your current height and weight sit below the general adult BMI reference. Auren will not prescribe a target from this number alone.',
    bodyWaistTitle:'Waist context deserves attention', bodyWaistCopy:'BMI is within the general adult range, while the supplied waist measure is above the general sex-specific reference. Auren keeps both pieces visible rather than letting one number overrule the other.',
    bodyYouthTitle:'Age-specific reference required', bodyYouthCopy:'Auren does not apply adult BMI categories below age 20. Youth interpretation needs age- and sex-specific growth references, so the result stays intentionally limited here.',
    bodyBmi:'BMI', bodyReference:'General BMI range', bodyTraining:'Training', bodyWaist:'Waist', bodyConfidence:'Confidence', bodyAge:'Age', bodyYears:'yr', bodyNotProvided:'Not provided',
    confidence:{ low:'Low', moderate:'Moderate', high:'High', limited:'Limited' },
    oneActionTitle:'One useful move', oneActionBasis:{ observed:'From today', combined:'From available context' },
    oneActions:{
      checkin:['Check in before changing anything', 'Auren needs today’s state before it can choose a useful next move.'],
      recovery:['Protect recovery tonight', 'Sleep is the clearest low point today. Give tonight more room for a steady wind-down and consistent sleep timing.'],
      decompress:['Create a little room', 'Stress stands out today. A short pause, an easy walk, or a quieter block of time may be more useful than adding another demand.'],
      move:['Add easy movement', 'Movement is low today. If your body allows it, a short walk or gentle movement is enough; it does not need to become a hard workout.'],
      pace:['Use your energy deliberately', 'Energy is low today. Keep the important things, trim what can wait, and let recovery do some of the work.'],
      maintain:['Maintain what is working', 'Nothing in the available context gives Auren a strong reason to push a body-weight change today.'],
      observe:['Keep observing the pattern', 'Auren does not have one adjustment it can justify strongly enough today. Keep things simple and add continuity.']
    },
    understand:'What Auren will understand', private:'Private by design', patternTitle:'Your pattern over time', patternDesc:'Auren compares days with your recent personal baseline before it turns a change into a signal.', evidenceTitle:'Evidence before advice', evidenceDesc:'Important signals show what changed, what data was used and how confident Auren can reasonably be.',
    trust:[['No diagnosis','Wellbeing context, not medical care'],['Personal baseline','Your own trend matters first'],['Explainable','See what Auren used and why']]
  },
  checkin: { title:'Daily check-in', intro:'Describe how today feels. These are your observations, not a medical assessment.', sleep:'Sleep', energy:'Energy', stress:'Stress', mood:'Mood', movement:'Movement', low:'Low', high:'High', calm:'Calm', stressed:'High', save:'Save today’s observations', close:'Not now', saved:'Saved on this device', error:'Auren could not save this check-in on this device.' },
  bodyProfile: {
    title:'Body profile', intro:'Auren asks only for context it can use transparently. Optional measurements stay optional, and your profile remains on this device in this build.',
    age:'Age', ageHint:'Used to choose age-appropriate references, not to judge you.',
    sex:'Sex used for health calculations', sexHint:'Only used where a reference genuinely differs by physiological sex. It never chooses your avatar or identity.',
    height:'Height', weight:'Current weight', activity:'General activity level', training:'Training context', trainingHint:'Choose the pattern that best reflects a normal week, not your best week.', frequency:'Training frequency', frequencyUnit:'times / week', goal:'What do you want Auren to help you understand?',
    optionalEvidence:'Optional context — add only if you already know it', waist:'Waist circumference', waistHint:'Optional. Measure around the middle just above the hipbones, after breathing out.', bodyFat:'Body fat', bodyFatHint:'Optional. Enter a measured value only; Auren does not estimate body fat from your photo.',
    sexOptions:{ notSet:'Not set yet', male:'Male reference', female:'Female reference', preferNot:'Prefer not to use sex-specific estimates', other:'Not represented — use non-sex-specific interpretation only' },
    activityOptions:{ low:'Mostly seated / low daily movement', light:'Some regular daily movement', moderate:'Moderate activity or exercise', high:'High activity or frequent exercise' },
    trainingOptions:{ none:'No structured training', general:'Walking / general activity', cardio:'Cardio / endurance', mixed:'Mixed cardio + strength', resistance:'Resistance / weight training', athletic:'Sport / athletic training' },
    goalOptions:{ understand:'Understand my body first', maintain:'Maintain my current body', loseFat:'Reduce body fat / weight', gainWeight:'Gain weight', buildMuscle:'Build muscle', fitness:'Improve fitness', wellbeing:'General wellbeing', unsure:'Not sure yet' },
    save:'Save body profile', close:'Not now', saved:'Body profile saved on this device', error:'Auren could not save this profile.',
    adultNote:'For adults 20+, BMI is used only as a general screening reference. It cannot separate fat from muscle or describe overall health. Training, waist, body composition and personal trend can change how much weight Auren gives that signal.',
    youthNote:'Below age 20, Auren does not apply adult BMI categories. Youth BMI requires age- and sex-specific growth references, so this build deliberately limits the interpretation.'
  },
  halo: {
    title:'Why the Halo looks this way', intro:'Each soft fragment represents a real dimension of context. Missing data stays faint; Auren does not complete the ring to imply certainty it does not have.',
    observed:'Observed', calculated:'Calculated', inferred:'Inferred', combined:'Combined', confidence:'State',
    status:{ good:'Aligned', attention:'Worth attention', developing:'Developing', contextual:'Needs context', missing:'Not enough data', limited:'Reference limited' },
    evidenceBody:'Body context combines age, height, weight, training pattern and optional waist/body-composition data. BMI remains a screening reference rather than a body-fat diagnosis.',
    evidenceDaily:'Daily state comes only from today’s self-reported sleep, energy, stress, mood and movement.',
    evidenceMovement:'Movement combines today’s self-report with the regular activity and training pattern saved in your profile.',
    evidenceTrend:'Personal trend reflects continuity in your recent check-ins and grows stronger as Auren has more of your own history.', close:'Close'
  },
  archive: {
    title:'Archive', sub:'A calm memory of your days — not a scoreboard.', portraits:'Portraits', calendar:'Calendar', emptyTitle:'Your first state portrait will appear here', emptyCopy:'Complete a daily check-in to begin your personal health memory.',
    guideTitle:'Your health memory', guideCopy:'Each day reflects what you recorded and what Auren could reasonably calculate from it. Empty days simply mean no check-in was recorded.',
    monthEyebrow:'Monthly intelligence', monthNoData:'Not enough days yet for a monthly pattern.', checkins:'check-ins', balancedDays:'balanced days', attentionDays:'attention days',
    monthInsight:{ steady:'Your month is still forming. More days will make comparisons more meaningful.', stressDown:'Stress was lower later in the month than earlier.', stressUp:'Stress was higher later in the month than earlier.', energyUp:'Energy was stronger later in the month.', energyDown:'Energy was lower later in the month.', weightStable:'Weight stayed broadly stable across the measurements you saved.', weightChanged:'Your saved weight measurements changed across the month.' },
    legend:{ balanced:'Balanced', attention:'Attention', mixed:'Mixed', empty:'No data' },
    portraitState:{ excellent:'Excellent', balanced:'Balanced', mixed:'Mixed', low:'Challenging' }
  },
  dayDetail:{ eyebrow:'Daily state', observed:'Observed', calculated:'Calculated', weightUpdate:'Weight updated', noCheckin:'No daily check-in was recorded on this day.', noWeight:'No body-weight update that day', evidence:'This view is a record of what you reported plus transparent calculations. It is not a diagnosis.', close:'Close' },
  rhythm:{ title:'Rhythm', sub:'See how days begin to relate as your history grows.', emptyTitle:'Your rhythm needs a little more time', emptyCopy:'With more check-ins, Auren can begin showing how sleep, energy, stress, mood and movement move together.' },
  signals:{ title:'Signals', sub:'Patterns worth noticing, with the evidence behind them.', emptyTitle:'No signal before evidence', emptyCopy:'Auren waits for enough continuity before turning variation into a meaningful signal.' },
  you: {
    title:'You', sub:'Your body context, identity, settings and Auren controls in one place.', bodyProfile:'Body profile', bodyProfileMissing:'Age · height · weight · activity · training', bodyProfileReady:'Edit the context Auren uses to interpret your body',
    identityEyebrow:'Personal identity', identityTitle:'Make Auren feel like yours', identityNamedCopy:'Auren uses your display name only for personalisation. Your profile photo stays on this device and is never used to analyse your body.', identityCopy:'Choose what Auren calls you and add a profile photo if you want. Without a photo, Auren uses your initial or its own neutral orb.',
    identityNameLabel:'Name Auren should call you', identityNamePlaceholder:'What should Auren call you?', identityNameSave:'Save name', identityNameSaved:'Name updated', identityNameError:'Auren could not save this name.',
    identityUpload:'Add photo', identityChange:'Change photo', identityRemove:'Remove photo', identitySaved:'Profile photo updated', identityRemoved:'Profile photo removed', identityError:'Auren could not use this image.',
    avatarEditorEyebrow:'Profile photo', avatarEditorTitle:'Frame it your way', avatarEditorIntro:'Drag to position. Pinch inside this editor or use the slider to zoom; the rest of Auren stays locked at app scale.', avatarZoomLabel:'Zoom', avatarCropHint:'Only the image is saved. The circular guide and editor border are never baked into your photo.', avatarCropSave:'Use this photo', avatarCropReset:'Reset', avatarCropCancel:'Cancel', avatarCropSaving:'Saving photo…',
    howWorks:'How Auren works', howWorksSub:'Guidance for every mode, option and source of insight',
    language:'Language', languageSub:'ภาษาไทย / Native English', appearance:'Auren Atmospheres', appearanceSub:'Five curated environments that change the whole Auren system', privacy:'Data & privacy', privacySub:'Understand, export or remove your local data', motion:'Motion', motionSub:'Respects your system Reduced Motion setting', noAccount:'No account required', noAccountSub:'Cloud backup can come later without blocking the core experience', about:'About Auren', aboutSub:'Personal Health Intelligence',
    themes:{ pearl:{name:'Pearl Dawn',desc:'Warm ivory · champagne · soft blush'}, mineral:{name:'Mineral Mist',desc:'Pearl · pale aqua · cool blue-grey'}, rose:{name:'Rose Veil',desc:'Warm cream · nude rose · dusty blush'}, sage:{name:'Sage Haze',desc:'Ivory · pale sage · mineral green'}, dusk:{name:'Quiet Dusk',desc:'Champagne · mauve-grey · blue-grey'} }
  },
  help: {
    eyebrow:'How Auren uses this', close:'Got it',
    items:{
      age:{ title:'Age', why:'Why Auren asks', whyCopy:'Age determines which reference framework is appropriate. Adult BMI categories are not applied to people under 20.', use:'How it changes Auren', useCopy:'For adults it enables general adult screening references. For younger users, Auren deliberately limits interpretation instead of pretending an adult rule applies.', limit:'Limit', limitCopy:'Age alone does not determine health or the right body weight.', source:'Reference basis', sourceCopy:'CDC growth-chart guidance and adult BMI screening guidance.' },
      sex:{ title:'Sex used for health calculations', why:'Why Auren asks', whyCopy:'Some references, such as general adult waist thresholds and youth growth references, differ by physiological sex.', use:'How it changes Auren', useCopy:'Auren uses this only when a selected reference actually requires it. Choosing not to use sex-specific estimates keeps those interpretations unavailable rather than guessed.', limit:'Identity is separate', limitCopy:'This field never chooses your avatar, display name or gender identity.', source:'Reference basis', sourceCopy:'NHLBI waist references and CDC age/sex-specific youth growth guidance.' },
      activity:{ title:'General activity level', why:'Why Auren asks', whyCopy:'A number on the scale means something different in a mostly sedentary week than in a consistently active routine.', use:'How it changes Auren', useCopy:'Activity adds context to movement and body interpretation. It does not cancel other evidence.', limit:'Limit', limitCopy:'This is self-reported context, not a measured fitness test.' },
      training:{ title:'Training context', why:'Why Auren asks', whyCopy:'Resistance and athletic training can increase lean mass and raise body weight or BMI without the same meaning as extra body fat.', use:'How it changes Auren', useCopy:'Auren can reduce confidence in a BMI-only conclusion and ask for more context rather than automatically suggesting weight loss.', limit:'Important guardrail', limitCopy:'Selecting weight training never makes a high BMI automatically healthy. Waist, body composition, trend and other evidence still matter.', source:'Reference basis', sourceCopy:'CDC notes that BMI cannot distinguish fat from muscle, including in muscular athletes.' },
      goal:{ title:'Your goal', why:'Why Auren asks', whyCopy:'Auren should know what change matters to you before it frames an insight.', use:'How it changes Auren', useCopy:'Goals influence wording and priorities, not the underlying evidence. Choosing “lose fat” does not make Auren label weight loss as necessary.', limit:'Limit', limitCopy:'A goal is preference context, not proof that a change is appropriate.' },
      waist:{ title:'Waist circumference', why:'Why it can help', whyCopy:'Waist adds information about abdominal fat distribution that BMI cannot show.', use:'How it changes Auren', useCopy:'For adults with a male or female reference selected, Auren can compare the supplied measure with a general NHLBI sex-specific threshold.', limit:'Limit', limitCopy:'Waist thresholds are general references. Age and population differences exist, so Auren never treats this as a diagnosis.', source:'General reference', sourceCopy:'NHLBI: >102 cm for men and >88 cm for women is associated with increased risk in the general adult reference.' },
      bodyFat:{ title:'Body fat %', why:'Why it can help', whyCopy:'A measured body-fat value can add body-composition context when BMI is difficult to interpret.', use:'How it changes Auren', useCopy:'In this build Auren records it as supporting evidence but does not classify it against a single universal “healthy” percentage.', limit:'Measurement matters', limitCopy:'Different devices and methods can disagree. Enter only a value you already measured; Auren never estimates body fat from your profile photo.' }
    }
  },
  howWorks:{
    eyebrow:'Guidance & transparency', title:'How Auren works', intro:'You should not need a manual to use Auren, but every important interpretation should be explainable when you want the detail.',
    sections:[
      ['Daily check-in','Five observations create today’s self-reported state. Stress runs in the opposite direction from sleep, energy, mood and movement — a higher stress number is not treated as a better result.'],
      ['Body context','Auren combines age, height, weight, activity, training and optional measurements. BMI is one screening signal, never a complete body-composition verdict.'],
      ['Auren Halo','Four soft fragments represent Body Context, Daily State, Movement and Personal Trend. Missing information stays faint instead of being filled in for visual completeness.'],
      ['One Useful Move','After a check-in, Auren chooses one low-friction action only when the available data supports it. Some days the right answer is simply to maintain or keep observing.'],
      ['Archive · Portraits','Portraits preserve individual days as a calm memory of what you reported. They are not grades or streak rewards.'],
      ['Archive · Calendar','The calendar lets you revisit daily states, body-weight updates and monthly patterns. Empty days simply mean nothing was recorded; they are not failures.'],
      ['Rhythm','Rhythm is where Auren will compare repeated days and show relationships between observations once there is enough continuity. It stays quiet when the sample is too small.'],
      ['Signals','Signals are patterns that clear an evidence threshold. Auren should show what changed, the sample behind it and the confidence — not just a mysterious alert.'],
      ['Auren Atmospheres','Atmospheres change the visual environment only. They never change a calculation, state or health interpretation.'],
      ['Profile identity','Your name and photo personalise the space. They are not evidence for Body Context and the photo is never used to infer body shape, sex or body fat.'],
      ['Evidence & confidence','Auren separates what you observed, what it calculated and what it inferred. More continuity can raise confidence; uncertainty remains visible.'],
      ['Privacy','Profile photos, display name, body profile and check-ins stay in local browser storage in this build. Auren does not analyse your photo for body shape or body fat.']
    ], close:'Close'
  },
  common:{ build:'Contextual Intelligence & Premium UX', system:'System' }
};
