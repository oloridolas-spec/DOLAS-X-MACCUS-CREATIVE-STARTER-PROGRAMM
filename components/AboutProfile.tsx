import React from 'react';
import { Link } from 'react-router-dom';

export const AboutProfile: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-20 selection:bg-maccus-blue selection:text-white">
            {/* Navigation Header */}
            <div className="border-b border-white/20 bg-black sticky top-20 z-30 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                     <Link to="/" className="group flex items-center gap-2 font-mono text-sm uppercase tracking-widest hover:text-maccus-blue transition-colors">
                        <span className="text-lg">←</span>
                        <span className="group-hover:underline decoration-1 underline-offset-4">Back_to_Base</span>
                     </Link>
                     <div className="hidden md:flex gap-4">
                        <span className="font-mono text-xs border border-white/20 px-3 py-1 rounded-full uppercase text-maccus-blue border-maccus-blue/30">
                            CEO_PROFILE
                        </span>
                     </div>
                </div>
            </div>

            {/* Marquee Name */}
            <div className="overflow-hidden border-b border-white/10 bg-[#050505] py-6">
                 <div className="animate-marquee whitespace-nowrap flex gap-12">
                     {[1,2,3,4].map(i => (
                         <div key={i} className="flex items-center gap-8">
                             <span className="text-7xl md:text-9xl font-black uppercase text-white/5" style={{ WebkitTextStroke: '2px #333' }}>
                                 OLADIMEJI MARK
                             </span>
                             <span className="text-4xl text-maccus-blue">✦</span>
                         </div>
                     ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 border-x border-white/10">
                
                {/* Image & Key Info Sidebar */}
                <div className="lg:col-span-5 border-r border-white/10 bg-[#0a0a0a]">
                    <div className="sticky top-40">
                        <div className="aspect-[4/5] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 group border-b border-white/10">
                            {/* Updated to local image reference */}
                            <img 
                                src="./oladimeji.jpg" 
                                alt="Oladimeji Mark" 
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            
                            <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/10 bg-black/60 backdrop-blur-md">
                                <h1 className="text-3xl font-bold uppercase text-white mb-1">Oladimeji Mark</h1>
                                <p className="font-mono text-xs text-maccus-blue uppercase tracking-widest">
                                    CEO Maccus Technology • Founder Mark Perspectives
                                </p>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            <div>
                                <h3 className="font-mono text-xs text-gray-500 uppercase mb-4 border-b border-white/10 pb-2">Direct Contact</h3>
                                <ul className="space-y-4">
                                    <li className="group">
                                        <span className="block text-[10px] text-gray-600 uppercase tracking-wider mb-1">Email Address</span>
                                        <a href="mailto:olademejiayodelemark@gmail.com" className="flex items-center gap-2 text-sm font-medium hover:text-maccus-blue transition-colors break-all">
                                            <svg className="w-4 h-4 text-gray-500 group-hover:text-maccus-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            olademejiayodelemark@gmail.com
                                        </a>
                                    </li>
                                    <li className="group">
                                        <span className="block text-[10px] text-gray-600 uppercase tracking-wider mb-1">Mobile Line</span>
                                        <a href="tel:07044602585" className="flex items-center gap-2 text-sm font-medium hover:text-maccus-blue transition-colors">
                                            <svg className="w-4 h-4 text-gray-500 group-hover:text-maccus-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            07044602585
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-mono text-xs text-gray-500 uppercase mb-3">Location</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    Lagos, Nigeria
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-7">
                    <div className="p-8 md:p-12 space-y-16">
                        
                        {/* Bio Section */}
                        <div className="relative">
                            <span className="absolute -left-16 top-0 font-mono text-xs text-gray-700 -rotate-90 origin-top-right hidden md:block">
                                01_BIOGRAPHY
                            </span>
                            <h2 className="text-4xl font-bold uppercase mb-8 leading-tight">
                                Creating Innovative <span className="text-transparent bg-clip-text bg-gradient-to-r from-maccus-blue to-green-400">Digital Solutions</span>
                            </h2>
                            <div className="prose prose-invert prose-lg text-gray-400 leading-relaxed font-light">
                                <p className="mb-6">
                                    Oladimeji Mark is a visionary entrepreneur and tech enthusiast passionate about creating innovative digital solutions. As the CEO of <span className="text-white font-medium">MACCUS TECHNOLOGY</span>, he leads a dynamic team focused on delivering cutting-edge tech services and solutions that help businesses grow.
                                </p>
                                <p>
                                    He is also the creative force behind <span className="text-white font-medium">Mark Perspectives</span>, a brand identity that reflects his mission to inspire, mentor, and guide individuals and businesses in building strong, authentic brands. With a sharp eye for design, strategy, and technology, Oladimeji combines creativity with practical solutions to bring ideas to life.
                                </p>
                            </div>
                        </div>

                        {/* Vision Quote */}
                        <div className="bg-[#111] border border-white/10 p-10 relative overflow-hidden group hover:border-maccus-blue transition-colors duration-500">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                            </div>
                            <h3 className="font-mono text-maccus-blue text-sm mb-4 uppercase tracking-widest">The Vision</h3>
                            <p className="text-2xl font-light italic text-white relative z-10">
                                "To transform ideas into impactful solutions through technology and creativity, empowering individuals and businesses."
                            </p>
                        </div>

                        {/* Skills Matrix */}
                        <div>
                            <span className="font-mono text-xs text-gray-700 mb-6 block">02_EXPERTISE</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                                {[
                                    { title: "Technology & Innovation", desc: "Software, Digital Solutions" },
                                    { title: "Brand Identity", desc: "Creative Strategy" },
                                    { title: "Graphic Design", desc: "Digital Marketing" },
                                    { title: "Leadership", desc: "Entrepreneurship" }
                                ].map((skill, idx) => (
                                    <div key={idx} className="bg-black p-6 hover:bg-[#0f0f0f] transition-colors group">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="font-mono text-xs text-gray-600">0{idx+1}</span>
                                            <div className="w-2 h-2 bg-maccus-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-maccus-blue transition-colors">{skill.title}</h4>
                                        <p className="text-sm text-gray-500">{skill.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
             {/* Bottom Brand Strip */}
             <div className="border-t border-white/10 bg-[#050505] py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="font-mono text-xs text-gray-600 uppercase tracking-[0.3em]">
                        Maccus Technology • Mark Perspectives • 2024
                    </p>
                </div>
            </div>
        </div>
    );
};