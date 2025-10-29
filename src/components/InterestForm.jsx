import { useState } from "react";
import "../styles/interest-form.css";

const initialState = {
  name: "",
  email: "",
  graduationYear: "",
  interests: "",
  message: ""
};

const InterestForm = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.table(formValues);
    setSubmitted(true);
    setFormValues(initialState);
  };

  return (
    <div className="form-wrapper" id="interest-form">
      <form className="interest-form" onSubmit={handleSubmit}>
        <div className="form-heading">
          <h3 className="form-title">Tell us about your goals</h3>
          <p className="form-subtitle">
            Share your background and what you hope to explore within IBA. We will connect you with
            upcoming programs that match your interests.
          </p>
        </div>
        <div className="form-grid">
          <label className="form-field">
            <span>Full Name</span>
            <input
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              placeholder="Jordan Rivers"
            />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
              placeholder="jordan.rivers@example.com"
            />
          </label>
          <label className="form-field">
            <span>Graduation Year</span>
            <input
              name="graduationYear"
              value={formValues.graduationYear}
              onChange={handleChange}
              placeholder="2027"
            />
          </label>
          <label className="form-field form-field--full">
            <span>Areas of Interest</span>
            <select
              name="interests"
              value={formValues.interests}
              onChange={handleChange}
              required
            >
              <option value="">Choose focus areas</option>
              <option value="consulting">Global Consulting</option>
              <option value="finance">International Finance</option>
              <option value="entrepreneurship">Entrepreneurship</option>
              <option value="policy">Policy & Diplomacy</option>
              <option value="sustainability">Sustainable Business</option>
            </select>
          </label>
          <label className="form-field form-field--full">
            <span>What would you like to build with IBA?</span>
            <textarea
              name="message"
              value={formValues.message}
              onChange={handleChange}
              rows={5}
              placeholder="Share goals, project ideas, or areas where you're looking for support."
            />
          </label>
        </div>
        <button className="form-button" type="submit">
          Submit Interest
        </button>
        {submitted && (
          <p className="form-confirmation" role="status">
            Thank you! We will be in touch with program updates shortly.
          </p>
        )}
      </form>
    </div>
  );
};

export default InterestForm;
