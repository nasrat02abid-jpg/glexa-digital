"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const initialForm = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  deadline: "",
  details: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = `
Hello Glexa Digital,

I would like to request a project quotation.

Name: ${form.fullName}
Company: ${form.company || "Not provided"}
Email: ${form.email}
Phone: ${form.phone}
Service: ${form.service}
Budget: ${form.budget}
Deadline: ${form.deadline || "Flexible"}

Project Details:
${form.details}
    `.trim();

    window.open(
      `https://wa.me/923159516604?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="formSuccess">
        <CheckCircle2 size={52} />
        <h2>Your quotation request is ready.</h2>
        <p>
          WhatsApp has been opened with your project information. Send the
          prepared message to contact the Glexa Digital team.
        </p>

        <button
          type="button"
          className="primaryButton"
          onClick={() => {
            setForm(initialForm);
            setSubmitted(false);
          }}
        >
          Request Another Quote
        </button>
      </div>
    );
  }

  return (
    <form className="quoteForm" onSubmit={handleSubmit}>
      <div className="formGrid">
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </label>

        <label>
          Company Name
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your business or company"
          />
        </label>

        <label>
          Email Address
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
          />
        </label>

        <label>
          WhatsApp Number
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+92 300 0000000"
            required
          />
        </label>

        <label>
          Required Service
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            <option>Media Production</option>
            <option>Photography</option>
            <option>Video Editing</option>
            <option>Content Creation</option>
            <option>Web Development</option>
            <option>WhatsApp Automation</option>
            <option>Meta Ads</option>
            <option>TikTok Ads</option>
            <option>Google Ads</option>
            <option>Data Analysis & Power BI</option>
            <option>Multiple Services</option>
          </select>
        </label>

        <label>
          Estimated Budget
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
          >
            <option value="">Select your budget</option>
            <option>PKR 20,000–50,000</option>
            <option>PKR 50,000–100,000</option>
            <option>PKR 100,000–250,000</option>
            <option>PKR 250,000+</option>
            <option>Need consultation</option>
          </select>
        </label>

        <label>
          Expected Deadline
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />
        </label>
      </div>

      <label>
        Project Details
        <textarea
          name="details"
          value={form.details}
          onChange={handleChange}
          rows={7}
          placeholder="Describe your project, objectives and important requirements."
          required
        />
      </label>

      <button type="submit" className="primaryButton submitButton">
        <Send size={18} />
        Request Quote on WhatsApp
      </button>
    </form>
  );
}