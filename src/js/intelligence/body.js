const round1 = (value) => Math.round(value * 10) / 10;
const valid = (value, min, max) => Number.isFinite(Number(value)) && Number(value) >= min && Number(value) <= max;

export function trainingContext(profile = {}) {
  const type = String(profile.trainingType || 'none');
  const frequency = Math.max(0, Math.min(14, Number(profile.trainingFrequency) || 0));
  const activity = profile && profile.activity ? String(profile.activity) : 'notSet';
  const strengthLike = ['resistance', 'mixed', 'athletic'].includes(type);
  const regular = frequency >= 2 || ['moderate', 'high'].includes(activity);
  const athletic = strengthLike && frequency >= 3 && ['moderate', 'high'].includes(activity);
  return { type, frequency, activity, strengthLike, regular, athletic };
}

export function waistContext(profile = {}) {
  const waistCm = Number(profile.waistCm);
  if (!valid(waistCm, 30, 250)) return { status: 'missing' };
  const sex = String(profile.sexForCalc || 'notSet');
  if (!['male', 'female'].includes(sex)) return { status: 'limited', waistCm, reason: 'sexSpecificReferenceUnavailable' };
  const thresholdCm = sex === 'male' ? 102 : 88;
  return {
    status: 'ready',
    waistCm: round1(waistCm),
    thresholdCm,
    category: waistCm > thresholdCm ? 'aboveGeneralReference' : 'withinGeneralReference',
  };
}

function confidenceFor(profile, { adult, waist, training }) {
  let points = 1; // age + height + weight
  if (training.type && training.type !== 'none') points += 1;
  if (training.frequency > 0) points += 1;
  if (waist.status === 'ready') points += 2;
  if (valid(profile.bodyFatPct, 2, 75)) points += 1;
  if (Array.isArray(profile.weightHistory) && profile.weightHistory.length >= 2) points += 1;
  if (!adult) return 'limited';
  if (points >= 5) return 'high';
  if (points >= 3) return 'moderate';
  return 'low';
}

export function bodyContext(profile) {
  if (!profile) return { status: 'missing' };
  const age = Number(profile.age);
  const heightCm = Number(profile.heightCm);
  const weightKg = Number(profile.weightKg);
  if (!(valid(age, 2, 120) && valid(heightCm, 50, 230) && valid(weightKg, 5, 350))) return { status: 'invalid' };

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const training = trainingContext(profile);
  const waist = waistContext(profile);
  const bodyFatPct = valid(profile.bodyFatPct, 2, 75) ? round1(Number(profile.bodyFatPct)) : null;
  const base = {
    status: 'ready', age, heightCm, weightKg, bmi: round1(bmi),
    sexForCalc: String(profile.sexForCalc || 'notSet'),
    activity: String(profile.activity || 'moderate'),
    goal: String(profile.goal || 'understand'),
    training, waist, bodyFatPct,
  };

  if (age < 20) {
    return { ...base, model: 'youth', category: 'youth', interpretation: 'youth', suggestion: 'youth', confidence: 'limited' };
  }

  const lowKg = round1(18.5 * heightM * heightM);
  const highKg = round1(24.9 * heightM * heightM);
  let category = 'within';
  if (bmi < 18.5) category = 'below';
  else if (bmi >= 30) category = 'wellAbove';
  else if (bmi >= 25) category = 'above';

  let interpretation = 'aligned';
  if (category === 'below') interpretation = 'below';
  else if (category === 'within' && waist.status === 'ready' && waist.category === 'aboveGeneralReference') interpretation = 'waistAttention';
  else if (['above', 'wellAbove'].includes(category)) {
    if (training.athletic && waist.status === 'ready' && waist.category === 'withinGeneralReference') interpretation = 'athleticContext';
    else if (training.athletic) interpretation = 'muscularPossible';
    else if (waist.status === 'ready' && waist.category === 'aboveGeneralReference') interpretation = 'aboveWithWaist';
    else interpretation = 'aboveNeedsContext';
  }

  const suggestion = interpretation === 'aligned' || interpretation === 'athleticContext'
    ? 'maintain'
    : interpretation === 'below'
      ? 'addContext'
      : 'reviewContext';

  return {
    ...base,
    model: 'adult', category, interpretation, suggestion,
    confidence: confidenceFor(profile, { adult: true, waist, training }),
    referenceWeightKg: [lowKg, highKg],
  };
}

