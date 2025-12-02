import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { COURSES, PRICING } from '../constants';

interface CourseDetailProps {
    onRegister: (courseName: string) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ onRegister }) => {
    const { courseId } = useParams();
    const course = COURSES.find(c => c.id === courseId);

    if (!course) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20 selection:bg-white selection:text-black">
            {/* Top Navigation Bar - Brutalist */}
            <div className="border-b border-white/20 bg-black sticky top-20 z-30 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                     <Link to="/" className="group flex items-center gap-2 font-mono text-sm uppercase tracking-widest hover:text-dolas-red transition-colors">
                        <span className="text-lg">←</span>
                        <span className="group-hover:underline decoration-1 underline-offset-4">Return_Home</span>
                     </Link>
                     <div className="hidden md:flex gap-4">
                        <span className="font-mono text-xs border border-white/20 px-3 py-1 rounded-full uppercase">
                            ID: {course.id}
                        </span>
                        <span className="font-mono text-xs border border-white/20 px-3 py-1 rounded-full uppercase bg-white text-black font-bold">
                            Open for Enrollment
                        </span>
                     </div>
                </div>
            </div>

            {/* Marquee Header */}
            <div className="overflow-hidden border-b border-white/10 bg-dark-card/50 py-4">
                <div className="animate-marquee whitespace-nowrap flex gap-8">
                     {[1,2,3,4,5,6].map(i => (
                         <span key={i} className="text-8xl font-black uppercase text-transparent stroke-text opacity-20" style={{ WebkitTextStroke: '2px #ffffff' }}>
                             {course.title} •
                         </span>
                     ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 border-x border-white/10 min-h-[80vh]">
                
                {/* Main Content Area */}
                <div className="lg:col-span-8 border-r border-white/10">
                    {/* Hero Image Area */}
                    <div className="relative h-96 overflow-hidden group border-b border-white/10">
                        <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                        <img 
                            src={course.image} 
                            alt={course.title} 
                            className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute bottom-6 left-6 z-20">
                            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter mix-blend-difference">
                                {course.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="p-8 md:p-12 space-y-16">
                        <div>
                            <h2 className="font-mono text-dolas-red text-sm mb-4 uppercase tracking-widest">[01] Course Overview</h2>
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300 border-l-2 border-dolas-red pl-6">
                                {course.description}
                            </p>
                        </div>

                        <div>
                            <h2 className="font-mono text-maccus-blue text-sm mb-6 uppercase tracking-widest">[02] Prerequisites</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {course.prerequisites.map((req, idx) => (
                                    <div key={idx} className="border border-white/10 p-4 hover:bg-white/5 transition-colors cursor-crosshair">
                                        <div className="flex items-start gap-3">
                                            <span className="font-mono text-xs text-gray-500">0{idx + 1}</span>
                                            <span className="font-medium text-sm">{req}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-mono text-green-500 text-sm mb-6 uppercase tracking-widest">[03] Your Instructor</h2>
                            <div className="flex items-center gap-6 border border-white/10 p-6 bg-[#0a0a0a]">
                                <div className="w-16 h-16 bg-gray-800 flex items-center justify-center font-bold text-2xl border border-gray-600">
                                    {course.instructor.name[0]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg uppercase">{course.instructor.name}</h3>
                                    <p className="text-sm text-gray-400 font-mono mb-2">{course.instructor.role}</p>
                                    <p className="text-sm text-gray-500">{course.instructor.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Sidebar */}
                <div className="lg:col-span-4 bg-[#050505]">
                    <div className="sticky top-40">
                         {/* Pricing Ticket */}
                         <div className="p-8 border-b border-white/10">
                             <div className="flex justify-between items-start mb-2">
                                 <span className="font-mono text-xs text-gray-500 uppercase">Total_Fee</span>
                                 <div className="text-right">
                                     <span className="block text-sm line-through text-gray-600">₦{PRICING.price}</span>
                                     <span className="block text-4xl font-black text-white">₦{PRICING.discountPrice}</span>
                                 </div>
                             </div>
                             
                             <div className="my-8 space-y-3">
                                 {PRICING.features.slice(0, 4).map((feat, i) => (
                                     <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                         <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                         {feat}
                                     </div>
                                 ))}
                             </div>

                             <button 
                                onClick={() => onRegister(course.title)}
                                className="w-full bg-white text-black font-black uppercase py-4 hover:bg-dolas-red hover:text-white transition-all duration-300 text-lg tracking-wider border-2 border-white relative overflow-hidden group"
                             >
                                 <span className="relative z-10 flex items-center justify-center gap-2">
                                     Secure Seat <span className="group-hover:translate-x-1 transition-transform">→</span>
                                 </span>
                             </button>
                             <p className="text-center font-mono text-[10px] text-gray-600 mt-4 uppercase">
                                 Limited capacity • First come first served
                             </p>
                         </div>

                         {/* Tech Stack */}
                         <div className="p-8">
                             <h3 className="font-mono text-xs text-gray-500 uppercase mb-4">Tech_Stack_Access</h3>
                             <div className="flex flex-wrap gap-2">
                                 <span className="px-3 py-1 border border-gray-800 text-xs font-mono hover:bg-white hover:text-black transition-colors cursor-default">Blender</span>
                                 <span className="px-3 py-1 border border-gray-800 text-xs font-mono hover:bg-white hover:text-black transition-colors cursor-default">Adobe CC</span>
                                 <span className="px-3 py-1 border border-gray-800 text-xs font-mono hover:bg-white hover:text-black transition-colors cursor-default">Figma</span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
            
            {/* Footer Decoration */}
            <div className="border-t border-white/10 bg-black py-12">
                 <div className="max-w-7xl mx-auto px-4 flex justify-between items-end opacity-30 hover:opacity-100 transition-opacity">
                     <h2 className="text-9xl font-black text-transparent" style={{ WebkitTextStroke: '1px #333' }}>DOLAS</h2>
                     <h2 className="text-9xl font-black text-transparent" style={{ WebkitTextStroke: '1px #333' }}>MACCUS</h2>
                 </div>
            </div>
        </div>
    );
};