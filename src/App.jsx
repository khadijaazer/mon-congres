import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Calendar, MapPin, CheckCircle, Leaf, Beaker, Globe, Menu, X, UploadCloud, User, Award, Mic, Clock, Zap, BookOpen, Phone, Mail } from 'lucide-react';

// Si oran.jpg est dans public/, on utilise le chemin direct string
const oranBg = "/oran.jpg"; 

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar scrolled={scrolled} />
      <Hero />
      <AboutSection />
      <Objectives />
      <Topics onTopicClick={setSelectedTopic} />
      <Schedule />
      <Speakers onSpeakerClick={setSelectedSpeaker}/>
      <PaperSubmission />
      <Registration />
      <Hotels />
      <Footer />

      {selectedTopic && (
        <TopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
      )}
      
      {/* MODALE PROFESSIONNELLE POUR LES SPEAKERS */}
      {selectedSpeaker && (
        <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
      )}
    </div>
  );
}

// --- NAVBAR ---
const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="nav-logo">IGCC 2026</div>
        <button className={`nav-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)}>Overview</a>
          <a href="#schedule" onClick={() => setIsOpen(false)}>Program</a>
          <a href="#speakers" onClick={() => setIsOpen(false)}>Speakers</a>
          <a href="#registration" onClick={() => setIsOpen(false)}>Registration</a>
          <a href="#submission" className="btn-primary-nav" onClick={() => setIsOpen(false)}>Submit Abstract</a>
        </div>
      </div>
    </nav>
  );
};

// --- HERO SECTION ---
const Hero = () => (
  <section id="home" className="hero-section" style={{
    backgroundImage: `linear-gradient(rgba(0, 20, 50, 0.6), rgba(0, 40, 20, 0.7)), url(${oranBg})`,
  }}>
    <div className="container hero-content reveal">
      <div className="hero-badges">
        <div className="badge"><Calendar size={16}/> 30-31 May 2026</div>
        <div className="badge"><MapPin size={16}/> Univ. of Oran 1 & Saida</div>
      </div>
      <h1 style={{fontSize: '3rem', marginTop:'20px'}}>Green Chemistry &<br/>Sustainable Development</h1>
      <h2 style={{fontSize: '1.8rem', fontWeight:'300', marginBottom:'30px', color:'#facc15'}}>Health and Environment</h2>
      
      <div style={{display:'flex', gap:'20px', justifyContent:'center', marginTop:'30px'}}>
        <a href="#registration" className="btn-hero">Register Now</a>
        <a href="#schedule" className="btn-outline">View Schedule</a>
      </div>
    </div>
  </section>
);

// --- ABOUT SECTION ---
const AboutSection = () => (
  <section id="about" className="about-section">
    <img src="/salle.jpg" alt="Conference Hall" className="about-img"/>
    <div className="about-content reveal">
      <span className="section-label">Conference Overview</span>
      <h2 className="section-title">A Milestone for Green Chemistry</h2>
      <p className="text-body">
        This prestigious event marks the <strong>official launch of the National Center for Green Chemistry</strong> and honors <strong>Professor Mohamed Belbachir</strong>, a pioneer of green chemistry in Algeria.
      </p>
      <p className="text-body">
        We aim to promote environmentally friendly practices that protect human health and the environment, bringing together researchers to exchange knowledge on innovative chemical solutions.
      </p>
      <div className="stats-mini-grid">
         <div className="stat-box">
            <span className="stat-num">2</span>
            <span className="stat-lbl">Days</span>
         </div>
         <div className="stat-box">
            <span className="stat-num">4</span>
            <span className="stat-lbl">Main Axes</span>
         </div>
         <div className="stat-box">
            <span className="stat-num">10+</span>
            <span className="stat-lbl">Keynotes</span>
         </div>
      </div>
    </div>
  </section>
);

// --- OBJECTIVES ---
const Objectives = () => (
  <section className="section-padding bg-light">
    <div className="container reveal">
      <div className="section-header">
        <span className="section-label">Our Mission</span>
        <h2 className="section-title">Conference Objectives</h2>
      </div>
      <div className="grid-2">
        <div className="objective-card">
          <div className="icon-box-pro"><Leaf /></div>
          <h3>Promote Principles</h3>
          <p>Raise awareness of green chemistry: waste prevention, safer design, energy efficiency, and renewable resources.</p>
        </div>
        <div className="objective-card">
          <div className="icon-box-pro"><Beaker /></div>
          <h3>Eco-Friendly Processes</h3>
          <p>Minimize toxic substances, reduce energy consumption, and limit greenhouse gas emissions.</p>
        </div>
        <div className="objective-card">
          <div className="icon-box-pro"><Globe /></div>
          <h3>Sustainable Applications</h3>
          <p>Showcase real-world applications in pharmaceuticals, agriculture, energy, and materials science.</p>
        </div>
        <div className="objective-card">
          <div className="icon-box-pro"><User /></div>
          <h3>International Cooperation</h3>
          <p>Foster collaboration between universities and research centers to build strong global networks.</p>
        </div>
      </div>
    </div>
  </section>
);

// --- TOPICS ---
const Topics = ({ onTopicClick }) => {
  const topicsData = [
    { icon: Leaf, title: "Green Chemistry", desc: "Sustainable Processes & Fundamentals.", tags: ["Solvents", "Catalysis", "Design"] },
    { icon: Zap, title: "Energy Transition", desc: "Renewable Energy sources.", tags: ["Biofuels", "Hydrogen", "Solar"] },
    { icon: CheckCircle, title: "Health & Safety", desc: "Toxicology and Chemical Safety.", tags: ["Regulations", "Risk", "Health"] },
    { icon: Mic, title: "AI in Chemistry", desc: "Artificial Intelligence Applications.", tags: ["Modeling", "Big Data", "Optimization"] },
  ];

  return (
    <section id="topics" className="section-padding topics-section-pro">
      <div className="container reveal">
        <div className="section-header">
          <span className="section-label">Main Axes</span>
          <h2 className="section-title">Scientific Topics</h2>
        </div>
        <div className="grid-2-large">
          {topicsData.map((t, i) => (
            <div key={i} className="topic-card-pro group" onClick={() => onTopicClick(t)} style={{cursor:'pointer'}}>
              <div className="card-header">
                <div className="icon-box-pro"><t.icon size={24} /></div>
                <span className="topic-number">0{i + 1}</span>
              </div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <div className="topic-tags">
                {t.tags.map((tag, idx) => <span key={idx} className="tag-pill">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SCHEDULE ---
const Schedule = () => {
  const [day, setDay] = useState(1);

  return (
    <section id="schedule" className="section-padding">
      <div className="container reveal">
        <div className="section-header">
          <span className="section-label">Agenda</span>
          <h2 className="section-title">Scientific Programme</h2>
        </div>
        
        <div className="tabs-container">
          <button className={`tab-btn ${day===1 ? 'active':''}`} onClick={()=>setDay(1)}>Day 1: Saturday, May 30</button>
          <button className={`tab-btn ${day===2 ? 'active':''}`} onClick={()=>setDay(2)}>Day 2: Sunday, May 31</button>
        </div>

        <div className="schedule-list">
          {day === 1 ? (
            <>
              <div className="schedule-item">
                <div className="time">08:30 - 09:30</div>
                <div className="details"><strong>Registration & Welcome Coffee</strong></div>
              </div>
              <div className="schedule-item">
                <div className="time">09:30 - 10:30</div>
                <div className="details"><strong>Official Opening Ceremony</strong><br/>Welcome addresses & Conference overview</div>
              </div>
              <div className="schedule-item highlight">
                <div className="time">10:30 - 11:30</div>
                <div className="details"><strong>Tribute to Prof. Mohamed Belbachir</strong><br/>& CNCV Official Launch</div>
              </div>
              <div className="schedule-item">
                <div className="time">11:30 - 13:00</div>
                <div className="details"><strong>Plenary Lectures</strong><br/>International and National Invited Speakers</div>
              </div>
              <div className="schedule-item">
                <div className="time">13:00 - 14:00</div>
                <div className="details">Lunch Break</div>
              </div>
              <div className="schedule-item">
                <div className="time">14:00 - 16:30</div>
                <div className="details"><strong>Oral Communications</strong><br/>Axis 1: Fundamentals | Axis 2: Sustainable Processes</div>
              </div>
              <div className="schedule-item">
                <div className="time">19:30 - 22:00</div>
                <div className="details" style={{color:'#d97706'}}><strong>🎉 Gala Dinner</strong><br/>Social Evening & Networking</div>
              </div>
            </>
          ) : (
            <>
              <div className="schedule-item">
                <div className="time">09:00 - 10:30</div>
                <div className="details"><strong>Plenary Lectures</strong><br/>Advanced Topics & Emerging Trends</div>
              </div>
              <div className="schedule-item">
                <div className="time">10:45 - 12:30</div>
                <div className="details"><strong>Oral Communications</strong><br/>Axis 3: Industrial & Environmental Applications</div>
              </div>
              <div className="schedule-item">
                <div className="time">12:30 - 14:00</div>
                <div className="details">Lunch Break</div>
              </div>
              <div className="schedule-item highlight">
                <div className="time">14:00 - 15:30</div>
                <div className="details"><strong>Special Session</strong><br/>Axis 4: AI & Green Chemistry</div>
              </div>
              <div className="schedule-item">
                <div className="time">15:30 - 16:30</div>
                <div className="details"><strong>Round Table Discussion</strong><br/>Challenges, Opportunities & Future Directions</div>
              </div>
              <div className="schedule-item">
                <div className="time">16:30 - 17:00</div>
                <div className="details"><strong>Awards & Closing Ceremony</strong></div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// --- SPEAKERS (DONNÉES COMPLÈTES) ---
const Speakers = ({ onSpeakerClick }) => {
  const speakers = [
    { 
      name: "Prof. Gianluca Viscusi", 
      country: "Italy", 
      institution: "University of Salerno",
      // Assurez-vous que l'image est dans public/dr-gianluca.jpg
      image: "/dr-gianluca.jpg", 
      role: "Keynote Speaker",
      bio: "Dr Gianluca Viscusi graduated in Chemical Engineering in 2016 with full honours at the Department of Industrial Engineering of the University of Salerno. Since 2015, he has been a teaching assistant of Fundamentals of Chemistry. In 2021, he got his PhD in Industrial Engineering.",
      topics: [
        "Design, fabrication and characterisation of natural fibers reinforced polymeric systems",
        "Production of fibrous membrane obtained through electrospinning techniques as sustainable systems for tissue engineering applications",
        "Application of Mechanochemistry to design advanced materials",
        "Design of smart materials for adsorption and photodegradation of pollutants"
      ]
    },
    { name: "Prof. Andrea Pucci", country: "Italy", institution: "University of Pisa", image: null, role: "Keynote Speaker", bio: "Biography coming soon...", topics: [] },
    { name: "Prof. Katarzyna Kiegiel", country: "Poland", institution: "Institute of Nuclear Chemistry", image: null, role: "Invited Speaker", bio: "Biography coming soon...", topics: [] },
    { name: "Prof. Mohammed El-Shazly", country: "Egypt", institution: "Ain Shams University", image: null, role: "Keynote Speaker", bio: "Biography coming soon...", topics: [] },
    { name: "Prof. Radosław Kowalski", country: "Poland", institution: "Lublin University", image: null, role: "Keynote Speaker", bio: "Biography coming soon...", topics: [] },
    { name: "Prof. Klaus Kümmerer", country: "Germany", institution: "Leuphana University", image: null, role: "Keynote Speaker", bio: "Biography coming soon...", topics: [] },
    { name: "Prof. Ebrahim Talebi", country: "Iran", institution: "Darab University", image: null, role: "Keynote Speaker", bio: "Biography coming soon...", topics: [] },
    { name: "Prof. Thomais Vlachogianni", country: "Greece", institution: "University of Athens", image: null, role: "Keynote Speaker", bio: "Biography coming soon...", topics: [] },
    { name: "Prof. Landseer Tang", country: "Singapore", institution: "Singapore Tech", image: null, role: "Keynote Speaker", bio: "Biography coming soon...", topics: [] },
    { name: "Prof. Salete Balula", country: "Portugal", institution: "University of Porto", image: null, role: "Keynote Speaker", bio: "Biography coming soon...", topics: [] },
  ];

  return (
    <section id="speakers" className="section-padding bg-light">
      <div className="container reveal">
        <div className="section-header">
          <span className="section-label">International Experts</span>
          <h2 className="section-title">Keynote Speakers</h2>
          <p style={{color:'#64748b'}}>Click on a speaker to view their full profile.</p>
        </div>
        <div className="speakers-grid">
          {speakers.map((s, i) => (
            <div key={i} className="speaker-card-mini" onClick={() => onSpeakerClick(s)} style={{cursor: 'pointer'}}>
              <div className="speaker-avatar">
                 {s.image ? (
                   <img src={s.image} alt={s.name} />
                 ) : (
                   <User size={40} color="#15803d"/>
                 )}
              </div>
              <div style={{textAlign:'left'}}>
                <h4>{s.name}</h4>
                <p className="speaker-country">{s.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- STATS (Pour combler les trous) ---
const Stats = () => (
  <div className="stats-bar">
    <div className="container stats-grid">
      <div className="stat-item"><h3>30+</h3><p>Speakers</p></div>
      <div className="stat-item"><h3>500+</h3><p>Attendees</p></div>
      <div className="stat-item"><h3>40+</h3><p>Countries</p></div>
      <div className="stat-item"><h3>15</h3><p>Workshops</p></div>
    </div>
  </div>
);

// --- MODALE SPEAKER PROFESSIONNELLE ---
const SpeakerModal = ({ speaker, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="speaker-modal-card reveal active" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}><X size={24}/></button>
        
        <div className="speaker-modal-grid">
          {/* COLONNE GAUCHE */}
          <div className="speaker-sidebar">
            <div className="speaker-profile-img">
              {speaker.image ? (
                <img src={speaker.image} alt={speaker.name} />
              ) : (
                <div className="placeholder-avatar"><User size={80} color="#fff"/></div>
              )}
            </div>
            
            <div className="speaker-sidebar-info">
              <span className="speaker-badge">{speaker.role || "Speaker"}</span>
              <h3>{speaker.name}</h3>
              <p className="speaker-uni">{speaker.institution}</p>
              <div className="speaker-loc">
                <MapPin size={16} style={{display:'inline', marginRight:'5px'}}/> 
                {speaker.country}
              </div>
            </div>
          </div>

          {/* COLONNE DROITE */}
          <div className="speaker-content">
            <h4 className="content-title">Biography</h4>
            <p className="bio-text">{speaker.bio}</p>

            {speaker.topics && speaker.topics.length > 0 && (
              <>
                <h4 className="content-title" style={{marginTop:'30px'}}>Research Interests</h4>
                <ul className="research-list">
                  {speaker.topics.map((topic, index) => (
                    <li key={index}>
                      <div className="check-icon"><CheckCircle size={18}/></div>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODALE TOPIC (Pour les axes scientifiques) ---
const TopicModal = ({ topic, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content reveal active" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24}/></button>
        <div className="modal-header">
          <div className="icon-box-pro" style={{width:'60px', height:'60px'}}><topic.icon size={30} /></div>
          <div>
            <span className="section-label" style={{marginBottom:'5px', fontSize:'0.8rem'}}>Track Details</span>
            <h3 style={{fontSize:'1.8rem', fontFamily:'Playfair Display, serif'}}>{topic.title}</h3>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-desc">{topic.desc}</p>
          <ul className="modal-list">
            {topic.tags.map((tag, i) => (
              <li key={i}><CheckCircle size={16} color="#15803d" style={{marginRight:'10px'}}/> {tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- SUBMISSION ---
const PaperSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', name: '', email: '' });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { alert("Please upload a file"); return; }
    setLoading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${formData.name.replace(/\s/g, '_')}.${fileExt}`;

      const { error: fileError } = await supabase.storage.from('abstracts').upload(fileName, file);
      if (fileError) throw fileError;

      const { data: { publicUrl } } = supabase.storage.from('abstracts').getPublicUrl(fileName);

      const { error: dbError } = await supabase.from('paper_submissions').insert([{
        paper_title: formData.title,
        author_name: formData.name,
        author_email: formData.email,
        file_url: publicUrl,
        presentation_type: 'Oral'
      }]);

      if (dbError) throw dbError;
      alert("Abstract submitted successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="submission" className="section-padding submission-bg">
      <div className="container reveal">
        <div className="section-header text-white">
           <h2 className="section-title text-white">Call For Papers</h2>
           <p style={{opacity:0.9, fontSize:'1.1rem'}}>Share your research in Green Chemistry.</p>
        </div>
        <div className="form-wrapper center-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
               <label>Paper Title</label>
               <input type="text" className="input-field" required onChange={e => setFormData({...formData, title: e.target.value})}/>
            </div>
            <div className="grid-2">
              <div className="form-group"><input type="text" placeholder="Author Name" className="input-field" required onChange={e => setFormData({...formData, name: e.target.value})}/></div>
              <div className="form-group"><input type="email" placeholder="Email" className="input-field" required onChange={e => setFormData({...formData, email: e.target.value})}/></div>
            </div>
            <div className="form-group">
               <label>Abstract File (PDF)</label>
               <input type="file" className="input-field file-input" accept=".pdf" required onChange={e => setFile(e.target.files[0])}/>
            </div>
            <button type="submit" className="btn-primary full-width" disabled={loading}>
              {loading ? 'Uploading...' : 'Submit Abstract'} <UploadCloud size={20}/>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- REGISTRATION ---
const Registration = () => {
  const [price, setPrice] = useState("50.00");
  const [formData, setFormData] = useState({ fullName: '', email: '' });

  const handlePaymentSuccess = async (details) => {
    try {
      await supabase.from('registrations').insert([{
        full_name: formData.fullName,
        email: formData.email,
        payment_status: 'PAID',
        paypal_order_id: details.id
      }]);
      alert("Registration Successful!");
    } catch (error) {
      alert("Error saving registration");
    }
  };

  return (
    <section id="registration" className="section-padding">
      <div className="container reveal">
        <div className="section-header">
           <span className="section-label">Secure Your Spot</span>
           <h2 className="section-title">Registration</h2>
        </div>
        <div className="form-wrapper center-form border-top-primary">
           <div className="form-group">
              <label>Select Category</label>
              <select onChange={(e)=>setPrice(e.target.value)} className="input-field">
                 <option value="50.00">Student - $50</option>
                 <option value="100.00">Academic - $100</option>
                 <option value="200.00">Professional - $200</option>
              </select>
           </div>
           <div className="form-group">
              <input type="text" placeholder="Full Name" className="input-field" onChange={e => setFormData({...formData, fullName: e.target.value})}/>
              <input type="email" placeholder="Email Address" className="input-field" style={{marginTop:'10px'}} onChange={e => setFormData({...formData, email: e.target.value})}/>
           </div>
           
           <div style={{marginTop: '30px'}}>
             <PayPalScriptProvider options={{ "client-id": "test" }}>
               <PayPalButtons 
                style={{layout: "vertical", color:'gold', shape:'rect'}} 
                createOrder={(data, actions) => {
                    return actions.order.create({ purchase_units: [{ amount: { value: price } }] });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => handlePaymentSuccess(details));
                }}
               />
             </PayPalScriptProvider>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- HOTELS ---
const Hotels = () => (
  <section id="hotels" className="section-padding bg-light">
    <div className="container reveal">
       <div className="about-section rounded-box">
          <div className="about-content">
             <span className="section-label">Venue</span>
             <h2 className="section-title">Le Méridien Oran</h2>
             <p className="text-body">Experience 5-star luxury with breathtaking views of the Mediterranean. Located adjacent to the Convention Center.</p>
             <ul className="venue-details">
                <li><MapPin color="#15803d"/> Les Genets, Oran</li>
                <li><Phone color="#15803d"/> +213 41 98 40 00</li>
             </ul>
             <button className="btn-outline-dark">Book Room</button>
          </div>
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" alt="Hotel" className="about-img"/>
       </div>
    </div>
  </section>
);

// --- FOOTER ---
const Footer = () => (
  <footer className="footer-main">
    <div className="container">
       <h2>ICGCSD 2026</h2>
       <p className="footer-desc">International Conference on Green Chemistry and Sustainable Development</p>
       <p className="copyright">© 2026 ICGCSD. All rights reserved.</p>
    </div>
  </footer>
);

export default App;