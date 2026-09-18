import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Lock, Gamepad2, Sparkles } from "lucide-react";
import { triggerTapFeedback } from "../utils/feedback";
import { GameIcon } from "./GameIcons";

export default function GameModal({ game, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        triggerTapFeedback("light");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent background scrolling and horizontal gestures when modal is open
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;
    const originalHtmlTouchAction = document.documentElement.style.touchAction;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.touchAction = "none";

    const preventBackgroundScroll = (e) => {
      const sheet = document.getElementById("game-modal-sheet");
      if (!sheet || !sheet.contains(e.target)) {
        e.preventDefault();
      }
    };

    window.addEventListener("touchmove", preventBackgroundScroll, {
      passive: false,
    });

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.touchAction = originalBodyTouchAction;
      document.documentElement.style.touchAction = originalHtmlTouchAction;
      window.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, []);

  if (!game) return null;

  const handleClose = () => {
    triggerTapFeedback("light");
    onClose();
  };

  const modalContent = (
    <div
      id="game-modal-overlay"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        id="game-modal-sheet"
        className="modal-sheet victus-glass-card"
        style={{
          "--accent-color": game.color,
          "--accent-glow": game.glowColor,
        }}
      >
        {/* Reflection sheen */}
        <div className="victus-sheen" />

        {/* Drag handle */}
        <div className="sheet-drag-handle" />

        {/* Top Header */}
        <div className="modal-header">
          <div className="modal-brand">
            <div
              className="modal-icon-badge"
              style={{ background: game.gradient }}
            >
              <GameIcon id={game.id} size={24} />
            </div>
            <div>
              <div className="modal-title-row">
                <h3 className="modal-title">{game.name}</h3>
                <span className="modal-status-chip game-lock-chip">
                  <Lock size={11} />
                  {game.status || "Tez kunda"}
                </span>
              </div>
              <p className="modal-subtitle">{game.genre}</p>
            </div>
          </div>

          <button
            id="close-game-modal-btn"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Yopish"
          >
            <X size={18} />
          </button>
        </div>

        {/* Locked Profile Card */}
        <div className="game-locked-card">
          <div className="game-lock-glow-circle">
            <div className="game-lock-icon-inner">
              <Lock size={32} />
            </div>
          </div>

          <h4 className="game-locked-title">O'yin profili tez kunda</h4>

          <p className="game-locked-desc">
            Ushbu o'yin kartasi hozirda tayyorlanmoqda. Tez orada bu yerda mening
            rasmiy ID raqamim, darajam va birgalikda o'ynash uchun squad havolasi
            paydo bo'ladi.
          </p>

          <div className="game-locked-meta-row">
            <div className="game-meta-tag">
              <Gamepad2 size={12} />
              <span>{game.genre}</span>
            </div>
            <div className="game-meta-tag ready-tag">
              <Sparkles size={12} />
              <span>Kelgusi yangilanishda</span>
            </div>
          </div>
        </div>

        {/* Close / Understood button */}
        <div className="modal-actions" style={{ marginTop: "14px" }}>
          <button
            id="game-modal-understood-btn"
            type="button"
            className="direct-action-btn"
            onClick={handleClose}
          >
            <span>Tushunarli</span>
          </button>
        </div>

        <p className="modal-tip">
          Keyingi yangilanishda to'liq o'yinchi profili ochiladi
        </p>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
}
