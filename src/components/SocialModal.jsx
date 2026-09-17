import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, ExternalLink, Copy, Check, Share2, ScanLine } from "lucide-react";
import { triggerTapFeedback } from "../utils/feedback";
import { SocialIcon } from "./SocialIcons";

export default function SocialModal({ social, onClose }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
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

  return (
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
                <span className="modal-status-chip">
                  <span className="live-dot" />
                  {social.stats || "Faol"}
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
            <span className="nickname-label">Nikneym / Profil</span>
            <span className="nickname-value">{social.handle}</span>
          </div>

          <button
            id="copy-nickname-btn"
            className={`copy-btn ${copied ? "copied" : ""}`}
            onClick={handleCopyHandle}
            title="Nikneymdan nusxa olish"
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
        </div>

        {/* Direct QR Code display (Centered cleanly without extra tabs) */}
        <div className="direct-qr-container">
          <div className="direct-qr-frame">
            <div className="qr-scan-lens-corner tl" />
            <div className="qr-scan-lens-corner tr" />
            <div className="qr-scan-lens-corner bl" />
            <div className="qr-scan-lens-corner br" />

            <div className="direct-qr-code-wrapper">
              <QRCodeSVG
                value={social.url}
                size={180}
                bgColor="#ffffff"
                fgColor="#0c0818"
                level="H"
                includeMargin={false}
              />
            </div>
          </div>

          <div className="qr-guide-row">
            <ScanLine size={15} className="qr-guide-icon" />
            <span className="qr-guide-text">
              Kamerani yo'naltirib darhol profilni oching
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <a
            id="direct-social-link-btn"
            href={social.url}
            target="_blank"
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

          <button
            id="share-social-btn"
            className="secondary-action-btn"
            onClick={handleShare}
            title="Havolani ulashish"
          >
            <Share2 size={16} />
            <span>{shared ? "Nusxalandi!" : "Ulashish"}</span>
          </button>
        </div>

        <div className="modal-tip">
          Victus Tempered Glass • Tugmani bosganda rasmiy ilova ochiladi
        </div>
      </div>
    </div>
  );
}
