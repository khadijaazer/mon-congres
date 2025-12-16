import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Calendar, MapPin, Mail, Phone, CheckCircle, Leaf, Beaker, Globe, Menu, X, UploadCloud, Users, ArrowRight } from 'lucide-react';

function App() {
  // Hook pour les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <WelcomeSection />
      <Sponsors />
      <Topics />
      <PaperSubmission />
      <Speakers />
      <Registration />
      <Hotels />
      <Footer />
    </div>
  );
}

// --- HEADER ---
const Header = () => (
  <header className="main-header">
    <div className="container header-content">
      <div className="logo-box">
        {/* LOGO ICI */}
        <img src="/logo.jpeg" alt="Green Chemistry Logo" className="logo-img" />
        <div className="conference-title">
          <h1>INTERNATIONAL<br/>GREEN CHEMISTRY<br/>CONGRESS</h1>
        </div>
      </div>
      <div className="conference-date-loc">
        <p><Calendar className="inline-icon" size={18} style={{marginRight:'5px'}}/> 30th - 31st May 2026</p>
        <p><MapPin className="inline-icon" size={18} style={{marginRight:'5px'}}/> Oran, Algeria</p>
      </div>
    </div>
  </header>
);

// --- NAVBAR ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleScroll = (id) => { setIsOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#4ade80' }}>MENU</div>
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#topics" onClick={() => setIsOpen(false)}>Topics</a>
          <a href="#submission" onClick={() => setIsOpen(false)} style={{color:'#facc15'}}>Submit Paper</a>
          <a href="#speakers" onClick={() => setIsOpen(false)}>Speakers</a>
          <a href="#registration" onClick={() => setIsOpen(false)}>Registration</a>
          <a href="#hotels" onClick={() => setIsOpen(false)}>Hotels</a>
        </div>
      </div>
    </nav>
  );
};

