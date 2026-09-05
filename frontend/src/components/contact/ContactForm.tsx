"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    window.open(
      `https://wa.me/923159516604?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="formSuccess">
        <CheckCircle2 size={52} />

        <h2>Your message is ready.</h2>

        <p>
          WhatsApp has opened with your message. Send it to contact the Glexa
          Digital team.
        </p>

        <button
          type="button"
          className="primaryButton"
          onClick={() => {
            setForm(initialForm);
            setSubmitted(false);
          }}
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
          required
        />
      </label>

      <button type="submit" className="primaryButton submitButton">
        <Send size={18} />
        Send Message on WhatsApp
      </button>
    </form>
  );
}