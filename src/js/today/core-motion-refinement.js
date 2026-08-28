import { AurenOrb } from '../core/orb.js';

const PATCH_KEY = Symbol.for('auren.todayCore.motionRefinement.build43');

if (!AurenOrb.prototype[PATCH_KEY]) {
  const originalPhysics = AurenOrb.prototype.physics;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const easeFactor = (rate, dt) => 1 - Math.exp(-rate * dt);

  AurenOrb.prototype.physics = function refinedTodayCorePhysics(dt) {
    // Signature Opening is accepted and must remain exactly on the proven path.
    if (this.signature) {
      return originalPhysics.call(this, dt);
    }

    // Start from the original/orb-loader character, but slightly slow time for Today.
    originalPhysics.call(this, dt * 0.78);

    if (this.reduced) return;

    // Keep the original overall presence, but make the liquid settle and travel more slowly.
    // This preserves the familiar visual identity while reducing the readable left/right slosh.
    const tiltBlend = easeFactor(1.0, dt);
    const waveBlend = easeFactor(1.5, dt);
    const wave2Blend = easeFactor(1.8, dt);

    if (typeof this._b43Tilt !== 'number') this._b43Tilt = this.tilt;
    if (typeof this._b43Wave !== 'number') this._b43Wave = this.wave;
    if (typeof this._b43Wave2 !== 'number') this._b43Wave2 = this.wave2;

    this._b43Tilt += (this.tilt - this._b43Tilt) * tiltBlend;
    this._b43Wave += (this.wave - this._b43Wave) * waveBlend;
    this._b43Wave2 += (this.wave2 - this._b43Wave2) * wave2Blend;

    // Apply the smoothed values back for rendering.
    this.tilt = clamp(this._b43Tilt, -0.11, 0.11);
    this.wave = clamp(this._b43Wave * 0.74, -0.10, 0.10);
    this.wave2 = clamp(this._b43Wave2 * 0.66, -0.055, 0.055);

    // Additional damping so interaction energy settles more gracefully.
    this.tiltV *= Math.exp(-0.55 * dt);
    this.waveV *= Math.exp(-1.25 * dt);
    this.wave2V *= Math.exp(-1.40 * dt);
    this.kick *= Math.exp(-1.20 * dt);

    // Preserve subtle internal life, but keep it calmer than the raw original path.
    if (typeof this.flowA === 'number') this.flowA *= 0.9985;
    if (typeof this.flowB === 'number') this.flowB *= 0.9988;
    if (typeof this.reaction === 'number') this.reaction *= Math.exp(-0.22 * dt);
  };

  Object.defineProperty(AurenOrb.prototype, PATCH_KEY, {
    value: Object.freeze({ build: 43, originalPhysics }),
    configurable: false,
    enumerable: false,
    writable: false
  });
}
