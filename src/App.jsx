import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Calendar, MapPin, Mail, Phone, CheckCircle, Leaf, Beaker, Globe, Menu, X, UploadCloud, ArrowRight, User, Award, Mic } from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Gestion du Scroll et Animations
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
      <Stats />
      <AboutSection />
      <Sponsors />
      
      {/* Passage de la fonction d'ouverture de modale */}
      <Topics onTopicClick={setSelectedTopic} />
      
      <PaperSubmission />
      <Speakers />
      <Registration />
      <Hotels />
      <Footer />

      {/* Affichage de la Modale */}
      {selectedTopic && (
        <TopicModal topic={selectedTopic} onClose={() => setSelectedTopic(null)} />
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
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#topics" onClick={() => setIsOpen(false)}>Topics</a>
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
    // Utilisation de l'image locale dans public/
    backgroundImage: `linear-gradient(rgba(0, 20, 50, 0.5), rgba(0, 40, 20, 0.6)), url(/oran.jpg)`,
  }}>
    <div className="container hero-content reveal">
      <div className="hero-badges">
        <div className="badge"><Calendar size={16}/> May 30-31, 2026</div>
        <div className="badge"><MapPin size={16}/> Le Méridien, Oran</div>
      </div>
      <h1>Green Chemistry &<br/>Sustainable Future</h1>
      <p>Join the 3rd International Congress in the radiant city of Oran.</p>
      <div style={{display:'flex', gap:'20px', justifyContent:'center', marginTop:'30px'}}>
        <a href="#registration" className="btn-hero">Register Now</a>
        <a href="#topics" className="btn-outline">View Program</a>
      </div>
    </div>
  </section>
);

// --- STATS ---
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

// --- ABOUT SECTION ---
const AboutSection = () => (
  <section id="about" className="about-section">
    {/* Utilisation de l'image locale dans public/ */}
    <img src="/salle.jpg" alt="Conference Hall" className="about-img"/>
    <div className="about-content reveal">
      <span className="section-label">About The Conference</span>
      <h2 className="section-title">Innovating for a Greener Tomorrow</h2>
      <p className="text-body">
        The International Green Chemistry Congress (IGCC) is a premier global event bringing together the brightest minds in academia and industry.
        Hosted in the beautiful coastal city of Oran, this year's theme focuses on "Sustainable Synthesis and Circular Economy".
      </p>
      <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
         <div className="check-item"><CheckCircle size={20} color="#15803d"/> Networking with Global Experts</div>
         <div className="check-item"><CheckCircle size={20} color="#15803d"/> Publish in High-Impact Journals</div>
         <div className="check-item"><CheckCircle size={20} color="#15803d"/> Discover Oran's Culture</div>
      </div>
    </div>
  </section>
);

// --- MODAL COMPONENT ---
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
          <h4 style={{marginTop:'20px', marginBottom:'10px', color:'#1e293b'}}>Key Discussion Points:</h4>
          <ul className="modal-list">
            {topic.tags.map((tag, i) => (
              <li key={i}><CheckCircle size={16} color="#15803d" style={{marginRight:'10px'}}/> {tag}</li>
            ))}
             <li><CheckCircle size={16} color="#15803d" style={{marginRight:'10px'}}/> Innovations in {topic.title}</li>
          </ul>
          <div style={{marginTop:'30px', padding:'20px', background:'#f0fdf4', borderRadius:'10px', border:'1px dashed #15803d'}}>
            <p style={{fontSize:'0.9rem', color:'#14532d', fontWeight:'600'}}>Interested in presenting?</p>
            <a href="#submission" onClick={onClose} style={{color:'#15803d', textDecoration:'underline', fontSize:'0.9rem'}}>Submit your abstract here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TOPICS ---
const Topics = ({ onTopicClick }) => {
  const topicsData = [
    { icon: Leaf, title: "Green Synthesis", desc: "Eco-friendly pathways & catalysis.", tags: ["Solvents", "Catalysis", "Process"] },
    { icon: Beaker, title: "Energy & Fuels", desc: "Sustainable energy solutions.", tags: ["Biofuels", "Hydrogen", "Solar"] },
    { icon: Globe, title: "Circular Economy", desc: "Waste valorization strategies.", tags: ["Recycling", "Water", "Zero Waste"] },
    { icon: Mic, title: "Policy & Ethics", desc: "Regulatory frameworks.", tags: ["Regulations", "Safety", "Impact"] },
    { icon: Award, title: "Nano-Technology", desc: "Green nanomaterials applications.", tags: ["Materials", "Sensors", "Medicine"] },
    { icon: User, title: "Biotechnology", desc: "Enzymatic processes.", tags: ["Enzymes", "Biomass", "Food"] }
  ];

  return (
    <section id="topics" className="section-padding topics-section-pro">
      <div className="container reveal">
        <div className="section-header">
          <span className="section-label">Scientific Agenda</span>
          <h2 className="section-title">Conference Sessions</h2>
        </div>
        <div className="grid-3">
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
              <div className="card-footer">
                <span className="learn-more">View Details</span>
                <ArrowRight size={16} className="arrow-icon"/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SPEAKERS ---
const Speakers = () => (
  <section id="speakers" className="section-padding">
    <div className="container reveal">
      <div className="section-header">
        <span className="section-label">World Class Experts</span>
        <h2 className="section-title">Keynote Speakers</h2>
      </div>
      <div className="grid-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="speaker-card">
            <div className="speaker-img-container">
              <img src={`https://randomuser.me/api/portraits/men/${i*10 + 5}.jpg`} alt="Speaker" className="speaker-img"/>
            </div>
            <h3>Prof. Name Surname</h3>
            <p className="speaker-role">University of Oxford</p>
            <p className="speaker-bio">Nobel Laureate in Chemistry, specialized in catalytic processes.</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

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
      alert("Paper submitted successfully!");
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
           <p style={{opacity:0.9, fontSize:'1.1rem'}}>Share your research. Deadline: April 1st, 2026.</p>
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
             {/* REMPLACE "test" PAR TON VRAI CLIENT ID PAYPAL */}
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

// --- SPONSORS ---
const Sponsors = () => {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
  ];
  return (
    <div className="sponsors-section">
      <div className="container overflow-hidden">
         <h4 className="sponsors-title">Trusted Partners</h4>
         <div className="marquee">
            <div className="marquee-content">{logos.map((l,i)=><img key={i} src={l} className="sponsor-img" alt="logo"/>)}</div>
            <div className="marquee-content">{logos.map((l,i)=><img key={i+'d'} src={l} className="sponsor-img" alt="logo"/>)}</div>
         </div>
      </div>
    </div>
  );
};

// --- FOOTER ---
const Footer = () => (
  <footer className="footer-main">
    <div className="container">
       <h2>IGCC 2026</h2>
       <p className="footer-desc">The leading conference for sustainable chemistry and engineering.</p>
       <div className="footer-icons">
          <div className="icon-circle-footer"><Globe size={20}/></div>
          <div className="icon-circle-footer"><Mail size={20}/></div>
       </div>
       <p className="copyright">© 2026 Green Chemistry Congress. All rights reserved.</p>
    </div>
  </footer>
);

export default App;