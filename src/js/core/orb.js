const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const TAU = Math.PI * 2;

export class AurenOrb {
  constructor(canvas, { calm = false, signature = false } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.calm = calm;
    this.signature = signature;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.running = true;
    this.pointer = null;
    this.themeKey = '';
    this.palette = null;

    this.last = performance.now();
    this.t = 0;
    this.surfacePhase = Math.random() * TAU;
    this.driftPhase = Math.random() * TAU;
    this.glowPhase = Math.random() * TAU;
    this.shimmerPhase = Math.random() * TAU;

    this.surfaceTilt = 0;
    this.surfaceTiltV = 0;
    this.wave = 0;
    this.waveV = 0;
    this.ripple = 0;
    this.rippleV = 0;
    this.impulse = 0;
    this.reaction = 0;

    this.level = 0.555;
    this.stateMotion = signature ? 1.04 : 0.86;
    this.stateLight = 1;
    this.stateAqua = 0.12;
    this.statePearl = 0.08;
    this.stateWarm = 0.03;

    this.lowPower = false;
    this.slowRenderCount = 0;

    this.bind();
    requestAnimationFrame((now) => this.frame(now));
  }

  parseHex(value, fallback) {
    const v = String(value || '').trim();
    const m = /^#([0-9a-f]{6})$/i.exec(v);
    if (!m) return fallback;
    const n = Number.parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  syncPalette() {
    const theme = document.documentElement.dataset.theme || 'pearl';
    if (theme === this.themeKey && this.palette) return;
    const style = getComputedStyle(document.documentElement);
    this.palette = {
      gold: this.parseHex(style.getPropertyValue('--core-gold'), [238, 213, 174]),
      aqua: this.parseHex(style.getPropertyValue('--core-aqua'), [184, 214, 208]),
      pearl: this.parseHex(style.getPropertyValue('--core-pearl'), [252, 248, 241]),
      rim: this.parseHex(style.getPropertyValue('--core-rim'), [168, 118, 67]),
      shadow: this.parseHex(style.getPropertyValue('--core-shadow'), [127, 96, 60])
    };
    this.themeKey = theme;
  }

  rgba(rgb, alpha) {
    return `rgba(${Math.round(rgb[0])},${Math.round(rgb[1])},${Math.round(rgb[2])},${clamp(alpha)})`;
  }

  mix(a, b, amount) {
    const t = clamp(amount);
    return [
      a[0] * (1 - t) + b[0] * t,
      a[1] * (1 - t) + b[1] * t,
      a[2] * (1 - t) + b[2] * t
    ];
  }

  bind() {
    this.canvas.addEventListener('pointerdown', (event) => {
      this.canvas.setPointerCapture?.(event.pointerId);
      this.pointer = { x: event.clientX };
    });

    this.canvas.addEventListener('pointermove', (event) => {
      if (!this.pointer || this.reduced) return;
      const dx = event.clientX - this.pointer.x;
      const force = clamp(dx * 0.0042, -0.14, 0.14);
      this.surfaceTiltV += force * 0.55;
      this.waveV += force * 0.32;
      this.rippleV += force * 0.22;
      this.reaction = clamp(this.reaction + Math.abs(force) * 1.25, 0, 1.2);
      this.pointer = { x: event.clientX };
    });

    const end = () => { this.pointer = null; };
    this.canvas.addEventListener('pointerup', end);
    this.canvas.addEventListener('pointercancel', end);
  }

  react(strength = 0.16) {
    if (this.reduced) return;
    const force = clamp(Number(strength) || 0, -0.3, 0.3);
    this.waveV += force * 0.72;
    this.rippleV += force * 0.45;
    this.surfaceTiltV += force * 0.20;
    this.reaction = clamp(this.reaction + Math.abs(force) * 2.0, 0, 1.15);
  }

  stop() {
    this.running = false;
  }

  resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const css = Math.max(220, this.canvas.clientWidth || 340);
    const p = Math.round(css * dpr);
    if (this.canvas.width === p) return;
    this.canvas.width = p;
    this.canvas.height = p;
    this.W = p;
    this.H = p;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
  }

