"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Section = "personal-info" | "professional-exp" | "personal-exp" | "formation";
type Language = "en" | "fr";

const translations = {
  en: {
    tagline: "Modern Web Development & Full-Stack Solutions",
    subtitle: "Building high-performance, scalable websites with cutting-edge technologies and best practices",
    personalInfo: "About Me",
    professionalExp: "Professional Experience",
    personalExp: "Personal Experience",
    formation: "Education & Certifications",
    personalInfoText: "Innovative engineer passionate about transforming existing processes by integrating simple technologies into complex workflows. A true Swiss knife engineer, capable of juggling between technical expertise, innovation, and teamwork. Passionate about modern technologies that drive efficiency and generate real impact where true value is created. Based in Romanel, Switzerland, I lead the Innovation 4 Manufacturing program at Medtronic, covering 13 European manufacturing sites. My mission is to integrate new technologies into production lines to improve quality, reduce waste, and digitalize manufacturing processes.",
    professionalExpTitle: "Professional Experience",
    professionalExpIntro: "Currently serving as Sr. Technical Solution Engineer at Medtronic, leading the Innovation 4 Manufacturing program across 13 European manufacturing sites.\n\nMy role focuses on identifying business needs, building business cases, and driving execution of technical solutions that can be scaled across multiple sites.\n\nI combine technical engineering, project management, and business strategy to deliver impactful innovations that improve quality, reduce waste, and digitalize manufacturing processes.",
    coreSkills: "Core Technical & Professional Skills",
    modernFrameworks: "Digital & Programming Tools:",
    modernFrameworksText: "Power BI, Spotfire, MS Project, Agile, SQL, Solidworks, AutoCAD, IoT, Website Development, Python, Arduino, ESP32",
    performanceOpt: "Business & Strategic:",
    performanceOptText: "Business Case Identification, Technology Strategy, Cross-site Deployment, Supplier Development, Data Analysis, Solution-oriented Approach",
    modernCSS: "Vision Systems & AI:",
    modernCSSText: "Cognex, Keyence, Edge Learning, Machine Learning, Embedded AI, Vision Inspection Systems",
    deployment: "Manufacturing & Process Engineering:",
    deploymentText: "Process optimization, CAPA management, Quality improvement, Production monitoring, Laser welding, Gas filling processes",
    fullStack: "Project & Leadership:",
    fullStackText: "Project management, Team coordination, Cross-functional collaboration, Innovation culture promotion, Technical solution deployment",
    professionalExpClosing: "I combine hands-on technical implementation with strategic thinking to deliver scalable solutions that drive efficiency, improve quality, and create real impact across manufacturing sites.",
    experience1Title: "Sr. Technical Solution Engineer - Medtronic",
    experience1Period: "June 2021 - Now",
    experience1Location: "Switzerland, Tolochenaz",
    experience1Summary: "Leading the Innovation 4 Manufacturing program to drive technology adoption, improve product quality, reduce waste, and digitalize manufacturing processes. In a regional role covering 13 European sites, I identify business needs, create business cases, and ensure project execution. Key Achievements: Implemented production tracker for improved visibility and process efficiency; Deployed embedded learning vision system in Grenoble for precise needle detection; Launched five AI vision systems in Switzerland and Singapore, reducing defects and inspection waste; Improved cycle time by 60% and reduced costs through standardized traceability system; Promoted innovation culture, enhancing collaboration and influencing technology choices in new product development.",
    experience2Title: "Project Engineer - Medtronic",
    experience2Period: "Jun 2021 – Aug 2022",
    experience2Location: "Switzerland, Tolochenaz",
    experience2Summary: "Main project for PMO: Planning (MS Project, JIRA), team management and execution to achieve objectives. Process characterization and validation for production of Backfill and Seamweld processes.",
    experience3Title: "Manufacturing Engineer - Medtronic",
    experience3Period: "Dec 2018 - Jun 2021",
    experience3Location: "Switzerland, Tolochenaz",
    experience3Summary: "Responsible for laser welding, gas filling, and etching processes on micro-device production line. Managed CAPAs, non-conformities, and complaints to ensure compliance and continuous improvement. Production performance by monitoring key processes and executing continuous improvement projects.",
    experience4Title: "Bachelor Thesis Intern - Socorex Isba SA",
    experience4Period: "",
    experience4Location: "Switzerland, Crissier",
    experience4Summary: "Established strategic plan for new ISO 17025 calibration laboratory in Europe, assessing regional needs and identifying the most appropriate location based on business relevance and technical feasibility.",
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
    expandedView: "Expanded view",
    education: "Education",
    certifications: "Certifications",
    education1Title: "HEIG-VD - Bachelor in Engineering and Industrial Management",
    education1Period: "2014 - 2017",
    education1Location: "Switzerland",
    education1Area: "Engineering",
    education2Title: "CFC - Physics Laboratory Technician",
    education2Period: "2005 - 2009",
    education2Location: "EPFL, Switzerland",
    certification1Title: "Green Belt",
    certification1Issuer: "Medtronic",
    certification1Date: "April 2021",
    experienceTab: "Experience",
    educationTab: "Education",
    interests: "Interests",
    interestsTitle: "Interests",
    diy: "DIY",
    chillAndFun: "Chill & Fun",
    adventure: "Adventure"
  },
  fr: {
    tagline: "Développement Web Moderne & Solutions Full-Stack",
    subtitle: "Création de sites web performants et évolutifs avec des technologies de pointe et les meilleures pratiques",
    personalInfo: "À Propos de Moi",
    professionalExp: "Expérience Professionnelle",
    personalExp: "Expérience Personnelle",
    formation: "Formation & Certifications",
    personalInfoText: "Ingénieur innovant et orienté résultats, un véritable couteau suisse – polyvalent de l'expertise technique à la digitalisation, et de la mise en œuvre pratique au leadership de projet. Passionné par les solutions intelligentes et à valeur ajoutée qui stimulent l'efficacité, s'alignent sur les objectifs commerciaux et apportent un changement impactant. Basé à Romanel, Suisse, je dirige le programme Innovation 4 Manufacturing chez Medtronic, couvrant 13 sites de fabrication européens. Ma mission est d'intégrer de nouvelles technologies dans les lignes de production pour améliorer la qualité, réduire les déchets et digitaliser les processus de fabrication.",
    professionalExpTitle: "Expérience Professionnelle",
    professionalExpIntro: "Actuellement Ingénieur Senior en Solutions Techniques chez Medtronic, dirigeant le programme Innovation 4 Manufacturing sur 13 sites de fabrication européens.\n\nMon rôle se concentre sur l'identification des besoins commerciaux, la construction de business cases et le pilotage de l'exécution de solutions techniques pouvant être déployées sur plusieurs sites.\n\nJe combine ingénierie technique, gestion de projet et stratégie commerciale pour livrer des innovations impactantes qui améliorent la qualité, réduisent les déchets et digitalisent les processus de fabrication.",
    coreSkills: "Compétences Techniques & Professionnelles Clés",
    modernFrameworks: "Outils Numériques et Programmation:",
    modernFrameworksText: "Power BI, Spotfire, MS Project, Agile, SQL, Solidworks, AutoCAD, IoT, Développement de sites web, Python, Arduino, ESP32",
    performanceOpt: "Business & Stratégie:",
    performanceOptText: "Identification de Business Case, Stratégie Technologique, Déploiement multi-sites, Développement de Fournisseurs, Analyse de Données, Orienté solution",
    modernCSS: "Systèmes de Vision & IA:",
    modernCSSText: "Cognex, Keyence, Edge Learning, Machine Learning, IA Embarquée, Systèmes d'inspection visuelle",
    deployment: "Manufacturing & Ingénierie des Processus:",
    deploymentText: "Optimisation de processus, Gestion CAPA, Amélioration qualité, Surveillance de production, Soudage laser, Processus de remplissage de gaz",
    fullStack: "Projet & Leadership:",
    fullStackText: "Gestion de projet, Coordination d'équipes, Collaboration interfonctionnelle, Promotion de la culture d'innovation, Déploiement de solutions techniques",
    professionalExpClosing: "Je combine une mise en œuvre technique pratique avec une pensée stratégique pour livrer des solutions évolutives qui stimulent l'efficacité, améliorent la qualité et créent un impact réel à travers les sites de fabrication.",
    experience1Title: "Ingénieur Senior en Solutions Techniques - Medtronic",
    experience1Period: "Juin 2021 - Maintenant",
    experience1Location: "Suisse, Tolochenaz",
    experience1Summary: "Diriger le programme Innovation 4 Manufacturing pour stimuler l'adoption technologique, améliorer la qualité des produits, réduire les déchets et digitaliser les processus de fabrication. Dans un rôle régional couvrant 13 sites européens, j'identifie les besoins commerciaux, crée des business cases et assure l'exécution des projets. Réalisations Clés : Implémenté un tracker de production pour améliorer la visibilité et l'efficacité des processus ; Déployé un système de vision avec apprentissage embarqué à Grenoble pour détecter précisément les aiguilles ; Lancé cinq systèmes de vision avec IA en Suisse et à Singapour, réduisant les défauts et les déchets d'inspection ; Amélioré le temps de cycle de 60% et réduit les coûts grâce à un nouveau système de traçabilité standardisé ; Promu une culture d'innovation, améliorant la collaboration et influençant les choix technologiques dans le développement de nouveaux produits.",
    experience2Title: "Ingénieur de Projet - Medtronic",
    experience2Period: "Juin 2021 – Août 2022",
    experience2Location: "Suisse, Tolochenaz",
    experience2Summary: "Projet principal pour le PMO : Planification (MS Project, JIRA), Gestion d'équipe et exécution pour atteindre l'objectif. Caractérisation et validation pour la production des processus Backfill et Seamweld.",
    experience3Title: "Ingénieur de Fabrication - Medtronic",
    experience3Period: "Déc 2018 - Juin 2021",
    experience3Location: "Suisse, Tolochenaz",
    experience3Summary: "Responsable des processus de soudage laser, remplissage de gaz et gravure sur la ligne de production de micro-dispositifs. Géré les CAPA, non-conformités et plaintes pour assurer la conformité et l'amélioration continue. Performance de production en surveillant les processus clés et en exécutant des projets d'amélioration continue.",
    experience4Title: "Stagiaire Mémoire de Bachelor - Socorex Isba SA",
    experience4Period: "",
    experience4Location: "Suisse, Crissier",
    experience4Summary: "Établir un plan stratégique pour un nouveau laboratoire d'étalonnage ISO 17025 en Europe, évaluant les besoins régionaux et identifiant l'emplacement le plus approprié basé sur la pertinence commerciale et la faisabilité technique.",
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
    expandedView: "Vue agrandie",
    education: "Formation",
    certifications: "Certifications",
    education1Title: "HEIG-VD - Bachelor en Ingénierie et Gestion Industrielle",
    education1Period: "2014 - 2017",
    education1Location: "Suisse",
    education1Area: "Ingénierie",
    education2Title: "CFC - Technicien de Laboratoire de Physique",
    education2Period: "2005 - 2009",
    education2Location: "EPFL, Suisse",
    certification1Title: "Green Belt",
    certification1Issuer: "Medtronic",
    certification1Date: "Avril 2021",
    experienceTab: "Expérience",
    educationTab: "Formation",
    interests: "Centres d'intérêt",
    interestsTitle: "Centres d'intérêt",
    diy: "DIY",
    chillAndFun: "Chill & Fun",
    adventure: "Aventure"
  }
};

