
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Player from './components/Player';
import Home from './pages/Home';
import Club from './pages/Club';
import Guest from './pages/Guest';
import EmissionPage from './pages/EmissionPage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [siteData, setSiteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./content/site.json', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setSiteData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("JSON Error", err);
        setLoading(false);
      });
  }, []);

  if (loading || !siteData) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="font-unbounded font-black text-blue-500 text-[10px] tracking-widest uppercase">Radio Electro Paris</div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <Home siteData={siteData} setActiveTab={setActiveTab} />;
      case 'club': return <Club openInApp={undefined} />;
      case 'guest': return <Guest openInApp={undefined} />;
      case '100paris': 
        return (
          <EmissionPage 
            title="100% PARIS" 
            image="https://i.postimg.cc/YC3Mf35w/Chat-GPT-Image-18-fevr-2026-a-00-20-55.png" 
            onBack={() => setActiveTab('home')} 
            playlist={[
              { artist: "Baud", track: "eyes on the dance floor" },
              { artist: "Basile de suresne", track: "make a believe" },
              { artist: "La Marquise & OIO", track: "Alto" },
              { artist: "Adibu", track: "Another Bitch" },
              { artist: "Frederika & E-Klozion", track: "Sueños" },
              { artist: "Isaac gueye", track: "papi" },
              { artist: "John Bogota", track: "Aminata" },
              { artist: "nat low edit", track: "in my feelings" }
            ]}
          />
        );
      case 'playground':
        return (
          <EmissionPage 
            title="PLAYGROUND" 
            image="https://i.postimg.cc/htCNt3k6/Chat-GPT-Image-18-fevr-2026-a-00-31-02.png" 
            onBack={() => setActiveTab('home')} 
          />
        );
      default: return <Home siteData={siteData} setActiveTab={setActiveTab} />;
    }
  };

 return (
  <div className="relative min-h-screen text-zinc-100">
    {/* 🖼️ Background global */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.postimg.cc/Z5cqkP3c/palaisglace.jpg')",
      }}
    />

    {/* 🟤 Voile sombre pour contrast */}
    <div className="absolute inset-0 bg-black/70"></div>

    {/* 📦 Contenu principal */}
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        appName={siteData.settings?.appName || "Radio Electro Paris"}
      />

      <Player appName={siteData.settings?.appName || "Radio Electro Paris"} />

      <main className="flex-1 animate-fade py-10">
        <div className="max-w-7xl mx-auto px-6">
          {renderPage()}
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-white/10 bg-black/50 backdrop-blur-md text-zinc-400 text-[10px]">
        © {new Date().getFullYear()} {siteData.settings?.appName}
      </footer>
    </div>
  </div>
);


export default App;
