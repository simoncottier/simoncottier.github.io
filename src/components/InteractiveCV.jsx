

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, Mail, Phone, MapPin, Wrench, Target, Zap, Monitor, Heart, Star, Sparkles } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";


import SiteExperience from "./SiteExperience";
import Gallery from "./Gallery";


export default function InteractiveCV() {

  const [expanded, setExpanded] = useState(0); // Open only the first experience by default
  const [cvData, setCvData] = useState(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [colorTheme, setColorTheme] = useState({
    id: 'qoqa',
    name: 'QoQa Pink',
    colors: {
      primary: 'text-gray-700',
      secondary: 'text-gray-600',
      accent: 'bg-[#ff7abc]',
      accentHover: 'hover:bg-[#ff6aa8]',
      border: 'border-[#ff7abc]',
      tag: 'bg-[#ff7abc] bg-opacity-20 text-[#cc5a8a]',
      container: 'bg-white',
      background: 'bg-qoqa-pink',
      backgroundStyle: { backgroundColor: '#ff7abc' },
      backgroundImage: '/loutre.png',
      font: 'text-gray-900',
      iconBg: 'bg-[#ff7abc]',
      numberText: 'text-white',
      nameColor: 'text-qoqa-pink',
      nameStyle: { color: '#ff7abc' },
      numberBorder: 'border-2 border-white',
      chartColor: '#FF1493',
      languageDots: 'bg-[#ff7abc]'
    },
    preview: {
      bg: 'bg-[#ff7abc]',
      text: 'text-[#cc5a8a]',
      hex: '#ff7abc'
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
                  "Candidature – édition optimisée"
                </p>
                <p className="text-sm text-gray-400 mt-2 ml-4">
                  En référence à QOQA-000094
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



        {/* Summary */}
        {sections.summary?.content && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${colorTheme.colors.container} p-8 rounded-2xl shadow-lg border border-gray-200`}
          >
                         <h2 className="text-2xl font-bold mb-6 text-gray-900 ">En quelques mots</h2>
            <div className="p-6 bg-white bg-opacity-70 rounded-xl border border-gray-200 shadow-sm">
              <div 
                className="text-gray-700 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: sections.summary.content }}
              />
            </div>
          </motion.section>
        )}

        {/* Hands-on Expertise */}
        <section
          className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative`}
        >
                                   <h2 
               className="text-2xl font-bold mb-8 text-gray-900 text-left relative z-10"
             >
               Mon moteur
             </h2>
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            
            {/* Hands-on Problem Solving */}
            <div
              className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div 
                  className={`p-3 ${colorTheme.colors.iconBg} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Wrench size={24} className="text-white" />
                </div>
                                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Business et Stratégie</h3>
              </div>
              
                             <div className="flex flex-wrap gap-2">
                 <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                   Identification de Business Case
                 </span>
                 <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                   Gestion de Projet
                 </span>
                 <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                   Méthodologie DMAIC & Green Belt
                 </span>
                 
               </div>
            </div>

            {/* Leadership and team work */}
            <div
              className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div 
                  className={`p-3 ${colorTheme.colors.iconBg} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Target size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Leadership Collaboratif</h3>
              </div>
              
                                                           <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                    Dynamisation collective
                  </span>
                  <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                    Montée en compétences
                  </span>
                  <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                    Énergie positive et fédératrice
                  </span>
                </div>
            </div>

            {/* Creativity & Engineering Craft */}
            <div
              className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div 
                  className={`p-3 ${colorTheme.colors.iconBg} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Zap size={24} className="text-white" />
                </div>
                                 <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">Problem Solving</h3>
              </div>
              
                             <div className="flex flex-wrap gap-2">
                 <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                   Maker spirit
                 </span>
                 <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                   Design technique
                 </span>
                 <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                   Prototypage
                 </span>
                 <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                   Orienté solution
                 </span>
               </div>
            </div>

            {/* Technology and digitalization */}
            <div
              className="bg-white bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div 
                  className={`p-3 ${colorTheme.colors.iconBg} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Monitor size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">Technologie et Digitalisation</h3>
              </div>
              
                                                                                                                       <div className="flex flex-wrap gap-2">
                   <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                     Data analyse (PowerBI/Spotfire)
                   </span>
                   <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                     Simplification flux (Power Automate)
                   </span>
                   <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                     Système vision AI
                   </span>
                   <span className={`px-3 py-1 ${colorTheme.colors.tag} rounded-full text-sm font-medium`}>
                     Application Web et IOT
                   </span>
                 </div>
            </div>

          </div>
        </section>

                 {/* Experience Timeline */}
         <section className={`space-y-8 relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-8 before:w-1 ${colorTheme.colors.accent.replace('bg-', 'before:bg-')}`}>
                       {/* Title Container */}
            <div className={`${colorTheme.colors.container} p-6 rounded-2xl shadow-lg border border-gray-200 mb-8`}>
              <h2 className="text-2xl font-bold text-gray-900 text-left">Expériences</h2>
            </div>
           
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
                         <h2 className="text-2xl font-bold mb-8 text-gray-900  text-left">Formation</h2>
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
                         <h2 className="text-2xl font-bold mb-8 text-gray-900  text-left">Langues</h2>
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
                                     <h3 className="text-xl font-bold text-gray-900 ">{
                     lang.name === "French" ? "Français" :
                     lang.name === "English" ? "Anglais" :
                     lang.name === "German" ? "Allemand" :
                     lang.name
                   }</h3>
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
          <section
            className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200`}
          >
                         <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">Centres d'intérêt</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Radar Chart */}
              <div className="bg-white bg-opacity-70 p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart 
                      data={interests.map((interest, i) => ({
                        skill: interest.name,
                                                 level: interest.name === "DIY" ? 100 : 
                               interest.name === "Détente" ? 80 : 
                               interest.name === "Aventure" ? 60 : 
                               (interest.keywords ? Math.min(100, interest.keywords.length * 25) : 50),
                        fullMark: 100
                      }))}
                      startAngle={30}
                      endAngle={390}
                    >
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis 
                        dataKey="skill" 
                        tick={{ fontSize: 9, fill: '#374151' }}
                        tickLine={false}
                        axisLine={false}
                                                 
                      />
                      <Radar
                        name="Niveau d'Intérêt"
                        dataKey="level"
                        stroke={colorTheme.colors.chartColor}
                        fill={colorTheme.colors.chartColor}
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Interest Details */}
              <div className="space-y-6">
                {interests.map((interest, i) => (
                  <div
                    key={interest.id || i}
                    className="group bg-white bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="mb-3">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {interest.name}
                      </h4>
                    </div>
                    
                    {interest.keywords && (
                      <div className="flex flex-wrap gap-2">
                        {interest.keywords.map((keyword, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
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
                             <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu veux en savoir davantage ?</h2>
                             <p className="text-lg text-gray-600">Fais ton choix...</p>
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
                <span className="tracking-wide">Je veux en savoir plus</span>
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
                  const subject = encodeURIComponent("[REFUSÉ]");
                  const body = encodeURIComponent("Cher Simon,\n\nNous avons le regret de vous annoncer que votre candidature était plutôt cool, mais nous avons fait notre choix et vous êtes refusé.\n\nÀ la prochaine fois,\nL'équipe QoQa !!");
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
                <span className="tracking-wide">Tu es refusé</span>
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
                             <h1 className="text-2xl font-bold text-gray-900 mb-4">Bon choix !</h1>
            </div>

            <div className="bg-white bg-opacity-70 rounded-xl border border-gray-200 shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Bonjour l'équipe QoQa,</h2>
                
                                 <p className="text-gray-700 leading-relaxed mb-6">
                   Salut, moi c'est <strong>Simon</strong>. <strong>Ingénieur en gestion industrielle</strong>, j'ai construit mon parcours chez <strong>Medtronic</strong> en endossant des rôles à responsabilités croissantes, avec pour fil conducteur l'optimisation, l'innovation et le leadership terrain.
                 </p>

                                 <div className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
                   <h3 className="text-xl font-bold text-gray-900 mb-4">Mon parcours :</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    J'ai commencé comme <strong>Ingénieur de Production</strong> sur la ligne de fabrication du plus petit stimulateur cardiaque au monde. Cette expérience m'a permis de renforcer ma capacité à travailler en équipe, diriger des groupes et résoudre les défis quotidiens dans un environnement exigeant.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Poussé par ma passion pour l'optimisation industrielle, je suis ensuite devenu responsable d'un <strong>programme d'innovation</strong>, visant à simplifier et améliorer les processus de communication et de contrôle. J'ai eu l'opportunité de diriger des projets entre la Suisse et Singapour, incluant le déploiement de systèmes de vision pour renforcer la qualité et l'efficacité.
                  </p>
                </div>

                                 <div className="bg-green-50 p-6 rounded-lg mb-6 border-l-4 border-green-500">
                   <h3 className="text-xl font-bold text-gray-900 mb-4">Mon rôle actuel :</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Mon ambition m'a conduit à prendre un <strong>rôle global sur 13 sites européens</strong>, coordonnant le déploiement de technologies communes (vision, automatisation, digitalisation) en alignement avec la stratégie du groupe. Parallèlement, j'ai piloté des initiatives de digitalisation (Power BI, SPC) pour mesurer les performances et identifier de nouvelles opportunités d'amélioration.
                  </p>
                </div>

                                 <div className="bg-purple-50 p-6 rounded-lg mb-6 border-l-4 border-purple-500">
                   <h3 className="text-xl font-bold text-gray-900 mb-4">Mon superpouvoir :</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ces expériences m'ont appris à être <strong>structuré, ambitieux et orienté résultats</strong>, avec la capacité d'unir les équipes autour de solutions concrètes et durables. Si je devais décrire mon "superpouvoir", ce serait la <strong>Vision d'Efficacité</strong> : la capacité de détecter instantanément les inefficacités dans un système — comme des lunettes à rayons X pour les processus — et transformer les points faibles en moteurs de performance.
                  </p>
                </div>

                                 <div className="bg-orange-50 p-6 rounded-lg mb-6 border-l-4 border-orange-500">
                   <h3 className="text-xl font-bold text-gray-900 mb-4">Pourquoi QoQa ?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Je recherche un environnement où je peux avoir un <strong>impact réel</strong>, non seulement en déployant des technologies mais en créant une <strong>valeur mesurable</strong> que les équipes peuvent voir et ressentir chaque jour. La culture de QoQa de <strong>créativité, agilité et valeurs centrées sur l'humain</strong> est le terrain parfait pour cela.
                  </p>
                                     <p className="text-gray-700 leading-relaxed">
                     Je crois que mon expertise en <strong>dispositifs médicaux, technologie et digitalisation</strong> peut aider à accélérer votre parcours d'optimisation — mais plus important encore, je veux insuffler une <strong>dynamique et une énergie positive</strong> à la tanière.
                   </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg mb-8 border-l-4 border-red-500 text-center">
                  <p className="text-gray-700 leading-relaxed font-semibold text-lg">
                    Si vous recherchez quelqu'un pour transformer l'ambition en efficacité mesurable tout en gardant le voyage amusant, alors je pense que nous sommes faits pour nous entendre. 🚀
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 font-semibold mb-4">Au plaisir de vous rencontrer,</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">Simon Cottier</p>
                  <div className="flex justify-center mb-4">
                    <div className={`p-2 ${colorTheme.colors.iconBg} rounded-full`}>
                      <Zap size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                                 onClick={() => {
                   const subject = encodeURIComponent("Discutons de l'opportunité !");
                   const body = encodeURIComponent("Hello Simon !\n\nTon CV nous a tapé dans l'œil (et on avoue, ton originalité aussi ).\nOn s'est dit : plutôt que de continuer à lire des lignes de texte… pourquoi pas se rencontrer en vrai ?\n\nVoici quelques créneaux qu'on te propose (tu n'as qu'à modifier ce qui t'arrange) :\n\n[Date, Heure] – dans nos locaux à Bussigny\n\nÀ toi de nous dire ce qui te convient, on s'adapte !\n\nL'équipe QoQa");
                   window.location.href = `mailto:simon.cottier@gmail.com?subject=${subject}&body=${body}`;
                 }}
                className={`inline-flex items-center px-8 py-4 ${colorTheme.colors.accent} hover:${colorTheme.colors.accentHover} text-black font-bold text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-xl`}
              >
                Rencontrons-nous !
              </motion.button>
            </div>
          </div>
        </motion.section>
        )}

        {/* Contact Info */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${colorTheme.colors.container} p-8 rounded-2xl shadow-lg border border-gray-200 mt-8`}
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
