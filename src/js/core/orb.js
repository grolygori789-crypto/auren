export class AurenOrb {
  constructor(canvas, { calm = false, signature = false } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.S = 280;
    this.off = document.createElement('canvas');
    this.off.width = this.S;
    this.off.height = this.S;
    this.o = this.off.getContext('2d', { alpha: true });
    this.img = this.o.createImageData(this.S, this.S);
    this.px = this.img.data;
    this.last = performance.now();
    this.t = 0;
    this.kick = 0;
    this.tilt = 0;
    this.tiltV = 0;
    this.wave = 0;
    this.waveV = 0;
    this.wave2 = 0;
    this.wave2V = 0;
    this.flowA = 0;
    this.flowB = 0;
    this.reaction = 0;
    this.stateAqua = 0;
    this.statePearl = 0;
    this.stateLight = 1;
    this.stateMotion = 1;
    this.stateWarm = 0;
    this.evolutionDisabled = false;
    this.slowRenderCount = 0;
    this.pointer = null;
    this.calm = calm;
    this.signature = signature;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.running = true;
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
      shadow: this.parseHex(style.getPropertyValue('--core-shadow'), [127, 96, 60]),
    };
    this.themeKey = theme;
  }

  rgba(rgb, alpha) {
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
  }

  bind() {
    this.canvas.addEventListener('pointerdown', (event) => {
      this.canvas.setPointerCapture(event.pointerId);
      this.pointer = { x: event.clientX };
    });
    this.canvas.addEventListener('pointermove', (event) => {
      if (!this.pointer) return;
      const dx = event.clientX - this.pointer.x;
      this.kick += dx * (this.calm ? 0.00105 : 0.00125);
      this.pointer = { x: event.clientX };
    });
    const end = () => { this.pointer = null; };
    this.canvas.addEventListener('pointerup', end);
    this.canvas.addEventListener('pointercancel', end);
  }

  react(strength = 0.16) {
    if (this.reduced) return;
    const force = Math.max(-0.35, Math.min(0.35, Number(strength) || 0));
    this.kick += force;
    this.waveV += force * 0.42;
    this.wave2V -= force * 0.16;
    if (!this.signature && !this.evolutionDisabled) {
      this.reaction = Math.min(1, this.reaction + Math.abs(force) * 2.15);
      this.flowA += force * 0.36;
      this.flowB -= force * 0.15;
    }
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
    if (this.signature) return { aqua: 0, pearl: 0, light: 1, motion: 1, warm: 0 };
    const stage = this.canvas.closest?.('.core-stage');
    if (!stage) return { aqua: 0, pearl: 0, light: 1, motion: 1, warm: 0 };
    const dailyArc = stage.querySelector?.('.halo-daily');
    const overall = stage.dataset?.halo || '';

    if (dailyArc?.classList?.contains('state-attention')) {
      return { aqua: 0.110, pearl: 0.045, light: 0.925, motion: 0.86, warm: -0.030 };
    }
    if (dailyArc?.classList?.contains('state-good')) {
      if (overall === 'excellent') return { aqua: -0.015, pearl: 0.015, light: 1.050, motion: 1.04, warm: 0.050 };
      if (overall === 'strong') return { aqua: -0.006, pearl: 0.012, light: 1.024, motion: 1.01, warm: 0.028 };
      return { aqua: 0, pearl: 0.012, light: 1.01, motion: 1, warm: 0.010 };
    }
    return { aqua: 0.012, pearl: 0.012, light: 0.995, motion: 0.94, warm: 0 };
  }

  physics(dt) {
    // Proven surface model retained from Build 9. Build 13 only adds independent
    // internal circulation and a smoothed semantic material tone for the Today Core.
    const targetTone = this.semanticTarget();
    const toneEase = this.reduced ? 1 : (1 - Math.exp(-1.42 * dt));
    this.stateAqua += (targetTone.aqua - this.stateAqua) * toneEase;
    this.statePearl += (targetTone.pearl - this.statePearl) * toneEase;
    this.stateLight += (targetTone.light - this.stateLight) * toneEase;
    this.stateMotion += (targetTone.motion - this.stateMotion) * toneEase;
    this.stateWarm += (targetTone.warm - this.stateWarm) * toneEase;

    const amp = this.signature ? 0.94 : (this.calm ? 1.08 : 1.12);
    const intro = this.t < 4.5 ? Math.cos(this.t * 1.18) * 0.105 * Math.exp(-this.t * 0.74) : 0;
    const living = Math.sin(this.t * 1.28) * 0.128 + Math.sin(this.t * 2.04 + 0.72) * 0.052 + Math.sin(this.t * 0.48) * 0.020;
    const target = this.reduced ? 0 : (intro + living + this.kick) * amp;
    this.tiltV += (target - this.tilt) * 5.15 * dt;
    this.tiltV *= Math.exp(-1.55 * dt);
    this.tilt += this.tiltV * dt;
    const forcing = this.tiltV * 1.42;
    const idleWave = this.reduced ? 0 : Math.sin(this.t * 1.72 + 0.35) * 0.055;
    this.waveV += (-this.wave * 7.4 + forcing * 1.08 + idleWave) * dt;
    this.waveV *= Math.exp(-1.48 * dt);
    this.wave += this.waveV * dt;
    const secondaryIdle = this.reduced ? 0 : Math.sin(this.t * 2.55) * 0.026;
    this.wave2V += (-this.wave2 * 11.8 - forcing * 0.48 + secondaryIdle) * dt;
    this.wave2V *= Math.exp(-1.78 * dt);
    this.wave2 += this.wave2V * dt;
    this.kick *= Math.exp(-2.04 * dt);

    if (!this.signature && !this.evolutionDisabled && !this.reduced) {
      const motion = this.stateMotion;
      this.flowA += dt * 0.84 * (0.72 + Math.sin(this.t * 0.23) * 0.085) * motion;
      this.flowB += dt * 0.84 * (0.47 + Math.sin(this.t * 0.17 + 1.1) * 0.060) * motion;
      this.reaction *= Math.exp(-1.34 * dt);
    } else if (this.reduced) {
      this.reaction = 0;
    }
  }

  fluidImageLegacy() {
    const { S, px } = this;
    const c = S / 2;
    const R = S * 0.408;
    const cs = Math.cos(this.tilt);
    const sn = Math.sin(this.tilt);
    for (let y = 0; y < S; y += 1) {
      for (let x = 0; x < S; x += 1) {
        const ii = (y * S + x) * 4;
        const nx = (x - c) / R;
        const ny = (y - c) / R;
        const rr = nx * nx + ny * ny;
        if (rr >= 1) { px[ii + 3] = 0; continue; }
        const u = nx * cs + ny * sn;
        const v = -nx * sn + ny * cs;
        const wall = Math.sqrt(Math.max(0, 1 - u * u));
        const edgeDist = Math.max(0, wall - Math.abs(v));
        const meniscus = 0.058 * Math.exp(-edgeDist / 0.058);
        const surface = 0.275 + this.wave * Math.sin(u * Math.PI * 1.03) * 0.50 + this.wave2 * Math.sin(u * Math.PI * 2 + 0.58) * 0.18 - meniscus;
        const depth = v - surface;
        let alpha = Math.max(0, Math.min(1, depth / 0.028));
        if (alpha <= 0) { px[ii + 3] = 0; continue; }
        alpha *= Math.min(1, (1 - Math.sqrt(rr)) / 0.030);
        const fillDepth = Math.max(0, Math.min(1, depth / (wall - surface + 0.001)));
        const optical = Math.sqrt(Math.max(0, 1 - rr));
        const thickness = Math.max(0, Math.min(1, optical * 0.98 + fillDepth * 0.46));
        const s1 = Math.sin((u * 3.2 + v * 1.55) * 1.85 + this.t * 1.08 + Math.sin(this.t * 0.22) * 0.33);
        const s2 = Math.sin((u * 1.55 - v * 3.1) * 1.18 - this.t * 0.82 + 0.58);
        const s3 = Math.sin((u * 5.1 + v * 2.4) * 0.76 + this.t * 0.66);
        const ribbon = Math.pow(0.5 + 0.5 * s3, 3);
        const aquaMix = this.signature
          ? Math.max(0, Math.min(1, 0.15 + 0.050 * s1 + 0.025 * s2 + 0.16 * ribbon))
          : Math.max(0, Math.min(1, 0.22 + 0.060 * s1 + 0.032 * s2 + 0.025 * s3));
        const { gold, aqua, pearl } = this.palette;
        let r = gold[0] * (1 - aquaMix) + aqua[0] * aquaMix;
        let g = gold[1] * (1 - aquaMix) + aqua[1] * aquaMix;
        let b = gold[2] * (1 - aquaMix) + aqua[2] * aquaMix;
        const tint = (this.signature ? 0.34 : 0.30) + thickness * (this.signature ? 0.74 : 0.72);
        r = pearl[0] * (1 - tint) + r * tint;
        g = pearl[1] * (1 - tint) + g * tint;
        b = pearl[2] * (1 - tint) + b * tint;
        {
          const ribbonStrength = this.signature ? 0.20 : 0.115;
          const aquaRibbon = ribbonStrength * Math.pow(0.5 + 0.5 * Math.sin(u * 5.4 - v * 3.1 + this.t * 0.98 + 0.7), 5) * thickness;
          r = r * (1 - aquaRibbon) + aqua[0] * aquaRibbon;
          g = g * (1 - aquaRibbon) + aqua[1] * aquaRibbon;
          b = b * (1 - aquaRibbon) + aqua[2] * aquaRibbon;
        }
        const surfGlow = Math.exp(-Math.abs(depth) * 74);
        const ca = 0.5 + 0.5 * Math.sin(u * 12.5 + v * 7.5 + this.t * 0.92 + aquaMix * 2.6);
        const lower = Math.pow(fillDepth, 0.66);
        const luxe = this.signature ? 1.10 : 1;
        const light = (surfGlow * (24 + ca * 12) + Math.pow(Math.max(0, 0.88 - u * 0.14 - v * 0.34), 6.6) * 12.5 * thickness + (1 - Math.abs(u) * 0.22) * thickness * 15.8 * lower) * luxe;
        r += light + lower * (this.signature ? 13.0 : 10.5);
        g += light * 0.95 + lower * (this.signature ? 9.6 : 8);
        b += light * 0.87 + lower * (this.signature ? 5.0 : 5.2);
        const trans = 1 - Math.exp(-3 * optical * (0.60 + 0.92 * fillDepth));
        px[ii] = Math.min(255, r);
        px[ii + 1] = Math.min(255, g);
        px[ii + 2] = Math.min(255, b);
        px[ii + 3] = Math.min(252, 132 + alpha * 94 + trans * 99 + surfGlow * 18);
      }
    }
    this.o.putImageData(this.img, 0, 0);
  }

  fluidImageEvolution() {
    const { S, px } = this;
    const c = S / 2;
    const R = S * 0.408;
    const cs = Math.cos(this.tilt);
    const sn = Math.sin(this.tilt);
    const { gold, aqua, pearl } = this.palette;
    const reaction = this.reaction;
    const flowA = this.flowA;
    const flowB = this.flowB;
    const slowPhase = this.reduced ? 0 : Math.sin(this.t * 0.22) * 0.28;
    const aquaDeepR = aqua[0] * 0.80;
    const aquaDeepG = aqua[1] * 0.88;
    const aquaDeepB = aqua[2] * 0.93;

    for (let y = 0; y < S; y += 1) {
      for (let x = 0; x < S; x += 1) {
        const ii = (y * S + x) * 4;
        const nx = (x - c) / R;
        const ny = (y - c) / R;
        const rr = nx * nx + ny * ny;
        if (rr >= 1) { px[ii + 3] = 0; continue; }

        const u = nx * cs + ny * sn;
        const v = -nx * sn + ny * cs;
        const wall = Math.sqrt(Math.max(0, 1 - u * u));
        const edgeDist = Math.max(0, wall - Math.abs(v));
        const meniscus = 0.058 * Math.exp(-edgeDist / 0.058);
        const micro = Math.sin(u * Math.PI * 3.15 + flowA * 1.08) * (0.0065 + reaction * 0.0045);
        const surface = 0.275
          + this.wave * Math.sin(u * Math.PI * 1.03) * 0.50
          + this.wave2 * Math.sin(u * Math.PI * 2 + 0.58) * 0.18
          + micro
          - meniscus;
        const depth = v - surface;
        let alpha = Math.max(0, Math.min(1, depth / 0.028));
        if (alpha <= 0) { px[ii + 3] = 0; continue; }

        alpha *= Math.min(1, (1 - Math.sqrt(rr)) / 0.030);
        const fillDepth = Math.max(0, Math.min(1, depth / (wall - surface + 0.001)));
        const optical = Math.sqrt(Math.max(0, 1 - rr));
        const thickness = Math.max(0, Math.min(1, optical * 0.98 + fillDepth * 0.46));

        // Independent internal currents move at different rates from the free surface.
        // Reusing three fields keeps the renderer lightweight enough for mobile Canvas2D.
        const s1 = Math.sin((u * 3.2 + v * 1.55) * 1.85 + flowA * 1.38 + slowPhase);
        const s2 = Math.sin((u * 1.55 - v * 3.1) * 1.18 - flowB * 1.52 + 0.58);
        const s3 = Math.sin((u * 5.1 + v * 2.4) * 0.76 + flowA * 0.47 + flowB * 0.42);
        const ribbonBase = 0.5 + 0.5 * s3;
        const ribbon = ribbonBase * ribbonBase * ribbonBase;

        let aquaMix = Math.max(0, Math.min(1,
          0.190 + this.stateAqua + 0.052 * s1 + 0.030 * s2 + 0.034 * s3 + 0.020 * ribbon
        ));
        aquaMix = Math.max(0.07, Math.min(0.42, aquaMix));

        let r = gold[0] * (1 - aquaMix) + aqua[0] * aquaMix;
        let g = gold[1] * (1 - aquaMix) + aqua[1] * aquaMix;
        let b = gold[2] * (1 - aquaMix) + aqua[2] * aquaMix;

        const tint = 0.30 + thickness * 0.72;
        r = pearl[0] * (1 - tint) + r * tint;
        g = pearl[1] * (1 - tint) + g * tint;
        b = pearl[2] * (1 - tint) + b * tint;

        // Mineral vein: cooler and translucent, drifting independently through depth.
        const veinBase = Math.max(0, Math.min(1, 0.50 + 0.34 * s3 + 0.16 * s1));
        const veinField = veinBase * veinBase * veinBase;
        const mineralVein = (0.360 + reaction * 0.080) * veinField * thickness;
        r = r * (1 - mineralVein) + aquaDeepR * mineralVein;
        g = g * (1 - mineralVein) + aquaDeepG * mineralVein;
        b = b * (1 - mineralVein) + aquaDeepB * mineralVein;

        // Low-amplitude optical density gives the liquid internal depth instead
        // of reading as a flat single-color fill.
        const densityField = Math.max(0, Math.min(1, 0.50 + 0.30 * s1 - 0.24 * s2 + 0.12 * s3));
        const density2 = densityField * densityField;
        const densityShade = 1 - (0.030 + reaction * 0.010) * density2 * thickness;
        r *= densityShade; g *= densityShade; b *= densityShade;

        // Pearl veil: a soft suspended layer, not a separate opaque blob.
        const veilField = Math.max(0, Math.min(1, 0.5 - 0.20 * s1 + 0.27 * s2 + 0.10 * s3));
        const veil3 = veilField * veilField * veilField;
        const pearlVeil = (0.052 + this.statePearl + reaction * 0.024)
          * veil3
          * (0.38 + thickness * 0.62);
        r = r * (1 - pearlVeil) + pearl[0] * pearlVeil;
        g = g * (1 - pearlVeil) + pearl[1] * pearlVeil;
        b = b * (1 - pearlVeil) + pearl[2] * pearlVeil;

        // A restrained warm filament prevents cooler states from reading grey or lifeless.
        const warmField = Math.max(0, Math.min(1, 0.50 + 0.31 * s1 + 0.17 * s2));
        const warm2 = warmField * warmField;
        const warmFilament = Math.max(0, 0.035 + this.stateWarm) * warm2 * warm2 * thickness;
        r = r * (1 - warmFilament) + gold[0] * warmFilament;
        g = g * (1 - warmFilament) + gold[1] * warmFilament;
        b = b * (1 - warmFilament) + gold[2] * warmFilament;

        const surfGlow = Math.exp(-Math.abs(depth) * 74);
        const ca = Math.max(0, Math.min(1, 0.50 + 0.28 * s1 - 0.18 * s2 + 0.10 * s3));
        const lower = Math.pow(fillDepth, 0.66);
        const stateLight = this.stateLight;
        const reactionLight = 1 + reaction * 0.075;
        const light = (
          surfGlow * (23 + ca * 11.5)
          + Math.pow(Math.max(0, 0.88 - u * 0.14 - v * 0.34), 6.6) * 12.2 * thickness
          + (1 - Math.abs(u) * 0.22) * thickness * 15.2 * lower
        ) * stateLight * reactionLight;

        r += light + lower * 10.2 * stateLight;
        g += light * 0.95 + lower * 7.8 * stateLight;
        b += light * 0.88 + lower * 5.2 * stateLight;

        const trans = 1 - Math.exp(-3 * optical * (0.60 + 0.92 * fillDepth));
        px[ii] = Math.max(0, Math.min(255, r));
        px[ii + 1] = Math.max(0, Math.min(255, g));
        px[ii + 2] = Math.max(0, Math.min(255, b));
        px[ii + 3] = Math.min(252, 132 + alpha * 94 + trans * 99 + surfGlow * 18);
      }
    }
    this.o.putImageData(this.img, 0, 0);
  }

  fluidImage() {
    // The accepted Signature Opening stays on the proven renderer. Build 13 is
    // isolated to the Today Core and falls back permanently to legacy rendering
    // if the evolution path ever throws on a device.
    if (this.signature || this.evolutionDisabled) {
      this.fluidImageLegacy();
      return;
    }
    try {
      this.fluidImageEvolution();
    } catch {
      this.evolutionDisabled = true;
      this.fluidImageLegacy();
    }
  }

  draw() {
    const ctx = this.ctx;
    const s = this.W;
    const c = s / 2;
    const R = s * 0.442;
    const inner = R * 0.812;
    this.syncPalette();
    const { rim, aqua: aquaTone, shadow: shadowTone } = this.palette;
    ctx.clearRect(0, 0, s, s);

    ctx.save();
    ctx.translate(c, c + R * 0.92);
    ctx.scale(1, 0.18);
    const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.72);
    shadow.addColorStop(0, this.rgba(shadowTone, 0.235));
    shadow.addColorStop(0.55, this.rgba(shadowTone, 0.105));
    shadow.addColorStop(1, this.rgba(shadowTone, 0));
    ctx.fillStyle = shadow;
    ctx.beginPath(); ctx.arc(0, 0, R * 0.72, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2); ctx.clip();
    const glass = ctx.createRadialGradient(c - R * 0.34, c - R * 0.39, R * 0.04, c, c, R * 1.02);
    glass.addColorStop(0, 'rgba(255,255,255,.76)');
    glass.addColorStop(0.42, 'rgba(255,252,247,.18)');
    glass.addColorStop(0.79, 'rgba(230,214,192,.048)');
    glass.addColorStop(1, 'rgba(191,163,126,.082)');
    ctx.fillStyle = glass; ctx.fillRect(c - R, c - R, R * 2, R * 2);
    this.fluidImage();
    ctx.save(); ctx.beginPath(); ctx.arc(c, c, inner, 0, Math.PI * 2); ctx.clip();
    ctx.drawImage(this.off, c - inner, c - inner + inner * 0.065, inner * 2, inner * 2); ctx.restore();
    const haze = ctx.createRadialGradient(c - R * 0.24, c - R * 0.30, 0, c, c, R * 0.82);
    haze.addColorStop(0, 'rgba(255,255,255,.10)'); haze.addColorStop(0.65, 'rgba(255,255,255,.02)'); haze.addColorStop(1, 'rgba(234,219,199,.055)');
    ctx.fillStyle = haze; ctx.fillRect(c - R, c - R, R * 2, R * 2); ctx.restore();

    // Optical edge separation: slightly darken the glass perimeter without making the orb opaque.
    ctx.save();
    ctx.beginPath(); ctx.arc(c, c, R * 0.985, 0, Math.PI * 2); ctx.clip();
    const edgeRefraction = ctx.createRadialGradient(c, c, R * 0.67, c, c, R);
    edgeRefraction.addColorStop(0, this.rgba(rim, 0));
    edgeRefraction.addColorStop(0.82, this.rgba(rim, 0.006));
    edgeRefraction.addColorStop(0.94, this.rgba(rim, 0.024));
    edgeRefraction.addColorStop(1, this.rgba(rim, 0.050));
    ctx.fillStyle = edgeRefraction; ctx.fillRect(c - R, c - R, R * 2, R * 2);
    ctx.restore();

    // Lower inner refraction gives the sphere thickness and visually anchors the fluid to the vessel.
    ctx.save(); ctx.lineCap = 'round';
    ctx.strokeStyle = this.rgba(rim, 0.070); ctx.lineWidth = Math.max(0.8, R * 0.0042);
    ctx.beginPath(); ctx.arc(c, c, R * 0.902, Math.PI * 0.18, Math.PI * 0.82); ctx.stroke();
    ctx.strokeStyle = this.rgba(aquaTone, 0.060); ctx.lineWidth = Math.max(0.7, R * 0.0032);
    ctx.beginPath(); ctx.arc(c, c, R * 0.875, Math.PI * 0.22, Math.PI * 0.78); ctx.stroke();
    ctx.restore();

    const ring = ctx.createLinearGradient(c - R, c - R, c + R, c + R);
    ring.addColorStop(0, this.rgba(rim, 0.17)); ring.addColorStop(0.18, 'rgba(255,255,255,.58)'); ring.addColorStop(0.51, this.rgba(rim, 0.055)); ring.addColorStop(0.76, 'rgba(255,255,255,.54)'); ring.addColorStop(1, this.rgba(rim, 0.14));
    ctx.strokeStyle = ring; ctx.lineWidth = Math.max(0.72, s * 0.00235); ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.30)'; ctx.lineWidth = Math.max(0.7, s * 0.00135); ctx.beginPath(); ctx.arc(c, c, R * 0.975, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = this.rgba(rim, 0.042); ctx.lineWidth = Math.max(0.7, s * 0.00155); ctx.beginPath(); ctx.arc(c, c, R * 0.946, 0, Math.PI * 2); ctx.stroke();
    ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = R * 0.012; ctx.beginPath(); ctx.arc(c, c, R * 0.91, Math.PI * 1.08, Math.PI * 1.41); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.30)'; ctx.lineWidth = R * 0.0055; ctx.beginPath(); ctx.arc(c, c, R * 0.887, Math.PI * 1.13, Math.PI * 1.47); ctx.stroke(); ctx.restore();
  }

  frame(now) {
    if (!this.running) return;
    this.resize();
    const dt = Math.min(0.026, (now - this.last) / 1000);
    this.last = now;
    this.t += dt * 0.84;
    this.physics(dt);

    const renderStart = performance.now();
    this.draw();
    const renderCost = performance.now() - renderStart;

    // Runtime rollback: if the richer Today material proves too expensive on a
    // device, fall back to the accepted Build 12/legacy renderer automatically.
    if (!this.signature && !this.evolutionDisabled && this.t > 2) {
      if (renderCost > 23) this.slowRenderCount += 1;
      else this.slowRenderCount = Math.max(0, this.slowRenderCount - 1);
      if (this.slowRenderCount >= 14) this.evolutionDisabled = true;
    }

    requestAnimationFrame((next) => this.frame(next));
  }

  stop() { this.running = false; }
}
