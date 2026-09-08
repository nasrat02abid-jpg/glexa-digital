"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";

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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // Open a blank tab immediately to avoid the browser popup blocker.
  const whatsappWindow = window.open("", "_blank");

  if (whatsappWindow) {
    whatsappWindow.document.title = "Opening WhatsApp...";
    whatsappWindow.document.body.innerHTML =
      "<p style='font-family: Arial; padding: 30px;'>Opening WhatsApp...</p>";
    whatsappWindow.opener = null;
  }

  setIsSubmitting(true);
  setError("");

  const whatsappMessage = `
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

  const whatsappUrl = `https://wa.me/923159516604?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  try {
    const response = await fetch(`${API_URL}/api/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        full_name: form.fullName.trim(),
        company: form.company.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.service,
        budget: form.budget,
        deadline: form.deadline || null,
        details: form.details.trim(),
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(
        data?.detail || "Unable to submit your quotation request."
      );
    }

    setForm(initialForm);
    setSubmitted(true);

    if (whatsappWindow) {
      whatsappWindow.location.replace(whatsappUrl);
    } else {
      window.location.assign(whatsappUrl);
    }
  } catch (submitError) {
    whatsappWindow?.close();

    setError(
      submitError instanceof Error
        ? submitError.message
        : "Something went wrong. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  if (submitted) {
    return (
      <div className="formSuccess">
        <CheckCircle2 size={52} />

        <h2>Quotation request submitted.</h2>

        <p>
          Your project details have been received by Glexa Digital. WhatsApp
          has also opened for direct communication.
        </p>

        <button
          type="button"
          className="primaryButton"
          onClick={() => {
            setSubmitted(false);
            setError("");
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
            minLength={2}
            maxLength={150}
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
            maxLength={150}
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
            minLength={7}
            maxLength={50}
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
          minLength={10}
          maxLength={5000}
          required
        />
      </label>

      {error && (
        <div className="formError" role="alert">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="primaryButton submitButton"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="loadingSpinner" size={18} />
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Submit & Continue on WhatsApp
          </>
        )}
      </button>
    </form>
  );
}