// --- WELCOME ---
const WelcomeSection = () => (
  <section id="home" className="welcome-section">
    <div className="container reveal">
      <h2 className="section-title">Welcome to the Congress</h2>
      <div className="overview-grid">
        <div className="overview-text">
          <h3 style={{ marginBottom: '25px', color: '#2e7d32', fontSize: '1.5rem', fontWeight:'bold' }}>Connecting Science & Sustainability</h3>
          <p>We are thrilled to invite you to the <strong>International Green Chemistry Congress</strong>. Taking place in the vibrant city of <strong>Oran</strong>, this event gathers the brightest minds to shape a sustainable future.</p>
          <p>Join researchers, industry leaders, and students in exploring innovations in eco-friendly synthesis, renewable energy, and circular economy.</p>
          <a href="#registration" className="btn-primary" style={{display:'inline-flex', alignItems:'center', gap:'10px', marginTop:'20px', width:'auto'}}>
            Reserve Your Spot <ArrowRight size={20}/>
          </a>
        </div>

        <div className="important-dates-box">
          <h3 style={{ textAlign: 'center', marginBottom: '25px', color:'#1e293b' }}>Key Dates</h3>
          <div className="date-item">
            <span className="date-label">Abstract Submission</span>
            <span className="date-value">01 Apr 2026</span>
          </div>
          <div className="date-item">
            <span className="date-label">Early Bird Registration</span>
            <span className="date-value">20 Mar 2026</span>
          </div>
          <div className="date-item" style={{ border: 'none' }}>
            <span className="date-label">Conference Days</span>
            <span className="date-value" style={{ color: '#d32f2f' }}>30-31 May 2026</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- SPONSORS (NOUVELLE SECTION) ---
const Sponsors = () => {
  // Liste des logos (placeholders ici, tu peux mettre des vraies images)
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png", // Répétition pour l'effet infini
  ];

  return (
    <section className="sponsors-section">
      <div className="container">
        <h3 style={{textAlign:'center', marginBottom:'40px', color:'#94a3b8', textTransform:'uppercase', letterSpacing:'2px'}}>Official Partners & Sponsors</h3>
        <div className="sponsors-wrapper">
          {/* On double la liste pour l'effet infini */}
          <div className="sponsors-track">
            {logos.map((src, i) => <img key={i} src={src} className="sponsor-logo" alt="Sponsor" />)}
          </div>
          <div className="sponsors-track">
             {logos.map((src, i) => <img key={`dup-${i}`} src={src} className="sponsor-logo" alt="Sponsor" />)}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- TOPICS ---
const Topics = () => (
  <section id="topics" style={{ padding: '80px 0', background: '#f8fafc' }}>
    <div className="container reveal">
      <h2 className="section-title">Conference Topics</h2>
      <div className="grid-3">
        <div className="card">
          <div style={{background:'#dcfce7', width:'70px', height:'70px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}>
             <Leaf size={32} color="#15803d" />
          </div>
          <h3 style={{marginBottom:'10px'}}>Green Synthesis</h3>
          <p style={{color:'#64748b'}}>Innovative pathways for eco-friendly chemical production.</p>
        </div>
        <div className="card">
          <div style={{background:'#e0f2fe', width:'70px', height:'70px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}>
             <Beaker size={32} color="#0284c7" />
          </div>
          <h3 style={{marginBottom:'10px'}}>Clean Energy</h3>
          <p style={{color:'#64748b'}}>Advances in hydrogen storage, biofuels, and solar materials.</p>
        </div>
        <div className="card">
          <div style={{background:'#fef9c3', width:'70px', height:'70px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}>
             <Globe size={32} color="#ca8a04" />
          </div>
          <h3 style={{marginBottom:'10px'}}>Waste Valorization</h3>
          <p style={{color:'#64748b'}}>Circular economy strategies and recycling technologies.</p>
        </div>
      </div>
    </div>
  </section>
);

// --- PAPER SUBMISSION ---
// --- PAPER SUBMISSION (VERSION CORRIGÉE AVEC SUPABASE) ---
const PaperSubmission = () => {
  const [formData, setFormData] = useState({ title: '', type: 'Oral', name: '', email: '', institution: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { alert("Please select a file to upload."); return; }
    
    setLoading(true);

    try {
      // 1. Upload du fichier (PDF/DOC) dans le Bucket "abstracts"
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${formData.name.replace(/\s/g, '_')}.${fileExt}`;

      const { data: fileData, error: fileError } = await supabase.storage
        .from('abstracts')
        .upload(fileName, file);

      if (fileError) throw fileError;

      // 2. Récupérer l'URL publique du fichier
      const { data: { publicUrl } } = supabase.storage
        .from('abstracts')
        .getPublicUrl(fileName);

      // 3. Insérer les données dans la table SQL
      const { error: dbError } = await supabase.from('paper_submissions').insert([{
        paper_title: formData.title,
        presentation_type: formData.type,
        author_name: formData.name,
        author_email: formData.email,
        institution: formData.institution,
        file_url: publicUrl // On stocke le lien du fichier
      }]);

      if (dbError) throw dbError;

      setSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting paper: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <section id="submission" style={{padding:'80px 0', textAlign:'center'}}>
      <CheckCircle size={60} color="#2e7d32" style={{margin:'0 auto 20px'}}/>
      <h2 style={{color:'#2e7d32'}}>Paper Submitted Successfully!</h2>
      <p>We have received your abstract.</p>
      <button onClick={() => setSuccess(false)} className="btn-primary" style={{width:'auto', marginTop:'20px'}}>Submit another</button>
    </section>
  );

  return (
    <section id="submission" style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container reveal">
        <h2 className="section-title">Call for Papers</h2>
        <div className="form-box">
          <div style={{textAlign:'center', marginBottom:'30px'}}>
            <UploadCloud size={50} color="#2e7d32" />
            <p>Share your research with the world.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Paper Title" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
             <div className="form-group">
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="Oral">Oral Presentation</option>
                <option value="Poster">Poster Presentation</option>
              </select>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Institution / University" required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />
            </div>
            <div className="form-group">
               <label style={{fontSize:'0.9rem', fontWeight:'bold', display:'block', marginBottom:'5px'}}>Upload Abstract (PDF)</label>
               <input type="file" accept=".pdf,.doc,.docx" required onChange={e => setFile(e.target.files[0])} style={{background:'white'}} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading} style={{marginTop:'20px'}}>
              {loading ? 'Uploading...' : 'Submit Abstract'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- SPEAKERS ---
const Speakers = () => (
  <section id="speakers" style={{ padding: '80px 0', background: '#f1f5f9' }}>
    <div className="container reveal">
      <h2 className="section-title">Keynote Speakers</h2>
      <div className="grid-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card">
            <div style={{ width: '100px', height: '100px', background: '#cbd5e1', borderRadius: '50%', margin: '0 auto 20px', border:'3px solid white', boxShadow:'0 5px 15px rgba(0,0,0,0.1)' }}></div>
            <h3 style={{fontSize:'1.2rem', fontWeight:'bold'}}>Dr. Scientist Name</h3>
            <p style={{ color: '#2e7d32', fontWeight: '600', fontSize:'0.9rem' }}>University of Oran 1</p>
            <p style={{fontSize:'0.85rem', color:'#64748b', marginTop:'10px'}}>World renowned expert in Green Chemistry and sustainable processes.</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- REGISTRATION ---
const Registration = () => {
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState("50.00");

  return (
    <section id="registration" style={{ padding: '80px 0', background: '#fff' }}>
      <div className="container reveal">
        <h2 className="section-title">Registration</h2>
        <div className="form-box">
          {step === 1 ? (
            <div className="animate-fade">
              <div className="form-group">
                <label style={{fontWeight:'bold'}}>Select Ticket Type</label>
                <select onChange={(e) => setPrice(e.target.value)} style={{marginBottom:'20px'}}>
                  <option value="50.00">Student (50 USD)</option>
                  <option value="100.00">Academic (100 USD)</option>
                  <option value="200.00">Industrial (200 USD)</option>
                </select>
              </div>
              <div className="form-group"><input type="text" placeholder="Full Name" /></div>
              <div className="form-group"><input type="email" placeholder="Email" /></div>
              <div className="form-group"><input type="text" placeholder="Affiliation" /></div>
              <button onClick={() => setStep(2)} className="btn-primary" style={{marginTop:'20px'}}>Proceed to Payment ({price} USD)</button>
            </div>
          ) : (
            <div style={{textAlign:'center'}}>
              <h3 style={{marginBottom:'20px'}}>Secure Payment</h3>
              <PayPalScriptProvider options={{ "client-id": "test" }}>
                <PayPalButtons style={{ layout: "vertical" }} createOrder={(data, actions) => actions.order.create({ purchase_units: [{ amount: { value: price } }] })} />
              </PayPalScriptProvider>
              <button onClick={() => setStep(1)} style={{marginTop:'15px', background:'none', border:'none', textDecoration:'underline', cursor:'pointer'}}>Back</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// --- HOTELS ---
const Hotels = () => (
  <section id="hotels" style={{ padding: '80px 0', background: '#f8fafc' }}>
    <div className="container reveal">
      <h2 className="section-title">Venue & Stay</h2>
      <div className="card" style={{maxWidth:'800px', margin:'0 auto', padding:'0', overflow:'hidden', display:'flex', flexDirection:'column'}}>
         <div style={{height:'300px', background:'#cbd5e1', display:'flex', alignItems:'center', justifyContent:'center', color:'#64748b'}}>
            Map Integration Placeholder
         </div>
         <div style={{padding:'30px'}}>
            <h3>Hotel Le Méridien Oran</h3>
            <p style={{color:'#64748b', marginTop:'10px'}}>Enjoy a luxury stay with a breathtaking view of the Mediterranean. Special rates available for congress attendees.</p>
            <div style={{marginTop:'20px', color:'#2e7d32', fontWeight:'bold', display:'flex', gap:'20px', justifyContent:'center'}}>
               <span><MapPin className="inline-icon"/> Oran Convention Center</span>
               <span><Phone className="inline-icon"/> +213 41 00 00 00</span>
            </div>
         </div>
      </div>
    </div>
  </section>
);

// --- FOOTER ---
const Footer = () => (
  <footer>
    <div className="container">
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'15px', marginBottom:'30px' }}>
         <Leaf color="#4ade80" />
         <h2 style={{color:'white', fontSize:'1.5rem'}}>IGCC 2026</h2>
      </div>
      <div style={{display:'flex', justifyContent:'center', gap:'40px', flexWrap:'wrap', marginBottom:'40px'}}>
        <span>About Us</span>
        <span>Contact</span>
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </div>
      <div style={{ opacity: 0.5, fontSize: '0.9rem' }}>
        © 2026 International Green Chemistry Congress. All rights reserved.
      </div>
    </div>
  </footer>
);

export default App;