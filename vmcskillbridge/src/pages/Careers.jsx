import { useState } from "react";
import {
  Users,
  UserRound,
  Briefcase,
  Globe,
  Code2,
  Server,
  Rocket,
  MapPin,
  ArrowRight,
  Play,
  Lightbulb,
  UserCheck,
  Timer,
  CheckCircle,
  X,
  Database,
  Layers,
} from "lucide-react";

import { Link } from "react-router-dom";

function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);

  const scrollToPositions = () => {
    document.getElementById("open-positions")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToCulture = () => {
    document.getElementById("culture")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const jobs = [
    {
      icon: <Code2 />,
      title: "Frontend Developer",
      skills: "React.js, JavaScript, HTML, CSS",
      location: "Remote",
      type: "Full-time / Internship",
      experience: "0–2 Years",
      description:
        "Build responsive websites and web applications using React.js. Convert UI/UX designs into functional interfaces, integrate APIs, and maintain clean frontend code.",
      requirements: [
        "Good knowledge of HTML, CSS, JavaScript",
        "Basic React.js knowledge",
        "Responsive design skills",
        "API integration knowledge",
        "Git/GitHub basics",
        "Freshers can apply",
      ],
    },
    {
      icon: <Server />,
      title: "Backend Developer",
      skills: "Node.js, Express.js, MongoDB",
      location: "Hybrid (Hyderabad)",
      type: "Full-time / Internship",
      experience: "0–2 Years",
      description:
        "Develop backend APIs using Node.js and Express.js. Work with MongoDB, authentication, API security, and frontend integration.",
      requirements: [
        "Knowledge of Node.js and Express.js",
        "MongoDB/Mongoose basics",
        "REST API knowledge",
        "JWT authentication basics",
        "Debugging skills",
        "Freshers can apply",
      ],
    },
    {
      icon: <Layers />,
      title: "MERN Stack Developer",
      skills: "MongoDB, Express, React, Node",
      location: "Remote",
      type: "Full-time",
      experience: "0–2 Years",
      description:
        "Work on complete MERN stack applications from frontend UI to backend APIs and database integration.",
      requirements: [
        "React.js knowledge",
        "Node.js and Express.js basics",
        "MongoDB knowledge",
        "REST API integration",
        "Git/GitHub workflow",
        "Project-building mindset",
      ],
    },
    {
      icon: <Code2 />,
      title: "React Developer",
      skills: "React, Hooks, Components",
      location: "Remote",
      type: "Internship / Full-time",
      experience: "0–1 Years",
      description:
        "Create modern React components, handle state management, connect APIs, and improve user experience.",
      requirements: [
        "React components knowledge",
        "Hooks and props understanding",
        "CSS responsive design",
        "Basic API usage",
        "Clean code practice",
      ],
    },
    {
      icon: <Server />,
      title: "Node.js Developer",
      skills: "Node.js, Express, APIs",
      location: "Hybrid (Hyderabad)",
      type: "Full-time",
      experience: "0–2 Years",
      description:
        "Build scalable backend services, APIs, middleware, authentication, and database-connected server features.",
      requirements: [
        "Node.js basics",
        "Express.js routing",
        "REST API development",
        "MongoDB basics",
        "Error handling knowledge",
      ],
    },
    {
      icon: <Database />,
      title: "MongoDB Developer",
      skills: "MongoDB, Mongoose, Database Design",
      location: "Remote",
      type: "Internship",
      experience: "0–1 Years",
      description:
        "Support database design, schema creation, CRUD operations, and data management for web applications.",
      requirements: [
        "MongoDB basics",
        "Mongoose schema knowledge",
        "CRUD operations",
        "Data validation basics",
        "Backend integration understanding",
      ],
    },
    {
      icon: <Layers />,
      title: "Full Stack Developer",
      skills: "MERN Stack, APIs, UI",
      location: "Hybrid (Hyderabad)",
      type: "Full-time",
      experience: "0–2 Years",
      description:
        "Develop full-stack web applications using React frontend, Node backend, Express APIs, and MongoDB database.",
      requirements: [
        "Frontend and backend basics",
        "React.js knowledge",
        "Node.js/Express knowledge",
        "MongoDB understanding",
        "REST API integration",
        "Problem-solving skills",
      ],
    },
  ];

  const culture = [
    { icon: <Users />, title: "Collaborative", desc: "We achieve more together." },
    { icon: <Lightbulb />, title: "Innovative", desc: "We embrace new ideas and technology." },
    { icon: <UserCheck />, title: "Growth Focused", desc: "We invest in your personal growth." },
    { icon: <Timer />, title: "Work-Life Balance", desc: "We value your well-being and time." },
  ];

  return (
    <main className="career-page">
      <section className="career-hero-section">
        <div className="career-hero-left">
          <span className="career-badge">Join Our Team</span>

          <h1>
            Build the Future <br />
            <span>With Us</span>
          </h1>

          <p>
            We’re always looking for passionate, talented, and curious people
            to join VMC SkillBridge.
          </p>

          <div className="career-hero-buttons">
            <button className="hero-btn" onClick={scrollToPositions}>
              View Open Positions
            </button>

            <button className="career-outline-btn" onClick={scrollToCulture}>
              <Play size={16} />
              Explore Our Culture
            </button>
          </div>
        </div>

        <div className="career-hero-right">
          <div className="career-image-box">
            <img src="/team.png" alt="Career Team" className="career-team-image" />
            <div className="floating-icon code-icon"><Code2 size={34} /></div>
            <div className="floating-icon rocket-icon"><Rocket size={38} /></div>
            <div className="floating-icon rocket-small"><Rocket size={26} /></div>
          </div>
        </div>
      </section>

      <section className="career-stats-new">
        <div className="career-stat-card"><Users /><div><h3>30+</h3><p>Team Members</p></div></div>
        <div className="career-stat-card"><UserRound /><div><h3>{jobs.length}</h3><p>Open Positions</p></div></div>
        <div className="career-stat-card"><Users /><div><h3>10+</h3><p>Years of Excellence</p></div></div>
        <div className="career-stat-card"><Globe /><div><h3>200+</h3><p>Projects Delivered</p></div></div>
      </section>

      <section className="open-positions-section" id="open-positions">
        <p className="mini-title">OPEN POSITIONS</p>
        <h2>Find Your Next Opportunity</h2>

        <div className="jobs-list">
          {jobs.map((job, index) => (
            <div className="job-row" key={index}>
              <div className="job-main">
                <div className="job-icon">{job.icon}</div>
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.skills}</p>
                </div>
              </div>

              <div className="job-info">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>

              <div className="job-info">
                <Briefcase size={16} />
                <span>{job.type}</span>
              </div>

              <button className="apply-btn" onClick={() => setSelectedJob(job)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="culture-section" id="culture">
        <div className="culture-left">
          <p className="mini-title">OUR CULTURE</p>
          <h2>More Than Just <br /> a Workplace</h2>
          <p>
            We believe in creating an environment where creativity meets
            opportunity and everyone grows together.
          </p>

          <button className="career-outline-btn" onClick={scrollToPositions}>
            See Open Roles
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="culture-grid">
          {culture.map((item, index) => (
            <div className="culture-card" key={index}>
              <div className="culture-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedJob && (
        <div className="job-modal-overlay">
          <div className="job-modal">
            <button className="job-modal-close" onClick={() => setSelectedJob(null)}>
              <X size={22} />
            </button>

            <div className="job-modal-icon">{selectedJob.icon}</div>

            <h2>{selectedJob.title}</h2>
            <p className="job-modal-skills">{selectedJob.skills}</p>

            <div className="job-modal-meta">
              <span><MapPin size={16} /> {selectedJob.location}</span>
              <span><Briefcase size={16} /> {selectedJob.type}</span>
              <span><Timer size={16} /> {selectedJob.experience}</span>
            </div>

            <h3>Job Description</h3>
            <p className="job-modal-desc">{selectedJob.description}</p>

            <h3>Requirements</h3>
            <ul className="job-modal-list">
              {selectedJob.requirements.map((req, index) => (
                <li key={index}>
                  <CheckCircle size={16} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            <h3>Benefits</h3>
            <ul className="job-modal-list">
              <li><CheckCircle size={16} /><span>Real-world project experience</span></li>
              <li><CheckCircle size={16} /><span>Mentorship and skill development</span></li>
              <li><CheckCircle size={16} /><span>Flexible work environment</span></li>
              <li><CheckCircle size={16} /><span>Growth opportunities</span></li>
            </ul>

            <Link
              to={`/apply?position=${encodeURIComponent(selectedJob.title)}`}
              className="apply-btn job-modal-apply"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default Careers;