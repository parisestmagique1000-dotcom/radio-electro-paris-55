
import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'REQUESTS' | 'USERS' | 'LOGS'>('REQUESTS');

  const requests = [
    { id: 1, user: 'Isaac G.', type: 'DJ', status: 'PENDING', info: '@isaacgueye - Parrain: Sissi Laz' },
    { id: 2, user: 'Marco Paris', type: 'HABITUÉ', status: 'PENDING', info: 'Clubber depuis 2012, addict au Rex.' }
  ];

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-unbounded font-black uppercase tracking-tighter text-white mb-2">BACKOFFICE</h1>
        <p className="text-red-500 font-bold uppercase tracking-widest text-[9px]">ESPACE SUPER_ADMIN UNIQUEMENT.</p>
      </div>

      <div className="flex gap-6 border-b border-white/5 mb-10 overflow-x-auto pb-4">
        {['REQUESTS', 'USERS', 'LOGS'].map(t => (
          <button 
            key={t}
            onClick={() => setActiveTab(t as any)}
            className={`text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === t ? 'text-blue-500 border-b-2 border-blue-500 pb-2' : 'text-zinc-600'
            }`}
          >
            {t === 'REQUESTS' ? 'DEMANDES' : t === 'USERS' ? 'UTILISATEURS' : 'LOGS'}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === 'REQUESTS' && requests.map(req => (
          <div key={req.id} className="glass p-6 rounded-3xl flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-white font-bold text-sm">{req.user}</span>
                <span className="text-[8px] font-black px-2 py-0.5 rounded bg-zinc-800 text-blue-400">{req.type}</span>
              </div>
              <p className="text-zinc-500 text-[10px]">{req.info}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-[8px] font-black rounded-xl uppercase hover:bg-blue-500">APPROUVER</button>
              <button className="px-4 py-2 bg-zinc-900 border border-white/5 text-zinc-500 text-[8px] font-black rounded-xl uppercase hover:text-white">REFUSER</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
