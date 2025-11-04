import Section from "../components/Section.jsx";
import InterestForm from "../components/InterestForm.jsx";

const InterestPage = () => (
  <Section
    id="interest-page"
    tone="accent"
    headingLevel="h1"
    kicker="Get Involved"
    title="Submit your interest form"
    intro="Tell us about your goals and areas of curiosity. We will match you with upcoming IBA opportunities, mentors, and events."
  >
    <InterestForm />
  </Section>
);

export default InterestPage;
