"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/inquiries/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail || "Unable to submit your message.");
      }

      const whatsappMessage = `
Hello Glexa Digital,

I am contacting you through your website.

Name: ${form.fullName}
Email: ${form.email}
Phone: ${form.phone}
Subject: ${form.subject}

Message:
${form.message}
      `.trim();

      setSubmitted(true);
      setForm(initialForm);

      window.open(
        `https://wa.me/923159516604?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (submitError) {
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

        <h2>Message submitted successfully.</h2>

        <p>
          Your inquiry has been received by Glexa Digital. WhatsApp has also
          opened for direct communication.
        </p>

        <button
          type="button"
          className="primaryButton"
          onClick={() => setSubmitted(false)}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
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
            maxLength={120}
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
          WhatsApp Number
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+92 300 0000000"
            minLength={7}
            maxLength={30}
            required
          />
        </label>

        <label>
          Subject
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            minLength={2}
            maxLength={200}
            required
          />
        </label>
      </div>

      <label>
        Your Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={7}
          placeholder="Tell us about your question or project."
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