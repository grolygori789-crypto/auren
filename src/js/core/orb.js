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
    this.detailPhase = Math.random() * TAU;

    this.surfaceTilt = 0;
    this.surfaceTiltV = 0;
    this.wave = 0;
    this.waveV = 0;
    this.ripple = 0;
    this.rippleV = 0;
    this.reaction = 0;

    this.level = signature ? 0.552 : 0.556;
    this.stateMotion = signature ? 0.95 : 0.80;
    this.stateLight = 1;
    this.stateAqua = 0.11;
    this.statePearl = 0.09;
    this.stateWarm = 0.035;

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
      const force = clamp(dx * 0.0039, -0.12, 0.12);
      this.surfaceTiltV += force * 0.48;
      this.waveV += force * 0.24;
      this.rippleV += force * 0.16;
      this.reaction = clamp(this.reaction + Math.abs(force) * 1.05, 0, 1.0);
      this.pointer = { x: event.clientX };
    });

    const end = () => { this.pointer = null; };
    this.canvas.addEventListener('pointerup', end);
    this.canvas.addEventListener('pointercancel', end);
  }

  react(strength = 0.16) {
    if (this.reduced) return;
    const force = clamp(Number(strength) || 0, -0.25, 0.25);
    this.waveV += force * 0.62;
    this.rippleV += force * 0.40;
    this.surfaceTiltV += force * 0.18;
    this.reaction = clamp(this.reaction + Math.abs(force) * 1.95, 0, 1.15);
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
      return { aqua: 0.105, pearl: 0.095, light: 1.045, motion: 0.96, warm: 0.042, level: 0.553 };
    }

    const stage = this.canvas.closest?.('.core-stage');
    if (!stage) {
      return { aqua: 0.112, pearl: 0.09, light: 1.0, motion: 0.84, warm: 0.032, level: 0.556 };
    }

    const dailyArc = stage.querySelector?.('.halo-daily');
    const overall = stage.dataset?.halo || '';

    if (dailyArc?.classList?.contains('state-attention')) {
      return { aqua: 0.135, pearl: 0.072, light: 0.95, motion: 0.70, warm: -0.004, level: 0.550 };
    }

    if (dailyArc?.classList?.contains('state-good')) {
      if (overall === 'excellent') return { aqua: 0.094, pearl: 0.105, light: 1.07, motion: 0.91, warm: 0.056, level: 0.560 };
      if (overall === 'strong') return { aqua: 0.100, pearl: 0.100, light: 1.05, motion: 0.88, warm: 0.047, level: 0.559 };
      return { aqua: 0.106, pearl: 0.095, light: 1.03, motion: 0.85, warm: 0.040, level: 0.557 };
    }

    return { aqua: 0.112, pearl: 0.09, light: 0.995, motion: 0.80, warm: 0.025, level: 0.554 };
  }

  physics(dt) {
    const target = this.semanticTarget();
    const ease = this.reduced ? 1 : (1 - Math.exp(-1.18 * dt));

    this.stateAqua += (target.aqua - this.stateAqua) * ease;
    this.statePearl += (target.pearl - this.statePearl) * ease;
    this.stateLight += (target.light - this.stateLight) * ease;
    this.stateMotion += (target.motion - this.stateMotion) * ease;
    this.stateWarm += (target.warm - this.stateWarm) * ease;
    this.level += (target.level - this.level) * ease * 0.58;

    if (this.reduced) {
      this.reaction = 0;
      this.surfaceTilt *= Math.exp(-9 * dt);
      this.wave *= Math.exp(-9 * dt);
      this.ripple *= Math.exp(-9 * dt);
      return;
    }

    const motion = this.stateMotion * (this.calm ? 0.94 : 1);

    this.surfacePhase += dt * (0.60 + Math.sin(this.t * 0.09) * 0.030) * motion;
    this.driftPhase += dt * (0.35 + Math.cos(this.t * 0.07) * 0.018) * motion;
    this.glowPhase += dt * 0.28;
    this.shimmerPhase += dt * 0.18;
    this.detailPhase += dt * 0.11;

    const naturalTilt = Math.sin(this.surfacePhase * 0.97) * 0.010 + Math.sin(this.surfacePhase * 0.43 + 1.2) * 0.004;
    const naturalWave = Math.sin(this.surfacePhase * 1.06 + 0.66) * 0.035 + Math.sin(this.surfacePhase * 0.57 + 2.0) * 0.010;
    const naturalRipple = Math.sin(this.surfacePhase * 1.41 + 1.2) * 0.013 + Math.sin(this.surfacePhase * 0.86 + 2.6) * 0.004;

    this.surfaceTiltV += (naturalTilt - this.surfaceTilt) * dt * 1.44;
    this.waveV += (naturalWave - this.wave) * dt * 1.28;
    this.rippleV += (naturalRipple - this.ripple) * dt * 1.18;

    this.surfaceTilt += this.surfaceTiltV * dt;
    this.wave += this.waveV * dt;
    this.ripple += this.rippleV * dt;

    this.surfaceTiltV *= Math.exp(-4.2 * dt);
    this.waveV *= Math.exp(-3.9 * dt);
    this.rippleV *= Math.exp(-3.55 * dt);

    this.surfaceTilt = clamp(this.surfaceTilt, -0.020, 0.020);
    this.wave = clamp(this.wave, -0.048, 0.048);
    this.ripple = clamp(this.ripple, -0.020, 0.020);

    this.reaction *= Math.exp(-1.48 * dt);
  }

  surfaceYAt(nx, centerY, r) {
    const base = centerY + r * (this.level - 0.5) * 0.88;
    const tiltTerm = this.surfaceTilt * r * nx * 1.52;
    const wave1 = Math.sin(nx * Math.PI + this.driftPhase * 1.48) * this.wave * r * 0.52;
    const wave2 = Math.sin(nx * Math.PI * 1.84 + this.driftPhase * 0.88 + 1.32) * this.ripple * r * 0.68;
    const react = Math.sin(nx * Math.PI * 1.14 + this.glowPhase * 0.76) * this.reaction * r * 0.010;
    return base + tiltTerm + wave1 + wave2 + react;
  }

  fluidGradient(baseY, r, c, steps) {
    const aquaTop = this.mix(this.palette.aqua, this.palette.pearl, 0.18 - this.stateAqua * 0.14);
    const aquaMid = this.mix(this.palette.aqua, this.palette.gold, 0.035 + Math.max(0, this.stateWarm) * 0.06);
    const aquaDeep = this.mix(this.mix(this.palette.shadow, this.palette.aqua, 0.76), this.palette.gold, 0.08 + Math.max(0, this.stateWarm) * 0.08);
    const pearlLift = this.mix(this.palette.pearl, this.palette.aqua, 0.10);
    const base = this.ctx.createLinearGradient(c, baseY - r * 0.20, c, c + r * 0.96);
    base.addColorStop(0, this.rgba(pearlLift, 0.88 * this.stateLight));
    base.addColorStop(0.14, this.rgba(aquaTop, 0.96 * this.stateLight));
    base.addColorStop(0.50, this.rgba(aquaMid, 0.985 * this.stateLight));
    base.addColorStop(1, this.rgba(aquaDeep, 1.0 * this.stateLight));
    return { base, aquaTop, aquaMid, aquaDeep, pearlLift, steps };
  }

  drawFluid(ctx, c, r) {
    const baseY = c + r * (this.level - 0.5) * 0.88;
    const left = c - r * 0.93;
    const right = c + r * 0.93;
    const bottom = c + r * 0.94;

    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, r * 0.92, 0, TAU);
    ctx.clip();

    const steps = this.lowPower ? 18 : 36;
    const { base, aquaTop, aquaMid, aquaDeep, pearlLift } = this.fluidGradient(baseY, r, c, steps);

    ctx.beginPath();
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
    ctx.fillStyle = base;
    ctx.fill();

    // Slight depth darkening toward the lower bowl.
    const bowlShadow = ctx.createRadialGradient(c, c + r * 0.56, 0, c, c + r * 0.56, r * 0.95);
    bowlShadow.addColorStop(0, this.rgba(aquaDeep, 0.12));
    bowlShadow.addColorStop(0.75, this.rgba(aquaDeep, 0.06));
    bowlShadow.addColorStop(1, this.rgba(aquaDeep, 0));
    ctx.fillStyle = bowlShadow;
    ctx.fillRect(c - r, baseY - r * 0.05, r * 2, r * 1.2);

    // Surface highlight reads as polished liquid, not foam.
    ctx.beginPath();
    for (let i = 0; i <= steps; i += 1) {
      const nx = i / steps;
      const x = left + (right - left) * nx;
      const y = this.surfaceYAt(nx * 2 - 1, baseY, r) - r * 0.007;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineWidth = Math.max(1, this.W * 0.0020);
    ctx.strokeStyle = this.rgba(this.mix(pearlLift, this.palette.gold, 0.14), 0.50 + Math.max(0, this.stateWarm) * 0.10);
    ctx.stroke();

    // Under-surface caustic bloom.
    const caustic = ctx.createRadialGradient(c, baseY + r * 0.15, 0, c, baseY + r * 0.15, r * 0.78);
    caustic.addColorStop(0, this.rgba(this.mix(this.palette.gold, this.palette.pearl, 0.42), 0.20 + this.stateWarm * 0.25));
    caustic.addColorStop(0.52, this.rgba(this.mix(aquaMid, this.palette.gold, 0.12), 0.10));
    caustic.addColorStop(1, this.rgba(aquaMid, 0));
    ctx.fillStyle = caustic;
    ctx.fillRect(c - r, baseY - r * 0.18, r * 2, r * 1.28);

    // Pearl vertical sheen.
    const sheenX = c + Math.sin(this.driftPhase * 0.78 + this.detailPhase * 0.33) * r * 0.20;
    const sheen = ctx.createLinearGradient(sheenX - r * 0.10, c - r, sheenX + r * 0.10, c + r);
    sheen.addColorStop(0, this.rgba(this.palette.pearl, 0));
    sheen.addColorStop(0.48, this.rgba(this.palette.pearl, 0.12 + this.reaction * 0.05));
    sheen.addColorStop(1, this.rgba(this.palette.pearl, 0));
    ctx.fillStyle = sheen;
    ctx.fillRect(c - r, baseY - r * 0.04, r * 2, r * 1.24);

    // Very soft interior convection ribbon.
    const ribbonX = c + Math.sin(this.detailPhase) * r * 0.14;
    const ribbon = ctx.createLinearGradient(ribbonX - r * 0.04, baseY, ribbonX + r * 0.12, bottom);
    ribbon.addColorStop(0, this.rgba(this.mix(aquaTop, this.palette.pearl, 0.22), 0));
    ribbon.addColorStop(0.35, this.rgba(this.mix(aquaTop, this.palette.gold, 0.05), 0.085));
    ribbon.addColorStop(0.62, this.rgba(this.mix(aquaMid, this.palette.pearl, 0.10), 0.05));
    ribbon.addColorStop(1, this.rgba(aquaDeep, 0));
    ctx.fillStyle = ribbon;
    ctx.fillRect(c - r, baseY - r * 0.02, r * 2, r * 1.15);

    if (this.reaction > 0.01) {
      const pulse = ctx.createRadialGradient(c, baseY + r * 0.11, 0, c, baseY + r * 0.11, r * 0.54);
      const alpha = this.reaction * 0.10;
      pulse.addColorStop(0, this.rgba(this.mix(this.palette.pearl, this.palette.gold, 0.26), alpha));
      pulse.addColorStop(0.52, this.rgba(this.mix(aquaTop, this.palette.pearl, 0.18), alpha * 0.58));
      pulse.addColorStop(1, this.rgba(aquaTop, 0));
      ctx.fillStyle = pulse;
      ctx.fillRect(c - r, baseY - r * 0.18, r * 2, r * 1.16);
    }

    ctx.restore();
  }

  drawGlass(ctx, c, r) {
    const rimColor = this.mix(this.palette.rim, this.palette.pearl, 0.30);
    const contactColor = this.mix(this.palette.shadow, this.palette.rim, 0.18);

    ctx.save();
    ctx.translate(c, c + r * 0.95);
    ctx.scale(1, 0.18);
    const contact = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.80);
    contact.addColorStop(0, this.rgba(contactColor, 0.18));
    contact.addColorStop(0.58, this.rgba(contactColor, 0.065));
    contact.addColorStop(1, this.rgba(contactColor, 0));
    ctx.fillStyle = contact;
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.80, 0, TAU);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, r, 0, TAU);
    ctx.clip();

    const body = ctx.createRadialGradient(c - r * 0.30, c - r * 0.39, r * 0.03, c, c, r * 1.06);
    body.addColorStop(0, 'rgba(255,255,255,.70)');
    body.addColorStop(0.18, 'rgba(255,255,255,.24)');
    body.addColorStop(0.50, 'rgba(255,252,247,.08)');
    body.addColorStop(0.82, this.rgba(this.mix(this.palette.gold, this.palette.pearl, 0.58), 0.048));
    body.addColorStop(1, this.rgba(this.mix(this.palette.aqua, this.palette.pearl, 0.66), 0.055));
    ctx.fillStyle = body;
    ctx.fillRect(c - r, c - r, r * 2, r * 2);

    const upperBloom = ctx.createRadialGradient(c - r * 0.16, c - r * 0.26, 0, c - r * 0.14, c - r * 0.20, r * 0.72);
    upperBloom.addColorStop(0, 'rgba(255,255,255,.18)');
    upperBloom.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = upperBloom;
    ctx.fillRect(c - r, c - r, r * 2, r * 1.32);

    const lower = ctx.createLinearGradient(c, c - r * 0.03, c, c + r);
    lower.addColorStop(0, 'rgba(255,255,255,0)');
    lower.addColorStop(0.70, this.rgba(this.palette.gold, 0.020));
    lower.addColorStop(1, this.rgba(this.palette.rim, 0.062));
    ctx.fillStyle = lower;
    ctx.fillRect(c - r, c - r, r * 2, r * 2);
    ctx.restore();

    const ring = ctx.createLinearGradient(c - r, c - r, c + r, c + r);
    ring.addColorStop(0, this.rgba(rimColor, 0.28));
    ring.addColorStop(0.18, 'rgba(255,255,255,.68)');
    ring.addColorStop(0.50, this.rgba(rimColor, 0.10));
    ring.addColorStop(0.80, 'rgba(255,255,255,.62)');
    ring.addColorStop(1, this.rgba(rimColor, 0.23));
    ctx.strokeStyle = ring;
    ctx.lineWidth = Math.max(1.15, this.W * 0.0032);
    ctx.beginPath();
    ctx.arc(c, c, r, 0, TAU);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,.30)';
    ctx.lineWidth = Math.max(0.85, this.W * 0.0018);
    ctx.beginPath();
    ctx.arc(c, c, r * 0.974, 0, TAU);
    ctx.stroke();

    ctx.save();
    ctx.lineCap = 'round';
    const shimmer = this.reduced ? 0 : Math.sin(this.shimmerPhase) * 0.04;
    ctx.strokeStyle = `rgba(255,255,255,${0.55 + shimmer})`;
    ctx.lineWidth = r * 0.015;
    ctx.beginPath();
    ctx.arc(c - r * 0.04, c - r * 0.03, r * 0.885, Math.PI * 1.09, Math.PI * 1.39);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255,255,255,${0.28 + shimmer * 0.50})`;
    ctx.lineWidth = r * 0.0058;
    ctx.beginPath();
    ctx.arc(c - r * 0.02, c - r * 0.05, r * 0.845, Math.PI * 1.14, Math.PI * 1.47);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,.16)';
    ctx.lineWidth = r * 0.0042;
    ctx.beginPath();
    ctx.arc(c + r * 0.05, c + r * 0.02, r * 0.92, Math.PI * 1.73, Math.PI * 1.92);
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

    const front = ctx.createLinearGradient(c - r, c - r, c + r, c + r);
    front.addColorStop(0, this.rgba(this.mix(this.palette.rim, this.palette.pearl, 0.25), 0.17));
    front.addColorStop(0.28, 'rgba(255,255,255,.42)');
    front.addColorStop(0.62, 'rgba(255,255,255,.11)');
    front.addColorStop(1, this.rgba(this.mix(this.palette.rim, this.palette.pearl, 0.25), 0.15));
    ctx.strokeStyle = front;
    ctx.lineWidth = Math.max(0.92, s * 0.00195);
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
