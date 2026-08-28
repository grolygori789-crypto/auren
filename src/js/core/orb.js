const CLOUDS = Object.freeze([
  { type:'gold',  phase:0.25, speed:0.182, ox:0.160, oy:0.105, radius:0.255, alpha:0.390, warp:0.71 },
  { type:'gold',  phase:1.70, speed:0.131, ox:0.130, oy:0.170, radius:0.220, alpha:0.330, warp:0.47 },
  { type:'gold',  phase:3.05, speed:0.096, ox:0.195, oy:0.090, radius:0.235, alpha:0.300, warp:0.63 },
  { type:'gold',  phase:4.45, speed:0.073, ox:0.105, oy:0.175, radius:0.275, alpha:0.270, warp:0.39 },
  { type:'gold',  phase:5.55, speed:0.157, ox:0.170, oy:0.125, radius:0.205, alpha:0.315, warp:0.82 },
  { type:'gold',  phase:2.30, speed:0.061, ox:0.090, oy:0.110, radius:0.320, alpha:0.220, warp:0.56 },
  { type:'pearl', phase:0.90, speed:0.111, ox:0.125, oy:0.155, radius:0.270, alpha:0.155, warp:0.52 },
  { type:'pearl', phase:3.80, speed:0.084, ox:0.170, oy:0.105, radius:0.225, alpha:0.135, warp:0.76 },
  { type:'pearl', phase:5.10, speed:0.052, ox:0.095, oy:0.185, radius:0.300, alpha:0.095, warp:0.44 },
  { type:'aqua',  phase:2.65, speed:0.089, ox:0.180, oy:0.120, radius:0.215, alpha:0.052, warp:0.67 },
  { type:'aqua',  phase:4.95, speed:0.057, ox:0.115, oy:0.170, radius:0.255, alpha:0.036, warp:0.35 },
  { type:'gold',  phase:6.05, speed:0.119, ox:0.150, oy:0.140, radius:0.195, alpha:0.275, warp:0.91 }
]);

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

export class AurenOrb {
  constructor(canvas, { calm = false, signature = false } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.S = 320;
    this.off = document.createElement('canvas');
    this.off.width = this.S;
    this.off.height = this.S;
    this.o = this.off.getContext('2d', { alpha: true });

    this.last = performance.now();
    this.t = 0;
    this.mistPhase = 0;
    this.breathPhase = 0;
    this.shimmerPhase = 0;
    this.impulse = 0;
    this.reaction = 0;

    this.stateAqua = 0;
    this.statePearl = 0;
    this.stateLight = 1;
    this.stateMotion = 1;
    this.stateWarm = 0;

    this.pointer = null;
    this.calm = calm;
    this.signature = signature;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.running = true;

    this.lowPower = false;
    this.slowRenderCount = 0;
    this.themeKey = '';
    this.palette = null;

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
      aqua: this.parseHex(style.getPropertyValue('--core-aqua'), [187, 213, 208]),
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

  shade(rgb, factor = 1) {
    const f = Math.max(0, factor);
    return [
      Math.max(0, Math.min(255, rgb[0] * f)),
      Math.max(0, Math.min(255, rgb[1] * f)),
      Math.max(0, Math.min(255, rgb[2] * f))
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
      const force = clamp(dx * 0.006, -0.22, 0.22);
      this.impulse = clamp(this.impulse + force, -0.55, 0.55);
      this.reaction = clamp(this.reaction + Math.abs(force) * 1.45);
      this.pointer = { x: event.clientX };
    });

    const end = () => { this.pointer = null; };
    this.canvas.addEventListener('pointerup', end);
    this.canvas.addEventListener('pointercancel', end);
  }

  react(strength = 0.16) {
    if (this.reduced) return;
    const force = clamp(Number(strength) || 0, -0.35, 0.35);
    this.reaction = clamp(this.reaction + Math.abs(force) * 2.1);
    this.impulse = clamp(this.impulse + force * 0.42, -0.55, 0.55);
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
      return { aqua: 0.000, pearl: 0.020, light: 1.045, motion: 0.90, warm: 0.055 };
    }

    const stage = this.canvas.closest?.('.core-stage');
    if (!stage) {
      return { aqua: 0.015, pearl: 0.020, light: 1.000, motion: 0.88, warm: 0.020 };
    }

