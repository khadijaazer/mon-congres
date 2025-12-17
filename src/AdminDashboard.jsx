import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import { Download, CheckCircle, XCircle, FileText, Users, LogOut, Loader, Lock } from 'lucide-react';

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // DONNÉES DU DASHBOARD
  const [papers, setPapers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState('papers');

  // --- CONFIGURATION SÉCURITÉ ---
  // Remplace ceci par l'email EXACT de ton client
  const ALLOWED_EMAIL = "khadidjaazer1234@gmail.com"; 
  
  const navigate = useNavigate();

  useEffect(() => {
    // Vérification de la session au chargement
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAccess(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAccess(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAccess = (session) => {
    if (!session) {
      // Si pas connecté, on laisse le formulaire de login s'afficher
      setSession(null);
      setLoading(false);
      return;
    }

    // SI CONNECTÉ MAIS MAUVAIS EMAIL -> ON VIRE LA PERSONNE
    if (session.user.email !== ALLOWED_EMAIL) {
      alert("Accès refusé. Vous n'êtes pas l'administrateur.");
      supabase.auth.signOut();
      navigate('/'); // Redirection vers l'accueil
      return;
    }

    // Si tout est bon
    setSession(session);
    fetchData(); // On charge les données
    setLoading(false);
  };

  const fetchData = async () => {
    const { data: pData } = await supabase.from('paper_submissions').select('*').order('created_at', { ascending: false });
    if (pData) setPapers(pData);
    
    const { data: rData } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
    if (rData) setRegistrations(rData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Erreur: " + error.message);
  };

  // --- 1. CHARGEMENT ---
  if (loading) return <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>Chargement...</div>;

  // --- 2. FORMULAIRE LOGIN (Si pas encore connecté) ---
  if (!session) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center', width: '350px' }}>
          <Lock size={40} color="#2e7d32" style={{marginBottom:'20px'}} />
          <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>Accès Restreint</h2>
          <input name="email" type="email" placeholder="Email" required style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <input name="password" type="password" placeholder="Mot de passe" required style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Se connecter</button>
        </form>
      </div>
    );
  }

  // --- 3. LE DASHBOARD (Visible UNIQUEMENT si l'email correspond) ---
  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', padding: '20px' }}>
      <div className="container" style={{background:'white', padding:'30px', borderRadius:'10px', minHeight:'80vh'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
          <h1 style={{fontSize:'1.5rem', color:'#2e7d32'}}>Espace Administrateur</h1>
          <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
            <span style={{color:'#888', fontSize:'0.9rem'}}>{session.user.email}</span>
            <button onClick={() => supabase.auth.signOut()} style={{background:'#ef4444', color:'white', padding:'8px 15px', border:'none', borderRadius:'5px', cursor:'pointer'}}>Déconnexion</button>
          </div>
        </div>

        {/* Navigation des Onglets */}
        <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
          <button onClick={() => setActiveTab('papers')} style={{padding:'10px 20px', background: activeTab === 'papers' ? '#2e7d32' : '#eee', color: activeTab === 'papers' ? 'white' : 'black', border:'none', borderRadius:'5px', cursor:'pointer'}}>Papiers ({papers.length})</button>
          <button onClick={() => setActiveTab('registrations')} style={{padding:'10px 20px', background: activeTab === 'registrations' ? '#0056b3' : '#eee', color: activeTab === 'registrations' ? 'white' : 'black', border:'none', borderRadius:'5px', cursor:'pointer'}}>Inscrits ({registrations.length})</button>
        </div>

        {/* CONTENU PAPIERS */}
        {activeTab === 'papers' && (
          <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f8fafc', textAlign:'left'}}>
                <th style={{padding:'10px'}}>Titre</th>
                <th style={{padding:'10px'}}>Auteur</th>
                <th style={{padding:'10px'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {papers.map(p => (
                <tr key={p.id} style={{borderBottom:'1px solid #eee'}}>
                  <td style={{padding:'10px', fontWeight:'bold'}}>{p.paper_title}</td>
                  <td style={{padding:'10px'}}>{p.author_name}</td>
                  <td style={{padding:'10px'}}><a href={p.file_url} target="_blank" style={{color:'blue', textDecoration:'underline'}}>Télécharger PDF</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* CONTENU INSCRIPTIONS */}
        {activeTab === 'registrations' && (
           <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#f8fafc', textAlign:'left'}}>
                <th style={{padding:'10px'}}>Nom</th>
                <th style={{padding:'10px'}}>Email</th>
                <th style={{padding:'10px'}}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(r => (
                <tr key={r.id} style={{borderBottom:'1px solid #eee'}}>
                  <td style={{padding:'10px', fontWeight:'bold'}}>{r.full_name}</td>
                  <td style={{padding:'10px'}}>{r.email}</td>
                  <td style={{padding:'10px'}}>
                    {r.payment_status === 'PAID' ? <span style={{color:'green'}}>Payé</span> : <span style={{color:'orange'}}>En attente</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;