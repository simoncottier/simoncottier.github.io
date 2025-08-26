import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';

const ColorPicker = ({ onColorChange, currentTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorThemes = [
    {
      id: 'pink',
      name: 'Soft Pink',
      colors: {
        primary: 'text-gray-700',
        secondary: 'text-gray-600',
        accent: 'bg-[#ff99c8]',
        accentHover: 'hover:bg-[#ff85be]',
        border: 'border-[#ff99c8]',
        tag: 'bg-[#ff99c8] bg-opacity-20 text-[#cc5a8a]',
        container: 'bg-[#ff99c8] bg-opacity-20',
        background: 'bg-gray-50',
        font: 'text-gray-900'
      },
      preview: {
        bg: 'bg-[#ff99c8]',
        text: 'text-[#cc5a8a]',
        hex: '#ff99c8'
      }
    },
    {
      id: 'cream',
      name: 'Warm Cream',
      colors: {
        primary: 'text-gray-700',
        secondary: 'text-gray-600',
        accent: 'bg-[#fcf6bd]',
        accentHover: 'hover:bg-[#f7ee9a]',
        border: 'border-[#fcf6bd]',
        tag: 'bg-[#fcf6bd] bg-opacity-60 text-[#b8a647]',
        container: 'bg-[#fcf6bd] bg-opacity-40',
        background: 'bg-gray-50',
        font: 'text-gray-900'
      },
      preview: {
        bg: 'bg-[#fcf6bd]',
        text: 'text-[#b8a647]',
        hex: '#fcf6bd'
      }
    },
    {
      id: 'mint',
      name: 'Fresh Mint',
      colors: {
        primary: 'text-gray-700',
        secondary: 'text-gray-600',
        accent: 'bg-[#d0f4de]',
        accentHover: 'hover:bg-[#b8eac7]',
        border: 'border-[#d0f4de]',
        tag: 'bg-[#d0f4de] bg-opacity-60 text-[#5a8a68]',
        container: 'bg-[#d0f4de] bg-opacity-40',
        background: 'bg-gray-50',
        font: 'text-gray-900'
      },
      preview: {
        bg: 'bg-[#d0f4de]',
        text: 'text-[#5a8a68]',
        hex: '#d0f4de'
      }
    },
    {
      id: 'sky',
      name: 'Sky Blue',
      colors: {
        primary: 'text-gray-700',
        secondary: 'text-gray-600',
        accent: 'bg-[#a9def9]',
        accentHover: 'hover:bg-[#8dd3f7]',
        border: 'border-[#a9def9]',
        tag: 'bg-[#a9def9] bg-opacity-60 text-[#4a7c95]',
        container: 'bg-[#a9def9] bg-opacity-40',
        background: 'bg-gray-50',
        font: 'text-gray-900'
      },
      preview: {
        bg: 'bg-[#a9def9]',
        text: 'text-[#4a7c95]',
        hex: '#a9def9'
      }
    },
    {
      id: 'lavender',
      name: 'Soft Lavender',
      colors: {
        primary: 'text-gray-700',
        secondary: 'text-gray-600',
        accent: 'bg-[#e4c1f9]',
        accentHover: 'hover:bg-[#dca9f7]',
        border: 'border-[#e4c1f9]',
        tag: 'bg-[#e4c1f9] bg-opacity-60 text-[#8a5a9c]',
        container: 'bg-[#e4c1f9] bg-opacity-40',
        background: 'bg-gray-50',
        font: 'text-gray-900'
      },
      preview: {
        bg: 'bg-[#e4c1f9]',
        text: 'text-[#8a5a9c]',
        hex: '#e4c1f9'
      }
    }
  ];

  const handleThemeChange = (theme) => {
    onColorChange(theme);
    setIsOpen(false);
  };

  return (
    <>
      {/* Color Picker Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:scale-105 transition-all duration-300 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Choose Color Theme"
      >
        <Palette size={20} className="text-gray-600 dark:text-gray-300" />
      </motion.button>

      {/* Color Picker Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Choose Your Theme</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Color Options */}
              <div className="grid grid-cols-2 gap-4">
                {colorThemes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      currentTheme?.id === theme.id
                        ? 'border-current ring-2 ring-offset-2 ring-current'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      {/* Color Preview */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-12 h-12 rounded-2xl ${theme.preview.bg} shadow-md border-2 border-white dark:border-gray-700`}></div>
                        <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                          {theme.preview.hex}
                        </div>
                      </div>
                      
                      {/* Theme Name */}
                      <div className="text-center">
                        <p className={`font-semibold ${theme.preview.text}`}>{theme.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pastel Theme</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your color preference will be saved for your next visit
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ColorPicker;
