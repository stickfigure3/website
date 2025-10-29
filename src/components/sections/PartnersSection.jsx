import { Link } from "react-router-dom";
import Section from "../Section.jsx";
import whartonWallStreetPrep from "../../assets/wharton-wallstreetprep-logo.png";
import alphaKappaPsi from "../../assets/AlphaKappaPsi_Horizontal-Website.png";
import ucSantaCruz from "../../assets/logo_-_uc_santa_cruz.png";

const partnerLogos = [
  {
    src: alphaKappaPsi,
    alt: "Alpha Kappa Psi",
    description:
      "Our partnership with AKPsi connects members to a powerhouse network of future business leaders. From leadership workshops to real-world case challenges, this alliance helps members sharpen their professionalism, confidence, and career potential — together."
  },
  {
    src: whartonWallStreetPrep,
    alt: "Wharton x Wall Street Prep",
    description:
      "Through Wharton and Wall Street Prep, members gain access to elite financial training — mastering valuation, modeling, and deal strategy just like analysts on Wall Street. It’s hands-on, high-impact learning built for future finance leaders."
  },
  {
    src: ucSantaCruz,
    alt: "UC Santa Cruz",
    description:
      "Rooted in UCSC’s culture of creativity and curiosity, IBA empowers students to turn bold ideas into business solutions. Our partnership bridges classroom learning with real-world finance, giving every member a launchpad for innovation and success."
  }
];

const PartnersSection = ({
  id = "partners",
  tone = "dark",
  headingLevel = "h2",
  showCTA = false,
  ctaLabel = "View partner network",
  ctaTo = "/partners",
  interactiveCards = false
}) => (
  <Section
    id={id}
    tone={tone}
    headingLevel={headingLevel}
    kicker="Strategic Partners"
    title="Allies across industries."
    intro="Our partners bring real-world challenges, mentorship, and resources that elevate every member's experience."
  >
    <div className={`partner-logos${interactiveCards ? " partner-logos--interactive" : ""}`}>
      {partnerLogos.map(({ src, alt, description }) => {
        const interactiveProps = interactiveCards ? { tabIndex: 0 } : {};
        return (
          <div
            key={alt}
            className={`partner-logo float-reveal${interactiveCards ? " partner-logo--interactive" : ""}`}
            {...interactiveProps}
            aria-label={interactiveCards ? `${alt} partnership details` : undefined}
          >
            {interactiveCards ? (
              <div className="partner-logo__inner">
                <div className="partner-logo__face partner-logo__face--front">
                  <img className="partner-logo__image" src={src} alt={`${alt} logo`} />
                </div>
                <div className="partner-logo__face partner-logo__face--back">
                  <p className="partner-logo__description">{description}</p>
                </div>
              </div>
            ) : (
              <img className="partner-logo__image" src={src} alt={`${alt} logo`} />
            )}
          </div>
        );
      })}
    </div>
    {showCTA && (
      <div className="section-cta float-reveal">
        <Link className="section-cta__button" to={ctaTo}>
          {ctaLabel}
        </Link>
        <span className="section-cta__note">C'mon! You know you want to click the button!!!</span>
      </div>
    )}
  </Section>
);

export default PartnersSection;
