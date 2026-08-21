import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { Visualizer } from '@/components/visualizer/Visualizer';
import { AlgorithmsSection } from '@/components/landing/AlgorithmsSection';
import { CompareSection } from '@/components/landing/CompareSection';
import { AboutSection } from '@/components/landing/AboutSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <Visualizer />
      <AlgorithmsSection />
      <CompareSection />
      <AboutSection />
    </div>
  );
}
