import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  FileText,
  Briefcase,
  Star,
  PenLine,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://vmcskillbridge.onrender.com";

function Apply() {
  const [searchParams] = useSearchParams();

  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    email: "",
    portfolio: "",
    phone: "",
    position: "",
    message: "",
    experience: "",
    resume: null,
  });

  useEffect(() => {
    const position = searchParams.get("position");

    if (position) {
      setFormData((prev) => ({
        ...prev,
        position:
          position === "Frontend Developer"
            ? "Frontend Developer - Remote"
            : position === "Backend Developer"
            ? "Backend Developer - Hybrid"
            : position,
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Resume size must be less than 5MB.");
      return;
    }

    setResumeName(file.name);

    setFormData({
      ...formData,
      resume: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      submitData.append("fullName", formData.fullName);
      submitData.append("location", formData.location);
      submitData.append("email", formData.email);
      submitData.append("portfolio", formData.portfolio);
      submitData.append("phone", formData.phone);
      submitData.append("position", formData.position);
      submitData.append("message", formData.message);
      submitData.append("experience", formData.experience);

      if (formData.resume) {
        submitData.append("resume", formData.resume);
      }

      await axios.post(`${API_URL}/api/applications`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitted(true);
    } catch (error) {
      console.log("Application Error:", error);
      alert(
        error.response?.data?.message ||
          "Application failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="success-page">
        <section className="success-card">
          <div className="success-check">✓</div>

          <h1>
            Application submitted <br />
            <span>successfully!</span>
          </h1>

          <p>
            Thank you for applying. Our hiring team will review your application
            and get back to you soon.
          </p>

          <div className="success-details">
            <div>
              <span>Status</span>
              <strong className="status">Received</strong>
            </div>

            <Link to="/careers" className="back-careers">
              Back to Careers →
            </Link>
          </div>

          <p className="confirm-text">
            ✓ You will receive a confirmation email shortly.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="apply-page">
      <section className="apply-card">
        <Link to="/careers" className="apply-close">
          <X size={26} />
        </Link>

        <div className="apply-logo">
          <div className="logo-icon">V</div>
          <span>VMC SkillBridge</span>
        </div>

        <div className="apply-head">
          <h1>Apply for this Position</h1>
          <p>
            Fill out the form below and our hiring team will contact you soon.
          </p>
        </div>

        <form className="apply-form" onSubmit={handleSubmit}>
          <div className="apply-group">
            <label>
              <User size={18} /> Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="apply-group">
            <label>
              <MapPin size={18} /> Current Location *
            </label>
            <input
              type="text"
              name="location"
              placeholder="Hyderabad, India"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="apply-group">
            <label>
              <Mail size={18} /> Email Address *
            </label>
            <input
              type="email"
              name="email"
              placeholder="john.doe@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="apply-group">
            <label>
              <LinkIcon size={18} /> Portfolio / LinkedIn URL
            </label>
            <input
              type="text"
              name="portfolio"
              placeholder="https://linkedin.com/in/johndoe"
              value={formData.portfolio}
              onChange={handleChange}
            />
          </div>

          <div className="apply-group">
            <label>
              <Phone size={18} /> Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="apply-group">
            <label>
              <FileText size={18} /> Upload Resume *
            </label>

            <label className="resume-box">
              <FileText size={28} />
              <div>
                <strong>{resumeName || "Upload resume"}</strong>
                <p>PDF, DOC, DOCX only. Max 5MB.</p>
              </div>

              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                required
              />
            </label>
          </div>

          <div className="apply-group">
            <label>
              <Briefcase size={18} /> Select Position Applied For *
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Select Position</option>
              <option value="Frontend Developer - Remote">
                Frontend Developer - Remote
              </option>
              <option value="Backend Developer - Hybrid">
                Backend Developer - Hybrid
              </option>
            </select>
          </div>

          <div className="apply-group">
            <label>
              <PenLine size={18} /> Why should we hire you? *
            </label>
            <textarea
              name="message"
              placeholder="I am passionate about building user-friendly, scalable web applications..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="apply-group">
            <label>
              <Star size={18} /> Years of Experience *
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            >
              <option value="">Select Experience</option>
              <option value="0 - 1 Years">0 - 1 Years</option>
              <option value="1 - 3 Years">1 - 3 Years</option>
              <option value="3 - 5 Years">3 - 5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

          <button
            className="submit-application"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
            <ArrowRight size={22} />
          </button>
        </form>

        <p className="secure-text">
          <ShieldCheck size={18} />
          Your information is secure and will be kept confidential.
        </p>
      </section>
    </main>
  );
}

export default Apply;