"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Upload,
} from "lucide-react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  portfolio: "",
  message: "",
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

export default function JobApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
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

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      setSelectedFile(null);
      setFileName("");
      return;
    }

    const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setSelectedFile(null);
      setFileName("");
      setError("Only PDF, DOC and DOCX files are allowed.");
      setFileInputKey((current) => current + 1);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setFileName("");
      setError("The CV file must not exceed 5 MB.");
      setFileInputKey((current) => current + 1);
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please upload your CV or resume.");
      return;
    }

    const submitApplication = async () => {
      setIsSubmitting(true);
      setError("");

      const applicationData = new FormData();

      applicationData.append("full_name", form.fullName.trim());
      applicationData.append("email", form.email.trim());
      applicationData.append("phone", form.phone.trim());
      applicationData.append("position", form.position);
      applicationData.append("experience", form.experience);
      applicationData.append("message", form.message.trim());
      applicationData.append("cv", selectedFile);

      if (form.portfolio.trim()) {
        applicationData.append("portfolio", form.portfolio.trim());
      }

      try {
        const response = await fetch(`${API_URL}/api/applications`, {
          method: "POST",
          body: applicationData,
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);

          throw new Error(
            data?.detail || "Unable to submit your application."
          );
        }

        setForm(initialForm);
        setSelectedFile(null);
        setFileName("");
        setFileInputKey((current) => current + 1);
        setSubmitted(true);
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

    void submitApplication();
  };

  if (submitted) {
    return (
      <div className="formSuccess">
        <CheckCircle2 size={52} />

        <h2>Application submitted successfully.</h2>

        <p>
          Your application and CV have been received by Glexa Digital. Our
          team will review your information when a suitable opportunity is
          available.
        </p>

        <button
          type="button"
          className="primaryButton"
          onClick={() => {
            setSubmitted(false);
            setError("");
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
            minLength={2}
            maxLength={150}
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
            minLength={7}
            maxLength={50}
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
            <option>Content Creator</option>
            <option>Videographer</option>
            <option>Video Editor</option>
            <option>Web Developer</option>
            <option>AI & Automation Developer</option>
            <option>AI Solutions Intern</option>
            <option>Digital Marketing Intern</option>
            <option>Data Analyst Intern</option>
            <option>Other</option>
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
            <option>Fresh</option>
            <option>Less than 1 year</option>
            <option>1–2 years</option>
            <option>3–5 years</option>
            <option>More than 5 years</option>
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
            maxLength={500}
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
          minLength={10}
          maxLength={5000}
          required
        />
      </label>

      <label className="fileUpload">
        <Upload size={25} />

        <span>{fileName || "Upload CV or Resume"}</span>

        <small>PDF, DOC or DOCX — maximum 5 MB</small>

        <input
          key={fileInputKey}
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx"
          onChange={handleFile}
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
            Submitting Application...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
}