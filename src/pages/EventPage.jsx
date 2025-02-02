import React, { useState } from 'react';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const EventPage = () => {
  const [teamName, setTeamName] = useState('');
  const [rollNo, setRollNo] = useState('');

  return (
    <div className="min-h-screen bg-[#fff5eb] flex flex-col">
      {/* Header */}
      <div className="bg-[#f5e6d3] p-6 md:p-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">SPECTRUM</h1>
      </div>

      {/* Four-Part Flex Layout */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        {/* Part 1: Image Section */}
        <div className="flex-1 md:flex-none md:w-1/2 bg-gray-300 h-64 md:h-auto rounded-lg"></div>

        {/* Right Column for Event Details */}
        <div className="flex-1 md:flex md:flex-col gap-4 md:w-1/2">
          {/* Part 2: Event Title and Details */}
          <div>
            <h2 className="text-4xl font-bold text-left" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              Design Arena
            </h2>
            <div className="flex justify-start gap-8 mt-2">
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black"></div> 08:00 AM
              </span>
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black"></div> Old Building 101, 102
              </span>
            </div>
            <div className="flex justify-start gap-8 mt-2">
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black"></div> Rs. 480/-
              </span>
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black"></div> 20 Teams
              </span>
            </div>
            <div className="flex justify-start mt-2">
              <div className="w-4 h-4 rounded-full bg-black"></div>
              <span className="ml-2">Prize pool - Rs. 3000/-</span>
            </div>
          </div>

          {/* Part 3: Description Section */}
          <div>
            <p className="text-lg leading-relaxed text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultricies libero ex, non porttitor est auctor vitae.
              Proin vestibulum malesuada urna ut euismod. Donec eget ullamcorper sapien, id posuere neque.
            </p>
          </div>

          {/* Part 4: Seat and Team Management Section */}
          <div className="flex flex-col gap-4 items-start mt-4">
            <p className="text-left text-sm font-medium">Seats: 10/20</p>
            <input
              type="text"
              placeholder="TEAM NAME"
              className="w-full md:w-64 px-6 py-2 rounded-full bg-[#F4A261] text-white placeholder-white text-center"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ROLL NO"
                className="flex-grow px-6 py-2 rounded-full bg-[#F4A261] text-white placeholder-white text-center"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
              />
              <button className="px-6 py-2 rounded-full bg-[#E76F51] text-white">ADD</button>
            </div>

            <div className="flex flex-wrap gap-2 justify-start">
              {[1, 2, 3].map((num) => (
                <div key={num} className="px-6 py-2 rounded-full bg-[#2A9D8F] text-white border-2 border-[#264653]">
                  1020235
                </div>
              ))}
            </div>

            <button className="w-24 px-6 py-2 rounded-full bg-[#E76F51] text-white">Join</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f5e6d3] py-8 text-center mt-auto">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Fr. C. Rodrigues Institute of Technology</h3>
        <p className="mb-4">
          Agnel Technical Education Complex,<br /> Sector 9-A Vashi, Navi Mumbai,<br /> Maharashtra, India, Pin - 400703
        </p>
        <div className="flex justify-center gap-4">
          <Instagram className="w-5 h-5" />
          <Linkedin className="w-5 h-5" />
          <Youtube className="w-5 h-5" />
        </div>
      </footer>
    </div>
  );
};

export default EventPage;
