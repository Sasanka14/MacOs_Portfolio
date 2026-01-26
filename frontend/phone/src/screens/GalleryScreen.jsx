import React, { useState } from "react";
import { AppHeader } from "#components";
import { gallery } from "#constants";
import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * iOS-style Gallery Screen - Photos app style
 */
const GalleryScreen = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const navigateImage = (direction) => {
    const currentIndex = gallery.findIndex((img) => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === "next") {
      newIndex = (currentIndex + 1) % gallery.length;
    } else {
      newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    }
    
    setSelectedImage(gallery[newIndex]);
  };

  return (
    <>
      <AppHeader 
        title="Gallery" 
        onBack={onClose}
        rightAction={
          <span className="text-[--color-ios-gray] text-sm">
            {gallery.length} Photos
          </span>
        }
      />
      
      <div className="app-content hide-scrollbar pb-24">
        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {gallery.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="aspect-square relative overflow-hidden"
            >
              <img
                src={image.img}
                alt={`Gallery ${image.id}`}
                className="w-full h-full object-cover"
              />
              {favorites.includes(image.id) && (
                <div className="absolute bottom-1 right-1">
                  <Heart className="w-4 h-4 text-white fill-red-500" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Full Screen Viewer */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black z-50 animate-fade-in">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
            <button 
              onClick={() => setSelectedImage(null)}
              className="w-10 h-10 rounded-full bg-white/10 flex-center"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={() => toggleFavorite(selectedImage.id)}
              className="w-10 h-10 rounded-full bg-white/10 flex-center"
            >
              <Heart 
                className={`w-5 h-5 ${
                  favorites.includes(selectedImage.id) 
                    ? "text-red-500 fill-red-500" 
                    : "text-white"
                }`} 
              />
            </button>
          </div>

          {/* Image */}
          <div className="absolute inset-0 flex-center">
            <img
              src={selectedImage.img}
              alt={`Gallery ${selectedImage.id}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex-center"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex-center"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <span className="text-white/60 text-sm">
              {gallery.findIndex((img) => img.id === selectedImage.id) + 1} / {gallery.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryScreen;
