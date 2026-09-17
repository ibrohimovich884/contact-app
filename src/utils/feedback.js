// High-performance Web Audio API haptic & click synthesizer
// Zero external files needed, instant micro-tap response

let audioCtx = null;

export function playTapSound(type = "light") {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    if (type === "pop") {
      // Soft mechanical pop sound for opening cards / modal
      osc.type = "sine";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "copy") {
      // Crisp pleasant double tone for successful copy
      osc.type = "triangle";
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.setValueAtTime(880, now + 0.035);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } else {
      // Subtle glass click / tick for screen touches and buttons
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.028);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.028);
    }
  } catch {
    // Audio contexts might be blocked until user gesture, safely ignored
  }
}

export function triggerHaptic(duration = 10) {
  if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate(duration);
    } catch {
      // ignore
    }
  }
}

export function triggerTapFeedback(type = "light") {
  triggerHaptic(type === "pop" ? 18 : 10);
  playTapSound(type);
}
