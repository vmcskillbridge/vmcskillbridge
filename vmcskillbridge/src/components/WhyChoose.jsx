function WhyChoose() {
  const reasons = [
    {
      icon: "⚡",
      title: "Fast Delivery",
      desc: "We respect your time and deliver projects on schedule.",
    },
    {
      icon: "👥",
      title: "Skilled Developers",
      desc: "Our team consists of experienced and passionate developers.",
    },
    {
      icon: "💵",
      title: "Affordable Pricing",
      desc: "High-quality solutions at prices that fit your budget.",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      desc: "We are always here to help you anytime, anywhere.",
    },
  ];

  return (
    <section className="why-choose-section" id="about">
      <div className="section-label">WHY CHOOSE US</div>

      <h2 className="section-title">
        We Deliver More Than Expected
      </h2>

      <div className="reasons-grid">
        {reasons.map((item, index) => (
          <div className="reason-card" key={index}>
            <div className="reason-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;