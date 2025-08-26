import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = ({ cvData }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Extract data from CV
    const { basics, sections } = cvData;
    const experiences = sections.experience?.items || [];
    const skills = sections.skills?.items || [];
    const education = sections.education?.items || [];
    const languages = sections.languages?.items || [];
    const interests = sections.interests?.items || [];

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

    if (message.includes('thanks') || message.includes('thank you')) {
      return `You're welcome! Is there anything else you'd like to know about Simon's background or experience?`;
    }

    // Default response
    return `That's an interesting question! You can ask me about Simon's work experience, technical skills, education, languages, or interests. What would you like to know more about?`;
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
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>

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
