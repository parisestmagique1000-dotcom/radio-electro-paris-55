
import React from 'react';
import Schedule from './Schedule';
import InteractiveCover from './InteractiveCover';
import { EiffelIcon } from '../constants';

interface DynamicRendererProps {
  sections: any[];
  setActiveTab: (tab: string) => void;
  settings: any;
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ sections, setActiveTab, settings }) => {
  const sortedSections = [...sections]
    .filter(s => s.enabled)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center mb-8 bg-black rounded-[40px] p-6 max-w-2xl mx-auto border border-white/5 shadow-2xl">
      <h2 className="text-white font-unbounded font-black uppercase tracking-widest text-[14px] md:text-[18px] text-center">{title}</h2>
    </div>
  );

  const handleInternalNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {sortedSections.map((section) => {
        const { id, type, data } = section;

        switch (type) {
          case 'hero':
            return (
              <div key={id} className="text-center mb-8 mt-12 md:mt-20 flex flex-col items-center">
                <div className="bg-black py-6 px-12 rounded-full border border-white/10 inline-block shadow-2xl mb-4">
                  <p className="text-white font-unbounded font-black uppercase text-[14px] md:text-[18px] tracking-[0.2em] leading-relaxed">
                    {data.badge}
                  </p>
                </div>
              </div>
            );

          case 'schedule':
            return (
              <div key={id} className="relative mb-16">
                <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full -z-10"></div>
                <Schedule />
              </div>
            );

          case 'grid':
            return (
              <section key={id} className="max-w-7xl mx-auto mb-16 px-4">
                <SectionHeader title={data.title} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.items.map((item: any, idx: number) => (
                    <div key={`${id}-${idx}`} onClick={() => item.targetTab && handleInternalNav(item.targetTab)}>
                      <InteractiveCover 
                        title={item.name} 
                        subtitle={item.role} 
                        image={item.image} 
                        {...item} 
                      />
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'cta':
            return (
              <section key={id} className="max-w-5xl mx-auto text-center py-16 md:py-24 bg-black rounded-[48px] md:rounded-[64px] border-2 border-blue-500/20 flex flex-col items-center gap-10 px-10 shadow-2xl shadow-blue-500/10 mb-20 transition-transform hover:scale-[1.01]">
                <h2 className="text-white font-unbounded font-black uppercase text-[28px] md:text-[52px] text-center tracking-tighter leading-none">{data.title}</h2>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white font-black uppercase tracking-[0.6em] text-[12px] md:text-[16px] text-center">DIFFÉRENTS STYLES</p>
                  <p className="text-blue-500 font-black uppercase tracking-[0.7em] text-[12px] md:text-[16px] text-center">UNE SCÈNE: PARIS</p>
                </div>
                <button 
                  onClick={() => handleInternalNav(data.targetTab)} 
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-90 border-[3px] bg-black border-blue-600 shadow-[0_0_40px_rgba(59,130,246,0.4)] group"
                >
                  <div className="rotate-90 group-hover:scale-110 transition-transform">
                    <EiffelIcon className="w-8 h-8 text-white" />
                  </div>
                </button>
              </section>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default DynamicRenderer;
