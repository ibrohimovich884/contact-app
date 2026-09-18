import { useEffect, useState, useCallback } from "react";
import { triggerTapFeedback } from "../utils/feedback";

export default function TouchFeedback() {
  const [ripples, setRipples] = useState([]);

  const removeRipple = useCallback((id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  useEffect(() => {
    const handleTouchOrClick = (e) => {
      // support both touch and click coordinates
      const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;

      if (typeof clientX !== "number" || typeof clientY !== "number") return;

      const id = Date.now() + Math.random();
      const newRipple = {
        id,
        x: clientX,
        y: clientY,
      };

      setRipples((prev) => [...prev.slice(-3), newRipple]);

      // Trigger tactile audio & haptic feedback on touch
      triggerTapFeedback("light");

      // Auto remove fallback in case onAnimationEnd is throttled by backgrounding
      setTimeout(() => {
        removeRipple(id);
      }, 550);
    };

    window.addEventListener("pointerdown", handleTouchOrClick, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handleTouchOrClick);
    };
  }, [removeRipple]);

  return (
    <div className="touch-ripples-container" aria-hidden="true">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="touch-ripple-dot"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
          }}
          onAnimationEnd={() => removeRipple(r.id)}
        />
      ))}
    </div>
  );
}

