import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye, EyeOff } from 'lucide-react';

const SiteExperience = ({ onThemeChange, currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Extract hex color from the current theme
  const getHexFromTheme = (themeClass) => {
    const match = themeClass.match(/#[0-9a-fA-F]{6}/);
    return match ? match[0] : '#ffffff';
  };
  
  const [customColors, setCustomColors] = useState({
    container: currentTheme?.preview?.hex || getHexFromTheme(currentTheme?.colors?.container) || '#ff99c8'
  });

  // Update container color when theme changes
  useEffect(() => {
    if (currentTheme?.preview?.hex) {
      setCustomColors(prev => ({
        ...prev,
        container: currentTheme.preview.hex
      }));
    }
  }, [currentTheme]);

  const handleColorChange = (type, value) => {
    const newColors = { ...customColors, [type]: value };
    setCustomColors(newColors);
    
    // Generate text color (darker version of the selected color)
    const darkerColor = value.replace('#', '').match(/.{2}/g)
      .map(hex => Math.floor(parseInt(hex, 16) * 0.6).toString(16).padStart(2, '0'))
      .join('');
    
    // Special handling for Cream Yellow theme
    const isCreamYellow = value.toUpperCase() === '#FFFACD';
    
    // Update the theme with all related colors
    const updatedTheme = {
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        accent: `bg-[${value}]`,
        accentHover: `hover:bg-[${value}]`,
        border: `border-[${value}]`,
        tag: `bg-[${value}] bg-opacity-20 text-[#${darkerColor}]`,
        container: `bg-[${value}] bg-opacity-40`,
        // Special overrides for Cream Yellow
        iconBg: isCreamYellow ? 'bg-black' : `bg-[${value}]`,
        numberText: isCreamYellow ? 'text-black' : 'text-white',
        chartColor: isCreamYellow ? '#FFB6C1' : value, // Pink for cream yellow
        languageDots: isCreamYellow ? 'bg-black' : `bg-[${value}]`
      },
      preview: {
        ...currentTheme.preview,
        hex: value,
        bg: `bg-[${value}]`,
        text: `text-[#${darkerColor}]`
      }
    };
    
    onThemeChange(updatedTheme);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`${currentTheme.colors.container} p-8 rounded-2xl shadow-lg border border-gray-200`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Experience Colors</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 ${currentTheme.colors.iconBg || currentTheme.colors.accent} rounded-lg text-white hover:opacity-80 transition-opacity`}
        >
          {isOpen ? <EyeOff size={20} /> : <Palette size={20} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-6"
        >
          {/* Container Color Options */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800">
              Choose Container Color
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Rose Pink', hex: '#FFB6C1', bg: 'bg-[#FFB6C1]' },
                { name: 'Cream Yellow', hex: '#FFFACD', bg: 'bg-[#FFFACD]' },
                { name: 'Mint Green', hex: '#B0E0B8', bg: 'bg-[#B0E0B8]' },
                { name: 'Sky Blue', hex: '#87CEEB', bg: 'bg-[#87CEEB]' },
                { name: 'Lavender', hex: '#E6E6FA', bg: 'bg-[#E6E6FA]' }
              ].map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleColorChange('container', color.hex)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    customColors.container === color.hex
                      ? 'border-gray-800 ring-2 ring-offset-2 ring-gray-400'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-12 h-12 rounded-2xl ${color.bg} shadow-md border-2 border-white`}></div>
                    <div className="text-center">
                      <p className="font-semibold text-sm">{color.name}</p>
                      <p className="text-xs text-gray-500">{color.hex}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Choose your preferred container color. The selected color will be applied to all sections of your CV.
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default SiteExperience;
