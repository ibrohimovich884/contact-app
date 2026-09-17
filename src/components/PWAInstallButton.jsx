import { useState } from "react";
import { Download, Smartphone, X, CheckCircle2, Share } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { triggerTapFeedback } from "../utils/feedback";

export default function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already running as an installed standalone PWA, don't show the prompt
  if (isInstalled) {
    return (
      <div className="pwa-installed-pill" title="Ilova telefoningizga o'rnatilgan">
        <CheckCircle2 size={13} className="pwa-installed-icon" />
        <span>O'rnatilgan PWA</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    triggerTapFeedback("pop");
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        id="pwa-install-header-btn"
        className="pwa-install-btn"
        onClick={handleInstallClick}
        type="button"
        title="Ilovani telefoningizga o'rnatish (PWA)"
        aria-label="Ilovani o'rnatish"
      >
        <div className="pwa-btn-icon-wrap">
          {isIOS ? <Smartphone size={15} /> : <Download size={15} />}
        </div>
        <span className="pwa-btn-text">
          {isIOS ? "Telefonga o'rnatish" : "Ilovani o'rnatish"}
        </span>
        <span className="pwa-badge">PWA</span>
      </button>

      {/* Guide Modal for iOS Safari or manual installation instructions */}
      {showGuide && (
        <div
          id="pwa-guide-modal-overlay"
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              triggerTapFeedback("light");
              setShowGuide(false);
            }
          }}
        >
          <div className="modal-sheet pwa-guide-sheet">
            <div className="victus-sheen" />
            <div className="sheet-drag-handle" />

            <div className="modal-header">
              <div className="modal-brand">
                <div
                  className="modal-icon-badge"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  }}
                >
                  <Smartphone size={22} color="#ffffff" />
                </div>
                <div>
                  <h3 className="modal-title">Telefonga o'rnatish (PWA)</h3>
                  <p className="modal-subtitle">
                    Tezkor kirish va to'liq ekranli ilova tajribasi
                  </p>
                </div>
              </div>

              <button
                id="close-pwa-guide-btn"
                className="modal-close-btn"
                onClick={() => {
                  triggerTapFeedback("light");
                  setShowGuide(false);
                }}
                aria-label="Yopish"
              >
                <X size={18} />
              </button>
            </div>

            <div className="pwa-guide-steps">
              {isIOS ? (
                <>
                  <div className="pwa-step-item">
                    <div className="pwa-step-num">1</div>
                    <div className="pwa-step-body">
                      <div className="pwa-step-title">
                        Safari menyusidagi <Share size={15} className="inline-icon" /> <strong>"Ulashish" (Share)</strong> tugmasini bosing
                      </div>
                      <div className="pwa-step-desc">
                        Safari brauzerining pastki qismidagi o'rtadagi kvadrat-strelka belgisini tanlang.
                      </div>
                    </div>
                  </div>

                  <div className="pwa-step-item">
                    <div className="pwa-step-num">2</div>
                    <div className="pwa-step-body">
                      <div className="pwa-step-title">
                        <strong>"Bosh ekranga qo'shish" (Add to Home Screen)</strong> bandini bosing
                      </div>
                      <div className="pwa-step-desc">
                        Ochilgan ro'yxatni pastga suring va "+" belgili "Bosh ekranga qo'shish"ni tanlang.
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="pwa-step-item">
                    <div className="pwa-step-num">1</div>
                    <div className="pwa-step-body">
                      <div className="pwa-step-title">
                        Brauzer menyusini oching (Chrome / Edge)
                      </div>
                      <div className="pwa-step-desc">
                        Brauzerning o'ng yuqori qismidagi 3 nuqta (⋮) tugmasini bosing.
                      </div>
                    </div>
                  </div>

                  <div className="pwa-step-item">
                    <div className="pwa-step-num">2</div>
                    <div className="pwa-step-body">
                      <div className="pwa-step-title">
                        <strong>"Ilovani o'rnatish"</strong> yoki <strong>"Bosh ekranga qo'shish"</strong>ni tanlang
                      </div>
                      <div className="pwa-step-desc">
                        Shunda profil ilovasi telefoningiz bosh ekranida xuddi haqiqiy ilovadek paydo bo'ladi.
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="pwa-guide-benefit">
              ✨ <strong>PWA afzalliklari:</strong> Xotiradan kam joy oladi, internetsiz ham tez ishlaydi va brauzer satrlari yo'qolib sof ilova holatida ochiladi.
            </div>

            <button
              id="confirm-pwa-guide-btn"
              className="direct-action-btn"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                marginTop: "16px",
              }}
              onClick={() => {
                triggerTapFeedback("light");
                setShowGuide(false);
              }}
            >
              Tushundim
            </button>
          </div>
        </div>
      )}
    </>
  );
}
