import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../Section.jsx";
import { programHighlights } from "../../data/content.js";

const CaseStudyCarousel = ({
  id = "programs",
  tone = "accent",
  headingLevel = "h2",
  ctaLabel = "Explore all programs",
  ctaTo = "/programs"
}) => {
  const introSlide = {
    type: "intro",
    kicker: "Signature Programs",
    title: "Signature Programs",
    description:
      "Learn, analyze, and prepare for your career through hands-on case studies, interviews, and professional training. Swipe to explore.",
    highlight:
      "In collaboration with Wall Street Prep, a leading global provider of financial modeling and valuation training."
  };
  const slides = [
    introSlide,
    ...programHighlights.map((item) => ({ ...item, type: "program" }))
  ];
  const viewportRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const itemCount = slides.length;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !itemCount) {
      return undefined;
    }

    const slideNodes = Array.from(viewport.children);
    if (!slideNodes.length) {
      return undefined;
    }

    const handleScroll = () => {
      const paddingLeft =
        parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;
      const normalizedScroll = viewport.scrollLeft + paddingLeft;

      let closestIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      slideNodes.forEach((slide, index) => {
        const distance = Math.abs(normalizedScroll - slide.offsetLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndexRef.current) {
        activeIndexRef.current = closestIndex;
        setActiveIndex(closestIndex);
      }
    };

    handleScroll();
    viewport.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [activeIndexRef, itemCount]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    const dragState = {
      isDragging: false,
      startX: 0,
      lastX: 0,
      scrollLeft: 0
    };

    const maybeLoopToStart = (swipeDelta = 0) => {
      const slideNodes = Array.from(viewport.children);
      if (!slideNodes.length) {
        return;
      }

      const styles = window.getComputedStyle(viewport);
      const paddingRight = parseFloat(styles.paddingRight) || 0;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;

      const overscrolled =
        viewport.scrollLeft >= maxScroll - paddingRight * 0.4;
      const swipedPastEnd =
        activeIndexRef.current === slideNodes.length - 1 && swipeDelta > 50;

      if (overscrolled || swipedPastEnd) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
      }
    };

    const handlePointerDown = (event) => {
      dragState.isDragging = true;
      dragState.startX = event.clientX;
      dragState.lastX = event.clientX;
      dragState.scrollLeft = viewport.scrollLeft;
      viewport.classList.add("is-dragging");
      if (event.pointerId !== undefined) {
        viewport.setPointerCapture?.(event.pointerId);
      }
    };

    const handlePointerMove = (event) => {
      if (!dragState.isDragging) {
        return;
      }

      event.preventDefault();
      const delta = (event.clientX - dragState.startX) * 0.8;
      viewport.scrollLeft = dragState.scrollLeft - delta;
      dragState.lastX = event.clientX;
    };

    const handlePointerUp = (event) => {
      if (!dragState.isDragging) {
        return;
      }

      dragState.isDragging = false;
      viewport.classList.remove("is-dragging");
      if (event.pointerId !== undefined) {
        viewport.releasePointerCapture?.(event.pointerId);
      }
      const swipeDelta = dragState.startX - dragState.lastX;
      maybeLoopToStart(swipeDelta);
    };

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      viewport.scrollBy({
        left: event.deltaY * 0.6,
        behavior: "auto"
      });

      requestAnimationFrame(() => {
        maybeLoopToStart(event.deltaY);
      });
    };

    viewport.addEventListener("pointerdown", handlePointerDown);
    viewport.addEventListener("pointermove", handlePointerMove);
    viewport.addEventListener("pointerup", handlePointerUp);
    viewport.addEventListener("pointerleave", handlePointerUp);
    viewport.addEventListener("pointercancel", handlePointerUp);
    viewport.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener("pointerdown", handlePointerDown);
      viewport.removeEventListener("pointermove", handlePointerMove);
      viewport.removeEventListener("pointerup", handlePointerUp);
      viewport.removeEventListener("pointerleave", handlePointerUp);
      viewport.removeEventListener("pointercancel", handlePointerUp);
      viewport.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const scrollToIndex = (index) => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const target = viewport.children[index];
    if (!target) {
      return;
    }

    const paddingLeft =
      parseFloat(window.getComputedStyle(viewport).paddingLeft) || 0;
    const offset = target.offsetLeft - paddingLeft;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;

    viewport.scrollTo({
      left: Math.min(Math.max(0, offset), Math.max(0, maxScroll)),
      behavior: "smooth"
    });
  };

  const handlePrevious = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : slides.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex < slides.length - 1 ? activeIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <Section
      id={id}
      tone={tone}
      headingLevel={headingLevel}
      kicker={null}
      title={null}
      intro={null}
    >
      <div className="case-carousel">
        <div className="case-carousel__hint float-reveal" aria-hidden="true">
          <span className="case-carousel__hint-label">Swipe</span>
          <span className="case-carousel__hint-arrow">-&gt;</span>
        </div>
        <button
          className="case-carousel__arrow case-carousel__arrow--prev"
          onClick={handlePrevious}
          aria-label="Previous slide"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="case-carousel__arrow case-carousel__arrow--next"
          onClick={handleNext}
          aria-label="Next slide"
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="case-carousel__viewport" ref={viewportRef}>
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const isIntro = slide.type === "intro";
            const classes = [
              "case-card",
              "float-reveal",
              isActive ? "case-card--active" : "",
              isIntro ? "case-card--intro" : ""
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <article
                key={isIntro ? "intro" : slide.title}
                className={classes}
                tabIndex={0}
              >
                {isIntro ? (
                  <div className="case-card__intro">
                    <h2 className="case-card__headline">{slide.title}</h2>
                    <p className="case-card__lead">{slide.description}</p>
                    <p className="case-card__highlight">{slide.highlight}</p>
                  </div>
                ) : (
                  <>
                    <span className="case-card__index">
                      {String(index).padStart(2, "0")}
                    </span>
                    <h3 className="case-card__title">{slide.title}</h3>
                    <p className="case-card__body">{slide.description}</p>
                  </>
                )}
              </article>
            );
          })}
        </div>
        <div className="case-carousel__dots-wrapper float-reveal">
          <span className="case-carousel__note">Wyd? Get swipin’!!!!!</span>
          <div className="case-carousel__dots" role="tablist" aria-label="IBA training tracks">
            {slides.map((item, index) => (
              <button
                key={item.type === "intro" ? "intro" : item.title}
                type="button"
                className={`case-carousel__dot${
                index === activeIndex ? " case-carousel__dot--active" : ""
              }`}
              aria-label={
                item.type === "intro"
                  ? "Show overview content"
                  : `Show ${item.title}`
              }
                aria-pressed={index === activeIndex}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="case-carousel__cta float-reveal">
          <Link className="section-cta__button" to={ctaTo}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default CaseStudyCarousel;


