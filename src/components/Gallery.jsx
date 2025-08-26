import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = ({ colorTheme }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Look for numbered images 1-8 with common extensions
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const imageNames = [];
    
    // Generate all possible combinations for images 1-8
    for (let i = 1; i <= 8; i++) {
      for (const ext of imageExtensions) {
        imageNames.push(`${i}.${ext}`);
        imageNames.push(`image${i}.${ext}`);
        imageNames.push(`photo${i}.${ext}`);
        imageNames.push(`gallery${i}.${ext}`);
        imageNames.push(`project${i}.${ext}`);
        imageNames.push(`work${i}.${ext}`);
        imageNames.push(`portfolio${i}.${ext}`);
      }
    }
    
    // Try to load images that exist
    const loadImages = async () => {
      const validImages = [];
      for (const imageName of imageNames) {
        try {
          const img = new Image();
          img.src = `/images/${imageName}`;
          
          await new Promise((resolve, reject) => {
            img.onload = () => {
              validImages.push({
                src: `/images/${imageName}`,
                alt: imageName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "), // Clean up name
                name: imageName
              });
              resolve();
            };
            img.onerror = () => reject();
            
            // Timeout after 100ms to avoid hanging
            setTimeout(() => reject(), 100);
          });
        } catch (error) {
          // Image doesn't exist, skip it
        }
      }
      setImages(validImages);
    };

    loadImages();
  }, []);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  if (images.length === 0) {
    return null; // Don't render the gallery if no images
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={`${colorTheme.colors.container} p-10 rounded-2xl shadow-xl border border-gray-200`}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-900 text-center">Gallery</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer group"
              onClick={() => openModal(image, index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full flex items-center justify-center"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
              >
                <X size={24} />
              </button>

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all duration-200"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 hover:bg-opacity-70 transition-all duration-200"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
