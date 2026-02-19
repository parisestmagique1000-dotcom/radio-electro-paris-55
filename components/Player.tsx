
import React, { useState, useRef, useEffect } from 'react';
import { STREAM_URL, EiffelIcon } from '../constants';

const Player: React.FC<{ appName: string }> = ({ appName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoplayAttempted = useRef(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.src = STREAM_URL;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.warn("Playback blocked:", e);
        setIsPlaying(false);
      });
    }
  };

  useEffect(() => {
    if (!autoplayAttempted.current) {
      autoplayAttempted.current = true;
      const timeout = setTimeout(() => {
        if (!isPlaying) togglePlay();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div className="w-full border-y border-white/5 bg-black/90 sticky top-0 z-[60] backdrop-blur-xl shadow-2xl">
      <audio ref={audioRef} preload="none" crossOrigin="anonymous" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 flex-1 min-w-0">
            <button 
              onClick={togglePlay}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 border-2 ${
                isPlaying 
                  ? 'bg-black border-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.3)]' 
                  : 'bg-zinc-900 border-white/10 hover:border-blue-500/50'
              }`}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <div className="rotate-90"><EiffelIcon className="w-6 h-6 text-white" /></div>
              )}
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-unbounded font-black text-[10px] uppercase text-blue-500 tracking-tighter">RADIO ELECTRO PARIS</span>
                <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                  <span className={`h-2 w-2 rounded-full ${isPlaying ? 'bg-red-500 animate-blink' : 'bg-zinc-800'}`}></span>
                  <span className="text-red-500 font-black text-[7px] uppercase tracking-widest">LIVE</span>
                </div>
              </div>
              <span className="text-white font-bold text-[11px] uppercase truncate">
                <span className="cc_streaminfo" data-type="song" data-username="radioelec">Chargement du titre...</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} className="hidden md:block w-24 accent-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from "react";

export default function Player() {
  useEffect(() => {
    // évite de le recharger 50 fois
    const id = "cc-streaminfo-script";
    if (document.getElementById(id)) return;

    const s = document.createElement("script");
    s.id = id;
    s.src = "https://philae.shoutca.st/system/streaminfo.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div>
      <div className="text-sm text-white/80">
        <span
          className="cc_streaminfo"
          data-type="song"
          data-username="radioelec"
        >
          Loading ...
        </span>
      </div>
    </div>
  );
}


export default Player;
