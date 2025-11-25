import React from 'react';

export interface Instructor {
  name: string;
  role: string;
  bio: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  color: string;
  prerequisites: string[];
  duration: string;
  instructor: Instructor;
}

export interface PricingTier {
  title: string;
  price: number;
  discountPrice: number;
  features: string[];
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
}