
import React, { useState } from 'react';

type PostType = 'VIDEO' | 'PHOTO';

const Community: React.FC = () => {
  const [filter, setFilter] = useState<PostType | 'ALL'>('ALL');
  const [showPostModal, setShowPostModal] = useState(false);

  // Fake data based on user request
  const posts = [
    { id: 1, type: 'VIDEO', author: 'DJ BAUD', title: 'Paris DJ Sessions #01', description: 'Deep House at Les Bains', url: 'https://i.postimg.cc/CMs4CNdd/baudml.jpg', tags: ['Deep', 'Paris'], comments: 12 },
    { id: 2, type: 'PHOTO', author: 'Sissi Laz', title: 'Rexy After Hours', description: 'Vibe check at 6am', url: 'https://i.postimg.cc/MTR98JWM/sissilaz.jpg', tags: ['Clubbing', 'Rexy'], comments: 5 }
  ];

  return (
    <div className="animate-slide-up px-6 py-12 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-6xl font-unbounded font-black uppercase tracking-tighter text-white mb-2 leading-none">COMMUNAUTÉ</h1>
          <p className="text-blue-500 font-bold uppercase tracking-widest text-[9px]">Le rythme officiel des nuits de Paris.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {['ALL', 'VIDEO', 'PHOTO'].map(t => (
            <button 
              key={t}
              onClick={() => setFilter(t as any)}
              className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                filter === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-zinc-900 text-zinc-500 border border-white/5'
              }`}
            >
              {t === 'ALL' ? 'TOUT' : t + 'S'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.filter(p => filter === 'ALL' || p.type === filter).map(post => (
          <div key={post.id} className="glass rounded-[32px] overflow-hidden hover:border-blue-500/30 transition-all group">
            <div className="aspect-video relative overflow-hidden bg-zinc-900">
              <img src={post.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {post.type === 'VIDEO' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-xl">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] font-black bg-blue-600/10 text-blue-400 px-3 py-1 rounded-full uppercase tracking-widest">{post.author}</span>
                <span className="text-zinc-600 text-[9px] font-bold uppercase">{post.comments} COMMENTAIRES</span>
              </div>
              <h3 className="text-white font-unbounded font-black uppercase text-sm mb-2">{post.title}</h3>
              <p className="text-zinc-400 text-[11px] mb-4 line-clamp-2">{post.description}</p>
              
              <div className="flex items-center gap-2">
                {post.tags.map(t => <span key={t} className="text-[8px] text-zinc-500 font-bold uppercase">#{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setShowPostModal(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-90 transition-all z-50"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>
      </button>

      {showPostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPostModal(false)}></div>
          <div className="relative glass w-full max-w-md rounded-[40px] p-10 animate-slide-up">
            <h2 className="text-white font-unbounded font-black uppercase text-lg mb-6">PUBLIER</h2>
            <div className="space-y-4">
              <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest mb-8">Partagez votre vibe avec la capitale.</p>
              <button className="w-full py-4 rounded-2xl bg-zinc-900 border border-white/5 text-white text-[10px] font-black uppercase tracking-widest hover:border-blue-500 transition-all">DEVENIR DJ VÉRIFIÉ</button>
              <button className="w-full py-4 rounded-2xl bg-zinc-900 border border-white/5 text-white text-[10px] font-black uppercase tracking-widest hover:border-purple-500 transition-all">DEVENIR HABITUÉ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
