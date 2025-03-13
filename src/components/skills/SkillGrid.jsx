'use client'

import { motion } from 'framer-motion'
import SkillCard from './SkillCard-with-svg'
import { staggerContainer, fadeIn } from '@/lib/animations'

export default function SkillGrid({ category, skills }) {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="mb-16"
    >
      <motion.h2
        variants={fadeIn("up", 0.2)}
        className="text-2xl font-bold mb-6 relative pl-4 border-l-4 border-accent text-white"
      >
        {category}
      </motion.h2>
      
      <motion.div
        variants={staggerContainer(0.05, 0.1)}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            variants={fadeIn("up", 0.2 + index * 0.05)}
          >
            <SkillCard
              name={skill.name}
              svg={skill.svg}
              level={skill.level}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}