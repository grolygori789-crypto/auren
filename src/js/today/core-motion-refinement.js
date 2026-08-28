import { AurenOrb } from '../core/orb.js';

const PATCH_KEY = Symbol.for('auren.todayCore.motionRefinement.build40');

if (!AurenOrb.prototype[PATCH_KEY]) {
  const originalPhysics = AurenOrb.prototype.physics;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  AurenOrb.prototype.physics = function refinedTodayCorePhysics(dt) {
    // Signature Opening is an accepted surface. Preserve its proven physics exactly.
    if (this.signature) {
      return originalPhysics.call(this, dt);
    }

    // Keep the accepted semantic material state from the existing renderer.
    const targetTone = this.semanticTarget();
    const toneEase = this.reduced ? 1 : (1 - Math.exp(-1.42 * dt));
    this.stateAqua += (targetTone.aqua - this.stateAqua) * toneEase;
    this.statePearl += (targetTone.pearl - this.statePearl) * toneEase;
    this.stateLight += (targetTone.light - this.stateLight) * toneEase;
    this.stateMotion += (targetTone.motion - this.stateMotion) * toneEase;
    this.stateWarm += (targetTone.warm - this.stateWarm) * toneEase;

    if (this.reduced) {
      this.tilt = 0;
      this.tiltV = 0;
      this.wave *= Math.exp(-5.2 * dt);
      this.waveV *= Math.exp(-5.2 * dt);
      this.wave2 *= Math.exp(-5.6 * dt);
      this.wave2V *= Math.exp(-5.6 * dt);
      this.kick *= Math.exp(-4.2 * dt);
      this.reaction = 0;
      return;
    }

    // Build 40 motion language:
    // the glass stays almost upright while the liquid remains alive inside it.
    // Three deliberately slow, non-harmonic phases prevent a readable left/right loop.
    const intro = this.t < 3
      ? Math.cos(this.t * 0.72) * 0.018 * Math.exp(-this.t * 1.08)
      : 0;

    const microDrift =
      Math.sin(this.t * 0.205 + 0.40) * 0.0100
      + Math.sin(this.t * 0.113 + 2.15) * 0.0055
      + Math.sin(this.t * 0.071 + 4.00) * 0.0030;

    // Pointer/react input remains possible but cannot turn the orb into a pendulum.
    const interactionDrift = clamp(this.kick * 0.10, -0.018, 0.018);
    const targetTilt = intro + microDrift * this.stateMotion + interactionDrift;

    this.tiltV += (targetTilt - this.tilt) * 1.85 * dt;
    this.tiltV *= Math.exp(-3.45 * dt);
    this.tilt += this.tiltV * dt;
    this.tilt = clamp(this.tilt, -0.028, 0.028);

    // Decouple visible glass orientation from internal surface life.
    // The waves have their own slower forcing, so the material still feels biological.
    const forcing = this.tiltV * 0.36;
    const idleWave = (
      Math.sin(this.t * 0.78 + 0.35) * 0.028
      + Math.sin(this.t * 1.21 + 1.40) * 0.012
    ) * this.stateMotion;

    this.waveV += (-this.wave * 7.4 + forcing + idleWave) * dt;
    this.waveV *= Math.exp(-1.62 * dt);
    this.wave += this.waveV * dt;

    const secondaryIdle = (
      Math.sin(this.t * 1.47 + 0.90) * 0.012
      + Math.sin(this.t * 0.61 + 2.30) * 0.006
    ) * this.stateMotion;

    this.wave2V += (-this.wave2 * 11.8 - forcing * 0.24 + secondaryIdle) * dt;
    this.wave2V *= Math.exp(-1.92 * dt);
    this.wave2 += this.wave2V * dt;

    // Settle interaction energy quickly; internal response remains via wave/flow.
    this.kick *= Math.exp(-3.35 * dt);

    if (!this.evolutionDisabled) {
      const motion = this.stateMotion;
      this.flowA += dt * (0.72 + Math.sin(this.t * 0.23) * 0.085) * motion;
      this.flowB += dt * (0.47 + Math.sin(this.t * 0.17 + 1.1) * 0.060) * motion;
      this.reaction *= Math.exp(-1.34 * dt);
    }
  };

  Object.defineProperty(AurenOrb.prototype, PATCH_KEY, {
    value: Object.freeze({
      build: 40,
      originalPhysics
    }),
    configurable: false,
    enumerable: false,
    writable: false
  });
}
