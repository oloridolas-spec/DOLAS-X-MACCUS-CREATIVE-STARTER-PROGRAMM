import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CourseCard } from './components/CourseCard';
import { AIChat } from './components/AIChat';
import { COURSES, PRICING, WHATSAPP_NUMBER, BANK_INFO, CONTACT_NUMBERS, TOOLS } from './constants';
import { Course } from './types';

function App() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);

  // Form State
  const [registrationStep, setRegistrationStep] = useState<'form' | 'payment'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Interactive Mouse State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const initiateRegister = (courseName: string = "") => {
    setSelectedCourse(courseName);
    setRegistrationStep('form'); // Reset to form step
    setShowPaymentModal(true);
    setViewingCourse(null); // Close details modal if open
  };

  const handleLearnMore = (course: Course) => {
    setViewingCourse(course);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('phone', formData.phone);
    formPayload.append('course', selectedCourse || 'General Enrollment');
    formPayload.append('_subject', `New Registration: ${selectedCourse || 'General Enrollment'}`);

    try {
      await fetch("https://formspree.io/f/xldklvld", {
        method: "POST",
        body: formPayload,
        headers: {
          'Accept': 'application/json'
        }
      });
      // Proceed to payment step regardless of success to allow user to continue flow
      setRegistrationStep('payment');
    } catch (error) {
      console.error("Form submission error:", error);
      setRegistrationStep('payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xldklvld", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setContactStatus('success');
        form.reset();
        setTimeout(() => setContactStatus('idle'), 5000);
      } else {
        setContactStatus('error');
      }
    } catch (error) {
      setContactStatus('error');
    }
  };

  const confirmPaymentAndWhatsApp = () => {
    const message = `*REGISTRATION CONFIRMATION*\n\nName: ${formData.name}\nCourse: ${selectedCourse || 'General Enrollment'}\n\nI have sent my details via the website and viewed the payment info (Palmpay: ${BANK_INFO.accountNumber}).\nI am sending proof of payment now.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setShowPaymentModal(false);
    setFormData({ name: '', email: '', phone: '' }); // Reset form
  };

  // Countdown Timer Logic
  const calculateTimeLeft = () => {
    // Hardcoded target date for demo purposes (e.g., 7 days from now)
    // In a real app, this would be dynamic or fetched from a config
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); 
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="bg-dark-bg min-h-screen font-sans selection:bg-maccus-blue selection:text-white text-gray-200 overflow-hidden">
      <Navbar />

      {/* Hero Section with Parallax */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#121212] flex items-center justify-center min-h-[90vh]">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
                className="absolute top-0 left-1/4 w-96 h-96 bg-dolas-red/10 rounded-full blur-[100px] mix-blend-screen animate-blob"
                style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}
            ></div>
            <div 
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-maccus-blue/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"
                style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
            ></div>
             <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000"
            ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-700 bg-gray-900/80 backdrop-blur-md mb-8 shadow-lg hover:border-gray-500 transition-colors cursor-default">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-gray-300 tracking-wider uppercase">
                New Batch Starts In: <span className="text-white ml-2 font-mono">{timeLeft.days || 0}d {timeLeft.hours || 0}h {timeLeft.minutes || 0}m</span>
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8 drop-shadow-2xl">
            <span 
                className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 transform transition-transform duration-75"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
            >
                1-Week Intensive
            </span>
            <span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-maccus-blue via-purple-500 to-maccus-green"
            >
                Creative Bootcamp
            </span>
          </h1>
          
          <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-light">
            Fast-track your career with Dolas Communication & Maccus Technology. 
            Master <span className="text-white font-medium">3D Animation, Graphics, or Motion Design</span> in just one immersive week.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <button 
                onClick={() => initiateRegister()} 
                className="px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-200 transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] shadow-xl flex items-center justify-center gap-2"
            >
              Start Learning
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
            <a href="#courses" className="px-8 py-4 bg-transparent text-white border border-gray-600 rounded-lg font-bold text-lg hover:border-white hover:bg-white/5 transition flex items-center justify-center">
              View Curriculum
            </a>
          </div>
        </div>
      </header>

      {/* Infinite Scroll Tools Marquee */}
      <div className="bg-dark-surface border-y border-gray-800 py-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-surface via-transparent to-dark-surface z-10 pointer-events-none"></div>
        <div className="flex gap-16 animate-scroll whitespace-nowrap w-max">
            {[...TOOLS, ...TOOLS].map((tool, idx) => (
                <div key={idx} className={`text-2xl font-bold flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity ${tool.color}`}>
                    <span>{tool.name}</span>
                </div>
            ))}
        </div>
      </div>

      {/* About Partnership */}
      <section id="about" className="py-24 border-b border-dark-border bg-dark-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                     <h2 className="text-3xl font-bold text-white mb-4">
                        A Powerhouse Partnership
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        We have combined the creative storytelling expertise of Dolas Communication with the technical precision of Maccus Technology to bring you a learning experience that covers both the art and science of digital creation.
                    </p>
                    
                    <div className="grid gap-6">
                         <div className="bg-dark-card p-6 rounded-xl border border-dark-border hover:border-dolas-red transition-all duration-300 hover:transform hover:translate-x-2">
                            <h3 className="text-xl font-bold text-dolas-red mb-2">Dolas Communication</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Dolas Communication is a certified multimedia and creative tech brand dedicated to transforming imagination into world-class digital experiences.
                                We combine creativity, technology, and storytelling to deliver highly professional services across media, entertainment, branding, and digital development.
                            </p>
                        </div>

                         <div className="bg-dark-card p-6 rounded-xl border border-dark-border hover:border-maccus-blue transition-all duration-300 hover:transform hover:translate-x-2">
                            <h3 className="text-xl font-bold text-maccus-blue mb-2">Maccus Technology</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                MACCUS TECHNOLOGY is a creative tech brand offering modern solutions in graphics design, motion design, data management, and general tech services. 
                                We help individuals and businesses turn ideas into quality visuals, organized data, and digital success.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="relative h-full min-h-[400px] bg-gradient-to-br from-gray-800 to-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-8 border border-gray-700">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                     <div className="text-center space-y-6 relative z-10">
                         <div className="inline-block p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4 animate-pulse">
                             <svg className="w-12 h-12 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                         </div>
                         <h3 className="text-2xl font-bold text-white">Hybrid Learning Model</h3>
                         <ul className="text-gray-400 space-y-3 text-left max-w-xs mx-auto">
                             <li className="flex items-center gap-3">
                                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                                 <span>Live Zoom Masterclasses</span>
                             </li>
                             <li className="flex items-center gap-3">
                                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                                 <span>WhatsApp Mentorship</span>
                             </li>
                             <li className="flex items-center gap-3">
                                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                                 <span>Practical Project Work</span>
                             </li>
                         </ul>
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 relative bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-maccus-blue font-bold tracking-wider uppercase text-sm mb-2 block">Our Curriculum</span>
            <h2 className="text-4xl font-bold text-white">Explore Our Courses</h2>
            <div className="h-1 w-20 bg-gray-700 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {COURSES.map(course => (
              <CourseCard key={course.id} course={course} onRegister={initiateRegister} onLearnMore={handleLearnMore} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Offer */}
      <section id="pricing" className="py-24 bg-[#0a0a0a] relative border-t border-dark-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-0 border border-gray-800 rounded-2xl overflow-hidden bg-dark-card shadow-2xl transition-transform duration-300 hover:shadow-maccus-blue/10 hover:border-gray-600">
                {/* Left Side: Receipt Style */}
                <div className="p-10 bg-[#f5f5f5] text-gray-900 relative">
                     <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-red-500"></div>
                     <h3 className="text-2xl font-bold mb-6">Tuition Breakdown</h3>
                     
                     <div className="space-y-4 text-sm font-medium">
                        <div className="flex justify-between border-b border-gray-300 pb-2">
                            <span className="text-gray-600">Standard Course Fee</span>
                            <span className="line-through text-gray-400">₦{PRICING.price}</span>
                        </div>
                        <div className="flex justify-between text-green-700">
                            <span>Early Bird Discount (First 10)</span>
                            <span>-₦1,000</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-400 pt-4 text-xl font-bold">
                            <span>Total Payable</span>
                            <span>₦{PRICING.discountPrice}</span>
                        </div>
                     </div>

                     <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Accepted Payment Method</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">P</div>
                            <div>
                                <span className="font-bold block text-gray-800">Palmpay</span>
                                <span className="text-xs text-gray-500">Instant Verification</span>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Right Side: Features */}
                <div className="p-10 bg-dark-surface flex flex-col justify-center relative overflow-hidden">
                     {/* Decorative background element */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>

                    <h3 className="text-white font-bold text-2xl mb-6">What's Included?</h3>
                    <ul className="space-y-4 mb-8 relative z-10">
                        {PRICING.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-3 text-gray-300">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="text-sm">{feature}</span>
                            </div>
                        ))}
                    </ul>
                    <button 
                        onClick={() => initiateRegister()}
                        className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition shadow-lg text-center relative z-10 hover:scale-[1.02] active:scale-[0.98] duration-200"
                    >
                        Secure Your Spot Now
                    </button>
                    <p className="text-center text-gray-500 text-xs mt-4">Safe and secure registration process via WhatsApp.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-dark-surface border-t border-dark-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-gray-400">Have questions about the program? Send us a message directly.</p>
          </div>
          
          <div className="bg-dark-card p-8 rounded-2xl border border-gray-700 shadow-xl">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <input type="hidden" name="_subject" value="New Website Inquiry" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input type="text" name="name" required className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all focus:border-blue-500" placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input type="email" name="email" required className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all focus:border-blue-500" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea name="message" required rows={4} className="w-full bg-dark-bg border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all focus:border-blue-500" placeholder="How can we help you?"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={contactStatus === 'submitting'}
                className="w-full bg-gradient-to-r from-maccus-blue to-maccus-green text-white font-bold py-4 rounded-lg hover:opacity-90 transition disabled:opacity-50 shadow-lg hover:shadow-blue-500/20"
              >
                {contactStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {contactStatus === 'success' && (
                <p className="text-green-500 text-center text-sm font-medium mt-2">Message sent successfully! We'll get back to you soon.</p>
              )}
              {contactStatus === 'error' && (
                <p className="text-red-500 text-center text-sm font-medium mt-2">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark-bg pt-16 pb-8 border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
               <h3 className="font-bold text-xl mb-4 text-white">Dolas <span className="text-gray-500">x</span> Maccus</h3>
               <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                 Empowering the next generation of creative professionals with the tools and skills needed to succeed in the digital economy.
               </p>
            </div>
            <div>
                <h3 className="font-bold text-lg mb-4 text-white">Contact Us</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                    {CONTACT_NUMBERS.map((num, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            {num}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                 <h3 className="font-bold text-lg mb-4 text-white">Legal</h3>
                 <ul className="space-y-2 text-gray-500 text-sm">
                     <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                     <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                 </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-600 text-xs">
            © 2024 Dolas Communication & Maccus Technology. All rights reserved.
          </div>
        </div>
      </footer>

      <AIChat />

      {/* Course Details Modal */}
      {viewingCourse && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-dark-surface w-full max-w-2xl rounded-2xl border border-gray-700 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="relative h-32 bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${viewingCourse.color.replace('bg-', 'from-')} to-transparent opacity-20`}></div>
                    <button 
                        onClick={() => setViewingCourse(null)}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="absolute bottom-6 left-8 flex items-center gap-4">
                        <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black shadow-lg`}>
                            {viewingCourse.icon}
                        </div>
                        <h2 className="text-3xl font-bold text-white">{viewingCourse.title}</h2>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Course Overview</h3>
                        <p className="text-gray-400 leading-relaxed">{viewingCourse.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Prerequisites</h3>
                             <ul className="space-y-2">
                                {viewingCourse.prerequisites.map((req, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                                        <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {req}
                                    </li>
                                ))}
                             </ul>
                        </div>
                        <div>
                             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Course Details</h3>
                             <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-dark-card rounded-lg border border-gray-700">
                                    <span className="text-gray-400 text-sm">Duration</span>
                                    <span className="text-white font-medium">{viewingCourse.duration}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-dark-card rounded-lg border border-gray-700">
                                    <span className="text-gray-400 text-sm">Format</span>
                                    <span className="text-white font-medium">Online (Zoom)</span>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="bg-dark-card p-6 rounded-xl border border-gray-700">
                        <h3 className="text-lg font-bold text-white mb-4">Meet Your Instructor</h3>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xl font-bold text-white">
                                {viewingCourse.instructor.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="text-white font-bold">{viewingCourse.instructor.name}</h4>
                                <p className="text-blue-400 text-sm mb-2">{viewingCourse.instructor.role}</p>
                                <p className="text-gray-400 text-sm">{viewingCourse.instructor.bio}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                        <button 
                            onClick={() => initiateRegister(viewingCourse.title)}
                            className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition shadow-lg"
                        >
                            Enroll in {viewingCourse.title}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Payment / Registration Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-dark-surface w-full max-w-md rounded-2xl border border-gray-700 shadow-2xl animate-fade-in-up">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        {registrationStep === 'form' ? 'Student Registration' : 'Complete Payment'}
                    </h3>
                    <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {registrationStep === 'form' ? (
                         <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                             <p className="text-gray-400 text-sm mb-4">Please fill in your details to reserve your spot.</p>
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                                 <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-3 text-white focus:border-blue-500 outline-none transition-colors" 
                                    placeholder="Enter your full name"
                                 />
                             </div>
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                                 <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-3 text-white focus:border-blue-500 outline-none transition-colors" 
                                    placeholder="Enter your email"
                                 />
                             </div>
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number (WhatsApp)</label>
                                 <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleInputChange} 
                                    required 
                                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-3 text-white focus:border-blue-500 outline-none transition-colors" 
                                    placeholder="080..."
                                 />
                             </div>
                             <div className="pt-2">
                                 <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
                                 >
                                     {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                                 </button>
                             </div>
                         </form>
                    ) : (
                        <div className="space-y-6 animate-fade-in">
                            <p className="text-gray-300 text-sm">
                                To finalize your enrollment for <span className="text-white font-bold">{selectedCourse || "the program"}</span>, please transfer the discounted fee to the account below.
                            </p>

                            <div className="space-y-4">
                                <div className="bg-dark-card p-4 rounded-xl border border-gray-600 relative group transition-all hover:border-gray-500">
                                    <p className="text-gray-500 text-xs uppercase mb-1">Account Number (Palmpay)</p>
                                    <p className="text-white text-3xl font-bold tracking-wider">{BANK_INFO.accountNumber}</p>
                                    <div className="absolute right-4 top-4 text-xs text-blue-400 font-medium">COPY</div>
                                </div>
                                
                                <div className="flex justify-between bg-dark-bg p-3 rounded-lg border border-gray-700">
                                    <span className="text-gray-400 text-sm">Account Name</span>
                                    <span className="text-white font-medium">{BANK_INFO.accountName}</span>
                                </div>

                                <div className="flex justify-between items-center text-sm px-2 pt-2">
                                    <span className="text-gray-400">Total Amount:</span>
                                    <span className="text-white font-bold text-xl">₦{PRICING.discountPrice}</span>
                                </div>
                            </div>

                            <button 
                                onClick={confirmPaymentAndWhatsApp}
                                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition shadow-lg hover:scale-[1.02]"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                I've Made the Transfer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;