import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = ({ cvData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Simon's AI assistant. Ask me anything about his experience, skills, or background!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show popup notification after 3 seconds when site loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
        // Auto-hide popup after 5 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Extract data from CV
    const { basics, sections, personalInfo } = cvData;
    const experiences = sections.experience?.items || [];
    const skills = sections.skills?.items || [];
    const education = sections.education?.items || [];
    const languages = sections.languages?.items || [];
    const interests = sections.interests?.items || [];
    
    // Extract personal information for richer responses
    const personality = personalInfo?.personality || {};
    const background = personalInfo?.background || {};
    const currentRole = personalInfo?.currentRole || {};
    const achievements = personalInfo?.achievements || {};
    const personalInterests = personalInfo?.interests || {};
    const philosophy = personalInfo?.philosophy || {};
    const socialMedia = personalInfo?.socialMedia || {};
    
    // Extract profiles information
    const profiles = sections?.profiles?.items || [];

    // Simple keyword-based responses
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      const currentRole = experiences[0];
      return `Simon is currently working as a ${currentRole?.position} at ${currentRole?.company} since ${currentRole?.date}. He has experience in manufacturing engineering, vision systems, and process optimization. Would you like to know more about any specific role?`;
    }

    if (message.includes('skill') || message.includes('technology') || message.includes('programming')) {
      const skillList = skills.map(skill => skill.name).join(', ');
      return `Simon has expertise in: ${skillList}. His technical skills include vision systems, AI/ML, programming, and business strategy. Which area interests you most?`;
    }

    if (message.includes('education') || message.includes('study') || message.includes('university')) {
      const eduList = education.map(edu => `${edu.institution} (${edu.date})`).join(', ');
      return `Simon studied at: ${eduList}. He has a strong engineering background with practical experience.`;
    }

    if (message.includes('language') || message.includes('speak')) {
      const langList = languages.map(lang => `${lang.name} (${lang.level}/5)`).join(', ');
      return `Simon speaks: ${langList}. He's multilingual and has worked in international environments.`;
    }

    if (message.includes('medtronic') || message.includes('current')) {
      return `At Medtronic, Simon leads the Innovation 4 Manufacturing program across 13 European sites. He's deployed AI-based vision systems, reduced cycle times by 60%, and improved manufacturing processes. He's passionate about smart, value-added solutions!`;
    }

    if (message.includes('vision') || message.includes('ai') || message.includes('automation')) {
      return `Simon specializes in AI-enabled vision systems! He's deployed systems using Cognex ViDi, reduced defects, and improved inspection processes. He's worked with edge learning, machine learning, and embedded AI solutions.`;
    }

    if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
      return `You can reach Simon at ${basics.email} or ${basics.phone}. He's based in ${basics.location}.`;
    }

    if (message.includes('hobby') || message.includes('interest') || message.includes('free time')) {
      const interestList = interests.map(interest => interest.name).join(', ');
      return `Outside of work, Simon enjoys: ${interestList}. He loves coding, mechanical projects, and outdoor adventures like ski touring!`;
    }

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! I'm here to help you learn about Simon Cottier. Feel free to ask about his experience, skills, education, or anything else you'd like to know!`;
    }

    if (message.includes('personality') || message.includes('character') || message.includes('person')) {
      const traits = personality.traits?.join(', ') || 'innovative and results-driven';
      return `Simon is ${traits}. ${personality.approach || 'He focuses on smart, value-added solutions that drive efficiency and align with business goals.'}`;
    }

    if (message.includes('switzerland') || message.includes('swiss') || message.includes('location')) {
      return `${background.nickname || 'Simon is based in Switzerland'} - specifically in ${basics.location}. He's known as a "Swiss knife engineer" for his versatility from technical expertise to digitalization!`;
    }

    if (message.includes('innovation') || message.includes('manufacturing') || message.includes('digitalization')) {
      return `${currentRole.focus || 'Simon leads innovation programs'} with a scope covering ${currentRole.scope || 'multiple European sites'}. His expertise includes ${currentRole.expertise || 'technology adoption and manufacturing digitalization'}. Recent achievements include ${achievements.recent?.slice(0, 2).join(' and ') || 'implementing AI systems and improving processes'}.`;
    }

    if (message.includes('philosophy') || message.includes('approach') || message.includes('believe')) {
      return `Simon believes in ${philosophy.work || 'combining technical expertise with business strategy'}. He ${philosophy.innovation || 'focuses on practical innovations that deliver real impact'} and ${philosophy.collaboration || 'works closely with leadership and suppliers for scalable solutions'}.`;
    }

    if (message.includes('arduino') || message.includes('iot') || message.includes('coding projects')) {
      return `Simon loves hands-on coding projects! His interests include ${personalInterests.coding || 'Arduino, ESP32, IoT projects, Python automation, and AI experimentation'}. He's always experimenting with new technologies and automation solutions.`;
    }

    if (message.includes('motorbike') || message.includes('motorcycle') || message.includes('3d print') || message.includes('mechanical')) {
      return `On the mechanical side, Simon enjoys ${personalInterests.mechanical || 'motorbike maintenance, 3D printing, welding, and electronics'}. He's a hands-on engineer who loves working with both digital and physical systems!`;
    }

    if (message.includes('ski') || message.includes('hiking') || message.includes('outdoor') || message.includes('adventure')) {
      return `Simon is passionate about outdoor adventures! He enjoys ${personalInterests.outdoor || 'hiking, ski touring, and motorcycle adventures'}. Fun fact: he ${personalInterests.community || 'organizes annual ski weekends for 250+ people in the Medtronic social club'}!`;
    }

    if (message.includes('erasmus') || message.includes('germany') || message.includes('international')) {
      return `Simon has international experience! He did an ${personalInfo.education?.international || 'ERASMUS exchange in Germany for language immersion'}, which helped him become fluent in German and gain multicultural perspective.`;
    }

    if (message.includes('age') || message.includes('old') || message.includes('born') || message.includes('lausanne')) {
      return `Simon is ${background.age || '36'} years old and was ${background.birthplace || 'born and raised in Lausanne, Switzerland'}. ${background.educationJourney || 'He initially studied civil engineering at EPFL, then found his passion in systems engineering at HEIG-VD'}.`;
    }

    if (message.includes('cooking') || message.includes('food') || message.includes('cuisine')) {
      return `${personalInterests.culinary || 'Simon is passionate about cooking and exploring different cuisines'}! He loves discovering new flavors and cooking techniques. Food is one of his ways to connect with different cultures during his travels.`;
    }

    if (message.includes('travel') || message.includes('culture') || message.includes('morocco') || message.includes('adventure')) {
      return `Simon loves ${personalInterests.travel || 'adventure travel and cultural discovery'}! He had an amazing ${personalInterests.travel?.includes('Morocco') ? 'motorcycle trip to Morocco' : 'motorcycle adventure to Morocco'} - what an incredible experience! ${personalInterests.futureGoals || 'He dreams of overlanding through Africa'}.`;
    }

    if (message.includes('vintage') || message.includes('old bike') || message.includes('restore') || message.includes('rebuild')) {
      return `Simon has a real passion for ${personalInterests.mechanical || 'rebuilding vintage motorcycles'}! He loves the challenge of buying really old bikes and bringing them back to life. It's the perfect combination of his mechanical skills and love for motorcycles.`;
    }

    if (message.includes('africa') || message.includes('overland') || message.includes('dream') || message.includes('future')) {
      return `${personalInterests.futureGoals || 'Simon dreams of overlanding through Africa'}! After his incredible motorcycle adventure in Morocco, he's inspired to explore more of the African continent. It's the perfect blend of his love for adventure, motorcycles, and cultural discovery.`;
    }

    if (message.includes('epfl') || message.includes('civil engineering') || message.includes('education journey')) {
      return `${background.educationJourney || 'Simon initially studied civil engineering at EPFL, then found his passion in systems engineering at HEIG-VD'}. Sometimes the path isn't straight, but it led him to discover his true calling in systems engineering and manufacturing innovation!`;
    }

    if (message.includes('business') || message.includes('ai opportunities') || message.includes('analysis')) {
      return `${currentRole.passion || 'Simon is excited about new opportunities with AI and business analysis in manufacturing'}! He sees huge potential in combining AI with business analysis to create smarter manufacturing solutions. It's an exciting time to be in tech!`;
    }

    if (message.includes('linkedin') || message.includes('professional network') || message.includes('connect') || message.includes('network')) {
      const linkedinProfile = profiles.find(p => p.network === 'LinkedIn');
      const linkedinUrl = socialMedia.linkedin?.url || linkedinProfile?.url?.href || 'https://www.linkedin.com/in/simoncottier/';
      return `You can connect with Simon on LinkedIn! He has ${socialMedia.linkedin?.stats || '2K followers and 500+ connections'}. His profile showcases ${socialMedia.linkedin?.description || 'his career journey in the medical device industry'}. He's ${socialMedia.linkedin?.content || 'active in sharing insights about manufacturing innovation and healthcare technology'}. Find him at: ${linkedinUrl}`;
    }

    if (message.includes('social') || message.includes('follow') || message.includes('online presence')) {
      const linkedinUrl = socialMedia.linkedin?.url || 'https://linkedin.com/in/simon-cottier';
      return `Simon maintains a professional presence on LinkedIn where he shares insights about manufacturing innovation and technical solutions. You can follow his professional journey at: ${linkedinUrl}`;
    }

    if (message.includes('certification') || message.includes('green belt') || message.includes('qualified') || message.includes('diploma')) {
      const certs = achievements.certifications?.join(', ') || 'Green Belt Certification, Radioprotection diploma, and Physics Laboratory Technician certification';
      return `Simon holds several professional certifications including ${certs}. These certifications demonstrate his commitment to continuous learning and professional development in quality management and technical expertise.`;
    }

    if (message.includes('recognition') || message.includes('award') || message.includes('cleveland') || message.includes('council')) {
      const recognition = achievements.recognition?.join(', ') || 'Cleveland NeuroDesign Entrepreneurs Workshop selection and HES-SO Council membership';
      return `Simon has received notable recognition including ${recognition}. He's been selected for prestigious programs and has served in leadership roles in educational institutions.`;
    }

    if (message.includes('medical device') || message.includes('healthcare') || message.includes('patient')) {
      return `Simon works in the ${currentRole.industry || 'medical device industry with focus on healthcare innovation'}. His mission is ${currentRole.mission || 'using innovation to support quality and improve patient outcomes'}. He's passionate about making a real difference in healthcare through technology.`;
    }

    if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
      const linkedinUrl = socialMedia.linkedin?.url || 'https://www.linkedin.com/in/simoncottier/';
      return `You can reach Simon at ${basics.email} or ${basics.phone}. He's based in ${basics.location}. For professional networking, connect with him on LinkedIn: ${linkedinUrl}`;
    }

    if (message.includes('thanks') || message.includes('thank you')) {
      return `You're welcome! Is there anything else you'd like to know about Simon's background or experience?`;
    }

    // Default response
    return `That's an interesting question! You can ask me about Simon's work experience, technical skills, education, languages, interests, or even his personality and philosophy. What would you like to know more about?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Popup Notification */}
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-28 right-6 z-50 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-xs"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-500 rounded-full flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Hey, I'm here if you have some questions!
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Click to chat with Simon's AI assistant
                </p>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={14} />
              </button>
            </div>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          onClick={() => {
            setIsOpen(true);
            setShowPopup(false);
          }}
          className="fixed bottom-6 right-6 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle size={24} />
          {showPopup && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <span className="font-semibold">Simon's AI Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-blue-600 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {message.sender === 'user' ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-gray-600 dark:text-gray-300" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <Bot size={16} className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Simon..."
                  className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
