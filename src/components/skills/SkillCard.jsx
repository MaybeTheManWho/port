"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const SkillCard = ({ name, icon, level = "Intermediate", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <Image
            src={icon || `/icons/skills/${name.toLowerCase().replace(/\s+/g, '-')}.svg`}
            alt={name}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold mb-1 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{level}</p>
      </div>
    </motion.div>
  );
};

export default SkillCard;