    const dailyArc = stage.querySelector?.('.halo-daily');
    const overall = stage.dataset?.halo || '';

    if (dailyArc?.classList?.contains('state-attention')) {
      return { aqua: 0.065, pearl: 0.035, light: 0.935, motion: 0.73, warm: -0.020 };
    }

    if (dailyArc?.classList?.contains('state-good')) {
      if (overall === 'excellent') {
        return { aqua: -0.010, pearl: 0.028, light: 1.070, motion: 0.92, warm: 0.070 };
      }
      if (overall === 'strong') {
        return { aqua: -0.004, pearl: 0.024, light: 1.045, motion: 0.90, warm: 0.050 };
      }
      return { aqua: 0.000, pearl: 0.022, light: 1.025, motion: 0.88, warm: 0.035 };
    }

    return { aqua: 0.018, pearl: 0.022, light: 0.995, motion: 0.82, warm: 0.018 };
  }

  physics(dt) {
    const target = this.semanticTarget();
    const toneEase = this.reduced ? 1 : (1 - Math.exp(-1.32 * dt));

    this.stateAqua += (target.aqua - this.stateAqua) * toneEase;
    this.statePearl += (target.pearl - this.statePearl) * toneEase;
    this.stateLight += (target.light - this.stateLight) * toneEase;
    this.stateMotion += (target.motion - this.stateMotion) * toneEase;
    this.stateWarm += (target.warm - this.stateWarm) * toneEase;

    if (this.reduced) {
      this.reaction = 0;
      this.impulse = 0;
      return;
    }

    const motion = this.stateMotion * (this.calm ? 0.92 : 1);
    this.mistPhase += dt * (0.72 + Math.sin(this.t * 0.071) * 0.045) * motion;
    this.breathPhase += dt * (0.74 + Math.sin(this.t * 0.043 + 1.2) * 0.035);
    this.shimmerPhase += dt * 0.19;

    this.reaction *= Math.exp(-1.10 * dt);
    this.impulse *= Math.exp(-1.45 * dt);
  }

  cloudColor(type) {
    const { gold, aqua, pearl } = this.palette;

    if (type === 'aqua') {
      return this.mix(aqua, pearl, 0.12);
    }

    if (type === 'pearl') {
      return this.mix(pearl, gold, 0.13 + Math.max(0, this.stateWarm) * 0.20);
    }

    const warm = clamp(0.035 + Math.max(0, this.stateWarm) * 0.20, 0.025, 0.070);
    return this.mix(this.shade(gold, 0.94), pearl, warm);
  }

  drawCloud(ctx, cloud, index, breath, reaction) {
    const phase = this.mistPhase * cloud.speed * 5.6 + cloud.phase + this.impulse * (0.18 + cloud.warp * 0.12);
    const secondary = this.mistPhase * cloud.speed * (1.83 + cloud.warp * 0.41) + cloud.phase * 0.47;

    const x = this.S * (
      0.50
      + Math.sin(phase) * cloud.ox
      + Math.sin(secondary + 1.1) * cloud.ox * 0.28
    );

    const y = this.S * (
      0.51
      + Math.cos(phase * 0.74 + cloud.warp) * cloud.oy
      + Math.sin(secondary * 0.63 + 2.0) * cloud.oy * 0.24
      - reaction * 0.015 * (index % 2 ? 1 : -1)
    );

    const breathingRadius = 1 + (breath - 0.5) * 0.075 + reaction * 0.055;
    const radius = this.S * cloud.radius * breathingRadius;

    let alpha = cloud.alpha * this.stateLight;
    if (cloud.type === 'gold') alpha *= 1 + Math.max(0, this.stateWarm) * 1.7;
    if (cloud.type === 'pearl') alpha *= 1 + this.statePearl * 2.2;
    if (cloud.type === 'aqua') alpha *= clamp(0.78 + this.stateAqua * 4.2, 0.68, 1.18);

    alpha *= (0.90 + breath * 0.16) * (1 + reaction * 0.18);
    if (this.signature) alpha *= 1.09;

    const color = this.cloudColor(cloud.type);
    const inner = this.mix(color, this.palette.pearl, cloud.type === 'gold' ? 0.025 : 0.14);

    const gradient = ctx.createRadialGradient(
      x - radius * 0.12,
      y - radius * 0.14,
      radius * 0.04,
      x,
      y,
      radius
    );

    gradient.addColorStop(0, this.rgba(inner, alpha));
    gradient.addColorStop(0.34, this.rgba(color, alpha * 0.82));
    gradient.addColorStop(0.70, this.rgba(color, alpha * 0.31));
    gradient.addColorStop(1, this.rgba(color, 0));

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  drawVeil(ctx, index, breath, reaction, aqua = false) {
    const { gold, aqua: aquaTone, pearl } = this.palette;
    const phase = this.mistPhase * (0.29 + index * 0.047) + index * 1.73 + this.impulse * 0.12;

    const y0 = this.S * (0.58 + Math.sin(phase * 0.71) * 0.075);
    const y1 = this.S * (0.39 + Math.cos(phase * 0.53 + 0.8) * 0.095);
    const y2 = this.S * (0.58 + Math.sin(phase * 0.41 + 1.7) * 0.080);

    const x0 = this.S * (0.18 + Math.sin(phase * 0.37) * 0.035);
    const x2 = this.S * (0.82 + Math.cos(phase * 0.43) * 0.035);

    const color = aqua
      ? this.mix(aquaTone, pearl, 0.14)
      : this.mix(this.shade(gold, 0.93), pearl, 0.035 + Math.max(0, this.stateWarm) * 0.12);

    let alpha = aqua
      ? (0.032 + Math.max(0, this.stateAqua) * 0.11)
      : (0.135 + Math.max(0, this.stateWarm) * 0.08);

    alpha *= (0.88 + breath * 0.14) * this.stateLight * (1 + reaction * 0.22);

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.rgba(color, alpha);
    ctx.lineWidth = this.S * (aqua ? 0.046 : 0.078);
    ctx.shadowColor = this.rgba(color, alpha * 0.92);
    ctx.shadowBlur = this.lowPower ? 5 : 9;

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.bezierCurveTo(
      this.S * (0.34 + Math.sin(phase * 0.83) * 0.055),
      y1,
      this.S * (0.63 + Math.cos(phase * 0.61) * 0.060),
      y2,
      x2,
      this.S * (0.45 + Math.cos(phase * 0.57 + 1.1) * 0.080)
    );
    ctx.stroke();
    ctx.restore();
  }

  drawMist() {
    const ctx = this.o;
    const S = this.S;
    const c = S / 2;
    const reaction = this.reaction;
    const breath = this.reduced
      ? 0.52
      : (0.5 + 0.5 * Math.sin(this.breathPhase * 0.82 + 0.28));

    ctx.clearRect(0, 0, S, S);
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, S * 0.455, 0, Math.PI * 2);
    ctx.clip();

    const base = ctx.createRadialGradient(
      S * 0.44, S * 0.38, S * 0.02,
      c, c, S * 0.47
    );
    const denseGold = this.shade(this.palette.gold, 0.91);
    base.addColorStop(0, this.rgba(denseGold, 0.245 * this.stateLight));
    base.addColorStop(0.38, this.rgba(this.palette.gold, 0.135 * this.stateLight));
    base.addColorStop(0.70, this.rgba(this.palette.aqua, 0.018 + Math.max(0, this.stateAqua) * 0.028));
    base.addColorStop(1, this.rgba(this.palette.pearl, 0));
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, S, S);

    ctx.globalCompositeOperation = 'source-over';

    const cloudLimit = this.lowPower ? 8 : CLOUDS.length;
    for (let i = 0; i < cloudLimit; i += 1) {
      this.drawCloud(ctx, CLOUDS[i], i, breath, reaction);
    }

    this.drawVeil(ctx, 0, breath, reaction, false);
    if (!this.lowPower) {
      this.drawVeil(ctx, 1, breath, reaction, false);
      this.drawVeil(ctx, 2, breath, reaction, true);
    }

    const coreAlpha = (0.205 + breath * 0.060 + reaction * 0.070) * this.stateLight;
    const core = ctx.createRadialGradient(
      S * 0.46, S * 0.45, 0,
      S * 0.49, S * 0.51, S * 0.27
    );
    core.addColorStop(0, this.rgba(this.mix(this.shade(this.palette.gold, 0.90), this.palette.pearl, 0.08), coreAlpha));
    core.addColorStop(0.44, this.rgba(this.palette.gold, coreAlpha * 0.56));
    core.addColorStop(1, this.rgba(this.palette.gold, 0));
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, S, S);

    ctx.restore();
  }

  drawGlass(ctx, c, R) {
    const { rim, shadow, pearl, gold, aqua } = this.palette;

    // Contact shadow grounds the Core without turning it into a heavy object.
    ctx.save();
    ctx.translate(c, c + R * 0.93);
    ctx.scale(1, 0.17);
    const contact = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.73);
    contact.addColorStop(0, this.rgba(shadow, 0.27));
    contact.addColorStop(0.52, this.rgba(shadow, 0.115));
    contact.addColorStop(1, this.rgba(shadow, 0));
    ctx.fillStyle = contact;
    ctx.beginPath();
    ctx.arc(0, 0, R * 0.73, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Transparent body — defined by refraction rather than a thick outline.
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, R, 0, Math.PI * 2);
    ctx.clip();

    const glass = ctx.createRadialGradient(
      c - R * 0.34, c - R * 0.38, R * 0.035,
      c, c, R * 1.03
    );
    glass.addColorStop(0, 'rgba(255,255,255,.52)');
    glass.addColorStop(0.28, 'rgba(255,255,255,.125)');
    glass.addColorStop(0.67, 'rgba(255,252,247,.028)');
    glass.addColorStop(0.88, this.rgba(this.mix(gold, pearl, 0.46), 0.052));
    glass.addColorStop(1, this.rgba(this.mix(aqua, pearl, 0.66), 0.060));
    ctx.fillStyle = glass;
    ctx.fillRect(c - R, c - R, R * 2, R * 2);

    const lowerRefraction = ctx.createLinearGradient(c, c - R * 0.20, c, c + R);
    lowerRefraction.addColorStop(0, 'rgba(255,255,255,0)');
    lowerRefraction.addColorStop(0.62, this.rgba(gold, 0.032));
    lowerRefraction.addColorStop(1, this.rgba(rim, 0.095));
    ctx.fillStyle = lowerRefraction;
    ctx.fillRect(c - R, c - R, R * 2, R * 2);

    ctx.restore();

    const ring = ctx.createLinearGradient(c - R, c - R, c + R, c + R);
    ring.addColorStop(0, this.rgba(rim, 0.28));
    ring.addColorStop(0.17, 'rgba(255,255,255,.74)');
    ring.addColorStop(0.46, this.rgba(rim, 0.095));
    ring.addColorStop(0.73, 'rgba(255,255,255,.62)');
    ring.addColorStop(1, this.rgba(rim, 0.25));

    ctx.strokeStyle = ring;
    ctx.lineWidth = Math.max(1.05, this.W * 0.00305);
    ctx.beginPath();
    ctx.arc(c, c, R, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,255,255,.38)';
    ctx.lineWidth = Math.max(0.78, this.W * 0.00165);
    ctx.beginPath();
    ctx.arc(c, c, R * 0.975, 0, Math.PI * 2);
    ctx.stroke();

    // Slow optical shimmer is on the glass, not a moving particle.
    const shimmer = this.reduced
      ? 0
      : (Math.sin(this.shimmerPhase + 0.55) * 0.08);

    ctx.save();
    ctx.lineCap = 'round';
    ctx.strokeStyle = `rgba(255,255,255,${0.48 + shimmer})`;
    ctx.lineWidth = R * 0.011;
    ctx.beginPath();
    ctx.arc(c, c, R * 0.905, Math.PI * 1.08, Math.PI * 1.39);
    ctx.stroke();

    ctx.strokeStyle = `rgba(255,255,255,${0.25 + shimmer * 0.55})`;
    ctx.lineWidth = R * 0.0048;
    ctx.beginPath();
    ctx.arc(c, c, R * 0.884, Math.PI * 1.13, Math.PI * 1.46);
    ctx.stroke();
    ctx.restore();
  }

  draw() {
    const ctx = this.ctx;
    const s = this.W;
    const c = s / 2;
    const R = s * 0.442;
    const inner = R * 0.835;

    this.syncPalette();
    this.drawMist();

    ctx.clearRect(0, 0, s, s);

    // Glass behind the Life Force.
    this.drawGlass(ctx, c, R);

    // Life Force lives entirely inside the sphere and never crosses the rim.
    ctx.save();
    ctx.beginPath();
    ctx.arc(c, c, R * 0.916, 0, Math.PI * 2);
    ctx.clip();

    const breathScale = this.reduced
      ? 1
      : (1 + Math.sin(this.breathPhase * 0.82 + 0.28) * 0.008);

    const size = inner * 2 * breathScale;
    ctx.globalAlpha = 1;
    ctx.drawImage(this.off, c - size / 2, c - size / 2, size, size);

    // A tiny mineral-aqua undertone should be perceived, not announced.
    const aquaVeil = ctx.createRadialGradient(
      c + R * 0.22, c + R * 0.16, 0,
      c + R * 0.18, c + R * 0.16, R * 0.72
    );
    const aquaAlpha = clamp(0.020 + Math.max(0, this.stateAqua) * 0.14, 0.016, 0.034);
    aquaVeil.addColorStop(0, this.rgba(this.palette.aqua, aquaAlpha));
    aquaVeil.addColorStop(0.62, this.rgba(this.palette.aqua, aquaAlpha * 0.32));
    aquaVeil.addColorStop(1, this.rgba(this.palette.aqua, 0));
    ctx.fillStyle = aquaVeil;
    ctx.fillRect(c - R, c - R, R * 2, R * 2);

    const edgeDepth = ctx.createRadialGradient(c, c, R * 0.48, c, c, R * 0.915);
    edgeDepth.addColorStop(0, 'rgba(255,255,255,0)');
    edgeDepth.addColorStop(0.76, this.rgba(this.palette.rim, 0.014));
    edgeDepth.addColorStop(1, this.rgba(this.palette.rim, 0.065));
    ctx.fillStyle = edgeDepth;
    ctx.fillRect(c - R, c - R, R * 2, R * 2);

    // Check-in/profile reaction becomes a brief internal bloom, never a slosh.
    if (this.reaction > 0.012) {
      const bloom = ctx.createRadialGradient(c, c, 0, c, c, R * 0.68);
      const alpha = this.reaction * 0.105;
      bloom.addColorStop(0, this.rgba(this.mix(this.palette.gold, this.palette.pearl, 0.34), alpha));
      bloom.addColorStop(0.46, this.rgba(this.palette.gold, alpha * 0.38));
      bloom.addColorStop(1, this.rgba(this.palette.gold, 0));
      ctx.fillStyle = bloom;
      ctx.fillRect(c - R, c - R, R * 2, R * 2);
    }

    ctx.restore();

    // Re-assert a very thin optical rim over the internal material.
    const rim = ctx.createLinearGradient(c - R, c - R, c + R, c + R);
    rim.addColorStop(0, this.rgba(this.palette.rim, 0.235));
    rim.addColorStop(0.22, 'rgba(255,255,255,.64)');
    rim.addColorStop(0.61, 'rgba(255,255,255,.24)');
    rim.addColorStop(1, this.rgba(this.palette.rim, 0.205));
    ctx.strokeStyle = rim;
    ctx.lineWidth = Math.max(0.92, s * 0.00245);
    ctx.beginPath();
    ctx.arc(c, c, R * 0.994, 0, Math.PI * 2);
    ctx.stroke();
  }

  frame(now) {
    if (!this.running) return;

    this.resize();
    const dt = Math.min(0.032, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.t += dt;
    this.physics(dt);

    const renderStart = performance.now();
    this.draw();
    const renderCost = performance.now() - renderStart;

    // Degrade within the same Life Force design rather than falling back to liquid.
    if (!this.lowPower && this.t > 2) {
      if (renderCost > 16) this.slowRenderCount += 1;
      else this.slowRenderCount = Math.max(0, this.slowRenderCount - 1);

      if (this.slowRenderCount >= 16) {
        this.lowPower = true;
      }
    }

    requestAnimationFrame((next) => this.frame(next));
  }

  stop() {
    this.running = false;
  }
}
