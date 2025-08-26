import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Download, Search, ChevronDown, ExternalLink, X } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const skills = [
  { skill: "React", level: 90 },
  { skill: "TypeScript", level: 80 },
  { skill: "Python", level: 75 },
  { skill: "Vision Systems", level: 85 },
  { skill: "Process Optimization", level: 95 },
];

const experiences = [
  {
    role: "Senior Technical Solutions Engineer",
    company: "Medtronic",
    period: "2022 – Present",
    details: [
      "Leading Innovation 4 Manufacturing program across 13 sites.",
      "Deployed AI-based vision systems reducing cycle time by 17%.",
      "Scaling packaging redesign and scrap reduction initiatives.",
    ],
  },
  {
    role: "Manufacturing Engineer",
    company: "Previous Role",
    period: "2018 – 2022",
    details: [
      "Implemented automated inspection systems.",
      "Optimized cycle times and improved OEE by 12%.",
    ],
  },
];

const projects = [
  {
    title: "Little Market Platform",
    description: "A local-commerce web and mobile app built with React, Firebase, and Mapbox.",
    details: "Built a marketplace platform connecting local shops to consumers. Features include location-based search, product uploads, and payment integrations.",
    link: "https://littlemarket.app",
    image: "https://via.placeholder.com/400x250.png?text=Little+Market",
    stack: ["React", "Firebase", "Mapbox"]
  },
  {
    title: "Vision AI System",
    description: "AI-enabled inspection system for pacemaker assembly, reducing cycle time by 17%.",
    details: "Developed a deep learning solution using Cognex ViDi and integrated with PLCs. Enabled automated quality checks and reduced risk of scrap.",
    link: "#",
    image: "https://via.placeholder.com/400x250.png?text=Vision+System",
    stack: ["Cognex ViDi", "Python", "PLC"]
  },
  {
    title: "Smart Home Automation",
    description: "Custom Raspberry Pi and Zigbee2MQTT setup for smart lighting and sensors.",
    details: "Built a home automation hub with Node.js backend, integrated Zigbee devices, and dashboard monitoring in Home Assistant.",
    link: "#",
    image: "https://via.placeholder.com/400x250.png?text=Smart+Home",
    stack: ["Raspberry Pi", "Zigbee2MQTT", "Home Assistant"]
  },
];

export default function InteractiveCV() {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredExperiences = experiences.filter((exp) =>
    exp.role.toLowerCase().includes(query.toLowerCase()) ||
    exp.company.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={darkMode ? "bg-neutral-950 text-white min-h-screen" : "bg-neutral-50 text-neutral-900 min-h-screen"}>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        className="max-w-6xl mx-auto p-8 space-y-10 font-sans"
      >
        {/* Header */}
        <header className="flex justify-between items-center sticky top-0 z-20 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 p-4 rounded-2xl shadow-sm">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Simon Cottier</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:scale-105 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="p-2 px-4 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition flex items-center">
              <Download size={18} className="mr-2" /> Export PDF
            </button>
          </div>
        </header>

        {/* Search */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center border rounded-2xl p-3 shadow-md bg-white dark:bg-neutral-900"
        >
          <Search size={18} className="mr-2 text-emerald-500" />
          <input
            className="flex-1 bg-transparent outline-none placeholder:text-neutral-400"
            placeholder="Search experiences..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </motion.div>

        {/* Experience Timeline */}
        <section className="space-y-6 relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-6 before:w-1 before:bg-gradient-to-b before:from-emerald-400 before:to-teal-500">
          {filteredExperiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="pl-14 relative"
            >
              <span className="absolute left-3 top-7 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-500 text-white font-bold">{i+1}</span>
              <div
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="rounded-2xl bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl transition cursor-pointer overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{exp.role} @ {exp.company}</h2>
                    <ChevronDown className={`transition-transform ${expanded === i ? "rotate-180" : ""}`} />
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{exp.period}</p>
                  {expanded === i && (
                    <motion.ul 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="list-disc ml-6 mt-3 space-y-1 text-neutral-700 dark:text-neutral-300"
                    >
                      {exp.details.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Skills Chart */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={skills}>
                <PolarGrid stroke="#d1d5db" />
                <PolarAngleAxis dataKey="skill" stroke="#6b7280" />
                <Radar name="Skill Level" dataKey="level" stroke="#10b981" fill="#34d399" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Projects Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl shadow-xl bg-white dark:bg-neutral-800"
        >
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-neutral-100 dark:bg-neutral-900 cursor-pointer"
              >
                <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">{project.description}</p>
                  <span className="inline-flex items-center text-emerald-500 font-medium">
                    Learn More <ExternalLink size={16} className="ml-1" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
              >
                <div className="relative">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-56 object-cover" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-black"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">{selectedProject.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200">{tech}</span>
                    ))}
                  </div>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
                  >
                    Visit Project <ExternalLink size={18} className="ml-2" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

