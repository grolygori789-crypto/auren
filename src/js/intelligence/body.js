const round1 = (value) => Math.round(value * 10) / 10;

export function bodyContext(profile) {
  if (!profile) return { status: 'missing' };
  const age = Number(profile.age);
  const heightCm = Number(profile.heightCm);
  const weightKg = Number(profile.weightKg);
  if (!(age >= 2 && age <= 120 && heightCm >= 50 && heightCm <= 230 && weightKg >= 5 && weightKg <= 350)) {
    return { status: 'invalid' };
  }
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const base = { status: 'ready', age, heightCm, weightKg, bmi: round1(bmi), activity: profile.activity, goal: profile.goal };
  if (age < 20) {
    return { ...base, model: 'youth', category: 'youth', suggestion: 'youth' };
  }
  const lowKg = round1(18.5 * heightM * heightM);
  const highKg = round1(24.9 * heightM * heightM);
  let category = 'within';
  if (bmi < 18.5) category = 'below';
  else if (bmi >= 30) category = 'wellAbove';
  else if (bmi >= 25) category = 'above';
  const suggestion = category === 'within' ? 'maintain' : category === 'below' ? 'considerGain' : 'considerLoss';
  return { ...base, model: 'adult', category, suggestion, referenceWeightKg: [lowKg, highKg] };
}

export function dailyContext(checkin) {
  if (!checkin?.observations) return { status: 'missing' };
  const o = checkin.observations;
  const adjusted = [Number(o.sleep), Number(o.energy), 6 - Number(o.stress), Number(o.mood), Number(o.movement)];
  const average = adjusted.reduce((sum, value) => sum + value, 0) / adjusted.length;
  const movement = Number(o.movement);
  const status = average >= 4.1 ? 'excellent' : average >= 3.25 ? 'balanced' : average >= 2.5 ? 'mixed' : 'low';
  return { status, average: round1(average), movement };
}

export function haloContext({ profile, checkin, recentCount = 0 }) {
  const body = bodyContext(profile);
  const daily = dailyContext(checkin);
  const bodyState = body.status !== 'ready' ? 'missing' : body.model === 'youth' ? 'limited' : body.category === 'within' ? 'good' : 'attention';
  const dailyState = daily.status === 'missing' ? 'missing' : ['excellent', 'balanced'].includes(daily.status) ? 'good' : 'attention';
  const movementState = daily.status === 'missing' ? 'missing' : daily.movement >= 3 ? 'good' : 'attention';
  const continuityState = recentCount >= 7 ? 'good' : recentCount >= 3 ? 'developing' : 'missing';

  let overall = 'building';
  if (bodyState === 'good' && daily.status === 'excellent' && movementState === 'good' && continuityState === 'good') overall = 'excellent';
  else if (bodyState === 'good' && ['excellent', 'balanced'].includes(daily.status) && movementState === 'good') overall = 'strong';
  else if (body.status === 'ready' || daily.status !== 'missing') overall = 'learning';

  return { overall, body, daily, recentCount, segments: { body: bodyState, daily: dailyState, movement: movementState, continuity: continuityState } };
}

export function nextAction({ profile, checkin }) {
  const body = bodyContext(profile);
  if (!checkin?.observations) return { key: 'checkin', basis: 'observed' };
  const o = checkin.observations;
  if (Number(o.sleep) <= 2) return { key: 'recovery', basis: 'observed' };
  if (Number(o.stress) >= 4) return { key: 'decompress', basis: 'observed' };
  if (Number(o.movement) <= 2) return { key: 'move', basis: 'observed' };
  if (Number(o.energy) <= 2) return { key: 'pace', basis: 'observed' };
  if (body.status === 'ready' && body.model === 'adult' && body.category === 'within') return { key: 'maintain', basis: 'combined' };
  return { key: 'observe', basis: 'combined' };
}
