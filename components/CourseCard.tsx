import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onRegister: (courseName: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onRegister }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEnroll = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    // Play subtle animation for 600ms before triggering the modal
    setTimeout(() => {
        onRegister(course.title);
        setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="group relative bg-dark-card rounded-2xl border border-dark-border overflow-hidden flex flex-col h-full shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-gray-500/50">
      
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent z-10 opacity-90"></div>
        <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">{course.duration}</span>
        </div>
      </div>

      <div className="relative p-8 flex-1 flex flex-col -mt-12 z-20">
        <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 ${course.color.replace('bg-', 'text-')} bg-dark-surface border border-dark-border rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300`}>
               <div className="text-current transform group-hover:scale-110 transition-transform duration-300">
                {course.icon}
               </div>
            </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">{course.title}</h3>
        <p className="text-gray-400 mb-8 flex-1 leading-relaxed text-sm font-light">{course.description}</p>
        
        <div className="mt-auto grid grid-cols-2 gap-3">
            <Link 
                to={`/courses/${course.id}`}
                className="flex items-center justify-center py-3 px-4 bg-transparent border border-gray-600 text-white font-medium rounded-lg hover:bg-white hover:text-black hover:border-white transition duration-200 uppercase text-xs tracking-widest text-center"
            >
                Details
            </Link>
            <button 
                onClick={handleEnroll}
                disabled={isAnimating}
                className={`py-3 px-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-sm
                ${isAnimating 
                    ? 'bg-green-600 text-white scale-95' 
                    : 'bg-white text-black hover:scale-105 hover:shadow-blue-500/20 active:scale-95 group/btn'
                }`}
            >
                {isAnimating ? (
                    <>
                        <span>Opening...</span>
                         <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                    </>
                ) : (
                    <>
                        Enroll
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};
