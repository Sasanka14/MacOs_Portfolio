import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import useWindowStore from '#store/window';

const LibraryView = ({ images = [] }) => {
  const { openWindow } = useWindowStore();
  const [favorites, setFavorites] = useState([]);

  const handleImageClick = (image) => {
    const imageData = {
      name: image.location || `Photo ${image.id}`,
      imageUrl: image.img,
    };
    openWindow('imgfile', imageData);
  };

  const toggleFavorite = (e, imageId) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleKeyDown = (e, image) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImageClick(image);
    }
  };

  const handleFavoriteKeyDown = (e, imageId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFavorite(e, imageId);
    }
  };

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <p>No images in this library</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section - First 2 images large */}
      {images.length >= 2 && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {images.slice(0, 2).map((image) => (
            <div
              key={image.id}
              role="button"
              tabIndex={0}
              onClick={() => handleImageClick(image)}
              onKeyDown={(e) => handleKeyDown(e, image)}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-1 dark:focus:ring-offset-gray-900"
              aria-label={`Open ${image.location || `photo ${image.id}`}`}
            >
              <img
                src={image.img}
                alt={image.location || `Photo ${image.id}`}
                className="w-full h-full object-cover group-hover:brightness-90 dark:group-hover:brightness-110 transition-all duration-200"
              />
              <button
                onClick={(e) => toggleFavorite(e, image.id)}
                onKeyDown={(e) => handleFavoriteKeyDown(e, image.id)}
                aria-label={favorites.includes(image.id) ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={favorites.includes(image.id)}
                className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(image.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                />
              </button>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-200" />
            </div>
          ))}
        </div>
      )}

      {/* Remaining images in masonry-style grid */}
      {images.length > 2 && (
        <div className="grid grid-cols-3 gap-3">
          {images.slice(2).map((image) => (
            <div
              key={image.id}
              role="button"
              tabIndex={0}
              onClick={() => handleImageClick(image)}
              onKeyDown={(e) => handleKeyDown(e, image)}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-1 dark:focus:ring-offset-gray-900"
              aria-label={`Open ${image.location || `photo ${image.id}`}`}
            >
              <img
                src={image.img}
                alt={image.location || `Photo ${image.id}`}
                className="w-full h-full object-cover group-hover:brightness-90 dark:group-hover:brightness-110 transition-all duration-200"
              />
              <button
                onClick={(e) => toggleFavorite(e, image.id)}
                onKeyDown={(e) => handleFavoriteKeyDown(e, image.id)}
                aria-label={favorites.includes(image.id) ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={favorites.includes(image.id)}
                className="absolute top-2 right-2 p-1 bg-white/80 dark:bg-gray-800/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
              >
                <Heart
                  className={`w-3 h-3 ${
                    favorites.includes(image.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                />
              </button>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-200" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryView;
