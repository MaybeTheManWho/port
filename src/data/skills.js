// File: src/data/skills.js
export const skills = [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", icon: "python.svg", level: 90 },
        { name: "Java", icon: "java.svg", level: 85 },
        { name: "JavaScript", icon: "javascript.svg", level: 95 },
        { name: "Bash", icon: "bash.svg", level: 80 },
        { name: "Lua", icon: "lua.svg", level: 75 },
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "HTML5", icon: "html5.svg", level: 95 },
        { name: "CSS3", icon: "css3.svg", level: 90 },
        { name: "React", icon: "react.svg", level: 95 },
        { name: "Next.js", icon: "nextjs.svg", level: 90 },
        { name: "TailwindCSS", icon: "tailwindcss.svg", level: 90 },
        { name: "Bootstrap", icon: "bootstrap.svg", level: 85 },
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: "nodejs.svg", level: 90 },
        { name: "PowerShell", icon: "powershell.svg", level: 80 },
        { name: "SQL", icon: "sql.svg", level: 85 },
        { name: "MongoDB", icon: "mongodb.svg", level: 85 },
        { name: "Pterodactyl", icon: "pterodactyl.svg", level: 80 },
      ]
    },
    {
      category: "Operating Systems",
      items: [
        { name: "Linux", icon: "linux.svg", level: 90 },
        { name: "Windows", icon: "windows.svg", level: 95 },
      ]
    },
    {
      category: "Cybersecurity",
      items: [
        { name: "Reverse Engineering", icon: "reverse-engineering.svg", level: 85 },
        { name: "Digital Forensics", icon: "digital-forensics.svg", level: 80 },
        { name: "Cybersecurity", icon: "cybersecurity.svg", level: 90 },
        { name: "Wireshark", icon: "wireshark.svg", level: 85 },
        { name: "Burp Suite", icon: "burp-suite.svg", level: 80 },
        { name: "Metasploit", icon: "metasploit.svg", level: 85 },
      ]
    },
  ];
  
  // File: src/components/skills/SkillCard.jsx
  'use client'
  
  import { motion } from 'framer-motion'
  import { useState } from 'react'
  
  export default function SkillCard({ name, icon, level }) {
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
            <img 
              src={`/icons/skills/${icon}`} 
              alt={name}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/icons/skills/placeholder.svg';
              }}
            />
          </div>
          
          <h3 className="text-lg font-semibold text-center">{name}</h3>
          
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
  
  // File: src/components/skills/SkillGrid.jsx
  'use client'
  
  import { motion } from 'framer-motion'
  import SkillCard from './SkillCard'
  import { staggerContainer, fadeIn } from '@/lib/animations'
  
  export default function SkillGrid({ category, skills }) {
    return (
      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mb-16"
      >
        <motion.h2
          variants={fadeIn("up", 0.2)}
          className="text-2xl font-bold mb-6 relative pl-4 border-l-4 border-accent"
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
                icon={skill.icon}
                level={skill.level}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )
  }
  
  // File: src/components/skills/SkillShield.jsx
  'use client'
  
  import { motion } from 'framer-motion'
  import { useState } from 'react'
  
  export default function SkillShield({ skills }) {
    const [hoveredSkill, setHoveredSkill] = useState(null)
  
    // Filter out duplicates and flatten the skill items
    const allSkills = []
    skills.forEach(category => {
      category.items.forEach(skill => {
        if (!allSkills.find(s => s.name === skill.name)) {
          allSkills.push(skill)
        }
      })
    })
  
    // Calculate positions for skills in a shield formation
    const calculatePositions = () => {
      const positions = []
      const totalSkills = allSkills.length
      const radius = Math.min(totalSkills * 3, 45) // Adjust radius based on number of skills
      const center = { x: 50, y: 50 }
      
      // Create shield shape
      allSkills.forEach((skill, i) => {
        // Calculate angular position - distribute evenly
        const angle = (i / totalSkills) * 2 * Math.PI
        
        // Adjust radius for different rings
        let ringRadius = radius
        if (i % 3 === 0) ringRadius *= 0.5
        if (i % 3 === 1) ringRadius *= 0.75
        
        // Calculate x, y position on the shield
        const x = center.x + ringRadius * Math.cos(angle)
        const y = center.y + ringRadius * Math.sin(angle)
        
        positions.push({ ...skill, x, y })
      })
      
      return positions
    }
    
    const positionedSkills = calculatePositions()
    
    return (
      <motion.div 
        className="relative w-full h-[600px] bg-dark-900/50 rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Shield Shape */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a5568" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1a202c" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L90 20 L90 60 C90 75 75 90 50 95 C25 90 10 75 10 60 L10 20 Z"
            fill="url(#shieldGradient)"
            stroke="#4299e1"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#4299e1"
            strokeWidth="0.2"
            strokeDasharray="1,1"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#4299e1"
            strokeWidth="0.2"
            strokeDasharray="1,1"
          />
        </svg>
        
        {/* Skills Dots */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {positionedSkills.map((skill, index) => (
            <g key={index}>
              <motion.circle
                cx={skill.x}
                cy={skill.y}
                r={hoveredSkill === skill.name ? 3 : 2}
                fill={hoveredSkill === skill.name ? "#3182ce" : "#4299e1"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  r: hoveredSkill === skill.name ? 3 : 2 
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05 
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{ cursor: 'pointer' }}
              />
              {hoveredSkill === skill.name && (
                <motion.text
                  x={skill.x}
                  y={skill.y - 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {skill.name}
                </motion.text>
              )}
            </g>
          ))}
        </svg>
        
        {/* Connection Lines */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <g>
            {positionedSkills.map((skill, i) => (
              <g key={i}>
                {positionedSkills.slice(i + 1, i + 4).map((connectedSkill, j) => (
                  <motion.line
                    key={j}
                    x1={skill.x}
                    y1={skill.y}
                    x2={connectedSkill.x}
                    y2={connectedSkill.y}
                    stroke="#4299e1"
                    strokeWidth="0.2"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 1, delay: (i + j) * 0.04 }}
                  />
                ))}
              </g>
            ))}
          </g>
        </svg>
        
        {/* Central Skill Count */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-4xl font-bold text-white"
          >
            {allSkills.length}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-lg text-gray-300"
          >
            Skills
          </motion.div>
        </div>
        
        {/* Hovered Skill Info */}
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-dark-800 p-4 rounded-lg shadow-lg w-64"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 mr-2 flex items-center justify-center">
                <img 
                  src={`/icons/skills/${allSkills.find(s => s.name === hoveredSkill)?.icon}`} 
                  alt={hoveredSkill}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/icons/skills/placeholder.svg';
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold">{hoveredSkill}</h3>
            </div>
            <div className="w-full bg-dark-900 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                style={{ width: `${allSkills.find(s => s.name === hoveredSkill)?.level}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-right text-gray-400">
              {allSkills.find(s => s.name === hoveredSkill)?.level}% proficiency
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  }
  
  // File: src/app/skills/page.js
  'use client'
  
  import { motion } from 'framer-motion'
  import { fadeIn, staggerContainer } from '@/lib/animations'
  import { skills } from '@/data/skills'
  import SkillGrid from '@/components/skills/SkillGrid'
  import SkillShield from '@/components/skills/SkillShield'
  import PageTransition from '@/components/layout/PageTransition'
  
  export default function SkillsPage() {
    return (
      <PageTransition>
        <div className="min-h-screen pt-20">
          <div className="page-container">
            {/* Page Title */}
            <motion.div
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              animate="visible"
              className="mb-12 text-center"
            >
              <motion.h1
                variants={fadeIn("up", 0.2)}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                My Skills & Expertise
              </motion.h1>
              <motion.div 
                variants={fadeIn("up", 0.3)} 
                className="w-24 h-1 bg-accent mx-auto"
              />
              <motion.p
                variants={fadeIn("up", 0.4)}
                className="mt-6 text-gray-400 max-w-2xl mx-auto"
              >
                I've cultivated a diverse set of skills throughout my journey as a developer
                and security specialist. Below is a comprehensive overview of my technical
                expertise.
              </motion.p>
            </motion.div>
  
            {/* Skills Shield Visualization */}
            <motion.div
              variants={fadeIn("up", 0.5)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-20"
            >
              <h2 className="text-2xl font-bold mb-8 text-center">Skills Shield</h2>
              <div className="max-w-4xl mx-auto">
                <SkillShield skills={skills} />
              </div>
              <p className="text-center text-gray-400 mt-4">
                Hover over the dots to see specific skills and proficiency levels
              </p>
            </motion.div>
  
            {/* Skills by Category */}
            <div>
              <motion.h2
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="text-2xl font-bold mb-12 text-center"
              >
                Skills by Category
              </motion.h2>
              
              {skills.map((category) => (
                <SkillGrid 
                  key={category.category}
                  category={category.category}
                  skills={category.items}
                />
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }