import { FolderGit2, Sparkles, ExternalLink, Clock } from "lucide-react";
import { triggerTapFeedback } from "../utils/feedback";

export default function ProjectsEmptyState() {
  const emptySlots = [
    {
      title: "Full-Stack Veb Ilova",
      tech: "React.js • Node.js • PostgreSQL",
      status: "Ishlab chiqilmoqda",
      icon: <Sparkles size={16} />,
    },
    {
      title: "Yangi Loyiha",
      tech: "Arxitektura & API rejalashtirilmoqda",
      status: "Tez kunda",
      icon: <Clock size={16} />,
    },
  ];

  return (
    <div className="projects-section">
      <div className="eyebrow-row">
        <div className="eyebrow">
          <FolderGit2 size={15} className="inline-icon" />
          <span>Loyihalarim</span>
        </div>
        <span className="eyebrow-hint">Bo'sh loyihalar</span>
      </div>

      <div className="empty-projects-list">
        {emptySlots.map((slot, idx) => (
          <div key={idx} className="empty-project-card">
            <div className="empty-project-top">
              <div className="empty-project-badge">
                {slot.icon}
                <span>{slot.status}</span>
              </div>
              <span className="empty-slot-num">0{idx + 1}</span>
            </div>

            <div className="empty-project-body">
              <h4 className="empty-project-title">{slot.title}</h4>
              <p className="empty-project-tech">{slot.tech}</p>
            </div>

            <div className="empty-project-line">
              <span className="empty-pulse-line" />
            </div>
          </div>
        ))}
      </div>

      <div className="empty-projects-cta">
        <p className="empty-cta-text">
          Hozirda yangi loyihalar ustida ish olib borilmoqda.
        </p>
        <a
          href="https://github.com/ibrohimovich884"
          target="_blank"
          rel="noreferrer"
          className="empty-github-link"
          onClick={() => triggerTapFeedback("light")}
        >
          <span>GitHub'da kuzatish</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
