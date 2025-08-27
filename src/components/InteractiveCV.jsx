

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, Mail, Phone, MapPin } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";


import SiteExperience from "./SiteExperience";
import Gallery from "./Gallery";


export default function InteractiveCV() {

  const [expanded, setExpanded] = useState(0); // Open only the first experience by default
  const [cvData, setCvData] = useState(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [colorTheme, setColorTheme] = useState({
    id: 'mint',
    name: 'Mint Green',
    colors: {
      primary: 'text-gray-700',
      secondary: 'text-gray-600',
      accent: 'bg-[#B0E0B8]',
      accentHover: 'hover:bg-[#9DD4A5]',
      border: 'border-[#B0E0B8]',
      tag: 'bg-[#B0E0B8] bg-opacity-20 text-[#6A876E]',
      container: 'bg-[#B0E0B8] bg-opacity-40',
      background: 'bg-gray-50',
      backgroundStyle: {},
      backgroundImage: null,
      font: 'text-gray-900',
      iconBg: 'bg-[#B0E0B8]',
      numberText: 'text-white',
      nameColor: 'text-gray-900',
      nameStyle: {},
      numberBorder: '',
      chartColor: '#B0E0B8',
      languageDots: 'bg-[#B0E0B8]'
    },
    preview: {
      bg: 'bg-[#B0E0B8]',
      text: 'text-[#6A876E]',
      hex: '#B0E0B8'
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
    <div 
      className={`${colorTheme.colors.background} text-gray-900 min-h-screen relative`}
      style={{
        ...colorTheme.colors.backgroundStyle
      }}
    >
      {/* Otter image positioned behind white boxes */}
      {colorTheme.colors.backgroundImage && (
        <div 
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
          style={{
            backgroundImage: `url(${colorTheme.colors.backgroundImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        />
      )}
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        className="max-w-6xl mx-auto p-8 space-y-10 font-sans relative z-10"
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
              <h1 
                className={`text-5xl font-extrabold tracking-tight ${colorTheme.colors.nameColor}`}
                style={colorTheme.colors.nameStyle || {}}
              >
                {basics.name}
              </h1>
              <div className="mt-4 mb-2">
                <p className="text-lg italic text-gray-500 border-l-4 border-gray-300 pl-4">
                  "Optimization starts with this application"
                </p>
                <p className="text-sm text-gray-400 mt-2 ml-4">
                  In reference of QOQA-000094
                </p>
              </div>
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
            <div className="p-6 bg-white bg-opacity-70 rounded-xl border border-gray-200 shadow-sm">
              <div 
                className="text-gray-700 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: sections.summary.content }}
              />
            </div>
          </motion.section>
        )}

        {/* Hands-on Expertise */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200`}
        >
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">Beyond the Office</h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Hands-on Problem Solving */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 ${colorTheme.colors.iconBg} rounded-lg mr-4`}>
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Hands-on Problem Solving</h3>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Passion for mechanics:</strong> repair and restoration of vintage motorcycles → shows patience, precision, and resilience.
              </p>
              <p className="text-gray-700 mb-4">
                Skilled at diagnosing and fixing complex systems — directly applicable to understanding inefficiencies and resolving them.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                  Mechanic
                </span>
                <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                  DIY
                </span>
              </div>
            </motion.div>

            {/* Leadership and team work */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 ${colorTheme.colors.iconBg} rounded-lg mr-4`}>
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Leadership and team work</h3>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Cross-functional leadership:</strong> Leading teams across multiple sites and disciplines.
              </p>
              <p className="text-gray-700">
                Building consensus, driving alignment, and delivering results through collaborative problem-solving approaches.
              </p>
            </motion.div>

            {/* Creativity & Engineering Craft */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 ${colorTheme.colors.iconBg} rounded-lg mr-4`}>
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Creativity & Engineering Craft</h3>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Love for working with hands:</strong> building, tinkering, optimizing.
              </p>
              <p className="text-gray-700 mb-4">
                Ability to blend practical craftsmanship with digital innovation (bridge between field execution and strategic vision).
              </p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                  3D parts design
                </span>
                <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                  prototyping
                </span>
                <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                  CAD
                </span>
              </div>
            </motion.div>

            {/* Mindset & Transferable Value */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 ${colorTheme.colors.iconBg} rounded-lg mr-4`}>
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Mindset & Transferable Value</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Shows you're not afraid to get dirty and make things work in real life.
              </p>
              <p className="text-gray-700 mb-4">
                Brings credibility when introducing change — because you've been on both sides (design + execution).
              </p>
              <p className="text-gray-700 font-medium italic">
                Fits perfectly with QoQa's playful but pragmatic culture: <strong>"pas que des idées, mais du concret"</strong>.
              </p>
            </motion.div>

          </div>
        </motion.section>

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
              <div className={`absolute left-4 top-8 w-8 h-8 flex items-center justify-center rounded-full ${colorTheme.colors.accent} ${colorTheme.colors.numberText || 'text-white'} ${colorTheme.colors.numberBorder || ''} font-bold text-lg shadow-lg`}>
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

        {/* Tinder-style Decision Box */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200 mt-8`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's your verdict?</h2>
            <p className="text-lg text-gray-600">Time to make your decision...</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            {/* Accept Button */}
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowCoverLetter(true);
                setTimeout(() => {
                  document.getElementById('cover-letter-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="group relative overflow-hidden w-72 h-16 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold text-lg rounded-2xl shadow-xl transition-all duration-500 border border-emerald-400/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="tracking-wide">I want to know more</span>
              </div>
            </motion.button>

            {/* Dismiss Button */}
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const subject = encodeURIComponent("[DISMISSED]");
                const body = encodeURIComponent("Dear Simon,\n\nWe have the regret to announce you that your application was pretty cool, but we did our choice and you're dismissed.\n\nNext time,\nThe QoQa Team !!");
                window.location.href = `mailto:simon.cottier@gmail.com?subject=${subject}&body=${body}`;
              }}
              className="group relative overflow-hidden w-72 h-16 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold text-lg rounded-2xl shadow-xl transition-all duration-500 border border-red-400/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="tracking-wide">You're dismissed</span>
              </div>
            </motion.button>
          </div>

        </motion.section>

        {/* Cover Letter Section */}
        {showCoverLetter && (
        <motion.section
          id="cover-letter-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200 mt-8`}
          style={{ minHeight: '100vh' }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-block p-4 bg-green-100 rounded-full mb-6"
              >
                <span className="text-6xl">🎉</span>
              </motion.div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Excellent Choice!</h1>
              <p className="text-xl text-gray-600">Here's why I'm the perfect fit for your team</p>
            </div>

            <div className="bg-white bg-opacity-70 rounded-xl border border-gray-200 shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hello QoQa Team,</h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  My name is Simon, and I am a generalist engineer by training. Over the past years, I have developed my career within Medtronic through several roles of increasing responsibility.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  I began as a Production Engineer on the line manufacturing the world's smallest pacemaker. This experience allowed me to strengthen my ability to work in teams, lead groups, and solve daily challenges in a demanding environment. I also drove continuous improvement projects, both technical and organizational, to optimize line performance.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Driven by my passion for industrial optimization, I then became responsible for an innovation program, aimed at simplifying and enhancing communication and control processes. I had the opportunity to lead projects between Switzerland and Singapore, including the deployment of vision systems to reinforce quality and efficiency.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  My ambition led me to take on a global role across 13 European sites, coordinating the deployment of common technologies (vision, automation, digitalization) in alignment with the group's strategy. Alongside this, I spearheaded digitalization initiatives (Power BI, SPC) to measure performance and identify new opportunities for improvement.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  These experiences have taught me to be structured, ambitious, and results-oriented, with the ability to unite teams around concrete and sustainable solutions. If I were to describe my "superpower," it would be <strong>Efficiency Vision</strong>: the ability to instantly detect inefficiencies within a system — like X-ray glasses for processes — and transform weak points into drivers of performance.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why QoQa?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    I am looking for an environment where I can make a real impact, not only by deploying technologies but by creating measurable value that teams can see and feel every day. QoQa's culture of creativity, agility, and human-centered values is the perfect ground for that.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    I believe my expertise in medical devices, technology, and digitalization can help accelerate your optimization journey — but more importantly, I want to bring a fresh perspective, positive energy, and a wave of motivation to the tanière.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-8">
                  If you're looking for someone to turn ambition into measurable efficiency while keeping the ride fun, then I think we're a good match. 🚀
                </p>

                <div className="text-center">
                  <p className="text-gray-700 font-semibold mb-4">Looking forward to meeting you,</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">Simon Cottier</p>
                  <div className="flex justify-center space-x-4 text-sm text-gray-600">
                    <span>📧 simon.cottier@gmail.com</span>
                    <span>📱 +41794570319</span>
                    <span>📍 Switzerland, Romanel</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const subject = encodeURIComponent("Let's discuss the opportunity!");
                  const body = encodeURIComponent("Hi Simon,\n\nI've reviewed your interactive CV and cover letter, and I'm impressed! I'd like to schedule a conversation to discuss potential opportunities.\n\nBest regards,");
                  window.location.href = `mailto:simon.cottier@gmail.com?subject=${subject}&body=${body}`;
                }}
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-xl"
              >
                <span className="mr-3 text-2xl">📧</span>
                Let's Talk!
              </motion.button>
            </div>
          </div>
        </motion.section>
        )}

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
            className="relative max-w-md max-h-96"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={basics.picture?.url} 
              alt={basics.name}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
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
      
    </div>
  );
}
