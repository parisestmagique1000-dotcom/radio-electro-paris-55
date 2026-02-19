
import React, { useState } from 'react';
import { EiffelIcon } from '../constants';

interface InteractiveCoverProps {
  title: string;
  subtitle: string;
  image: string;
  scUrl?: string;
  instaUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  externalUrl?: string;
  targetTab?: string;
}

const InteractiveCover: React.FC<InteractiveCoverProps> = ({ title, subtitle, image, scUrl, instaUrl, spotifyUrl, youtubeUrl, externalUrl, targetTab }) => {
  const [view, setView] = useState<'cover' | 'soundcloud' | 'instagram' | 'spotify' | 'youtube'>('cover');

  const SocialBtn = ({ onClick, colorClass, icon, border = false }: any) => (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all active:scale-90 border-[1.5px] ${
        border ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-white/20'
      } ${colorClass}`}
    >
      {icon}
    </button>
  );

  const getDirectLink = (url: string | undefined) => {
    if (!url) return "#";
    if (url.includes('?url=')) {
      return decodeURIComponent(url.split('?url=')[1].split('&')[0]);
    }
    return url;
  };

  const handleContainerClick = () => {
    if (view === 'cover' && externalUrl) {
      window.open(externalUrl, '_blank');
    }
  };

  return (
    <div 
      onClick={handleContainerClick}
      className={`group relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden border transition-all duration-500 bg-zinc-950 border-white/5 ${ (externalUrl || targetTab) && view === 'cover' ? 'cursor-pointer hover:border-blue-500/50 shadow-2xl' : ''}`}
    >
      <img src={image} alt={title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${view !== 'cover' ? 'scale-110 blur-xl opacity-20' : 'opacity-100'}`} />
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent ${view !== 'cover' ? 'opacity-0' : 'opacity-100'}`} />

      {view === 'instagram' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center mb-4 shadow-xl">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </div>
          <button onClick={() => window.open(instaUrl, '_blank')} className="w-full max-w-[180px] py-3 bg-white text-black text-[10px] font-black uppercase rounded-full tracking-widest mb-2 shadow-lg">Ouvrir Instagram</button>
          <button onClick={() => setView('cover')} className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest hover:text-white transition-colors">Fermer</button>
        </div>
      )}

      {(view === 'soundcloud' || view === 'spotify') && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in" onClick={(e) => e.stopPropagation()}>
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe width="100%" height={view === 'soundcloud' ? "200" : "152"} frameBorder="0" allow="autoplay" 
              src={view === 'soundcloud' ? `${scUrl}&color=%233b82f6&auto_play=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false` : spotifyUrl?.replace('open.spotify.com/', 'open.spotify.com/embed/')} />
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 w-full max-w-[200px]">
            <button 
              onClick={() => window.open(getDirectLink(view === 'soundcloud' ? scUrl : spotifyUrl), '_blank')} 
              className="w-full py-3 bg-blue-600 text-white text-[9px] font-black uppercase rounded-full tracking-widest shadow-lg hover:bg-blue-500 transition-colors"
            >
              ÉCOUTER SUR {view === 'soundcloud' ? 'SOUNDCLOUD' : 'SPOTIFY'}
            </button>
            <button 
              onClick={() => setView('cover')} 
              className="px-6 py-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {view === 'youtube' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-6 shadow-xl">
             <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 0 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93 0-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </div>
          <button onClick={() => window.open(youtubeUrl, '_blank')} className="w-full max-w-[180px] py-3 bg-red-600 text-white text-[10px] font-black uppercase rounded-full tracking-widest mb-2 shadow-lg">Ouvrir YouTube</button>
          <button onClick={() => setView('cover')} className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest hover:text-white transition-colors">Fermer</button>
        </div>
      )}

      {view === 'cover' && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
          <div className="flex justify-between items-end gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-blue-500 text-[7px] font-extrabold uppercase tracking-[0.4em] mb-1">{subtitle}</p>
              <h3 className="text-white text-base md:text-lg font-unbounded font-black uppercase truncate drop-shadow-md">{title}</h3>
            </div>
            <div className="flex items-center gap-2">
              {instaUrl && <SocialBtn onClick={() => setView('instagram')} colorClass="hover:text-pink-500 hover:border-pink-500" icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>} /> }
              {spotifyUrl && <SocialBtn onClick={() => setView('spotify')} colorClass="hover:text-green-500 hover:border-green-500" icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.39c-.22.36-.66.47-1.02.24-2.42-1.48-5.46-1.81-9.05-1s-.77-.22-.99-.58c-.22-.36-.11-.8.24-1.02 3.94-.9 7.31-.53 10.05 1.15.35.2.46.66.24 1.02.24-.21.53-.1.53.21zm1.21-2.73c-.28.45-.86.59-1.31.32-2.76-1.7-6.97-2.19-10.23-1.2-.5.15-1.04-.14-1.19-.65-.15-.5.14-1.04.65-1.19 3.74-1.13 8.39-.58 11.55 1.37.45.27.6.85.32 1.31.21-.04.21.04.21.04zm.11-2.88c-3.32-1.97-8.77-2.15-11.91-1.19-.51.15-1.05-.14-1.20-.66-.15-.52.14-1.06.66-1.21 3.61-1.09 9.61-.88 13.43 1.39.46.27.61.87.33 1.33-.28.45-.87.61-1.33.33-.02.01-.02.01-.02.01z"/></svg>} /> }
              {youtubeUrl && <SocialBtn onClick={() => setView('youtube')} colorClass="hover:text-red-500 hover:border-red-500" icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 0 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93 0-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>} /> }
              {scUrl && <SocialBtn onClick={() => setView('soundcloud')} border colorClass="hover:bg-blue-500/10" icon={<div className="rotate-90"><EiffelIcon className="w-5 h-5 text-blue-400" /></div>} /> }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveCover;
