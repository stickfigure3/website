import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../data/content.js";
import "../styles/navbar.css";
import logo from "../assets/iba-club-logo.jpg";
import goatImage from "../assets/goat-easter-egg.jpg";

const GOAT_HOLD_DELAY = 20000;
const GOAT_DISPLAY_DURATION = 6500;

const NavBar = () => {
  const [isElevated, setIsElevated] = useState(false);
  const [isGoatVisible, setIsGoatVisible] = useState(false);
  const goatHoldTimerRef = useRef(null);
  const goatDisplayTimerRef = useRef(null);

  const clearHoldTimer = () => {
    if (goatHoldTimerRef.current) {
      window.clearTimeout(goatHoldTimerRef.current);
      goatHoldTimerRef.current = null;
    }
  };

  const clearDisplayTimer = () => {
    if (goatDisplayTimerRef.current) {
      window.clearTimeout(goatDisplayTimerRef.current);
      goatDisplayTimerRef.current = null;
    }
  };

  const revealGoat = () => {
    setIsGoatVisible(true);
    goatDisplayTimerRef.current = window.setTimeout(() => {
      setIsGoatVisible(false);
      goatDisplayTimerRef.current = null;
    }, GOAT_DISPLAY_DURATION);
  };

  useEffect(() => {
    const handleScroll = () => setIsElevated(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(
    () => () => {
      clearHoldTimer();
      clearDisplayTimer();
    },
    []
  );

  const handleBrandEnter = () => {
    if (goatHoldTimerRef.current || goatDisplayTimerRef.current) {
      return;
    }

    goatHoldTimerRef.current = window.setTimeout(() => {
      goatHoldTimerRef.current = null;
      revealGoat();
    }, GOAT_HOLD_DELAY);
  };

  const handleBrandLeave = () => {
    clearHoldTimer();
    if (goatDisplayTimerRef.current) {
      clearDisplayTimer();
    }
    setIsGoatVisible(false);
  };

  return (
    <header className={`nav-wrapper ${isElevated ? "nav-wrapper--elevated" : ""}`}>
      <div className="nav-inner">
        <Link className="nav-brand" to="/">
          <img
            className="nav-brand-logo"
            src={logo}
            alt="Investment Banking Academy logo"
            onMouseEnter={handleBrandEnter}
            onMouseLeave={handleBrandLeave}
            onTouchStart={handleBrandEnter}
            onTouchEnd={handleBrandLeave}
            onTouchCancel={handleBrandLeave}
          />
          <span className="nav-brand-text">INVESTMENT BANKING ACADEMY</span>
        </Link>
        <nav className="nav-links">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div
        className={`nav-goat${isGoatVisible ? " nav-goat--visible" : ""}`}
        aria-hidden="true"
      >
        <img className="nav-goat__image" src={goatImage} alt="" />
      </div>
    </header>
  );
};

export default NavBar;
