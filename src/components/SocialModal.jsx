import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import { X, ExternalLink, Copy, Check, Share2, ScanLine } from "lucide-react";
import { triggerTapFeedback } from "../utils/feedback";
import { SocialIcon } from "./SocialIcons";

export default function SocialModal({ social, onClose }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isCompact, setIsCompact] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 420 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth <= 420);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Comprehensive scroll lock and horizontal freeze when modal card is open
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyTouchAction = document.body.style.touchAction;
    const originalHtmlTouchAction = document.documentElement.style.touchAction;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.touchAction = "none";

    // Strictly intercept and prevent background touch drag / scroll leakage on mobile
    const preventBackgroundScroll = (e) => {
      const sheet = document.getElementById("social-modal-sheet");
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

  if (!social) return null;

  const handleCopyHandle = async () => {
    triggerTapFeedback("copy");
    try {
      await navigator.clipboard.writeText(social.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = social.handle;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    triggerTapFeedback("light");
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${social.name} - ${social.handle}`,
          text: `${social.name} orqali bog'lanish: ${social.handle}`,
          url: social.url,
        });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(social.url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // ignore
      }
    }
  };

  const handleClose = () => {
    triggerTapFeedback("light");
    onClose();
  };

  const handleDirectClick = () => {
    triggerTapFeedback("pop");
  };

  const modalContent = (
    <div
      id="social-modal-overlay"
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        id="social-modal-sheet"
        className="modal-sheet victus-glass-card"
        style={{
          "--accent-color": social.themeColor,
          "--accent-glow": social.glowColor,
        }}
      >
        {/* Gorilla Glass reflection shine */}
        <div className="victus-sheen" />

        {/* Drag handle for mobile gesture aesthetic */}
        <div className="sheet-drag-handle" />

        {/* Top Header */}
        <div className="modal-header">
          <div className="modal-brand">
            <div
              className="modal-icon-badge"
              style={{ background: social.gradient }}
            >
              <SocialIcon id={social.id} size={24} />
            </div>
            <div>
              <div className="modal-title-row">
                <h3 className="modal-title">{social.name}</h3>
                <span className={`modal-status-chip ${social.isEmpty ? "empty-status" : ""}`}>
                  <span className={social.isEmpty ? "empty-dot" : "live-dot"} />
                  {social.stats || (social.isEmpty ? "Bo'sh" : "Faol")}
                </span>
              </div>
              <p className="modal-subtitle">{social.badge}</p>
            </div>
          </div>

          <button
            id="close-modal-btn"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Yopish"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nickname / Handle Card with Instant Copy */}
        <div className="nickname-box">
          <div className="nickname-info">
            <span className="nickname-label">
              {social.id === "email" ? "Elektron pochta manzili" : "Nikneym / Profil"}
            </span>
            <span className="nickname-value">
              {social.isEmpty ? "Kiritilmagan (bo'sh)" : social.handle}
            </span>
          </div>

          {!social.isEmpty && (
            <button
              id="copy-nickname-btn"
              className={`copy-btn ${copied ? "copied" : ""}`}
              onClick={handleCopyHandle}
              title="Nusxa olish"
            >
              {copied ? (
                <>
                  <Check size={15} />
                  <span>Nusxalandi!</span>
                </>
              ) : (
                <>
                  <Copy size={15} />
                  <span>Nusxalash</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Direct QR Code display */}
        <div className="direct-qr-container">
          <div className="direct-qr-frame">
            <div className="qr-scan-lens-corner tl" />
            <div className="qr-scan-lens-corner tr" />
            <div className="qr-scan-lens-corner bl" />
            <div className="qr-scan-lens-corner br" />

            {social.url ? (
              <div className="direct-qr-code-wrapper">
                <QRCodeSVG
                  value={social.url}
                  size={isCompact ? 144 : 176}
                  bgColor="#ffffff"
                  fgColor="#0c0818"
                  level="H"
                  includeMargin={false}
                />
              </div>
            ) : (
              <div
                className="empty-qr-placeholder"
                style={{
                  width: isCompact ? 144 : 176,
                  height: isCompact ? 144 : 176,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.04)",
                  borderRadius: "16px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>📭</div>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#f3f4f6" }}>
                  Profil biriktirilmagan
                </span>
                <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.45)", marginTop: "4px" }}>
                  Ushbu tarmoq hozircha bo'sh qoldirilgan
                </span>
              </div>
            )}
          </div>

          <div className="qr-guide-row">
            <ScanLine size={15} className="qr-guide-icon" />
            <span className="qr-guide-text">
              {social.url
                ? social.id === "email"
                  ? "QR kodni skanerlab darhol xat yuboring"
                  : "Kamerani yo'naltirib darhol profilni oching"
                : "Profil kiritilgandan so'ng QR kod paydo bo'ladi"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          {social.url ? (
            <a
              id="direct-social-link-btn"
              href={social.url}
              target={social.url.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={handleDirectClick}
              className="direct-action-btn"
              style={{
                background: social.gradient,
                boxShadow: `0 8px 24px -4px ${social.glowColor}`,
              }}
            >
              <span>{social.directButtonText || `${social.name}'ga o'tish`}</span>
              <ExternalLink size={17} />
            </a>
          ) : (
            <div
              className="direct-action-btn empty-btn"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.4)",
                cursor: "default",
                boxShadow: "none",
              }}
            >
              <span>Profil hali biriktirilmagan (bo'sh)</span>
            </div>
          )}

          {social.url && (
            <button
              id="share-social-btn"
              className="secondary-action-btn"
              onClick={handleShare}
              title="Havolani ulashish"
            >
              <Share2 size={16} />
              <span>{shared ? "Nusxalandi!" : "Ulashish"}</span>
            </button>
          )}
        </div>

        <div className="modal-tip">
          Victus Tempered Glass • Tugmani bosganda rasmiy ilova ochiladi
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
}
