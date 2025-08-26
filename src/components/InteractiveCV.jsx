

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import Chatbot from "./Chatbot";

import SiteExperience from "./SiteExperience";
import Gallery from "./Gallery";


export default function InteractiveCV() {

  const [expanded, setExpanded] = useState(null);
  const [cvData, setCvData] = useState(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [colorTheme, setColorTheme] = useState({
    id: 'pink',
    name: 'Rose Pink',
    colors: {
      primary: 'text-gray-700',
      secondary: 'text-gray-600',
      accent: 'bg-[#FFB6C1]',
      accentHover: 'hover:bg-[#FF91A4]',
      border: 'border-[#FFB6C1]',
      tag: 'bg-[#FFB6C1] bg-opacity-20 text-[#D1477A]',
      container: 'bg-[#FFB6C1] bg-opacity-40',
      background: 'bg-gray-50',
      font: 'text-gray-900',
      iconBg: 'bg-[#FFB6C1]',
      numberText: 'text-white',
      chartColor: '#FFB6C1',
      languageDots: 'bg-[#FFB6C1]'
    },
    preview: {
      bg: 'bg-[#FFB6C1]',
      text: 'text-[#D1477A]',
      hex: '#FFB6C1'
    }
  });

  useEffect(() => {
    // Load CV data from CVINFO.json
    fetch('/CVINFO.json')
      .then(response => response.json())
      .then(data => setCvData(data))
      .catch(error => console.error('Error loading CV data:', error));
  }, []);

  if (!cvData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className={`animate-spin rounded-full h-32 w-32 border-b-4 border-[#FFB6C1]`}></div>
      </div>
    );
  }

  const { basics, sections } = cvData;
  const experiences = sections.experience?.items || [];
  const skills = sections.skills?.items || [];
  const education = sections.education?.items || [];
  const languages = sections.languages?.items || [];
  const interests = sections.interests?.items || [];

  // Convert skills to radar chart format
  const skillsForChart = skills.map(skill => ({
    skill: skill.name,
    level: skill.keywords ? skill.keywords.length * 10 : 50
  }));



  return (
    <div className={`${colorTheme.colors.background} text-gray-900 min-h-screen`}>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        className="max-w-6xl mx-auto p-8 space-y-10 font-sans"
      >
        {/* Header */}
        <header className={`flex justify-between items-center ${colorTheme.colors.container} p-8 rounded-2xl shadow-lg border border-gray-200`}>
          <div className="flex items-center space-x-8">
            {basics.picture?.url && (
              <img 
                src={basics.picture.url} 
                alt={basics.name}
                onClick={() => setPhotoModalOpen(true)}
                className="w-32 h-40 rounded-lg object-cover border-4 border-gray-200 shadow-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
              />
            )}
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
                {basics.name}
              </h1>
              <p className="text-2xl text-gray-600 mt-3">{basics.headline}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            {/* Color picker removed - now handled in Site Experience section */}
          </div>
        </header>

        {/* Site Experience */}
        <SiteExperience 
          onThemeChange={setColorTheme} 
          currentTheme={colorTheme}
        />

        {/* Contact Info */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${colorTheme.colors.container} p-8 rounded-2xl shadow-lg border border-gray-200`}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {basics.email && (
              <a 
                href={`mailto:${basics.email}`}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              >
                <div className={`p-2 ${colorTheme.colors.iconBg || colorTheme.colors.accent} rounded-lg`}>
                  <Mail size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-900 hover:text-gray-700">{basics.email}</span>
              </a>
            )}
            {basics.phone && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className={`p-2 ${colorTheme.colors.iconBg || colorTheme.colors.accent} rounded-lg opacity-80`}>
                  <Phone size={20} className="text-white" />
                </div>
                <span className="font-medium">{basics.phone}</span>
              </div>
            )}
            {basics.location && (
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className={`p-2 ${colorTheme.colors.iconBg || colorTheme.colors.accent} rounded-lg opacity-60`}>
                  <MapPin size={20} className="text-white" />
                </div>
                <span className="font-medium">{basics.location}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Summary */}
        {sections.summary?.content && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${colorTheme.colors.container} p-8 rounded-2xl shadow-lg border border-gray-200`}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 ">Summary</h2>
            <div 
              className="text-gray-700 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: sections.summary.content }}
            />
          </motion.section>
        )}



        {/* Experience Timeline */}
        <section className={`space-y-8 relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-8 before:w-1 ${colorTheme.colors.accent.replace('bg-', 'before:bg-')}`}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id || i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="pl-20 relative"
            >
              <div className={`absolute left-4 top-8 w-8 h-8 flex items-center justify-center rounded-full ${colorTheme.colors.accent} ${colorTheme.colors.numberText || 'text-white'} font-bold text-lg shadow-lg`}>
                {i+1}
              </div>
              <div
                onClick={() => setExpanded(expanded === i ? null : i)}
                className={`rounded-2xl ${colorTheme.colors.container} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200`}
              >
                <div className="p-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 ">
                      {exp.position} @ {exp.company}
                    </h2>
                    <ChevronDown className={`transition-transform duration-300 text-gray-500 ${expanded === i ? "rotate-180" : ""}`} size={24} />
                  </div>
                  <p className="text-lg text-gray-600  mt-2">{exp.date}</p>
                  {exp.location && (
                    <p className="text-lg text-gray-500 ">{exp.location}</p>
                  )}
                  {expanded === i && exp.summary && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="mt-6 p-6 bg-white bg-opacity-70 rounded-xl border border-gray-200 shadow-sm"
                      dangerouslySetInnerHTML={{ __html: exp.summary }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </section>



        {/* Skills Details */}
        {skills.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200`}
          >
            <h2 className="text-2xl font-bold mb-8 text-gray-900  text-center">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50  p-6 rounded-xl shadow-lg border border-gray-200  hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 ">{skill.name}</h3>
                  {skill.keywords && (
                    <div className="flex flex-wrap gap-2">
                      {skill.keywords.map((keyword, idx) => (
                        <span 
                          key={idx} 
                          className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200`}
          >
            <h2 className="text-2xl font-bold mb-8 text-gray-900  text-center">Education</h2>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id || i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`border-l-4 ${colorTheme.colors.border} pl-6 bg-gray-50  p-6 rounded-xl shadow-lg`}
                >
                  <h3 className="text-xl font-bold text-gray-900 ">{edu.institution}</h3>
                  <p className="text-lg text-gray-600  mt-2">{edu.area}</p>
                  <p className="text-gray-500  mt-1">{edu.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200`}
          >
            <h2 className="text-2xl font-bold mb-8 text-gray-900  text-center">Languages</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.id || i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50  rounded-xl shadow-lg border border-gray-200 "
                >
                  <h3 className="text-xl font-bold text-gray-900 ">{lang.name}</h3>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-4 h-4 rounded-full mx-1 ${
                          idx < lang.level ? (colorTheme.colors.languageDots || colorTheme.colors.accent) : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  {lang.description && (
                    <p className="text-gray-600  mt-3">{lang.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200`}
          >
            <h2 className="text-2xl font-bold mb-8 text-gray-900  text-center">Interests</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interests.map((interest, i) => (
                <motion.div
                  key={interest.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50  p-6 rounded-xl shadow-lg border border-gray-200  hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 ">{interest.name}</h3>
                  {interest.keywords && (
                    <div className="flex flex-wrap gap-2">
                      {interest.keywords.map((keyword, idx) => (
                        <span 
                          key={idx} 
                          className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Photo Gallery */}
        <Gallery colorTheme={colorTheme} />

      </motion.div>
      
      {/* Photo Modal */}
      {photoModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setPhotoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-2xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={basics.picture?.url} 
              alt={basics.name}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setPhotoModalOpen(false)}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
      
      {/* Chatbot */}
      <Chatbot cvData={cvData} />
    </div>
  );
}
