import React, { useEffect, useRef, useState } from "react";
import { STREAM_URL, EiffelIcon } from "../constants";

const FALLBACK_COVER = "https://i.postimg.cc/Z5cqkP3c/palaisglace.jpg";

function splitArtistTrack(text: string) {
  const t = (text || "").trim();
  let parts = t.split(" - ");
  if (parts.length < 2) parts = t.split(" — ");
  if (parts.length < 2) return { artist: "", track: t };
  return { artist: parts[0].trim(), track: parts.slice(1).join(" - ").trim() };
}

async function fetchCoverFromITunes(query: string) {
  const url =
    "https://itunes.apple.com/search?term=" +
    encodeURIComponent(query) +
    "&media=music&limit=1";
  const res = await fetch(url);
  const data = await res.json();
  const art = data?.results?.[0]?.artworkUrl100;
  if (!art) return null;
  return art.replace("100x100bb", "300x300bb");
}

const Player: React.FC<{ appName: string }> = ({ appName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [coverUrl, setCoverUrl] = useState<string>(FALLBACK_COVER);
  const [nowPlaying, setNowPlaying] = useState<string>("Chargement du titre...");
  const lastQueryRef = useRef<string>("");

  // ✅ charge streaminfo.js + observe le titre pour MAJ cover + texte
  useEffect(() => {
    const id = "cc-streaminfo-script";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://philae.shoutca.st/system/streaminfo.js";
      s.async = true;
      document.body.appendChild(s);
    }

    const target = document.querySelector(
      '.cc_streaminfo[data-type="song"][data-username="radioelec"]'
    ) as HTMLElement | null;

    if (!target) return;

    const updateFromText = async () => {
      const text = (target.textContent || "").trim();
      if (!text || text.toLowerCase().includes("chargement")) return;

      setNowPlaying(text);

      const { artist, track } = splitArtistTrack(text);
      const q = (artist + " " + track).trim();
      if (!q || q === lastQueryRef.current) return;
      lastQueryRef.current = q;

      try {
        const cover = await fetchCoverFromITunes(q);
        setCoverUrl(cover || FALLBACK_COVER);
      } catch {
        setCoverUrl(FALLBACK_COVER);
      }
    };

    // le script peut mettre 1–2s → première tentative après délai
    const t1 = setTimeout(updateFromText, 1500);

    const obs = new MutationObserver(() => updateFromText());
    obs.observe(target, { childList: true, subtree: true, characterData: true });

    return () => {
      clearTimeout(t1);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }
      if (!audio.src) audio.src = STREAM_URL;
      await audio.play(); // Safari: OK si clic utilisateur
      setIsPlaying(true);
    } catch (e) {
      console.warn("Playback blocked:", e);
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full border-y border-white/5 bg-black/90 sticky top-0 z-[60] backdrop-blur-xl shadow-2xl">
      <audio ref={audioRef} preload="none" crossOrigin="anonymous" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* ✅ POCHETTE */}
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
              <img
                src={coverUrl}
                alt="cover"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={() => setCoverUrl(FALLBACK_COVER)}
              />
            </div>

            {/* PLAY */}
            <button
              onClick={togglePlay}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-90 border-2 ${
                isPlaying
                  ? "bg-black border-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                  : "bg-zinc-900 border-white/10 hover:border-blue-500/50"
              }`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <div className="rotate-90">
                  <EiffelIcon className="w-6 h-6 text-white" />
                </div>
              )}
            </button>

            {/* TITRES */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-unbounded font-black text-[10px] uppercase text-blue-500 tracking-tighter">
                  {appName || "RADIO ELECTRO PARIS"}
                </span>
                <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                  <span className={`h-2 w-2 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-zinc-800"}`}></span>
                  <span className="text-red-500 font-black text-[7px] uppercase tracking-widest">LIVE</span>
                </div>
              </div>

              {/* ✅ TITRE visible (comme ton player actuel) */}
              <span className="text-white font-bold text-[11px] uppercase truncate">
                {nowPlaying}
              </span>

              {/* ✅ on garde le span streaminfo (visible ou caché) :
                  - ici on le met en "hidden" car on affiche nowPlaying nous-même,
                  - mais il sert au script streaminfo.js */}
              <span className="cc_streaminfo hidden" data-type="song" data-username="radioelec">
                Chargement du titre...
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 9v6h4l5 5V4L9 9H5z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="hidden md:block w-24 accent-zinc-400"
            />
          </div>
        </div>

        {/* ✅ VINYLE AU SOL */}
        <div className="mt-4 relative">
          <div className="h-[1px] bg-white/10" />
          <div className="mt-3 flex justify-center">
            <div
              className={`w-20 h-20 rounded-full relative overflow-hidden border border-white/10 ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "2.2s" }}
              aria-hidden="true"
            >
              {/* disque */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black" />
              {/* reflets */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,.25),transparent_55%)]" />
              {/* sillons */}
              <div className="absolute inset-0 opacity-25 bg-[repeating-radial-gradient(circle_at_center,rgba(255,255,255,.10)_0_1px,transparent_2px_5px)]" />
              {/* label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-600/80 border border-white/10" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-black/70" />
              </div>
            </div>
          </div>

          {/* petite mention optionnelle */}
          <div className="mt-2 text-center text-[9px] text-white/40 uppercase tracking-widest">
            ON AIR
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
