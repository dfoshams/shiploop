// Web Audio API synthesized cinematic soundscape for maritime experience
// 100% self-contained, no external audio dependencies, muted by default.

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private oceanGain: GainNode | null = null;
  private engineGain: GainNode | null = null;
  private isInitialized: boolean = false;

  private init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
    } catch {
      // Ignore audio context creation restrictions
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.startAmbientOcean();
    } else {
      this.stopAmbient();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Play subtle sonar or radar ping
  public playSonarPing() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.85);
    } catch {
      // Audio fallback
    }
  }

  // Play subtle scene transition woosh / metallic chime
  public playTransitionChime(pitch: number = 520) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    } catch {
      // Fallback
    }
  }

  // Deep low-frequency ocean ambience using filtered noise & sine sub-bass
  private startAmbientOcean() {
    if (!this.ctx) return;
    try {
      // Sub drone
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      subGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start();
      this.engineGain = subGain;

      // Filtered pink-ish noise buffer for waves
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.08;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      const oceanGain = this.ctx.createGain();
      oceanGain.gain.setValueAtTime(0.025, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(oceanGain);
      oceanGain.connect(this.ctx.destination);

      whiteNoise.start();
      this.oceanGain = oceanGain;
    } catch {
      // Audio fallback
    }
  }

  private stopAmbient() {
    if (this.oceanGain && this.ctx) {
      try {
        this.oceanGain.gain.setValueAtTime(0, this.ctx.currentTime);
      } catch {
        // Fallback
      }
    }
    if (this.engineGain && this.ctx) {
      try {
        this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);
      } catch {
        // Fallback
      }
    }
  }
}

export const cinematicAudio = new CinematicAudioEngine();
