'use client';

import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import SkillGrid from '@/components/skills/SkillGrid';
import { skills } from '@/data/skills-with-svg';

export default function SkillsPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1, 0.1)}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div
            variants={fadeIn("down", 0.2)}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-6 text-white">Skills & Expertise</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              I've cultivated a diverse skill set throughout my career. Here's a comprehensive overview of my technical proficiencies.
            </p>
          </motion.div>

          {skills.map((categoryData) => (
            <SkillGrid
              key={categoryData.category}
              category={categoryData.category}
              skills={categoryData.items}
            />
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}