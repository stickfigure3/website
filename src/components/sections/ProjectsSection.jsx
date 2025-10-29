import Section from "../Section.jsx";
import { projectPlaceholders } from "../../data/content.js";

const ProjectsSection = ({
  id = "projects",
  tone = "light",
  headingLevel = "h2"
}) => (
  <Section
    id={id}
    tone={tone}
    headingLevel={headingLevel}
    kicker="Projects"
    title="Ongoing projects"
    intro="Members gain real-world experience through valuation and modeling projects inspired by Wall Street Prep curriculum."
  >
    <div className="projects-note float-reveal">Status: TBA.</div>
    <div className="projects-grid">
      {projectPlaceholders.map(({ title, status, summary }) => (
        <article key={title} className="project-card float-reveal">
          <header className="project-card__header">
            <h3 className="project-card__title">{title}</h3>
            <span className="project-card__status">{status}</span>
          </header>
          <p className="project-card__summary">{summary}</p>
        </article>
      ))}
    </div>
  </Section>
);

export default ProjectsSection;
