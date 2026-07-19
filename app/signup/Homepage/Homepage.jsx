import { useState } from 'react';

function Homepage() {
  const today = [
    { name: 'RICHARDS, Alden P.', ptn: 'PTN-2610204', service: 'Basic Consultation', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
    { name: 'CRUZ, Dodong C.', ptn: 'PTN-2610215', service: 'Basic Consultation', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
    { name: 'SANTOS, Judith A.', ptn: 'PTN-2610205', service: 'Vaccination', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' }
  ];

  const upcoming = [
    { name: 'Patient 1', ptn: 'PTN-0001001', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
    { name: 'Patient 2', ptn: 'PTN-0001002', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
    { name: 'Patient 3', ptn: 'PTN-0001003', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
    { name: 'Patient 4', ptn: 'PTN-0001004', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
    { name: 'Patient 5', ptn: 'PTN-0001005', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
    { name: 'Patient 6', ptn: 'PTN-0001006', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' }
  ];

  const [notified, setNotified] = useState(new Set());

  const events = [
    { title: 'Anti-Rabies Vaccination', subtitle: 'March 29, 2026 | Sunday', time: '7:00am to 9:00am', icon: '💉' },
    { title: 'Blood Donation Program', subtitle: 'March 30, 2026 | Monday', time: '3:00pm to 5:00pm', icon: '🩸' },
    { title: 'Mental Health Screening', subtitle: 'March 31, 2026 | Tuesday', time: '3:00pm to 5:00pm', icon: '🧠' }
  ];

  const services = [
    { title: 'Basic Consultation', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '👩‍⚕️' },
    { title: 'Disease Control & Prevention', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '🦠' },
    { title: 'Family Planning & Reproductive Health', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🧬' },
    { title: 'Immunization and Vaccination', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '💊' },
    { title: 'Maternal and Child Care', subtitle: 'Tuesday', time: '8:00am - 5:00pm', icon: '🤰' },
    { title: 'Dental Care', subtitle: 'Friday', time: '8:00am - 5:00pm', icon: '🦷' }
  ];

  const counts = today.reduce((acc, p) => {
    if (p.service === 'Basic Consultation') acc.consultation++;
    else if (p.service === 'Vaccination') acc.vaccination++;
    else acc.other++;
    return acc;
  }, { consultation: 0, vaccination: 0, other: 0 });

  const renderCard = (patient) => (
    <div key={patient.ptn} className="patient-card">
      <div className="card-header">
        <div className="patient-avatar" />
        <div className="patient-info">
          <h3 className="patient-name">{patient.name}</h3>
          <p className="patient-id">{patient.ptn}</p>
          <p className="service-type">{patient.service}</p>
        </div>
      </div>
      <div className="card-details">
        <span className="detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {patient.date}
        </span>
        <span className="detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {patient.time}
        </span>
      </div>
      <div className="card-actions">
        <button className="btn btn-outline">View Record</button>
        <button
          className={`btn ${notified.has(patient.ptn) ? 'btn-sent' : 'btn-primary'}`}
          onClick={() => {
            setNotified(prev => new Set(prev).add(patient.ptn));
            setTimeout(() => setNotified(prev => {
              const next = new Set(prev);
              next.delete(patient.ptn);
              return next;
            }), 3000);
          }}
        >
          {notified.has(patient.ptn) ? 'Sent!' : 'Notify'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <h1 className="greeting">Hello! Midwife Vivianne</h1>

        <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-number">{today.length}</span>
            <span className="stat-label">Today's Schedule</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-number">{upcoming.length}</span>
            <span className="stat-label">Upcoming Appointments</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background: '#FFF9C4'}}>
            <svg viewBox="0 0 24 24" fill="#F6AD55" stroke="#F6AD55" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div className="stat-info">
            <span className="stat-number">4.6 <span style={{color: '#F6AD55', fontSize: '14px', letterSpacing: '1px'}}>★★★★★</span></span>
            <span className="stat-label">Patient Feedback</span>
          </div>
        </div>
      </div>

      <div className="panel-white">
        <section className="schedule-section">
          <h2 className="section-title">Today's Schedule</h2>
          <div className="cards-grid today">
            {today.map((patient) => renderCard(patient))}
          </div>
        </section>
      </div>

      <div className="panel-white">
        <section className="schedule-section">
          <h2 className="section-title">Upcoming Appointments</h2>
          <div className="cards-grid upcoming">
            {upcoming.map((patient) => renderCard(patient))}
          </div>
          <div className="view-all-container">
            <button className="btn btn-view-all">View List of Appointees</button>
          </div>
        </section>
      </div>

      <div className="panel-white">
        <section className="schedule-section">
          <h2 className="section-title">Events</h2>
          <div className="cards-grid upcoming">
            {events.map((event, i) => (
              <div key={i} className="patient-card">
                <div className="card-header">
                  <div className="patient-avatar" style={{fontSize: '24px'}}>{event.icon}</div>
                  <div className="patient-info">
                    <h3 className="patient-name">{event.title}</h3>
                    <p className="service-type">{event.subtitle}</p>
                  </div>
                </div>
                <div className="card-details">
                  <span className="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {event.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="panel-white">
        <section className="schedule-section">
          <h2 className="section-title">Services</h2>
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

export default Homepage;
