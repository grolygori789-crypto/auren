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

  physics(dt) {
    // Build 9: perceptible living motion without turning the Core into a toy.
    // A user should be able to tell the fluid is alive within roughly one second.
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
    this.wave2V += (-this.wave2 * 11.8 - forcing * 0.48 + Math.sin(this.t * 2.55) * 0.026) * dt;
    this.wave2V *= Math.exp(-1.78 * dt);
    this.wave2 += this.wave2V * dt;
    this.kick *= Math.exp(-2.04 * dt);
  }

  fluidImage() {
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
        // A restrained mineral-aqua iridescent ribbon keeps Auren biological and distinctive
        // while champagne gold remains the dominant material impression.
        {
          // A moving mineral-aqua vein makes the Core visibly alive even when the free surface is nearly settled.
          // It stays secondary to champagne gold so the material remains luxurious rather than neon-biotech.
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
    this.t += dt;
    this.physics(dt);
    this.draw();
    requestAnimationFrame((next) => this.frame(next));
  }

  stop() { this.running = false; }
}
