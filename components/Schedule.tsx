
import React, { useEffect, useMemo, useState } from "react";
import { ProgramItem } from "../types";
import { sortedProgram } from "../constants";

function getParisNow() {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = (parts.find((p) => p.type === "weekday")?.value || "").toLowerCase();
  const hour = parts.find((p) => p.type === "hour")?.value || "00";
  const minute = parts.find((p) => p.type === "minute")?.value || "00";

  return { weekday, hhmm: `${hour}:${minute}` };
}

function hhmmToMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map((n) => Number(n));
  return h * 60 + m;
}

function isOnAirParis(item: ProgramItem) {
  const { weekday, hhmm } = getParisNow();
  if (item.day.toLowerCase() !== weekday) return false;

  const nowMin = hhmmToMinutes(hhmm);
  const startMin = hhmmToMinutes(item.start);
  const endMin = hhmmToMinutes(item.end);

  if (endMin < startMin) {
    return nowMin >= startMin || nowMin < endMin;
  }
  return nowMin >= startMin && nowMin < endMin;
}

export default function Schedule() {
  const [, tick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const paris = useMemo(() => getParisNow(), []);

  const todaysSchedule = useMemo(() => {
    return sortedProgram.filter(item => item.day.toLowerCase() === paris.weekday);
  }, [paris.weekday]);

  return (
    <section className="bg-black border border-white/10 rounded-[40px] md:rounded-[48px] p-5 md:p-12 shadow-2xl overflow-hidden">
      <div className="mb-8 flex items-center justify-between px-2">
        <div className="flex flex-col">
          <h2 className="text-white font-unbounded font-black uppercase tracking-widest text-[14px] md:text-[18px]">LINE UP</h2>
          <span className="text-blue-500 font-bold text-[9px] md:text-[11px] uppercase tracking-[0.2em] mt-1.5">tous les jours (du 02/03 au 08/03)</span>
        </div>
        <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest hidden sm:block">Heure de Paris</span>
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        {todaysSchedule.map((item) => {
          const onAir = isOnAirParis(item);
          const displayTime = item.start === "01:00" ? "01:00 - 07:00" : item.start;

          return (
            <div
              key={`${item.day}-${item.start}-${item.title}`}
              className={`flex flex-row items-center justify-between gap-4 rounded-2xl md:rounded-3xl border px-6 md:px-10 transition-all duration-500 min-h-[70px] md:min-h-[84px]
                ${onAir 
                  ? "border-red-500/60 bg-red-500/15 shadow-lg shadow-red-500/10 py-4" 
                  : "border-white/5 bg-white/5 hover:border-white/10 py-4"}`}
            >
              <div className="flex flex-row items-center gap-6 md:gap-12 flex-1 min-w-0">
                <div className={`font-unbounded font-bold text-[13px] md:text-[16px] w-14 md:w-36 flex-shrink-0 tabular-nums ${onAir ? 'text-red-500' : 'text-zinc-500'}`}>
                  {displayTime}
                </div>
                
                <div className="flex-1 min-w-0 pr-2">
                  <div className={`font-unbounded font-black uppercase tracking-tight text-[12px] md:text-[15px] pr-2 truncate ${onAir ? 'text-white' : 'text-zinc-100'}`}>
                    {item.title}
                  </div>
                  <div className="text-zinc-500 text-[10px] md:text-[12px] uppercase tracking-[0.15em] font-bold mt-1 md:mt-1.5 truncate">
                    {item.dj}
                  </div>
                </div>
              </div>

              {onAir && (
                <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/20 border border-red-600/40 text-red-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                  <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-red-600"></span>
                  </span>
                  <span className="hidden xs:inline">DIRECT</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
