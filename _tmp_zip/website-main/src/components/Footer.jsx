import "../styles/footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <span className="footer-kicker">IBA Club</span>
        <p>
          A community dedicated to shaping globally minded leaders through immersive international
          business experiences.
        </p>
      </div>
      <div className="footer-meta">
        <p>© {new Date().getFullYear()} International Business Association. All rights reserved.</p>
        <p>
          Questions?{" "}
          <a href="mailto:iba-club@example.com" className="footer-link">
            iba-club@example.com
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
