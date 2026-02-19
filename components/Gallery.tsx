
import React from 'react';

interface GalleryItem {
  url: string;
  caption?: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-zinc-900">
          <img 
            src={item.url} 
            alt={item.caption || "Gallery item"} 
            className="w-full h-full object-cover"
          />
          {item.caption && (
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white text-[8px] font-black uppercase tracking-widest">{item.caption}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
