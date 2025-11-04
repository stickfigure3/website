import Hero from "../components/Hero.jsx";
import BoardSection from "../components/sections/BoardSection.jsx";
import PartnersSection from "../components/sections/PartnersSection.jsx";
import InterestPreview from "../components/sections/InterestPreview.jsx";
import CaseStudyCarousel from "../components/sections/CaseStudyCarousel.jsx";
import ProjectsSection from "../components/sections/ProjectsSection.jsx";

const Home = () => (
  <>
    <Hero />
    <BoardSection showCTA />
    <CaseStudyCarousel />
    <PartnersSection showCTA />
    <ProjectsSection tone="light" />
    <InterestPreview />
  </>
);

export default Home;
