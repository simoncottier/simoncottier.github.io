"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Section = "personal-info" | "professional-exp" | "personal-exp";
type Language = "en" | "fr";

const translations = {
  en: {
    tagline: "Modern Web Development & Full-Stack Solutions",
    subtitle: "Building high-performance, scalable websites with cutting-edge technologies and best practices",
    personalInfo: "Personal Information",
    professionalExp: "Professional Experience",
    personalExp: "Personal Experience",
    personalInfoText: "Add your personal information here. This section can include details about yourself, your background, interests, and more.",
    professionalExpTitle: "Professional Experience",
    professionalExpIntro: "I specialize in developing modern, high-performance web applications using cutting-edge technologies and industry best practices. My expertise spans the entire development lifecycle, from initial concept to deployment and optimization.",
    coreSkills: "Core Web Development Skills",
    modernFrameworks: "Modern Frameworks:",
    modernFrameworksText: "React, Next.js, TypeScript for scalable and maintainable applications",
    performanceOpt: "Performance Optimization:",
    performanceOptText: "Code splitting, lazy loading, image optimization, and Core Web Vitals optimization",
    modernCSS: "Modern CSS:",
    modernCSSText: "Tailwind CSS, custom CSS architecture, responsive design, and neumorphic UI design",
    deployment: "Deployment & DevOps:",
    deploymentText: "Vercel, CI/CD pipelines, domain management, and production monitoring",
    fullStack: "Full-Stack Development:",
    fullStackText: "Backend APIs, database integration, real-time data processing, and cloud services",
    professionalExpClosing: "Every project I deliver prioritizes performance, user experience, and maintainability, ensuring your web presence is fast, accessible, and future-proof.",
    portfolioTitle: "This Portfolio Website",
    portfolioText1: "This very website serves as a live demonstration of my web development capabilities. Built with Next.js 14 and React, it showcases modern development practices including server-side rendering, optimized image loading, and responsive design.",
    portfolioText2: "The site features a custom neumorphic design system implemented with CSS, demonstrating my ability to create unique, modern UI/UX experiences. Every interaction is optimized for performance, with smooth animations and efficient rendering that prioritizes user experience.",
    portfolioTech: "Built With: Next.js 14 • React • TypeScript • Tailwind CSS • Custom CSS Architecture • Image Optimization • Responsive Design",
    cocoflowText1: "Cocoflow is a high-performance, modern web application built with React and Next.js, showcasing my expertise in creating fast, scalable, and beautifully designed websites. The site is hosted on Vercel for optimal performance, leveraging edge computing and automatic CDN distribution for lightning-fast load times worldwide.",
    cocoflowText2: "This project demonstrates my full-stack capabilities: custom CSS architecture with modern design patterns, responsive mobile-first development, SEO optimization, and performance monitoring. I managed the complete project lifecycle from design to deployment, including domain configuration, analytics integration, and contact form functionality with proper validation and security measures.",
    cocoflowTech: "Key Highlights: React • Next.js • TypeScript • Vercel Edge Network • Custom CSS • Responsive Design • Performance Optimized • SEO Friendly",
    motomeshText1: "Motomesh demonstrates my ability to build full-stack web applications that integrate with complex IoT systems. The project includes a high-performance web dashboard that visualizes real-time sensor data with smooth, responsive charts and live updates.",
    motomeshText2: "The web application was built with modern frameworks to handle real-time data streaming efficiently. It connects to an MQTT messaging server and integrates with TimescaleDB on Supabase, showcasing my expertise in database design, real-time data processing, and API development.",
    motomeshText3: "This project highlights my capabilities in building scalable web applications that can handle continuous data streams while maintaining excellent performance and user experience. The dashboard features intuitive data visualization, responsive design, and optimized rendering for smooth interactions even with large datasets.",
    motomeshTech: "Web Technologies: Real-time Web Dashboard • MQTT Integration • RESTful APIs • Time-Series Data Visualization • Responsive UI • Performance Optimization",
    digitalization: "Digitalization",
    conception3D: "3D Conception",
    mechanical: "Mechanical",
    expandedView: "Expanded view"
  },
  fr: {
    tagline: "Développement Web Moderne & Solutions Full-Stack",
    subtitle: "Création de sites web performants et évolutifs avec des technologies de pointe et les meilleures pratiques",
    personalInfo: "Informations Personnelles",
    professionalExp: "Expérience Professionnelle",
    personalExp: "Expérience Personnelle",
    personalInfoText: "Ajoutez vos informations personnelles ici. Cette section peut inclure des détails sur vous-même, votre parcours, vos intérêts, et plus encore.",
    professionalExpTitle: "Expérience Professionnelle",
    professionalExpIntro: "Je me spécialise dans le développement d'applications web modernes et performantes en utilisant des technologies de pointe et les meilleures pratiques de l'industrie. Mon expertise couvre tout le cycle de vie du développement, de la conception initiale au déploiement et à l'optimisation.",
    coreSkills: "Compétences Clés en Développement Web",
    modernFrameworks: "Frameworks Modernes:",
    modernFrameworksText: "React, Next.js, TypeScript pour des applications évolutives et maintenables",
    performanceOpt: "Optimisation des Performances:",
    performanceOptText: "Division du code, chargement différé, optimisation d'images et optimisation des Core Web Vitals",
    modernCSS: "CSS Moderne:",
    modernCSSText: "Tailwind CSS, architecture CSS personnalisée, design responsive et design UI néomorphique",
    deployment: "Déploiement & DevOps:",
    deploymentText: "Vercel, pipelines CI/CD, gestion de domaine et surveillance de production",
    fullStack: "Développement Full-Stack:",
    fullStackText: "APIs backend, intégration de bases de données, traitement de données en temps réel et services cloud",
    professionalExpClosing: "Chaque projet que je livre privilégie les performances, l'expérience utilisateur et la maintenabilité, garantissant que votre présence web est rapide, accessible et tournée vers l'avenir.",
    portfolioTitle: "Ce Site Portfolio",
    portfolioText1: "Ce site web sert de démonstration en direct de mes capacités en développement web. Construit avec Next.js 14 et React, il met en avant des pratiques de développement modernes incluant le rendu côté serveur, le chargement optimisé d'images et le design responsive.",
    portfolioText2: "Le site présente un système de design néomorphique personnalisé implémenté en CSS, démontrant ma capacité à créer des expériences UI/UX uniques et modernes. Chaque interaction est optimisée pour les performances, avec des animations fluides et un rendu efficace qui privilégie l'expérience utilisateur.",
    portfolioTech: "Construit Avec: Next.js 14 • React • TypeScript • Tailwind CSS • Architecture CSS Personnalisée • Optimisation d'Images • Design Responsive",
    cocoflowText1: "Cocoflow est une application web moderne et performante construite avec React et Next.js, démontrant mon expertise dans la création de sites web rapides, évolutifs et magnifiquement conçus. Le site est hébergé sur Vercel pour des performances optimales, tirant parti du edge computing et de la distribution CDN automatique pour des temps de chargement ultra-rapides dans le monde entier.",
    cocoflowText2: "Ce projet démontre mes capacités full-stack: architecture CSS personnalisée avec des modèles de design modernes, développement mobile-first responsive, optimisation SEO et surveillance des performances. J'ai géré tout le cycle de vie du projet de la conception au déploiement, incluant la configuration du domaine, l'intégration d'analytics et la fonctionnalité de formulaire de contact avec validation et mesures de sécurité appropriées.",
    cocoflowTech: "Points Clés: React • Next.js • TypeScript • Réseau Edge Vercel • CSS Personnalisé • Design Responsive • Optimisé pour les Performances • SEO Friendly",
    motomeshText1: "Motomesh démontre ma capacité à construire des applications web full-stack qui s'intègrent avec des systèmes IoT complexes. Le projet inclut un tableau de bord web performant qui visualise les données de capteurs en temps réel avec des graphiques fluides et réactifs et des mises à jour en direct.",
    motomeshText2: "L'application web a été construite avec des frameworks modernes pour gérer efficacement le streaming de données en temps réel. Elle se connecte à un serveur de messagerie MQTT et s'intègre avec TimescaleDB sur Supabase, mettant en avant mon expertise en conception de bases de données, traitement de données en temps réel et développement d'APIs.",
    motomeshText3: "Ce projet met en avant mes capacités à construire des applications web évolutives qui peuvent gérer des flux de données continus tout en maintenant d'excellentes performances et une expérience utilisateur. Le tableau de bord présente une visualisation de données intuitive, un design responsive et un rendu optimisé pour des interactions fluides même avec de grands ensembles de données.",
    motomeshTech: "Technologies Web: Tableau de Bord Temps Réel • Intégration MQTT • APIs RESTful • Visualisation de Données Temporelles • UI Responsive • Optimisation des Performances",
    digitalization: "Digitalisation",
    conception3D: "Conception 3D",
    mechanical: "Mécanique",
    expandedView: "Vue agrandie"
  }
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const t = translations[language];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <div className="flex gap-3 neumorphic-language-selector">
          <label className="neumorphic-radio-label">
            <input
              type="radio"
              name="language"
              value="fr"
              checked={language === "fr"}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="neumorphic-radio-input"
            />
            <span className="neumorphic-radio-text">FR</span>
          </label>
          <label className="neumorphic-radio-label">
            <input
              type="radio"
              name="language"
              value="en"
              checked={language === "en"}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="neumorphic-radio-input"
            />
            <span className="neumorphic-radio-text">ENG</span>
          </label>
        </div>
      </div>
      
      <div className="text-center space-y-12 w-full">
        {/* Name/Title */}
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-5xl md:text-7xl font-medium text-[#6C7587] mb-4">
            Simon Cottier
          </h1>
          <div className="flex gap-6 mb-4">
            <button className="neumorphic-circle-icon-btn">
              <Image
                src="/icon/icons8-github-24.png"
                alt="GitHub icon"
                width={24}
                height={24}
              />
            </button>
            <button className="neumorphic-circle-icon-btn">
              <Image
                src="/icon/icons8-instagram-24.png"
                alt="Instagram icon"
                width={24}
                height={24}
              />
            </button>
            <button className="neumorphic-circle-icon-btn">
              <Image
                src="/icon/icons8-linkedin-24.png"
                alt="LinkedIn icon"
                width={24}
                height={24}
              />
            </button>
          </div>
          <p className="text-xl md:text-2xl text-[#8992A5] font-light">
            {t.tagline}
          </p>
          <p className="text-base md:text-lg text-[#8992A5] font-light mt-2 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Three Neumorphic Buttons */}
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center relative w-full max-w-4xl mx-auto px-4" style={{ minHeight: '120px' }}>
          <button
            className="neumorphic-btn"
            onClick={() => {
              setSelectedSection("personal-info");
              setShowMenu(false);
              setSelectedMenuItem(null);
            }}
          >
            <Image
              src="/icon/icons8-fingerprint-24.png"
              alt="Fingerprint icon"
              width={32}
              height={32}
              className="mr-2"
            />
            {t.personalInfo}
          </button>
          <button
            className="neumorphic-btn"
            onClick={() => {
              setSelectedSection("professional-exp");
              setShowMenu(false);
              setSelectedMenuItem(null);
            }}
          >
            {t.professionalExp}
          </button>
          <div className="relative" ref={menuRef}>
            <button
              className="neumorphic-dropdown-btn"
              onClick={() => {
                setShowMenu(!showMenu);
                // Always clear selected section and menu item when clicking dropdown button
                setSelectedSection(null);
                setSelectedMenuItem(null);
              }}
            >
              <span>{t.personalExp}</span>
              <svg
                className={`icon-dropdown-arrow transition-transform ${showMenu ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
              >
                <polygon
                  transform="translate(20.000000, 20.500000) rotate(-90.000000) translate(-20.000000, -20.500000) translate(12.000000, 8.000000)"
                  points="12.8 0 15.6 2.9 5.7 12.2 15.6 22 12.7 24.8 2.8 14.9 2.7 14.9 1.4 13.5 0 12.1 0 12.1 0 12 1.4 10.7 2.8 9.3 2.9 9.3"
                />
              </svg>
            </button>
            
            {/* Neumorphic Dropdown Menu */}
            {showMenu && (
              <div className="neumorphic-menu">
                <button
                  className="neumorphic-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    setSelectedSection(null);
                    setSelectedMenuItem(null);
                  }}
                >
                  {t.conception3D}
                </button>
                <button
                  className="neumorphic-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    setSelectedSection(null);
                    setSelectedMenuItem(null);
                  }}
                >
                  {t.mechanical}
                </button>
                <button
                  className="neumorphic-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    setSelectedSection(null);
                    setSelectedMenuItem("digitalization");
                  }}
                >
                  {t.digitalization}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section Content - Fixed position to avoid layout shift */}
        <div className="mt-12 w-full px-4 min-h-[200px]">
          {selectedSection && !showMenu && (
            <>
              {selectedSection === "personal-info" && (
              <div className="neumorphic-content max-w-4xl mx-auto">
                <h2 className="text-3xl font-medium mb-6 text-[#6C7587]">{t.personalInfo}</h2>
                <p className="text-lg text-[#8992A5] leading-relaxed">
                  {t.personalInfoText}
                </p>
              </div>
            )}

              {selectedSection === "professional-exp" && (
              <div className="neumorphic-content max-w-4xl mx-auto">
                <h2 className="text-3xl font-medium mb-6 text-[#6C7587]">{t.professionalExpTitle}</h2>
                <div className="text-lg text-[#8992A5] leading-relaxed space-y-4">
                  <p>
                    {t.professionalExpIntro}
                  </p>
                  <div className="mt-6">
                    <h3 className="text-xl font-medium text-[#6C7587] mb-3">{t.coreSkills}</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>{t.modernFrameworks}</strong> {t.modernFrameworksText}</li>
                      <li><strong>{t.performanceOpt}</strong> {t.performanceOptText}</li>
                      <li><strong>{t.modernCSS}</strong> {t.modernCSSText}</li>
                      <li><strong>{t.deployment}</strong> {t.deploymentText}</li>
                      <li><strong>{t.fullStack}</strong> {t.fullStackText}</li>
                    </ul>
                  </div>
                  <p className="mt-4">
                    {t.professionalExpClosing}
                  </p>
                </div>
              </div>
              )}
            </>
          )}
          
          {/* Digitalization Menu Items */}
          {selectedMenuItem === "digitalization" && !showMenu && (
            <div className="flex flex-col gap-6 justify-center items-center w-full max-w-4xl mx-auto px-4">
              <div className="neumorphic-content-box w-full text-left">
                <div className="flex items-center justify-start gap-3 mb-4">
                  <h3 className="text-xl font-medium text-[#6C7587]">{t.portfolioTitle}</h3>
                  <Image
                    src="/icon/icons8-internet-24.png"
                    alt="Internet icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="text-base text-[#8992A5] leading-relaxed mb-6 space-y-4">
                  <p>
                    {t.portfolioText1}
                  </p>
                  <p>
                    {t.portfolioText2}
                  </p>
                  <p className="font-medium text-[#6C7587]">
                    {t.portfolioTech}
                  </p>
                </div>
              </div>
              <div className="neumorphic-content-box w-full text-left">
                <div className="flex items-center justify-start gap-3 mb-4">
                  <a 
                    href="https://www.cocoflow.ch" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl font-medium text-[#6C7587] hover:underline cursor-pointer"
                  >
                    Cocoflow
                  </a>
                  <Image
                    src="/icon/icons8-internet-24.png"
                    alt="Internet icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="text-base text-[#8992A5] leading-relaxed mb-6 space-y-4">
                  <p>
                    {t.cocoflowText1}
                  </p>
                  <p>
                    {t.cocoflowText2}
                  </p>
                  <p className="font-medium text-[#6C7587]">
                    {t.cocoflowTech}
                  </p>
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <div 
                    className="neumorphic-image-container cursor-pointer"
                    onClick={() => setExpandedImage("/screenshots/cocoflow1.png")}
                  >
                    <Image
                      src="/screenshots/cocoflow1.png"
                      alt="Cocoflow screenshot 1"
                      width={400}
                      height={225}
                      className="neumorphic-image"
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer"
                    onClick={() => setExpandedImage("/screenshots/cocoflow2.png")}
                  >
                    <Image
                      src="/screenshots/cocoflow2.png"
                      alt="Cocoflow screenshot 2"
                      width={400}
                      height={225}
                      className="neumorphic-image"
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer"
                    onClick={() => setExpandedImage("/screenshots/cocoflow3.png")}
                  >
                    <Image
                      src="/screenshots/cocoflow3.png"
                      alt="Cocoflow screenshot 3"
                      width={400}
                      height={225}
                      className="neumorphic-image"
                    />
                  </div>
                </div>
              </div>
              <div className="neumorphic-content-box text-left">
                <div className="flex items-center justify-start gap-3 mb-4">
                  <h3 className="text-xl font-medium text-[#6C7587]">Motomesh</h3>
                  <Image
                    src="/icon/icons8-internet-of-things-24.png"
                    alt="IoT icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="text-base text-[#8992A5] leading-relaxed mb-6 space-y-4">
                  <p>
                    {t.motomeshText1}
                  </p>
                  <p>
                    {t.motomeshText2}
                  </p>
                  <p>
                    {t.motomeshText3}
                  </p>
                  <p className="font-medium text-[#6C7587]">
                    {t.motomeshTech}
                  </p>
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <div 
                    className="neumorphic-image-container cursor-pointer"
                    onClick={() => setExpandedImage("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop")}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop"
                      alt="IoT device"
                      width={400}
                      height={225}
                      className="neumorphic-image"
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer"
                    onClick={() => setExpandedImage("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop")}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop"
                      alt="Data visualization"
                      width={400}
                      height={225}
                      className="neumorphic-image"
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer"
                    onClick={() => setExpandedImage("https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=800&h=450&fit=crop")}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=400&h=225&fit=crop"
                      alt="Dashboard"
                      width={400}
                      height={225}
                      className="neumorphic-image"
                    />
                  </div>
                </div>
                
                {/* Expanded Image Modal */}
                {expandedImage && (
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    onClick={() => setExpandedImage(null)}
                  >
                    <div 
                      className="neumorphic-image-modal relative max-w-7xl w-full max-h-[95vh]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="absolute top-4 right-4 z-10 neumorphic-close-btn"
                        onClick={() => setExpandedImage(null)}
                      >
                        ×
                      </button>
                      <Image
                        src={expandedImage}
                        alt={t.expandedView}
                        width={1920}
                        height={1080}
                        className="w-full h-auto rounded-lg"
                        style={{ maxHeight: '90vh', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
