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
    personalInfoText: "Self-taught technology enthusiast passionate about making things easier through smart deployment of new technologies. My approach: identify problems, design solutions, deliver results end-to-end.\n\nTrue 4x4 engineer adapting across any technical challenge—web development, mechanical design, IoT systems, manufacturing solutions. Grew up in Switzerland with CFC Physics Laboratory Technician and Industrial Engineering degree.\n\nBeyond technology, I find inspiration in nature through overlanding and outdoor exploration. Today focused on creating innovative B2C solutions with real value through thoughtful design and practical implementation.",
    professionalExpTitle: "Professional Experience",
    professionalExpIntro: "Sr. Technical Solution Engineer at Medtronic leading Innovation 4 Manufacturing across 13 European sites. Identifying business needs, building cases, and executing scalable technical solutions. Combining engineering, project management, and business strategy to improve quality, reduce waste, and digitalize manufacturing.",
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
    professionalExpClosing: "Hands-on technical implementation with strategic thinking for scalable solutions driving efficiency, quality, and real impact.",
    experience1Title: "Sr. Technical Solution Engineer - Medtronic",
    experience1Period: "June 2021 - Now",
    experience1Location: "Switzerland, Tolochenaz",
    experience1Summary: "Leading Innovation 4 Manufacturing across 13 European sites—identifying needs, building cases, executing projects. Key wins: Production tracker for visibility; Embedded AI vision in Grenoble for needle detection; Five AI systems reducing defects; 60% cycle time improvement with traceability; Innovation culture promotion.",
    experience2Title: "Project Engineer - Medtronic",
    experience2Period: "Jun 2021 – Aug 2022",
    experience2Location: "Switzerland, Tolochenaz",
    experience2Summary: "PMO project planning (MS Project, JIRA), team management, execution. Process characterization and validation for Backfill and Seamweld production.",
    experience3Title: "Manufacturing Engineer - Medtronic",
    experience3Period: "Dec 2018 - Jun 2021",
    experience3Location: "Switzerland, Tolochenaz",
    experience3Summary: "Laser welding, gas filling, etching processes on micro-device line. Managed CAPAs, non-conformities, complaints for compliance. Monitored production performance with continuous improvement projects.",
    experience4Title: "Bachelor Thesis Intern - Socorex Isba SA",
    experience4Period: "",
    experience4Location: "Switzerland, Crissier",
    experience4Summary: "Strategic plan for ISO 17025 calibration laboratory in Europe, assessing regional needs and optimal location based on business relevance and feasibility.",
    portfolioTitle: "This Portfolio Website",
    portfolioText1: "Live demonstration of modern web development with Next.js 14, React, and TypeScript. Custom neumorphic design system with optimized performance and smooth animations. Server-side rendering, responsive design, and efficient user experience.",
    portfolioTech: "Built With: Next.js 14 • React • TypeScript • Tailwind CSS • Custom CSS Architecture • Image Optimization • Responsive Design",
    cocoflowText1: "High-performance web application built with React and Next.js, hosted on Vercel with edge computing and CDN distribution. Mobile-first responsive design with SEO optimization and performance monitoring. Complete project lifecycle from design to deployment including domain configuration, analytics, and secure contact forms.",
    cocoflowTech: "Key Highlights: React • Next.js • TypeScript • Vercel Edge Network • Custom CSS • Responsive Design • Performance Optimized • SEO Friendly",
    littlemarketText1: "Sophisticated e-commerce platform with full product catalog, dynamic filtering, and advanced search functionality. Complete shopping cart system with real-time inventory, secure payment integration, and order tracking. Admin dashboard for product management with responsive design across all devices.",
    littlemarketTech: "Technical Features: E-commerce Platform • Dynamic Filtering & Search • Shopping Cart System • Secure Payment Integration • Admin Dashboard • Responsive Design • Real-time Inventory • Order Management",
    motomeshText1: "Full-stack IoT web application with real-time sensor data visualization and live dashboard updates. MQTT integration with TimescaleDB on Supabase for efficient data streaming and time-series processing. Scalable architecture with intuitive data visualization and optimized performance for continuous data streams.",
    motomeshTech: "Web Technologies: Real-time Web Dashboard • MQTT Integration • RESTful APIs • Time-Series Data Visualization • Responsive UI • Performance Optimization",
    digitalization: "Digitalization",
    conception3D: "3D Conception",
    conception3DTitle: "3D Design & CAD Projects",
    conception3DText: "Building prototypes and components for vehicle applications with specific mechanical constraints. Creating detailed 3D models using AutoCAD, Fusion 360, and SolidWorks. Collaborating with suppliers for 3D printing or CNC machining to deliver functional, manufacturable components.",
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
    personalInfoText: "Passionné technologie autodidacte pour rendre les choses plus faciles via déploiement intelligent. Mon approche : identifier problèmes, concevoir solutions, livrer résultats de bout en bout.\n\nIngénieur 4x4 s'adaptant à tout défi technique—développement web, conception mécanique, systèmes IoT, solutions fabrication. Grandi en Suisse avec CFC Laborantin Physique et diplôme Ingénieur Industriel.\n\nAu-delà de la technologie, inspiration de la nature via overlanding et exploration. Aujourd'hui concentré sur solutions B2C innovantes avec vraie valeur via conception réfléchie et mise en œuvre pratique.",
    professionalExpTitle: "Expérience Professionnelle",
    professionalExpIntro: "Ingénieur Senior Solutions Techniques chez Medtronic dirigeant Innovation 4 Manufacturing sur 13 sites européens. Identification besoins, construction cases, exécution solutions techniques évolutives. Combinant ingénierie, gestion projet et stratégie pour améliorer qualité, réduire déchets, digitaliser fabrication.",
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
    professionalExpClosing: "Mise en œuvre technique pratique avec pensée stratégique pour solutions évolutives stimulant efficacité, qualité et impact réel.",
    experience1Title: "Ingénieur Senior en Solutions Techniques - Medtronic",
    experience1Period: "Juin 2021 - Maintenant",
    experience1Location: "Suisse, Tolochenaz",
    experience1Summary: "Direction Innovation 4 Manufacturing sur 13 sites européens—identification besoins, création cases, exécution projets. Réalisations : Tracker production pour visibilité ; Vision AI embarquée Grenoble détection aiguilles ; Cinq systèmes AI réduisant défauts ; 60% amélioration cycle via traçabilité ; Promotion culture innovation.",
    experience2Title: "Ingénieur de Projet - Medtronic",
    experience2Period: "Juin 2021 – Août 2022",
    experience2Location: "Suisse, Tolochenaz",
    experience2Summary: "Projet PMO planification (MS Project, JIRA), gestion équipe, exécution. Caractérisation validation production processus Backfill et Seamweld.",
    experience3Title: "Ingénieur de Fabrication - Medtronic",
    experience3Period: "Déc 2018 - Juin 2021",
    experience3Location: "Suisse, Tolochenaz",
    experience3Summary: "Soudage laser, remplissage gaz, gravure ligne micro-dispositifs. Gestion CAPA, non-conformités, plaintes pour conformité. Performance production avec projets amélioration continue.",
    experience4Title: "Stagiaire Mémoire de Bachelor - Socorex Isba SA",
    experience4Period: "",
    experience4Location: "Suisse, Crissier",
    experience4Summary: "Plan stratégique laboratoire étalonnage ISO 17025 en Europe, évaluation besoins régionaux et localisation optimale selon pertinence commerciale et faisabilité.",
    portfolioTitle: "Ce Site Portfolio",
    portfolioText1: "Démonstration en direct du développement web moderne avec Next.js 14, React et TypeScript. Système de design néomorphique personnalisé avec performances optimisées et animations fluides. Rendu côté serveur, design responsive et expérience utilisateur efficace.",
    portfolioTech: "Construit Avec: Next.js 14 • React • TypeScript • Tailwind CSS • Architecture CSS Personnalisée • Optimisation d'Images • Design Responsive",
    cocoflowText1: "Application web haute performance construite avec React et Next.js, hébergée sur Vercel avec edge computing et distribution CDN. Design responsive mobile-first avec optimisation SEO et surveillance des performances. Cycle de vie complet du projet de la conception au déploiement incluant configuration domaine, analytics et formulaires sécurisés.",
    cocoflowTech: "Points Clés: React • Next.js • TypeScript • Réseau Edge Vercel • CSS Personnalisé • Design Responsive • Optimisé pour les Performances • SEO Friendly",
    littlemarketText1: "Plateforme e-commerce sophistiquée avec catalogue produits complet, filtrage dynamique et recherche avancée. Système de panier complet avec inventaire temps réel, intégration paiement sécurisé et suivi des commandes. Tableau de bord admin pour la gestion produits avec design responsive sur tous les appareils.",
    littlemarketTech: "Fonctionnalités Techniques: Plateforme E-commerce • Filtrage & Recherche Dynamiques • Système de Panier • Intégration Paiement Sécurisé • Tableau de Bord Admin • Design Responsive • Inventaire Temps Réel • Gestion des Commandes",
    motomeshText1: "Application web IoT full-stack avec visualisation données capteurs en temps réel et mises à jour tableau de bord en direct. Intégration MQTT avec TimescaleDB sur Supabase pour streaming données efficace et traitement séries temporelles. Architecture évolutive avec visualisation données intuitive et performances optimisées pour flux données continus.",
    motomeshTech: "Technologies Web: Tableau de Bord Temps Réel • Intégration MQTT • APIs RESTful • Visualisation de Données Temporelles • UI Responsive • Optimisation des Performances",
    digitalization: "Digitalisation",
    conception3D: "Conception 3D",
    conception3DTitle: "Projets de Conception 3D & CAO",
    conception3DText: "Construction prototypes et composants pour applications véhiculaires avec contraintes mécaniques spécifiques. Création modèles 3D détaillés via AutoCAD, Fusion 360 et SolidWorks. Collaboration fournisseurs pour impression 3D ou usinage CNC livrant composants fonctionnels et fabricables.",
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
      <div className="text-center space-y-12 w-full flex-shrink-0">
        {/* Name/Title */}
        <div className="flex flex-col items-center mb-16 md:mb-24">
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
          
          {/* Language Selector */}
          <div className="flex justify-center mb-8">
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

          <p className="text-xl md:text-2xl text-[#8992A5] font-light">
            {t.tagline}
          </p>
          <p className="text-base md:text-lg text-[#8992A5] font-light mt-2 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        {/* Three Neumorphic Buttons */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-stretch md:items-center relative w-full max-w-4xl mx-auto px-4 flex-shrink-0 mt-8" style={{ minHeight: '120px' }}>
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
            />
            {t.personalInfo}
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
              <span className="flex items-center gap-2">
                <Image
                  src="/icon/icons8-male-user-25.png"
                  alt="User icon"
                  width={24}
                  height={24}
                />
                {t.personalExp}
              </span>
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
                    setSelectedMenuItem("3d-conception");
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
            />
            {t.professionalExp}
          </button>
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
                    <Image
                      src="/images/me.png"
                      alt="Simon Cottier"
                      width={200}
                      height={200}
                      style={{ 
                        borderRadius: '16px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-[#8992A5] leading-relaxed whitespace-pre-line">
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
                <div className="text-base text-[#8992A5] leading-relaxed mb-6">
                  <p className="mb-4">
                    {t.portfolioText1}
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
                <div className="text-base text-[#8992A5] leading-relaxed mb-6">
                  <p className="mb-4">
                    {t.cocoflowText1}
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
              <div className="neumorphic-content-box w-full text-left">
                <div className="flex items-center justify-start gap-3 mb-4">
                  <a 
                    href="https://www.littlemarket.ch" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl font-medium text-[#6C7587] hover:underline cursor-pointer"
                  >
                    Littlemarket.ch
                  </a>
                  <Image
                    src="/icon/icons8-internet-24.png"
                    alt="Internet icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="text-base text-[#8992A5] leading-relaxed mb-6">
                  <p className="mb-4">
                    {t.littlemarketText1}
                  </p>
                  <p className="font-medium text-[#6C7587]">
                    {t.littlemarketTech}
                  </p>
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <div 
                    className="neumorphic-image-container cursor-pointer"
                    onClick={() => setExpandedImage("/screenshots/littlemarket1.png")}
                  >
                    <Image
                      src="/screenshots/littlemarket1.png"
                      alt="Littlemarket screenshot 1"
                      width={400}
                      height={225}
                      className="neumorphic-image"
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer"
                    onClick={() => setExpandedImage("/screenshots/littlemarket2.png")}
                  >
                    <Image
                      src="/screenshots/littlemarket2.png"
                      alt="Littlemarket screenshot 2"
                      width={400}
                      height={225}
                      className="neumorphic-image"
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer"
                    onClick={() => setExpandedImage("/screenshots/littlemarket3.png")}
                  >
                    <Image
                      src="/screenshots/littlemarket3.png"
                      alt="Littlemarket screenshot 3"
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
                <div className="text-base text-[#8992A5] leading-relaxed mb-6">
                  <p className="mb-4">
                    {t.motomeshText1}
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
              </div>
            </div>
          )}

          {/* 3D Conception Gallery */}
          {selectedMenuItem === "3d-conception" && !showMenu && (
            <div className="flex flex-col gap-6 justify-center items-center w-full max-w-6xl mx-auto px-4">
              <div className="neumorphic-content-box w-full text-left">
                <div className="flex items-center justify-start gap-3 mb-4">
                  <h3 className="text-xl font-medium text-[#6C7587]">{t.conception3DTitle}</h3>
                  <Image
                    src="/icon/icons8-connect-24.png"
                    alt="3D icon"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="text-base text-[#8992A5] leading-relaxed mb-6">
                  <p>{t.conception3DText}</p>
                </div>
                
                {/* Instagram-style Grid Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div 
                    className="neumorphic-image-container cursor-pointer aspect-square"
                    onClick={() => setExpandedImage("/screenshots/3D_56_2.png")}
                  >
                    <Image
                      src="/screenshots/3D_56_2.png"
                      alt="3D Design"
                      width={300}
                      height={300}
                      className="neumorphic-image"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer aspect-square"
                    onClick={() => setExpandedImage("/screenshots/3D_56.png")}
                  >
                    <Image
                      src="/screenshots/3D_56.png"
                      alt="3D Design"
                      width={300}
                      height={300}
                      className="neumorphic-image"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer aspect-square"
                    onClick={() => setExpandedImage("/screenshots/3D_bequille.png")}
                  >
                    <Image
                      src="/screenshots/3D_bequille.png"
                      alt="3D Design"
                      width={300}
                      height={300}
                      className="neumorphic-image"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer aspect-square"
                    onClick={() => setExpandedImage("/screenshots/3D_CNC.png")}
                  >
                    <Image
                      src="/screenshots/3D_CNC.png"
                      alt="3D Design"
                      width={300}
                      height={300}
                      className="neumorphic-image"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer aspect-square"
                    onClick={() => setExpandedImage("/screenshots/3D_Compteur.png")}
                  >
                    <Image
                      src="/screenshots/3D_Compteur.png"
                      alt="3D Design"
                      width={300}
                      height={300}
                      className="neumorphic-image"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer aspect-square"
                    onClick={() => setExpandedImage("/screenshots/3D_ConceptionMachine.png")}
                  >
                    <Image
                      src="/screenshots/3D_ConceptionMachine.png"
                      alt="3D Design"
                      width={300}
                      height={300}
                      className="neumorphic-image"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer aspect-square"
                    onClick={() => setExpandedImage("/screenshots/3D_grille.png")}
                  >
                    <Image
                      src="/screenshots/3D_grille.png"
                      alt="3D Design"
                      width={300}
                      height={300}
                      className="neumorphic-image"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                  </div>
                  <div 
                    className="neumorphic-image-container cursor-pointer aspect-square"
                    onClick={() => setExpandedImage("/screenshots/3D_salamontes.png")}
                  >
                    <Image
                      src="/screenshots/3D_salamontes.png"
                      alt="3D Design"
                      width={300}
                      height={300}
                      className="neumorphic-image"
                      style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expanded Image Modal - Shared by all sections */}
        {expandedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setExpandedImage(null)}
          >
            <div 
              className="neumorphic-image-modal relative max-w-7xl w-full max-h-[95vh] cursor-pointer"
              onClick={() => setExpandedImage(null)}
            >
              <Image
                src={expandedImage}
                alt={t.expandedView}
                width={1920}
                height={1080}
                className="w-full h-auto rounded-2xl"
                style={{ maxHeight: '90vh', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
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
