'use client';

import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, floatAnimation } from '@/lib/animations';
import { useState } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  // Server experience data (44 placeholder items to be filled in)
// Copy this entire array into your About page component
const serverExperiences = [
  {
    id: 1,
    name: "Viggle AI",
    position: "Moderator",
    members: "5,000,000+",
    icon: "https://cdn.discordapp.com/icons/1233209848364138578/53f8e830a165b23c8e46a504600c355e.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 2,
    name: "Feather Client",
    position: "Senior Moderator & Mentor",
    members: "280,000+",
    icon: "https://cdn.discordapp.com/icons/829462182306906132/a_6fdab4fac616c53f0a81407046943334.gif?size=512",
    description: ""
  },
  {
    id: 3,
    name: "TMFRZ",
    position: "Screensharer",
    members: "100,000+",
    icon: "https://cdn.discordapp.com/icons/1081366864531304579/a_4d0acb5da1844a023f92a7209e9b3b7c.gif?size=512",
    description: ""
  },
  {
    id: 4,
    name: "Trappin NYC",
    position: "Screenshare Manager",
    members: "70,000+",
    icon: "https://cdn.discordapp.com/icons/898474249906421771/f7358c8c6b13f1b56071786be80a63ce.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 5,
    name: "Life In Chiraq",
    position: "Screensharer",
    members: "50,000+",
    icon: "https://cdn.discordapp.com/icons/964644370177466368/a_285cfd9445ca7360526db41e67596b3b.gif?size=512",
    description: ""
  },
  {
    id: 6,
    name: "Hoplite",
    position: "Staff",
    members: "45,000+",
    icon: "https://cdn.discordapp.com/icons/1134583981275349073/ffe1eeb71ccde89645057878bb227c99.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 7,
    name: "[1.9+] Sword PvP Community",
    position: "Manager & Screenshare Manager",
    members: "40,000+",
    icon: "https://cdn.discordapp.com/icons/513709294844117013/698484b689633c6ecf3cbe06735e91d6.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 8,
    name: "[1.9+] Netherite Pot PvP Community",
    position: "Network Moderator & Screenshare Manager",
    members: "40,000+",
    icon: "https://cdn.discordapp.com/icons/875309328607899658/87d8341c2d7289982a89a7fe00ce05a5.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 9,
    name: "Minemen Club",
    position: "Staff",
    members: "40,000+",
    icon: "https://cdn.discordapp.com/icons/433420603375222784/5d5be15385c400e1e60579fc003abaa8.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 10,
    name: "Ranked Bedwars",
    position: "Screenshare Manager & Staff",
    members: "40,000+",
    icon: "https://cdn.discordapp.com/icons/1014230302622744677/0fff1f6964e1e5e52e3811ba29648fcd.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 11,
    name: "Trap RP",
    position: "Screenshare Manager",
    members: "40,000+",
    icon: "https://cdn.discordapp.com/icons/929633320554356787/afbb82f684624e79d64359c78a0c1cb1.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 12,
    name: "[1.19.4+] SMP PvP Community",
    position: "Network Moderator & Screenshare Manager",
    members: "25,000+",
    icon: "https://cdn.discordapp.com/icons/981948043903533176/11626e97b9a5b25abac97b6a60aed492.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 13,
    name: "ParaRP",
    position: "Screenshare Manager",
    members: "25,000+",
    icon: "https://cdn.discordapp.com/icons/1003921118937235476/c9555d98a591d553958603220bb3b98d.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 14,
    name: "The Hood",
    position: "Screensharer",
    members: "20,000+",
    icon: "https://cdn.discordapp.com/icons/1032879954779717652/5efd3152c2c29844c27cfd6e1e736abe.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 15,
    name: "[1.9+] Pot PvP Community",
    position: "Moderator & Screenshare Manager",
    members: "20,000+",
    icon: "https://cdn.discordapp.com/icons/1007038689412665404/75b18eb02c5dbc673406c59a8429794d.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 16,
    name: "[1.9+] Axe & Shield Community",
    position: "Network Moderator & Screenshare Manager",
    members: "20,000+",
    icon: "https://cdn.discordapp.com/icons/896903597709754398/c38620313310a65e508993345e4577ba.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 17,
    name: "[1.9+] UHC Community",
    position: "Moderator & Screenshare Manager",
    members: "20,000+",
    icon: "https://cdn.discordapp.com/icons/860880412975824898/7cb5abcd49340d73cb08405710f5ebfc.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 18,
    name: "Vanilla Plus",
    position: "Staff & Screensharer",
    members: "20,000+",
    icon: "https://cdn.discordapp.com/icons/884726174167744512/6a6216394ab3bb4159287a30907d904b.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 19,
    name: "Ocean",
    position: "Staff",
    members: "20,000+",
    icon: "https://cdn.discordapp.com/icons/1100146527902642236/21820b3515828a28021ec7d221c7102a.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 20,
    name: "Stray",
    position: "Senior Moderator & Screenshare Manager",
    members: "18,000+",
    icon: "https://cdn.discordapp.com/icons/874911656721907763/673636cb8e9b02d877bd8e53aa549ad3.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 21,
    name: "PvPGym",
    position: "Staff",
    members: "10,000+",
    icon: "https://cdn.discordapp.com/icons/588714576590274560/32b02199591eb4f08a90cc4deec7fd58.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 22,
    name: "Sharpness Network",
    position: "Staff",
    members: "10,000+",
    icon: "https://cdn.discordapp.com/icons/1065416915775934484/7aa6909677d2aad3eef13f3f8d701438.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 23,
    name: "EchoAC",
    position: "Staff",
    members: "10,000+",
    icon: "https://cdn.discordapp.com/icons/746777328553689208/a_2334d4f212566d16c069d00620d7e4cc.gif?size=512",
    description: ""
  },
  {
    id: 24,
    name: "RivalMC",
    position: "CEO & Lead Developer",
    members: "10,000+",
    icon: "https://cdn.discordapp.com/icons/974768066833563659/a0aa55a97858cab389f5dd7ddb5e1102.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 25,
    name: "PvP Training Hub",
    position: "Manager",
    members: "10,000+",
    icon: "https://cdn.discordapp.com/icons/1050506256848257064/31b8d20095a8d2c7667dfa0a299805b9.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 26,
    name: "Solitary TL",
    position: "Manager & Screenshare Manager",
    members: "7,000+",
    icon: "	https://cdn.discordapp.com/icons/1282314162030121033/2f4e39b04efa31c0e3edb271d3dcb330.webp?size=96",
    description: ""
  },
  {
    id: 27,
    name: "Redline Community",
    position: "Moderator",
    members: "3,000+",
    icon: "https://cdn.discordapp.com/icons/419857659987230741/a_08c7878ef08af6a720a36fee399d0843.gif?size=512",
    description: ""
  },
  {
    id: 28,
    name: "Redlotus",
    position: "Chairman",
    members: "3,000+",
    icon: "https://cdn.discordapp.com/icons/1081164568669200384/c88f5bfe381a91ea49301b26ad3a0963.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 29,
    name: "Heplex",
    position: "Administrator & Developer",
    members: "3,000+",
    icon: "https://media.discordapp.net/attachments/1068976784776900759/1346876232649936989/2cc1f758-cc27-4ada-b564-acadd6317b98.png?ex=67c9c7bd&is=67c8763d&hm=4c4f0be650c6839de988c458dcb3fed75c57f30f32838d634b8f633ec3dc5200&=&format=webp&quality=lossless",
    description: ""
  },
  {
    id: 30,
    name: "Boxsteal",
    position: "Staff",
    members: "3,000+",
    icon: "https://media.discordapp.net/attachments/1068976784776900759/1346877965362790450/images.png?ex=67c9c95a&is=67c877da&hm=fef7f9a377204040c331ec3fe4fc5e4d813b36c019b6ff11c45f0bba86ae14b8&=&format=webp&quality=lossless",
    description: ""
  },
  {
    id: 31,
    name: "Elytra",
    position: "Staff",
    members: "3,000+",
    icon: "https://cdn.discordapp.com/icons/1179301847962484798/c9ae2c379803693d04baf84282db78c2.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 32,
    name: "Valed",
    position: "Screensharer & Staff",
    members: "2,000+",
    icon: "https://cdn.discordapp.com/icons/1051571291406217216/654b89c14318e71193d724f310120838.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 33,
    name: "TrekMC",
    position: "Screensharer",
    members: "2,000+",
    icon: "https://cdn.discordapp.com/icons/1142339147344920656/a0748d64511f18b0e2e87785110e4f1a.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 34,
    name: "Vexaay",
    position: "Senior Moderator & Screenshare Manager",
    members: "2,000+",
    icon: "https://cdn.discordapp.com/icons/1127603489913180192/fd327a2b3e09e2034db320b4a61aa2eb.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 35,
    name: "Blue Legion",
    position: "Manager & Lead Developer",
    members: "2,000+",
    icon: "https://cdn.discordapp.com/icons/1218684829869015041/1b587472e18484a15385f9fdc24714ff.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 36,
    name: "Totem",
    position: "Staff",
    members: "2,000+",
    icon: "https://cdn.discordapp.com/icons/1233949990431494144/ffe1f72a8cad9002e86cfe537af997cf.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 37,
    name: "MetalMC",
    position: "Senior Moderator & Screenshare Manager",
    members: "1,500+",
    icon: "https://cdn.discordapp.com/icons/1225887767305912380/46f798d4440a6ce95db75d74e1fc3c89.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 38,
    name: "Skyduen",
    position: "Moderator",
    members: "1,500+",
    icon: "https://cdn.discordapp.com/icons/952535777454227456/e06f2766ad227219d64f5e96be536980.webp?size=512&format=webp",
    description: ""
  },
  {
    id: 39,
    name: "FlakePvP",
    position: "Moderator & Screensharer",
    members: "1,500+",
    icon: "https://cdn.discordapp.com/icons/1082662703283323080/6c925289f1f3c6984277158fba1c9a70.webp?size=512&format=webp",
    description: ""
  }
];

  const [hoveredServer, setHoveredServer] = useState(null);

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
            <h1 className="text-4xl font-bold mb-6 text-white">About Me</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              I'm a passionate cybersecurity engineer with expertise in system administration and software development.
              My journey in technology has equipped me with a diverse skill set and a problem-solving mindset.
            </p>
          </motion.div>
          
          {/* Bio Section */}
          <motion.div 
            variants={staggerContainer(0.1, 0.2)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
          >
            <motion.div
              variants={fadeIn("right", 0.3)}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl font-bold mb-6 text-white">My Journey</h2>
              <p className="text-gray-300 mb-4">
                I began my journey in technology at a young age, fascinated by how systems work and how to secure them.
                This curiosity led me to explore cybersecurity, where I discovered my passion for protecting digital environments
                and creating secure software solutions.
              </p>
              <p className="text-gray-300 mb-4">
                Over the years, I've had the opportunity to work on diverse projects across different platforms,
                from securing networks to developing custom security tools. My experience spans system administration,
                software development, and cybersecurity, with a particular interest in building resilient systems.
              </p>
              <p className="text-gray-300">
                When I'm not coding or configuring systems, you can find me exploring new security techniques,
                contributing to online communities, or sharing my knowledge through mentoring.
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeIn("left", 0.3)}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-700 shadow-xl">
                {/* Profile image */}
                <Image 
                  src="/images/profile1.png" 
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
                {/* Simple overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Beyond Coding Section - Moved up as requested */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            className="bg-gray-800 rounded-lg p-8 shadow-xl mb-24"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Beyond Tech</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Hobbies & Interests</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-400">●</span>
                    Open-source contribution
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-400">●</span>
                    Server management
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-400">●</span>
                    Community building
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-blue-400">●</span>
                    Reading technical books
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">Values & Goals</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2 text-purple-400">●</span>
                    Continuous learning and improvement
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-purple-400">●</span>
                    Building secure and resilient systems
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-purple-400">●</span>
                    Mentoring and supporting new engineers
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-purple-400">●</span>
                    Contributing to a more secure digital world
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Server Experience Section */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            className="mb-24"
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-white">Server Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serverExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  onMouseEnter={() => setHoveredServer(exp.id)}
                  onMouseLeave={() => setHoveredServer(null)}
                  whileHover={{ 
                    scale: 1.03, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div className="p-6 flex items-center">
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center ${
                        hoveredServer === exp.id 
                          ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 p-0.5'
                          : 'bg-gray-700 border-2 border-gray-600'
                      }`}>
                        <img 
                          src={exp.icon} 
                          alt={exp.name} 
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/80?text=Server";
                          }}
                        />
                        
                        {/* Immediate glow effect when hovering */}
                        {hoveredServer === exp.id && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full"></div>
                        )}
                      </div>
                      
                      {/* Immediate glow effect when hovering */}
                      {hoveredServer === exp.id && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full opacity-70 blur-md -z-10"></div>
                      )}
                    </div>
                    
                    <div className="ml-6 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`text-xl font-semibold transition-colors duration-200 ${hoveredServer === exp.id ? 'text-blue-400' : 'text-white'}`}>{exp.name}</h3>
                        <span className="text-gray-400 text-sm">{exp.members} members</span>
                      </div>
                      <p className={`text-sm mt-1 transition-colors duration-200 ${hoveredServer === exp.id ? 'text-purple-400' : 'text-blue-400'}`}>{exp.position}</p>
                      {exp.description && (
                        <p className="text-gray-300 text-sm mt-3">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}