// Interests data
const interestsData = {
  en: {
    diy: {
      name: "DIY",
      keywords: ["Application Development", "Website", "ESP32", "Arduino", "Python", "Gardening", "Motorcycle Mechanics", "3D Printing"]
    },
    chillAndFun: {
      name: "Chill & Fun",
      keywords: ["Cooking", "Reading Joe Dicker", "Cycling", "Zythology", "Family Meals"]
    },
    adventure: {
      name: "Adventure",
      keywords: ["Motorcycle Tour", "Ski Touring", "Mountain Outing", "Camping & Barbecue"]
    }
  },
  fr: {
    diy: {
      name: "DIY",
      keywords: ["Développement d'Applications", "Site Web", "ESP32", "Arduino", "Python", "Jardinage", "Mécanique moto", "3D printing"]
    },
    chillAndFun: {
      name: "Chill & Fun",
      keywords: ["Cuisine", "Lecture de Joe Dicker", "Vélo", "Zythologie", "Repas de famille"]
    },
    adventure: {
      name: "Aventure",
      keywords: ["Moto tour", "Ski de Randonnée", "Sortie montagne", "Camping & Grillade"]
    }
  }
};

// Radar chart data - interest levels (0-100)
const radarData = {
  diy: 90,
  adventure: 85,
  chillAndFun: 70
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [professionalView, setProfessionalView] = useState<"experience" | "education">("experience");
  const [showScrollTop, setShowScrollTop] = useState(false);
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

  // Show scroll to top button when at the bottom of the page
  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrolledToBottom = scrollTop + windowHeight >= documentHeight - 100; // 100px threshold from bottom
      setShowScrollTop(scrolledToBottom);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12">
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
      
      <div className="text-center space-y-12 w-full flex-shrink-0">
        {/* Name/Title */}
        <div className="flex flex-col items-center mb-24">
          <h1 className="text-6xl md:text-8xl font-medium text-[#6C7587] mb-12">
            Simon Cottier
          </h1>
          <div className="flex gap-8 mb-12">
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
            <button 
              className="neumorphic-circle-icon-btn"
              onClick={() => window.open('https://www.linkedin.com/in/simoncottier/', '_blank', 'noopener,noreferrer')}
            >
              <Image
                src="/icon/icons8-linkedin-24.png"
                alt="LinkedIn icon"
                width={24}
                height={24}
              />
            </button>
            <button className="neumorphic-circle-icon-btn">
              <Image
                src="/icon/icons8-share-24.png"
                alt="Share icon"
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
        <div className="flex flex-col md:flex-row gap-12 justify-center items-stretch md:items-center relative w-full max-w-4xl mx-auto px-4 flex-shrink-0 mt-8" style={{ minHeight: '120px' }}>
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
              width={24}
              height={24}
              className="mr-3"
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
            <Image
              src="/icon/icons8-administrator-male-24.png"
              alt="Administrator icon"
              width={24}
              height={24}
              className="mr-3"
            />
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
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icon/icons8-connect-24.png"
                      alt="Connect icon"
                      width={24}
                      height={24}
                    />
                    <span>{t.conception3D}</span>
                  </div>
                </button>
                <button
                  className="neumorphic-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    setSelectedSection(null);
                    setSelectedMenuItem(null);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icon/icons8-job-24.png"
                      alt="Job icon"
                      width={24}
                      height={24}
                    />
                    <span>{t.mechanical}</span>
                  </div>
                </button>
                <button
                  className="neumorphic-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    setSelectedSection(null);
                    setSelectedMenuItem("digitalization");
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icon/icons8-application-window-25.png"
                      alt="Application window icon"
                      width={24}
                      height={24}
                    />
                    <span>{t.digitalization}</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section Content - Fixed position to avoid layout shift */}
        <div className="mt-12 w-full px-4 min-h-[200px] flex-shrink-0">
          {selectedSection && !showMenu && (
            <>
              {selectedSection === "personal-info" && (
              <div className="neumorphic-content max-w-4xl mx-auto">
                <h2 className="text-3xl font-medium mb-6 text-[#6C7587]">{t.personalInfo}</h2>
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="flex-shrink-0">
                    <div className="neumorphic-image-container" style={{ borderRadius: '16px' }}>
                      <div style={{ 
                        width: '200px', 
                        height: '200px', 
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        background: 'radial-gradient(circle, rgba(235, 236, 240, 0.3) 0%, rgba(235, 236, 240, 0.8) 50%, rgba(235, 236, 240, 1) 100%)'
                      }}>
                        <div style={{
                          position: 'absolute',
                          inset: '20px',
                          borderRadius: '12px',
                          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                          pointerEvents: 'none',
                          zIndex: 1
                        }}></div>
                        <Image
                          src="/images/me.png"
                          alt="Simon Cottier"
                          width={200}
                          height={200}
                          className="neumorphic-image"
                          style={{ 
                            aspectRatio: '1/1', 
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            zIndex: 0
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '16px',
                          background: 'radial-gradient(circle at center, transparent 40%, rgba(235, 236, 240, 0.4) 60%, rgba(235, 236, 240, 0.9) 100%)',
                          pointerEvents: 'none',
                          zIndex: 2
                        }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-[#8992A5] leading-relaxed">
                      {t.personalInfoText}
                    </p>
                  </div>
                </div>

                {/* Interests Section */}
                <div className="mt-12">
                  <h3 className="text-2xl font-medium mb-6 text-[#6C7587]">{t.interestsTitle}</h3>
                  
                  {/* Cube Grid Animation */}
                  <div className="cube-grid-wrapper cube-grid-neumorphic mb-12 relative">
                    <div className="cube-grid" style={{ '--n': 4 } as React.CSSProperties}>
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="cube"></div>
                      ))}
                    </div>
                  </div>

                  {/* Interest Tags */}
                  <div className="space-y-4">
                    {Object.values(interestsData[language]).map((category, index) => {
                      const isAdventure = category.name === "Adventure" || category.name === "Aventure";
                      const isChillAndFun = category.name === "Chill & Fun";
                      const isDIY = category.name === "DIY";
                      const hasDropShadow = isAdventure || isChillAndFun || isDIY;
                      return (
                        <div key={index} className="neumorphic-content-box">
                          <h4 className="text-lg font-medium text-[#6C7587] mb-3">{category.name}</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.keywords.map((keyword, keywordIndex) => {
                              // Use medium grey for drop shadow sections (DIY, Chill & Fun, Adventure) for better readability
                              const textColor = hasDropShadow ? '#7B8A9F' : '#8992A5';
                              
                              return (
                                <span
                                  key={keywordIndex}
                                  className={`px-3 py-1.5 rounded-full text-sm ${
                                    hasDropShadow ? 'interest-adventure-keyword' : 'bg-[#EBECF0]'
                                  }`}
                                  style={{
                                    color: textColor,
                                    backgroundColor: hasDropShadow ? '#E0E4E8' : '#EBECF0',
                                    WebkitFontSmoothing: 'antialiased',
                                    MozOsxFontSmoothing: 'grayscale',
                                    ...(hasDropShadow
                                      ? {
                                          // Darker background, no border
                                        }
                                      : {
                                          boxShadow: 'inset 1px 1px 2px rgba(72, 79, 96, 0.1), inset -1px -1px 2px rgba(255, 255, 255, 0.8)'
                                        })
                                  }}
                                >
                                  {keyword}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

              {selectedSection === "professional-exp" && (
              <div className="neumorphic-content max-w-4xl mx-auto">
                <h2 className="text-3xl font-medium mb-6 text-[#6C7587]">{t.professionalExpTitle}</h2>
                
                <div className="text-lg text-[#8992A5] leading-relaxed space-y-4">
                  <p className="whitespace-pre-line leading-relaxed">
                    {t.professionalExpIntro}
                  </p>

                  {/* Core Skills - Always Visible */}
                  <div className="mt-6">
                    <h3 className="text-xl font-medium text-[#6C7587] mb-3">{t.coreSkills}</h3>
                    <ul className="list-disc list-inside space-y-3 ml-4">
                      <li className="leading-relaxed"><strong>{t.modernFrameworks}</strong> {t.modernFrameworksText}</li>
                      <li className="leading-relaxed"><strong>{t.performanceOpt}</strong> {t.performanceOptText}</li>
                      <li className="leading-relaxed"><strong>{t.modernCSS}</strong> {t.modernCSSText}</li>
                      <li className="leading-relaxed"><strong>{t.deployment}</strong> {t.deploymentText}</li>
                      <li className="leading-relaxed"><strong>{t.fullStack}</strong> {t.fullStackText}</li>
                    </ul>
                  </div>

                  {/* Closing Text - Always Visible */}
                  <p className="mt-6">
                    {t.professionalExpClosing}
                  </p>

                {/* Slide Toggle Button */}
                <div className="flex justify-center mt-6 mb-6">
                  <div className="neumorphic-slide-toggle">
                    <div className="neumorphic-slide-toggle-track">
                      <div 
                        className={`neumorphic-slide-toggle-slider ${professionalView === "education" ? "slide-right" : ""}`}
                      ></div>
                      <button
                        className={`neumorphic-slide-toggle-btn ${professionalView === "experience" ? "active" : ""}`}
                        onClick={() => setProfessionalView("experience")}
                      >
                        <Image
                          src="/icon/icons8-job-24.png"
                          alt="Job icon"
                          width={20}
                          height={20}
                        />
                        {t.experienceTab}
                      </button>
                      <button
                        className={`neumorphic-slide-toggle-btn ${professionalView === "education" ? "active" : ""}`}
                        onClick={() => setProfessionalView("education")}
                      >
                        <Image
                          src="/icon/icons8-graduation-cap-24.png"
                          alt="Graduation cap icon"
                          width={20}
                          height={20}
                        />
                        {t.educationTab}
                      </button>
                    </div>
                  </div>
                </div>

                {professionalView === "experience" && (
                  <div className="text-lg text-[#8992A5] leading-relaxed space-y-4">
                    {/* Experience Section */}
                    <div>
                      <h3 className="text-xl font-medium text-[#6C7587] mb-4">{t.experienceTab}</h3>
                      
                      {/* Work Experience Timeline */}
                      <div className="space-y-4">
                      <div className="neumorphic-content-box">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-medium text-[#6C7587]">{t.experience1Title}</h3>
                            <p className="text-sm text-[#8992A5] mt-1">{t.experience1Location}</p>
                          </div>
                          <span className="text-sm font-medium text-[#6C7587] mt-2 md:mt-0">{t.experience1Period}</span>
                        </div>
                        <p className="text-base text-[#8992A5] leading-relaxed">{t.experience1Summary}</p>
                      </div>

                      <div className="neumorphic-content-box">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-medium text-[#6C7587]">{t.experience2Title}</h3>
                            <p className="text-sm text-[#8992A5] mt-1">{t.experience2Location}</p>
                          </div>
                          <span className="text-sm font-medium text-[#6C7587] mt-2 md:mt-0">{t.experience2Period}</span>
                        </div>
                        <p className="text-base text-[#8992A5] leading-relaxed">{t.experience2Summary}</p>
                      </div>

                      <div className="neumorphic-content-box">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-medium text-[#6C7587]">{t.experience3Title}</h3>
                            <p className="text-sm text-[#8992A5] mt-1">{t.experience3Location}</p>
                          </div>
                          <span className="text-sm font-medium text-[#6C7587] mt-2 md:mt-0">{t.experience3Period}</span>
                        </div>
                        <p className="text-base text-[#8992A5] leading-relaxed">{t.experience3Summary}</p>
                      </div>

                      <div className="neumorphic-content-box">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-medium text-[#6C7587]">{t.experience4Title}</h3>
                            <p className="text-sm text-[#8992A5] mt-1">{t.experience4Location}</p>
                          </div>
                          {t.experience4Period && (
                            <span className="text-sm font-medium text-[#6C7587] mt-2 md:mt-0">{t.experience4Period}</span>
                          )}
                        </div>
                        <p className="text-base text-[#8992A5] leading-relaxed">{t.experience4Summary}</p>
                      </div>
                      </div>
                    </div>
                  </div>
                )}

                {professionalView === "education" && (
                  <div className="text-lg text-[#8992A5] leading-relaxed space-y-4">
                    {/* Education Section */}
                    <div>
                      <h3 className="text-xl font-medium text-[#6C7587] mb-4">{t.education}</h3>
                      <div className="space-y-4">
                        <div className="neumorphic-content-box">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-medium text-[#6C7587]">{t.education1Title}</h4>
                              <p className="text-sm text-[#8992A5] mt-1">{t.education1Location}</p>
                            </div>
                            <span className="text-sm font-medium text-[#6C7587] mt-2 md:mt-0">{t.education1Period}</span>
                          </div>
                          <p className="text-base text-[#8992A5]">{t.education1Area}</p>
                        </div>

                        <div className="neumorphic-content-box">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-medium text-[#6C7587]">{t.education2Title}</h4>
                              <p className="text-sm text-[#8992A5] mt-1">{t.education2Location}</p>
                            </div>
                            <span className="text-sm font-medium text-[#6C7587] mt-2 md:mt-0">{t.education2Period}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certifications Section */}
                    <div className="mt-8">
                      <h3 className="text-xl font-medium text-[#6C7587] mb-4">{t.certifications}</h3>
                      <div className="space-y-4">
                        <div className="neumorphic-content-box">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-medium text-[#6C7587]">{t.certification1Title}</h4>
                              <p className="text-sm text-[#8992A5] mt-1">{t.certification1Issuer}</p>
                            </div>
                            <span className="text-sm font-medium text-[#6C7587] mt-2 md:mt-0">{t.certification1Date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          className="neumorphic-scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <Image
            src="/icon/icons8-collapse-arrow-24.png"
            alt="Scroll to top"
            width={24}
            height={24}
          />
        </button>
      )}
    </main>
  );
}
