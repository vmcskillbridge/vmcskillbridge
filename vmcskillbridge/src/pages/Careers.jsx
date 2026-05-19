import {
  Users,
  UserRound,
  Briefcase,
  Globe,
  Code2,
  Server,
  Layers,
  PenTool,
  Rocket,
  MapPin,
  ArrowRight,
  Play,
  Lightbulb,
  UserCheck,
  Timer,
} from "lucide-react";

import { Link } from "react-router-dom";

function Careers() {
  const scrollToPositions = () => {
    const section = document.getElementById("open-positions");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollToCulture = () => {
    const section = document.getElementById("culture");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const jobs = [
    {
      icon: <Code2 />,
      title: "Frontend Developer",
      skills: "React, JavaScript, TypeScript",
      location: "Remote",
      type: "Full-time",
    },
    {
      icon: <Server />,
      title: "Backend Developer",
      skills: "Node.js, Express, MongoDB",
      location: "Remote",
      type: "Full-time",
    },
    {
      icon: <Layers />,
      title: "Full Stack Developer",
      skills: "MERN Stack, Next.js",
      location: "Hybrid (Hyderabad)",
      type: "Full-time",
    },
    {
      icon: <PenTool />,
      title: "UI/UX Designer",
      skills: "Figma, Adobe XD, UI Design",
      location: "Remote",
      type: "Full-time",
    },
    {
      icon: <Code2 />,
      title: "DevOps Engineer",
      skills: "AWS, Docker, CI/CD",
      location: "Remote",
      type: "Full-time",
    },
  ];

  const culture = [
    {
      icon: <Users />,
      title: "Collaborative",
      desc: "We achieve more together.",
    },
    {
      icon: <Lightbulb />,
      title: "Innovative",
      desc: "We embrace new ideas and technology.",
    },
    {
      icon: <UserCheck />,
      title: "Growth Focused",
      desc: "We invest in your personal growth.",
    },
    {
      icon: <Timer />,
      title: "Work-Life Balance",
      desc: "We value your well-being and time.",
    },
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
            <img
              src="/team.png"
              alt="Career Team"
              className="career-team-image"
            />

            <div className="floating-icon code-icon">
              <Code2 size={34} />
            </div>

            <div className="floating-icon rocket-icon">
              <Rocket size={38} />
            </div>

            <div className="floating-icon rocket-small">
              <Rocket size={26} />
            </div>
          </div>
        </div>
      </section>

      <section className="career-stats-new">
        <div className="career-stat-card">
          <Users />
          <div>
            <h3>50+</h3>
            <p>Team Members</p>
          </div>
        </div>

        <div className="career-stat-card">
          <UserRound />
          <div>
            <h3>10+</h3>
            <p>Open Positions</p>
          </div>
        </div>

        <div className="career-stat-card">
          <Users />
          <div>
            <h3>5+</h3>
            <p>Years of Excellence</p>
          </div>
        </div>

        <div className="career-stat-card">
          <Globe />
          <div>
            <h3>200+</h3>
            <p>Projects Delivered</p>
          </div>
        </div>
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

              <Link to="/apply" className="apply-btn">
                Apply Now
              </Link>
            </div>
          ))}
        </div>

        <button className="view-all-btn" onClick={scrollToPositions}>
          View All Openings
          <ArrowRight size={18} />
        </button>
      </section>

      <section className="culture-section" id="culture">
        <div className="culture-left">
          <p className="mini-title">OUR CULTURE</p>

          <h2>
            More Than Just <br />
            a Workplace
          </h2>

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
    </main>
  );
}

export default Careers;