import { Link } from "react-router-dom";
import { heroContent } from "../data/content.js";
import "../styles/hero.css";
import homeFade1 from "../assets/home-fade-1.jpg";
import homeFade2 from "../assets/home-fade-2.jpg";
import homeFade3 from "../assets/home-fade-3.jpg";
import homeFade4 from "../assets/home-fade-4.jpg";

const heroBackgroundImages = [homeFade1, homeFade2, homeFade3, homeFade4];

const Hero = () => (
  <section className="hero" id="top">
    <div className="hero-background">
      {heroBackgroundImages.map((source, index) => (
        <div
          key={source}
          className="hero-background__image"
          style={{ backgroundImage: `url(${source})`, animationDelay: `${index * 8}s` }}
        />
      ))}
    </div>
    <div className="hero-container">
      <span className="hero-kicker">{heroContent.kicker}</span>
      <h1 className="hero-title">{heroContent.title}</h1>
      <p className="hero-subtitle">{heroContent.subtitle}</p>
      <div className="hero-actions">
        <Link className="hero-button hero-button--primary" to="/interest">
          Join the Network
        </Link>
        <Link className="hero-button hero-button--secondary" to="/programs">
          Explore Programs
        </Link>
      </div>
    </div>
  </section>
);

export default Hero;
