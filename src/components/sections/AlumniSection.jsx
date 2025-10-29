import { Link } from "react-router-dom";
import Section from "../Section.jsx";
import { alumniStories } from "../../data/content.js";

const AlumniSection = ({
  id = "alumni",
  tone = "light",
  headingLevel = "h2",
  showCTA = false,
  ctaLabel = "Meet our alumni",
  ctaTo = "/alumni"
}) => (
  <Section
    id={id}
    tone={tone}
    headingLevel={headingLevel}
    kicker="Alumni"
    title="Stories from our global alumni community."
  >
    <div className="testimonial-grid">
      {alumniStories.map(({ name, role, testimonial }) => (
        <article key={name} className="testimonial float-reveal">
          <p className="testimonial-quote">{testimonial}</p>
          <div className="testimonial-footer">
            <span>{name}</span>
            <span className="testimonial-role">{role}</span>
          </div>
        </article>
      ))}
    </div>
    {showCTA && (
      <div className="section-cta float-reveal">
        <Link className="section-cta__button" to={ctaTo}>
          {ctaLabel}
        </Link>
      </div>
    )}
  </Section>
);

export default AlumniSection;
