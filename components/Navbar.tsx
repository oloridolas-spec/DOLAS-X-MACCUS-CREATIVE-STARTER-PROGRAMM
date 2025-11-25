import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3">
                {/* Dolas Logo stylized */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-dolas-red to-dolas-orange shadow-lg shadow-dolas-red/20">
                    <span className="text-white font-bold text-lg">D</span>
                </div>
                
                <div className="h-6 w-px bg-gray-700 mx-1"></div>

                {/* Maccus Logo stylized */}
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-maccus-blue to-maccus-green shadow-lg shadow-maccus-blue/20">
                    <span className="text-white font-bold text-lg">M</span>
                </div>
                
                <div className="hidden md:flex flex-col ml-2">
                    <span className="text-white font-bold tracking-wide text-sm">DOLAS <span className="text-gray-500">x</span> MACCUS</span>
                    <span className="text-[11px] text-gray-400 font-medium tracking-wider uppercase">Creative Academy</span>
                </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-400 hover:text-white transition font-medium text-sm">About</a>
            <a href="#courses" className="text-gray-400 hover:text-white transition font-medium text-sm">Courses</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition font-medium text-sm">Tuition</a>
            <a href="#contact" className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition text-sm shadow-md">
                Contact Us
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-surface border-t border-gray-800 absolute w-full shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <a href="#about" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">About Program</a>
            <a href="#courses" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">Our Courses</a>
            <a href="#pricing" className="block px-3 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">Tuition Fees</a>
            <a href="#contact" className="block px-3 py-3 rounded-lg text-base font-medium text-white bg-dolas-red hover:bg-red-700">Contact Support</a>
          </div>
        </div>
      )}
    </nav>
  );
};