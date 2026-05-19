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

function Contact() {
  const [fileName, setFileName] = useState("");
  const [success, setSuccess] = useState(false);

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

  /* INPUT CHANGE */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* FILE CHANGE */

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

  /* FORM SUBMIT */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();

      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("company", formData.company);
      submitData.append("projectType", formData.projectType);
      submitData.append("budget", formData.budget);
      submitData.append("timeline", formData.timeline);
      submitData.append("description", formData.description);

      if (formData.file) {
        submitData.append("file", formData.file);
      }

      const res = await axios.post(
        "http://localhost:5000/api/contacts",
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
    } catch (error) {
      console.log("Upload Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <main className="start-project-page">
      {/* LEFT SIDE */}

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
          bring your idea to life with the
          perfect solution.
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
            <p>+91 8919728736</p>
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

      {/* RIGHT SIDE */}

      <section className="project-form-card">
        <div className="form-title">
          <div className="form-icon">
            <Pencil />
          </div>

          <div>
            <h2>Start a Project</h2>

            <p>
              Fill out the form below and our
              team will get back to you soon.
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
          {/* NAME */}

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

          {/* EMAIL */}

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

          {/* PHONE */}

          <div className="project-input">
            <label>Phone Number *</label>

            <div>
              <Phone size={20} />

              <input
                type="text"
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* COMPANY */}

          <div className="project-input wide">
            <label>
              Company Name
              <span> (Optional)</span>
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

          {/* PROJECT TYPE */}

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

                <option>
                  Website Development
                </option>

                <option>
                  Full Stack Application
                </option>

                <option>
                  E-commerce Website
                </option>

                <option>
                  UI/UX Design
                </option>
              </select>
            </div>
          </div>

          {/* BUDGET */}

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

                <option>
                  ₹5,000 - ₹15,000
                </option>

                <option>
                  ₹15,000 - ₹50,000
                </option>

                <option>
                  ₹50,000+
                </option>
              </select>
            </div>
          </div>

          {/* TIMELINE */}

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

                <option>1 Week</option>

                <option>2 - 4 Weeks</option>

                <option>1 - 3 Months</option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}

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

          {/* FILE */}

          <div className="file-upload full">
            <Paperclip />

            <div>
              <h4>
                File Upload
                <span> (Optional)</span>
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
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* SUBMIT */}

          <button
            className="start-project-btn"
            type="submit"
          >
            <Send size={20} />
            Start Project
          </button>
        </form>

        <p className="safe-text">
          🛡 Your information is secure and
          will never be shared.
        </p>
      </section>
    </main>
  );
}

export default Contact;