  semanticTarget() {
    if (this.signature) {
      return { aqua: 0.10, pearl: 0.08, light: 1.04, motion: 1.0, warm: 0.04, level: 0.553 };
    }

    const stage = this.canvas.closest?.('.core-stage');
    if (!stage) {
      return { aqua: 0.12, pearl: 0.08, light: 1.0, motion: 0.9, warm: 0.03, level: 0.555 };
    }

    const dailyArc = stage.querySelector?.('.halo-daily');
    const overall = stage.dataset?.halo || '';

    if (dailyArc?.classList?.contains('state-attention')) {
      return { aqua: 0.145, pearl: 0.065, light: 0.94, motion: 0.74, warm: -0.005, level: 0.548 };
    }

    if (dailyArc?.classList?.contains('state-good')) {
      if (overall === 'excellent') return { aqua: 0.095, pearl: 0.10, light: 1.07, motion: 0.96, warm: 0.055, level: 0.56 };
      if (overall === 'strong') return { aqua: 0.102, pearl: 0.095, light: 1.045, motion: 0.93, warm: 0.045, level: 0.558 };
      return { aqua: 0.108, pearl: 0.09, light: 1.025, motion: 0.9, warm: 0.038, level: 0.556 };
    }

    return { aqua: 0.12, pearl: 0.08, light: 0.995, motion: 0.84, warm: 0.02, level: 0.553 };
  }

  physics(dt) {
    const target = this.semanticTarget();
    const ease = this.reduced ? 1 : (1 - Math.exp(-1.25 * dt));

    this.stateAqua += (target.aqua - this.stateAqua) * ease;
    this.statePearl += (target.pearl - this.statePearl) * ease;
    this.stateLight += (target.light - this.stateLight) * ease;
    this.stateMotion += (target.motion - this.stateMotion) * ease;
    this.stateWarm += (target.warm - this.stateWarm) * ease;
    this.level += (target.level - this.level) * ease * 0.65;

    if (this.reduced) {
      this.reaction = 0;
      this.surfaceTilt *= Math.exp(-8 * dt);
      this.wave *= Math.exp(-8 * dt);
      this.ripple *= Math.exp(-8 * dt);
      return;
    }

    const motion = this.stateMotion * (this.calm ? 0.95 : 1);

    this.surfacePhase += dt * (0.60 + Math.sin(this.t * 0.11) * 0.033) * motion;
    this.driftPhase += dt * (0.34 + Math.cos(this.t * 0.08) * 0.020) * motion;
    this.glowPhase += dt * 0.33;
    this.shimmerPhase += dt * 0.22;

    const naturalTilt = Math.sin(this.surfacePhase) * 0.0115 + Math.sin(this.surfacePhase * 0.47 + 1.2) * 0.0048;
    const naturalWave = Math.sin(this.surfacePhase * 1.23 + 0.7) * 0.037 + Math.sin(this.surfacePhase * 0.61 + 2.1) * 0.0096;
    const naturalRipple = Math.sin(this.surfacePhase * 1.67 + 1.3) * 0.0145;

    this.surfaceTiltV += (naturalTilt - this.surfaceTilt) * dt * 1.65;
    this.waveV += (naturalWave - this.wave) * dt * 1.4;
    this.rippleV += (naturalRipple - this.ripple) * dt * 1.35;

    this.surfaceTilt += this.surfaceTiltV * dt;
    this.wave += this.waveV * dt;
    this.ripple += this.rippleV * dt;

    this.surfaceTiltV *= Math.exp(-3.9 * dt);
    this.waveV *= Math.exp(-3.45 * dt);
    this.rippleV *= Math.exp(-3.05 * dt);

    this.surfaceTilt = clamp(this.surfaceTilt, -0.026, 0.026);
    this.wave = clamp(this.wave, -0.060, 0.060);
    this.ripple = clamp(this.ripple, -0.028, 0.028);

    this.reaction *= Math.exp(-1.28 * dt);
    this.impulse *= Math.exp(-1.35 * dt);
  }

  surfaceYAt(nx, centerY, r) {
    const base = centerY + r * (this.level - 0.5) * 0.9;
    const tiltTerm = this.surfaceTilt * r * nx * 1.75;
    const wave1 = Math.sin(nx * Math.PI + this.driftPhase * 1.65) * this.wave * r * 0.58;
    const wave2 = Math.sin(nx * Math.PI * 2.08 + this.driftPhase * 0.97 + 1.4) * this.ripple * r * 0.72;
    const react = Math.sin(nx * Math.PI * 1.3 + this.glowPhase * 0.85) * this.reaction * r * 0.012;
    return base + tiltTerm + wave1 + wave2 + react;
  }

  drawFluid(ctx, c, r) {
    const aquaBase = this.mix(this.palette.aqua, this.palette.pearl, 0.14 - this.stateAqua * 0.18);
    const aquaDeep = this.mix(aquaBase, this.mix(this.palette.shadow, this.palette.aqua, 0.72), 0.32);
    const warmGlow = this.mix(this.palette.gold, this.palette.pearl, 0.42 - Math.max(0, this.stateWarm) * 0.25);
    const pearlLift = this.mix(this.palette.pearl, this.palette.aqua, 0.08);

    const baseY = c + r * (this.level - 0.5) * 0.9;
    const left = c - r * 0.93;
    const right = c + r * 0.93;
    const bottom = c + r * 0.94;

    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, r * 0.92, 0, TAU);
    ctx.clip();

