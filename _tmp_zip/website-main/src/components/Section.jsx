import { useEffect, useRef } from "react";
import "../styles/section.css";

const Section = ({
  id,
  kicker,
  title,
  intro,
  children,
  tone = "light",
  headingLevel = "h2"
}) => {
  const sectionRef = useRef(null);
  const HeadingTag = headingLevel;

  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) {
      return undefined;
    }

    const revealTargets = Array.from(sectionNode.querySelectorAll(".float-reveal")).filter(
      (node) => !node.hasAttribute("data-float-ignore")
    );

    if (!revealTargets.length) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      revealTargets.forEach((element) => {
        element.classList.add("float-reveal--visible");
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
          if (isIntersecting && intersectionRatio >= 0.1) {
            target.classList.add("float-reveal--visible");
          } else if (intersectionRatio === 0) {
            target.classList.remove("float-reveal--visible");
          }
        });
      },
      { threshold: [0, 0.1, 0.35], rootMargin: "0px 0px -10% 0px" }
    );

    revealTargets.forEach((element, index) => {
      const delayValue = element.getAttribute("data-reveal-delay");
      if (!delayValue && !element.style.getPropertyValue("--float-reveal-delay")) {
        element.style.setProperty("--float-reveal-delay", `${Math.min(index * 80, 360)}ms`);
      }

      element.classList.add("float-reveal--ready");
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`section section--${tone}`} id={id}>
      <div className="section-inner">
        <div className="section-header float-reveal">
          {kicker && <span className="section-kicker">{kicker}</span>}
          <HeadingTag className="section-title">{title}</HeadingTag>
          {intro && <p className="section-intro">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