export function dailyContext(checkin) {
  if (!checkin?.observations) return { status: 'missing' };
  const o = checkin.observations;
  const adjusted = [Number(o.sleep), Number(o.energy), 6 - Number(o.stress), Number(o.mood), Number(o.movement)];
  const average = adjusted.reduce((sum, value) => sum + value, 0) / adjusted.length;
  const movement = Number(o.movement);
  const stress = Number(o.stress);
  // High stress must never be visually or semantically promoted to an excellent day
  // just because the other self-reported signals are strong. Stress is inverse-direction
  // evidence and acts as a guardrail on the qualitative state.
  let status = average >= 4.1 ? 'excellent' : average >= 3.25 ? 'balanced' : average >= 2.5 ? 'mixed' : 'low';
  if (stress >= 5) status = average >= 3.25 ? 'mixed' : 'low';
  else if (stress >= 4 && status === 'excellent') status = 'balanced';
  return { status, average: round1(average), movement, stress };
}

export function haloContext({ profile, checkin, recentCheckins = [] }) {
  const body = bodyContext(profile);
  const daily = dailyContext(checkin);
  const training = trainingContext(profile || {});
  const recentCount = recentCheckins.length;

  let bodyState = 'missing';
  if (body.status === 'ready') {
    if (body.model === 'youth') bodyState = 'limited';
    else if (['aligned', 'athleticContext'].includes(body.interpretation)) bodyState = 'good';
    else if (body.interpretation === 'muscularPossible' || body.interpretation === 'aboveNeedsContext') bodyState = 'contextual';
    else bodyState = 'attention';
  }

  const dailyState = daily.status === 'missing' ? 'missing' : ['excellent', 'balanced'].includes(daily.status) ? 'good' : 'attention';
  const movementState = daily.status === 'missing' && !training.regular
    ? 'missing'
    : ((daily.status !== 'missing' && daily.movement >= 3) || training.regular ? 'good' : 'attention');
  const trendState = recentCount >= 10 ? 'good' : recentCount >= 4 ? 'developing' : 'missing';

  let overall = 'building';
  if (bodyState === 'good' && daily.status === 'excellent' && movementState === 'good' && trendState === 'good') overall = 'excellent';
  else if (['good', 'contextual'].includes(bodyState) && ['excellent', 'balanced'].includes(daily.status) && movementState === 'good') overall = 'strong';
  else if (body.status === 'ready' || daily.status !== 'missing') overall = 'learning';

  return { overall, body, daily, recentCount, segments: { body: bodyState, daily: dailyState, movement: movementState, trend: trendState } };
}

export function nextAction({ profile, checkin }) {
  const body = bodyContext(profile);
  if (!checkin?.observations) return { key: 'checkin', basis: 'observed' };
  const o = checkin.observations;
  if (Number(o.sleep) <= 2) return { key: 'recovery', basis: 'observed' };
  if (Number(o.stress) >= 4) return { key: 'decompress', basis: 'observed' };
  if (Number(o.movement) <= 2) return { key: 'move', basis: 'observed' };
  if (Number(o.energy) <= 2) return { key: 'pace', basis: 'observed' };
  if (body.status === 'ready' && body.model === 'adult' && ['aligned', 'athleticContext'].includes(body.interpretation)) return { key: 'maintain', basis: 'combined' };
  return { key: 'observe', basis: 'combined' };
}