    // Fluid body
    ctx.beginPath();
    const steps = this.lowPower ? 20 : 32;
    for (let i = 0; i <= steps; i += 1) {
      const nx = i / steps;
      const x = left + (right - left) * nx;
      const y = this.surfaceYAt(nx * 2 - 1, baseY, r);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(right, bottom);
    ctx.lineTo(left, bottom);
    ctx.closePath();

    const fill = ctx.createLinearGradient(c, baseY - r * 0.18, c, bottom);
    fill.addColorStop(0, this.rgba(pearlLift, 0.90 * this.stateLight));
    fill.addColorStop(0.16, this.rgba(aquaBase, 0.96 * this.stateLight));
    fill.addColorStop(0.62, this.rgba(this.mix(aquaBase, warmGlow, 0.09), 0.98 * this.stateLight));
    fill.addColorStop(1, this.rgba(aquaDeep, 0.99 * this.stateLight));
    ctx.fillStyle = fill;
    ctx.fill();

    // Surface highlight band
    ctx.beginPath();
    for (let i = 0; i <= steps; i += 1) {
      const nx = i / steps;
      const x = left + (right - left) * nx;
      const y = this.surfaceYAt(nx * 2 - 1, baseY, r) - r * 0.008;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineWidth = Math.max(1, this.W * 0.0022);
    ctx.strokeStyle = this.rgba(this.mix(this.palette.pearl, this.palette.gold, 0.18), 0.58);
    ctx.stroke();

    // Under-surface caustic glow
    const glow = ctx.createRadialGradient(c, baseY + r * 0.18, 0, c, baseY + r * 0.18, r * 0.82);
    glow.addColorStop(0, this.rgba(this.mix(warmGlow, this.palette.pearl, 0.35), 0.18));
    glow.addColorStop(0.48, this.rgba(this.mix(aquaBase, warmGlow, 0.12), 0.10));
    glow.addColorStop(1, this.rgba(aquaBase, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(c - r, baseY - r * 0.25, r * 2, r * 1.4);

    // Inner vertical sheen drifting slowly inside the liquid.
    const sheenX = c + Math.sin(this.driftPhase * 0.72) * r * 0.22;
    const sheen = ctx.createLinearGradient(sheenX - r * 0.08, c - r, sheenX + r * 0.08, c + r);
    sheen.addColorStop(0, this.rgba(this.palette.pearl, 0));
    sheen.addColorStop(0.5, this.rgba(this.palette.pearl, 0.12 + this.reaction * 0.08));
    sheen.addColorStop(1, this.rgba(this.palette.pearl, 0));
    ctx.fillStyle = sheen;
    ctx.fillRect(c - r, baseY - r * 0.02, r * 2, r * 1.2);

    // Reaction becomes a brief internal pulse, not a violent slosh.
    if (this.reaction > 0.01) {
      const pulse = ctx.createRadialGradient(c, baseY + r * 0.10, 0, c, baseY + r * 0.10, r * 0.56);
      const alpha = this.reaction * 0.12;
      pulse.addColorStop(0, this.rgba(this.mix(this.palette.pearl, this.palette.gold, 0.28), alpha));
      pulse.addColorStop(0.46, this.rgba(this.mix(this.palette.aqua, this.palette.pearl, 0.18), alpha * 0.62));
      pulse.addColorStop(1, this.rgba(this.palette.aqua, 0));
      ctx.fillStyle = pulse;
      ctx.fillRect(c - r, baseY - r * 0.2, r * 2, r * 1.2);
    }

    ctx.restore();
  }

  drawGlass(ctx, c, r) {
    const rimColor = this.mix(this.palette.rim, this.palette.pearl, 0.28);
    const contactColor = this.mix(this.palette.shadow, this.palette.rim, 0.18);

    // Contact shadow grounds the orb.
    ctx.save();
    ctx.translate(c, c + r * 0.94);
    ctx.scale(1, 0.18);
    const contact = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.78);
    contact.addColorStop(0, this.rgba(contactColor, 0.18));
    contact.addColorStop(0.55, this.rgba(contactColor, 0.07));
    contact.addColorStop(1, this.rgba(contactColor, 0));
    ctx.fillStyle = contact;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.78, 0, TAU);
    ctx.fill();
    ctx.restore();

    // Glass body tint/refraction.
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, r, 0, TAU);
    ctx.clip();

    const body = ctx.createRadialGradient(c - r * 0.32, c - r * 0.38, r * 0.03, c, c, r * 1.05);
    body.addColorStop(0, 'rgba(255,255,255,.68)');
    body.addColorStop(0.20, 'rgba(255,255,255,.22)');
    body.addColorStop(0.54, 'rgba(255,252,247,.07)');
    body.addColorStop(0.80, this.rgba(this.mix(this.palette.gold, this.palette.pearl, 0.55), 0.045));
    body.addColorStop(1, this.rgba(this.mix(this.palette.aqua, this.palette.pearl, 0.68), 0.05));
    ctx.fillStyle = body;
    ctx.fillRect(c - r, c - r, r * 2, r * 2);

    const lower = ctx.createLinearGradient(c, c - r * 0.05, c, c + r);
    lower.addColorStop(0, 'rgba(255,255,255,0)');
    lower.addColorStop(0.68, this.rgba(this.palette.gold, 0.024));
    lower.addColorStop(1, this.rgba(this.palette.rim, 0.06));
    ctx.fillStyle = lower;
    ctx.fillRect(c - r, c - r, r * 2, r * 2);
    ctx.restore();

    // Primary rim - clearer than mist versions, still premium and thin.
    const ring = ctx.createLinearGradient(c - r, c - r, c + r, c + r);
    ring.addColorStop(0, this.rgba(rimColor, 0.30));
    ring.addColorStop(0.18, 'rgba(255,255,255,.66)');
    ring.addColorStop(0.48, this.rgba(rimColor, 0.10));
    ring.addColorStop(0.78, 'rgba(255,255,255,.60)');
    ring.addColorStop(1, this.rgba(rimColor, 0.24));
    ctx.strokeStyle = ring;
    ctx.lineWidth = Math.max(1.2, this.W * 0.0034);
    ctx.beginPath();
    ctx.arc(c, c, r, 0, TAU);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,.34)';
    ctx.lineWidth = Math.max(0.9, this.W * 0.0019);
    ctx.beginPath();
    ctx.arc(c, c, r * 0.974, 0, TAU);
    ctx.stroke();

