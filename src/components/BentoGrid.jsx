import React from 'react';

const EscapeRoomCard = ({ className = '', size = 'normal' }) => (
  <div className={`bg-pink-50 rounded-xl border-8 border-orange-500 p-2 ${className}`}>
    <div className={`${size === 'large' ? 'aspect-[2/1]' : 'aspect-square'} flex items-end`}>
      <div className="text-sm font-bold">
        Escape Room
        <div className="text-xs">The Mummy</div>
      </div>
    </div>
  </div>
);

const BentoGrid = () => {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12">HIGHLIGHT EVENTS</h1>
      
      {/* Grid Container */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {/* First Row - Mobile: 2x2 grid, Desktop: 2x3 grid */}
        <div className="col-span-2 md:col-span-3 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <EscapeRoomCard size="large" className="h-full" />
          </div>
          <EscapeRoomCard />
          <EscapeRoomCard />
        </div>

        {/* Second Row - Mobile: 2x2 grid, Desktop: 2x3 grid */}
        <div className="col-span-2 md:col-span-3 grid grid-cols-2 gap-4">
          <EscapeRoomCard />
          <EscapeRoomCard />
          <div className="col-span-2">
            <EscapeRoomCard size="large" className="h-full" />
          </div>
        </div>

        {/* Third Row - Mobile: 2x2 grid, Desktop: full width 3 columns */}
        <div className="col-span-2 md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <EscapeRoomCard />
          <EscapeRoomCard />
          <div className="col-span-2 md:col-span-1">
            <EscapeRoomCard />
          </div>
        </div>

        {/* Fourth Row - Mobile: 2x2 grid, Desktop: full width 3 columns */}
        <div className="col-span-2 md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <EscapeRoomCard />
          <EscapeRoomCard />
          <div className="col-span-2 md:col-span-1">
            <EscapeRoomCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;