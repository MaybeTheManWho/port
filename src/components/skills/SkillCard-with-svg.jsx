'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SkillCard({ name, svg, level }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="skill-card bg-dark-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-5 flex flex-col items-center">
        <div className="w-16 h-16 relative mb-4 flex items-center justify-center">
          {/* Use the embedded SVG */}
          <div className="w-12 h-12" dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
        
        <h3 className="text-lg font-semibold text-center text-white">{name}</h3>
        
        <div className="w-full mt-4 bg-dark-900 rounded-full h-2.5">
          <motion.div 
            className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ width: `${level}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
        <span className="text-sm text-gray-400 mt-2">
          {isHovered ? `${level}%` : "Proficiency"}
        </span>
      </div>
    </motion.div>
  )
}