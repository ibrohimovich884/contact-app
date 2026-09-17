import { useEffect, useState } from "react";
import { triggerTapFeedback } from "../utils/feedback";

export default function TouchFeedback() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleTouchOrClick = (e) => {
      // support both touch and click
      const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;

      if (typeof clientX !== "number" || typeof clientY !== "number") return;

      const newRipple = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
      };

      setRipples((prev) => [...prev.slice(-6), newRipple]);

      // Trigger tactile audio & haptic feedback on touch
      triggerTapFeedback("light");

      // auto remove after animation finishes (650ms)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 650);
    };

    window.addEventListener("pointerdown", handleTouchOrClick, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handleTouchOrClick);
    };
  }, []);

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
        />
      ))}
    </div>
  );
}
