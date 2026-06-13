import { useState } from "react";
import axios from "axios";

import {
  Mail,
  Phone,
  MapPin,
  User,
  Building2,
  Briefcase,
  Wallet,
  CalendarDays,
  Pencil,
  Paperclip,
  Send,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://vmcskillbridge.onrender.com";

function Contact() {
  const [fileName, setFileName] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);

      setFormData({
        ...formData,
        file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "file") {
          submitData.append(key, formData[key]);
        }
      });

      if (formData.file) {
        submitData.append("file", formData.file);
      }

      const res = await axios.post(
        `${API_URL}/api/contacts`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Saved:", res.data);

      setSuccess(true);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
        file: null,
      });

      setFileName("");

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.log("Upload Error:", error);

      alert(
        error.response?.data?.message ||
          "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="start-project-page">
      <section className="project-left">
        <span className="project-badge">
          🚀 Start a Project
        </span>

        <h1>
          Let’s Build <br />
          Something Amazing <br />
          <span>Together</span>
        </h1>

        <p>
          Tell us about your project and we’ll
          bring your idea to life with the perfect
          solution.
        </p>

        <div className="project-contact-cards">
          <div className="project-contact-card">
            <Mail />

            <h3>Email Us</h3>

            <p>vmcskillbridge@gmail.com</p>
          </div>

          <div className="project-contact-card">
            <Phone />

            <h3>Call Us</h3>

            <p>+91 9876543210</p>
          </div>

          <div className="project-contact-card">
            <MapPin />

            <h3>Visit Us</h3>

            <p>Hyderabad, India</p>
          </div>
        </div>

        <div className="project-illustration">
          <img
            src="/contactbg.png"
            alt="Project"
            className="project-image"
          />
        </div>
      </section>

      <section className="project-form-card reveal">
        <div className="form-title">
          <div className="form-icon">
            <Pencil />
          </div>

          <div>
            <h2>Start a Project</h2>

            <p>
              Fill out the form below and our team
              will get back to you soon.
            </p>
          </div>
        </div>

        {success && (
          <div className="form-success">
            ✅ Project submitted successfully!
          </div>
        )}

        <form
          className="project-form"
          onSubmit={handleSubmit}
        >
          <div className="project-input">
            <label>Full Name *</label>

            <div>
              <User size={20} />

              <input
                type="text"
                name="fullName"
                placeholder="Your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="project-input">
            <label>Email Address *</label>

            <div>
              <Mail size={20} />

              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="project-input">
            <label>Phone Number *</label>

            <div>
              <Phone size={20} />

              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit phone number"
              />
            </div>
          </div>

          <div className="project-input wide">
            <label>
              Company Name <span>(Optional)</span>
            </label>

            <div>
              <Building2 size={20} />

              <input
                type="text"
                name="company"
                placeholder="Your company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="project-input">
            <label>Project Type *</label>

            <div>
              <Briefcase size={20} />

              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select project type
                </option>

                <option value="Website Development">
                  Website Development
                </option>

                <option value="Full Stack Application">
                  Full Stack Application
                </option>

                <option value="E-commerce Website">
                  E-commerce Website
                </option>

                <option value="UI/UX Design">
                  UI/UX Design
                </option>
              </select>
            </div>
          </div>

          <div className="project-input">
            <label>Budget Range *</label>

            <div>
              <Wallet size={20} />

              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select budget
                </option>

                <option value="₹5,000 - ₹15,000">
                  ₹5,000 - ₹15,000
                </option>

                <option value="₹15,000 - ₹50,000">
                  ₹15,000 - ₹50,000
                </option>

                <option value="₹50,000+">
                  ₹50,000+
                </option>
              </select>
            </div>
          </div>

          <div className="project-input">
            <label>Project Timeline *</label>

            <div>
              <CalendarDays size={20} />

              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select timeline
                </option>

                <option value="1 Week">
                  1 Week
                </option>

                <option value="2 - 4 Weeks">
                  2 - 4 Weeks
                </option>

                <option value="1 - 3 Months">
                  1 - 3 Months
                </option>
              </select>
            </div>
          </div>

          <div className="project-input full">
            <label>
              Project Description *
            </label>

            <div className="textarea-box">
              <Pencil size={20} />

              <textarea
                name="description"
                placeholder="Tell us about your project..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="file-upload full">
            <Paperclip />

            <div>
              <h4>
                File Upload{" "}
                <span>(Optional)</span>
              </h4>

              <p>
                {fileName ||
                  "Upload PDF, DOC, ZIP etc"}
              </p>
            </div>

            <label className="choose-file-btn">
              Choose File

              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            className="start-project-btn"
            type="submit"
            disabled={loading}
          >
            <Send size={20} />

            {loading
              ? "Submitting..."
              : "Start Project"}
          </button>
        </form>

        <p className="safe-text">
          🛡 Your information is secure and will
          never be shared.
        </p>
      </section>
    </main>
  );
}

export default Contact;