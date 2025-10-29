import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../Section.jsx";
import { boardMembers } from "../../data/content.js";

const HoverAvatar = ({ primary, secondary, alt }) => {
  const [isSecondaryVisible, setIsSecondaryVisible] = useState(false);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleEnter = () => {
    if (!secondary || timerRef.current || isSecondaryVisible) {
      return;
    }

    timerRef.current = window.setTimeout(() => {
      setIsSecondaryVisible(true);
      timerRef.current = null;
    }, 5000);
  };

  const handleLeave = () => {
    clearTimer();
    setIsSecondaryVisible(false);
  };

  useEffect(
    () => () => {
      clearTimer();
    },
    []
  );

  if (!secondary) {
    return <img className="card-avatar" src={primary} alt={alt} />;
  }

  return (
    <div
      className="card-avatar-wrapper"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchEnd={handleLeave}
      onTouchCancel={handleLeave}
    >
      <img
        className={`card-avatar card-avatar--stacked card-avatar--primary${
          isSecondaryVisible ? " card-avatar--hidden" : ""
        }`}
        src={primary}
        alt={alt}
      />
      <img
        className={`card-avatar card-avatar--stacked card-avatar--secondary${
          isSecondaryVisible ? " card-avatar--visible" : ""
        }`}
        src={secondary}
        alt={`${alt} alternate`}
      />
    </div>
  );
};

const BoardSection = ({
  id = "board",
  tone = "light",
  headingLevel = "h2",
  showCTA = false,
  ctaLabel,
  ctaTo = "/board",
  kicker,
  title,
  intro,
  members,
  variant = "preview",
  ctaNote
}) => {
  let resolvedMembers;

  if (members && members.length) {
    resolvedMembers = members;
  } else if (variant === "preview") {
    const featuredMembers = boardMembers.filter(({ featured }) => featured);
    resolvedMembers = featuredMembers.length ? featuredMembers : boardMembers;
  } else {
    resolvedMembers = boardMembers;
  }

  const resolvedKicker = kicker ?? (variant === "preview" ? "Leadership" : "Team");
  const resolvedTitle =
    title ??
    (variant === "preview"
      ? "Meet the team driving the UCSC Investment Banking Academy"
      : "Board Members");
  const resolvedIntro =
    intro ?? (variant === "preview" ? "A Founding team of motivated students to bridge the gap between academics and real-world finance." : undefined);
  const resolvedCtaLabel =
    ctaLabel ?? (variant === "preview" ? "Meet the rest of the team" : undefined);
  const resolvedCtaNote =
    ctaNote ?? (variant === "preview" ? "Psst... the rest of the crew is just getting warmed up." : undefined);

  return (
    <Section
      id={id}
      tone={tone}
      headingLevel={headingLevel}
      kicker={resolvedKicker}
      title={resolvedTitle}
      intro={resolvedIntro}
    >
      <div className={`card-grid ${variant === "full" ? "card-grid--board-full" : ""}`}>
        {resolvedMembers.map(({ name, role, bio, image, hoverImage }) => (
          <article
            key={name}
            className={`card float-reveal ${variant === "full" ? "card--board-full" : ""}`}
          >
            {variant === "full" ? (
              <>
                {image ? (
                  <img className="board-member__photo" src={image} alt={`${name} headshot`} />
                ) : (
                  <div className="board-member__photo board-member__photo--placeholder">
                    <span>{name.charAt(0)}</span>
                  </div>
                )}
                <div className="board-member__meta">
                  <h3 className="board-member__name">{name}</h3>
                  {role && <p className="board-member__role">{role}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="card-header">
                  {image ? (
                    <HoverAvatar primary={image} secondary={hoverImage} alt={`${name} headshot`} />
                  ) : (
                    <span className="avatar">{name.charAt(0)}</span>
                  )}
                  <div>
                    <h3 className="card-title">{name}</h3>
                    {role && <p className="card-subtitle">{role}</p>}
                  </div>
                </div>
                {bio && <p className="card-body">{bio}</p>}
              </>
            )}
          </article>
        ))}
      </div>
      {showCTA && resolvedCtaLabel && (
        <div className="section-cta float-reveal">
          <Link className="section-cta__button" to={ctaTo}>
            {resolvedCtaLabel}
          </Link>
          {resolvedCtaNote && <span className="section-cta__note">{resolvedCtaNote}</span>}
        </div>
      )}
    </Section>
  );
};

export default BoardSection;
