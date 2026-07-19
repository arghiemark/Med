function Services() {
  const services = [
    { title: 'Basic Consultation', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '👩‍⚕️', desc: 'General medical consultation for patients of all ages. Includes check-ups, diagnosis, and treatment recommendations.' },
    { title: 'Disease Control & Prevention', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '🦠', desc: 'Monitoring, prevention, and control of communicable and non-communicable diseases within the community.' },
    { title: 'Family Planning & Reproductive Health', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🧬', desc: 'Counseling and services for family planning methods, reproductive health education, and maternal well-being.' },
    { title: 'Immunization and Vaccination', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '💊', desc: 'Routine immunization programs for infants, children, and adults including catch-up vaccinations.' },
    { title: 'Maternal and Child Care', subtitle: 'Tuesday', time: '8:00am - 5:00pm', icon: '🤰', desc: 'Prenatal, postnatal, and child health care services ensuring the well-being of mothers and children.' },
    { title: 'Dental Care', subtitle: 'Friday', time: '8:00am - 5:00pm', icon: '🦷', desc: 'Basic dental services including check-ups, extractions, cleaning, and oral health education.' },
  ];

  return (
    <>
      <h1 className="ev-heading">Services</h1>
      <div className="panel-white">
        <section className="schedule-section">
          <div className="cards-grid upcoming">
            {services.map((s, i) => (
              <div key={i} className="patient-card">
                <div className="card-header">
                  <div className="patient-avatar" style={{fontSize: '24px'}}>{s.icon}</div>
                  <div className="patient-info">
                    <h3 className="patient-name">{s.title}</h3>
                    <p className="service-type">{s.subtitle}</p>
                  </div>
                </div>
                <div className="card-details">
                  <p style={{fontSize: '13px', color: '#718096', lineHeight: '1.5', margin: '0 0 10px'}}>{s.desc}</p>
                  <span className="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {s.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Services;
