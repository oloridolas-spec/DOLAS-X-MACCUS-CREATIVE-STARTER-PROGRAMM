import React from 'react';
import { Course, PricingTier, BankDetails } from './types';

export const COURSES: Course[] = [
  {
    id: '3d-anim',
    title: '3D Animation',
    description: 'Learn industry-standard modeling, texturing, and rendering pipelines for games and cinematic production using Blender and Maya.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
    color: 'bg-dolas-red',
    duration: 'Dec 15 - 23',
    prerequisites: [
      'Laptop with Dedicated GPU (Recommended)',
      'Basic Computer Literacy',
      'Passion for storytelling'
    ],
    instructor: {
      name: 'Emmanuel Maccus',
      role: 'Lead 3D Artist',
      bio: 'Over 10 years of experience in character modeling and environmental design for animation studios.'
    }
  },
  {
    id: 'gfx-design',
    title: 'Graphics Design',
    description: 'Master typography, layout composition, and brand identity design. Learn to communicate visually using Photoshop and Illustrator.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?q=80&w=2070&auto=format&fit=crop',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: 'bg-maccus-blue',
    duration: 'Dec 15 - 23',
    prerequisites: [
      'No prior design experience required',
      'Laptop with 8GB RAM minimum'
    ],
    instructor: {
      name: 'Sarah Dolas',
      role: 'Creative Director',
      bio: 'Award-winning graphic designer specializing in brand identity and marketing collaterals.'
    }
  },
  {
    id: 'motion-gfx',
    title: 'Motion Graphics',
    description: 'Create high-impact kinetic typography, logo animations, and UI interactions using After Effects and Premiere Pro.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-maccus-green',
    duration: 'Dec 15 - 23',
    prerequisites: [
      'Basic Graphics Design knowledge',
      'Laptop capable of video rendering'
    ],
    instructor: {
      name: 'David Oke',
      role: 'Motion Lead',
      bio: 'Expert in visual effects and motion design with a portfolio including TV commercials and digital ads.'
    }
  }
];

export const PRICING: PricingTier = {
  title: 'Creative Starter Access',
  price: 2500,
  discountPrice: 1500,
  features: [
    'Live Zoom Studio Sessions',
    'Dedicated WhatsApp Support Group',
    'Project-Based Portfolio Building',
    'Industry-Standard Certification',
    'Direct Technical Mentorship'
  ]
};

// 09037096589 formatted for WhatsApp API (remove leading 0, add 234)
export const WHATSAPP_NUMBER = "2349037096589"; 

export const CONTACT_NUMBERS = [
    "09037096589",
    "07044602585"
];

export const BANK_INFO: BankDetails = {
    bankName: "Palmpay",
    accountNumber: "9037096589",
    accountName: "Dolas x Maccus"
};

export const TOOLS = [
    { name: "Blender", color: "text-orange-500" },
    { name: "Photoshop", color: "text-blue-500" },
    { name: "Illustrator", color: "text-orange-600" },
    { name: "After Effects", color: "text-purple-600" },
    { name: "Premiere Pro", color: "text-purple-800" },
    { name: "Maya", color: "text-teal-500" },
    { name: "Figma", color: "text-pink-500" },
    { name: "Cinema 4D", color: "text-blue-700" }
];