import { Link } from "react-router-dom";
import Section from "../Section.jsx";

const InterestPreview = ({
  id = "interest",
  tone = "accent",
  headingLevel = "h2",
  ctaLabel = "Submit interest form",
  ctaTo = "/interest"
}) => (
  <Section
    id={id}
    tone={tone}
    headingLevel={headingLevel}
    kicker="Get Involved"
    title="Ready to build the next chapter of IBA?"
    intro="We welcome students from every discipline who are passionate about international business, impact, and community."
  >
    <div className="interest-preview float-reveal">
      <p>
        Share your goals and we will connect you with tailored programs, mentors, and events. The
        interest form takes less than five minutes and helps us curate the right opportunities for
        you.
      </p>
      <Link className="section-cta__button section-cta__button--light" to={ctaTo}>
        {ctaLabel}
      </Link>
    </div>
  </Section>
);

export default InterestPreview;
