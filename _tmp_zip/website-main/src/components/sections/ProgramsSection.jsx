import { Link } from "react-router-dom";
import Section from "../Section.jsx";
import { programHighlights } from "../../data/content.js";

const ProgramsSection = ({
  id = "programs",
  tone = "accent",
  headingLevel = "h2",
  showCTA = false,
  ctaLabel = "Explore all programs",
  ctaTo = "/programs",
  variant = "grid"
}) => {
  const isCatalogVariant = variant === "catalog";

  return (
    <Section
      id={id}
      tone={tone}
      headingLevel={headingLevel}
      kicker="Signature Programs"
      title="Experiential learning from campus to the world."
    >
      {isCatalogVariant ? (
        <div className="program-list">
          {programHighlights.map(({ title, description }, index) => (
            <article
              key={title}
              className="program-list__item float-reveal"
              style={{ "--float-reveal-delay": `${index * 80}ms` }}
            >
              <div className="program-list__definition">
                <span className="program-list__index">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="program-list__title">{title}</h3>
              </div>
              <p className="program-list__description">{description}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="card-grid card-grid--three">
          {programHighlights.map(({ title, description }) => (
            <article key={title} className="card card--minimal float-reveal">
              <h3 className="card-title">{title}</h3>
              <p className="card-body">{description}</p>
            </article>
          ))}
        </div>
      )}
      {showCTA && (
        <div className="section-cta float-reveal">
          <Link className="section-cta__button" to={ctaTo}>
            {ctaLabel}
          </Link>
        </div>
      )}
    </Section>
  );
};

export default ProgramsSection;