    // Reflections
    ctx.save();
    ctx.lineCap = 'round';
    const shimmer = this.reduced ? 0 : Math.sin(this.shimmerPhase) * 0.05;
    ctx.strokeStyle = `rgba(255,255,255,${0.54 + shimmer})`;
    ctx.lineWidth = r * 0.016;
    ctx.beginPath();
    ctx.arc(c - r * 0.04, c - r * 0.03, r * 0.88, Math.PI * 1.08, Math.PI * 1.39);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255,255,255,${0.30 + shimmer * 0.55})`;
    ctx.lineWidth = r * 0.0062;
    ctx.beginPath();
    ctx.arc(c - r * 0.02, c - r * 0.05, r * 0.84, Math.PI * 1.14, Math.PI * 1.47);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,.18)';
    ctx.lineWidth = r * 0.0046;
    ctx.beginPath();
    ctx.arc(c + r * 0.06, c + r * 0.01, r * 0.92, Math.PI * 1.72, Math.PI * 1.93);
    ctx.stroke();
    ctx.restore();
  }

  draw() {
    const ctx = this.ctx;
    const s = this.W;
    const c = s / 2;
    const r = s * 0.442;

    this.syncPalette();
    ctx.clearRect(0, 0, s, s);

    this.drawGlass(ctx, c, r);
    this.drawFluid(ctx, c, r);

    // Final front optical rim to keep the sphere readable at a glance.
    const front = ctx.createLinearGradient(c - r, c - r, c + r, c + r);
    front.addColorStop(0, this.rgba(this.mix(this.palette.rim, this.palette.pearl, 0.24), 0.18));
    front.addColorStop(0.28, 'rgba(255,255,255,.44)');
    front.addColorStop(0.6, 'rgba(255,255,255,.12)');
    front.addColorStop(1, this.rgba(this.mix(this.palette.rim, this.palette.pearl, 0.24), 0.16));
    ctx.strokeStyle = front;
    ctx.lineWidth = Math.max(0.95, s * 0.002);
    ctx.beginPath();
    ctx.arc(c, c, r * 0.994, 0, TAU);
    ctx.stroke();
  }

  frame(now) {
    if (!this.running) return;
    this.resize();
    const dt = Math.min(0.032, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.t += dt;
    this.physics(dt);

    const start = performance.now();
    this.draw();
    const cost = performance.now() - start;

    if (!this.lowPower && this.t > 2) {
      if (cost > 16) this.slowRenderCount += 1;
      else this.slowRenderCount = Math.max(0, this.slowRenderCount - 1);
      if (this.slowRenderCount >= 18) this.lowPower = true;
    }

    requestAnimationFrame((next) => this.frame(next));
  }
}
