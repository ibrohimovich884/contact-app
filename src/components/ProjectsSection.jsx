import {
  FolderGit2,
  ExternalLink,
  UtensilsCrossed,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { PROJECTS_DATA } from "../data/projects";
import { triggerTapFeedback } from "../utils/feedback";

export default function ProjectsSection() {
  const getProjectIcon = (id) => {
    if (id === "fast-food") {
      return <UtensilsCrossed size={20} />;
    }
    return <CalendarDays size={20} />;
  };

  const handleProjectClick = () => {
    triggerTapFeedback("pop");
  };

  return (
    <section className="projects-section" aria-labelledby="projects-heading">
      <div className="eyebrow-row">
        <div id="projects-heading" className="eyebrow">
          <FolderGit2 size={15} className="inline-icon" />
          <span>Loyihalarim</span>
        </div>
        <span className="eyebrow-hint">{PROJECTS_DATA.length} ta loyiha</span>
      </div>

      <div className="projects-list">
        {PROJECTS_DATA.map((project) => (
          <a
            key={project.id}
            id={`project-card-${project.id}`}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-card ${project.isActive ? "project-card-active" : ""}`}
            onClick={handleProjectClick}
            style={{
              "--proj-accent": project.color,
              "--proj-glow": project.glowColor,
            }}
          >
            <div className="project-card-header">
              <div className="project-brand">
                <div
                  className="project-icon-badge"
                  style={{ background: project.gradient }}
                >
                  {getProjectIcon(project.id)}
                </div>

                <div className="project-title-box">
                  <div className="project-title-row">
                    <h4 className="project-title">{project.title}</h4>

                    {/* Active Indicator for Project 2 */}
                    {project.isActive ? (
                      <span
                        className="project-active-beacon"
                        title="Hozirda faol loyiha"
                      >
                        <span className="beacon-wrapper">
                          <span className="beacon-ping" />
                          <span className="beacon-dot" />
                        </span>
                        <span className="beacon-text">Active</span>
                      </span>
                    ) : (
                      <span className="project-tag-chip">
                        <Sparkles size={10} />
                        <span>{project.badge}</span>
                      </span>
                    )}
                  </div>

                  <span className="project-subtitle">{project.subtitle}</span>
                </div>
              </div>

              <div className="project-link-action" title="Saytga o'tish">
                <ExternalLink size={16} className="project-arrow-icon" />
              </div>
            </div>

            <p className="project-desc">{project.description}</p>

            <div className="project-card-footer">
              <div className="project-tech-pills">
                {project.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="project-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>

              <span className="project-domain">{project.domain}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="empty-projects-cta">
        <p className="empty-cta-text">
          Boshqa kodlar va loyihalarni GitHub orqali ko&apos;ring
        </p>
        <a
          href="https://github.com/ibrohimovich884"
          target="_blank"
          rel="noopener noreferrer"
          className="empty-github-link"
          onClick={() => triggerTapFeedback("light")}
        >
          <span>GitHub</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </section>
  );
}
