import { useState } from "react";
import "./App.css";
import { SOCIALS_DATA } from "./data/socials";
import SocialModal from "./components/SocialModal";
import TouchFeedback from "./components/TouchFeedback";
import { SocialIcon } from "./components/SocialIcons";
import OfflineIndicator from "./components/OfflineIndicator";
import GamesSection from "./components/GamesSection";
import ProjectsSection from "./components/ProjectsSection";
import { triggerTapFeedback } from "./utils/feedback";
import {
  Share2,
  ChevronDown,
  Sparkles,
  Check,
} from "lucide-react";

export default function App() {
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [showMoreSocials, setShowMoreSocials] = useState(false);
  const [shimmerKey, setShimmerKey] = useState(0);
  const [isReShimmering, setIsReShimmering] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const triggerCardShimmer = () => {
    setShimmerKey((prev) => prev + 1);
    setIsReShimmering(true);
    setTimeout(() => {
      setIsReShimmering(false);
    }, 2900);
  };

  const handleOpenSocial = (social) => {
    triggerTapFeedback("pop");
    setSelectedSocial(social);
  };

  const handleCloseSocial = () => {
    setSelectedSocial(null);
    triggerCardShimmer();
  };

  const handleToggleMoreSocials = () => {
    triggerTapFeedback("light");
    setShowMoreSocials((prev) => !prev);
  };

  const handleShareApp = async () => {
    triggerTapFeedback("light");
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Oybek Bekmirzayev - Contact & Portfolio",
          text: "Oybek Bekmirzayev (Ibrohimovich) profil kartasi, ijtimoiy tarmoqlari va loyihalari",
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2200);
      } catch {
        // ignore
      }
    }
  };

  // Initially display first 6 primary socials, reveal others when "See more" is toggled
  const displayedSocials = showMoreSocials
    ? SOCIALS_DATA
    : SOCIALS_DATA.slice(0, 6);

  return (
    <div className="page">
      {/* Offline banner notification when internet is disconnected */}
      <OfflineIndicator />

      {/* Screen-wide tactile touch ripple, vibration & micro-audio click */}
      <TouchFeedback />

      <div className={`glass-card ${isReShimmering ? "card-re-shimmering" : ""}`}>
        {/* Dynamic re-shimmer & periodic luxury light sweep */}
        <div key={`sheen-${shimmerKey}`} className={`sheen ${isReShimmering ? "sheen-fresh" : ""}`} />
        <div className="card-border-gleam" />

        {/* Quick share button at top-right */}
        <button
          id="share-profile-btn"
          className={`card-share-trigger ${copiedLink ? "share-copied" : ""}`}
          onClick={handleShareApp}
          title={copiedLink ? "Havola nusxalandi!" : "Sahifani ulashish"}
          aria-label={copiedLink ? "Havola nusxalandi!" : "Sahifani ulashish"}
        >
          {copiedLink ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
        </button>

        {/* Profile Avatar */}
        <div className="avatar-wrap">
          <div className="ring" />
          <div className="avatar-inner">
            <span className="avatar-initials">OY</span>
          </div>
        </div>

        {/* Header Info */}
        <h1 className="name">Ibrohimovich</h1>
        <div className="handle">@ibrohimovich_o1</div>

        {/* Status Indicator */}
        <div className="status-badge-container">
          <span className="status-badge">
            <span className="status-pulse-dot" />
            Yangi loyihalar uchun ochiq
          </span>
        </div>

        {/* Corrected & Professional Full-Stack Bio */}
        <p className="bio">
          Full-Stack veb dasturchi. <strong>React.js</strong>, <strong>Node.js</strong> va{" "}
          <strong>PostgreSQL</strong> asosida zamonaviy interfeyslar, ma&apos;lumotlar bazasi va
          yuqori tezlikdagi web ilovalar ishlab chiqaman.
        </p>

        {/* Tech skills pill tags */}
        <div className="tech-pills-row">
          <span className="tech-pill">
            <Sparkles size={11} /> React.js
          </span>
          <span className="tech-pill">Node.js</span>
          <span className="tech-pill">PostgreSQL</span>
          <span className="tech-pill">JavaScript</span>
        </div>

        {/* Socials section */}
        <div className="eyebrow-row">
          <div className="eyebrow">Ijtimoiy tarmoqlar</div>
          <span className="eyebrow-hint">
            {displayedSocials.length} / {SOCIALS_DATA.length} ta tarmoq
          </span>
        </div>

        <div className="socials">
          {displayedSocials.map((s) => (
            <button
              key={s.id}
              id={`social-btn-${s.id}`}
              className="social-btn"
              onClick={() => handleOpenSocial(s)}
              type="button"
              aria-label={s.name}
              title={`${s.name} ma'lumotlari`}
            >
              <div className="social-btn-inner">
                <SocialIcon id={s.id} size={22} />
              </div>
              <span className="social-btn-label">{s.name}</span>
            </button>
          ))}
        </div>

        {/* See More / Show Less Button */}
        <div className="see-more-wrap">
          <button
            id="toggle-more-socials-btn"
            type="button"
            className="see-more-btn"
            onClick={handleToggleMoreSocials}
          >
            <span>
              {showMoreSocials
                ? "Kamroq ko'rsatish"
                : `Ko'proq ko'rish (${SOCIALS_DATA.length - 6} ta yangi tarmoq)`}
            </span>
            <ChevronDown
              size={15}
              className={`see-more-icon ${showMoreSocials ? "rotated" : ""}`}
            />
          </button>
        </div>

        {/* Games section above projects */}
        <GamesSection onModalClose={triggerCardShimmer} />

        {/* Real projects section */}
        <ProjectsSection />

        <div className="footer-note">
          <span>© 2026 Ibrohimovich</span>
          <span className="footer-dot">•</span>
          <span>Aloqa va Portfolio</span>
        </div>
      </div>

      {/* Detail Modal when any social button is clicked */}
      {selectedSocial && (
        <SocialModal
          social={selectedSocial}
          onClose={handleCloseSocial}
        />
      )}
    </div>
  );
}
