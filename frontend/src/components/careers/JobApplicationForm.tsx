"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  portfolio: "",
  message: "",
};

export default function JobApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.files?.[0]?.name ?? "");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="formSuccess">
        <CheckCircle2 size={52} />
        <h2>Application prepared successfully.</h2>
        <p>
          The application interface is working. Database submission will be
          enabled when the Glexa backend is connected.
        </p>

        <button
          type="button"
          className="primaryButton"
          onClick={() => {
            setForm(initialForm);
            setFileName("");
            setSubmitted(false);
          }}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form className="applicationForm" onSubmit={handleSubmit}>
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
          Phone Number
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
          Position
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            required
          >
            <option value="">Select a position</option>
            <option value="Content Creator">Content Creator</option>
            <option value="Videographer">Videographer</option>
            <option value="Video Editor">Video Editor</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Digital Marketing Intern">
              Digital Marketing Intern
            </option>
            <option value="Data Analyst Intern">Data Analyst Intern</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Experience
          <select
            name="experience"
            value={form.experience}
            onChange={handleChange}
            required
          >
            <option value="">Select experience</option>
            <option value="Fresh">Fresh</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-2 years">1–2 years</option>
            <option value="3-5 years">3–5 years</option>
            <option value="More than 5 years">More than 5 years</option>
          </select>
        </label>

        <label>
          Portfolio Link
          <input
            type="url"
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
          />
        </label>
      </div>

      <label>
        Cover Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your skills and why you want to join Glexa Digital."
          rows={7}
          required
        />
      </label>

      <label className="fileUpload">
        <Upload size={25} />
        <span>{fileName || "Upload CV or Resume"}</span>
        <small>PDF or DOCX, maximum 5 MB</small>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFile}
          required
        />
      </label>

      <button type="submit" className="primaryButton submitButton">
        Submit Application
      </button>
    </form>
  );
}