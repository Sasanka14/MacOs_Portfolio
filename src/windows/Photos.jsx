import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/WindowWrapper";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window";
import { 
  Grid2X2, Heart, MapPin, Users, Library, 
  List, LayoutGrid, Heart as HeartFilled, 
  Clock, Calendar
} from "lucide-react";
import React, { useState, useMemo } from "react";

const Photos = () => {
  const { openWindow } = useWindowStore();
  const [activeSection, setActiveSection] = useState("Library");
  const [viewMode, setViewMode] = useState("grid"); // "grid", "list", "carousel"
  const [filterType, setFilterType] = useState("all"); // "all", "favorites", "recent", "date"
  const [sortBy, setSortBy] = useState("date"); // "date", "name", "size"

  const sectionIcons = {
    Library: <Library className="w-4 h-4" />,
    Memories: <Grid2X2 className="w-4 h-4" />,
    Places: <MapPin className="w-4 h-4" />,
    People: <Users className="w-4 h-4" />,
    Favorites: <Heart className="w-4 h-4" />,
  };

  // Section descriptions
  const sectionDescriptions = {
    Library: "All your photos in one place",
    Memories: "Auto-generated collections from your past",
    Places: "Photos organized by location",
    People: "Photos grouped by people",
    Favorites: "Your favorite photos",
  };

  // Simulate favorites (in a real app, this would be in state/db)
  const [favorites, setFavorites] = useState([2, 4]);

  const handleImageClick = (image) => {
    const imageData = {
      name: `Gallery Image ${image.id}`,
      imageUrl: image.img,
    };
    openWindow("imgfile", imageData);
  };

  const toggleFavorite = (e, imageId) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(imageId) 
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  // Filter and sort gallery based on active section and filters
  const filteredGallery = useMemo(() => {
    let result = [...gallery];

    // Apply section-specific filtering
    switch (activeSection) {
      case "Library":
        // Show all images
        break;
      case "Favorites":
        result = result.filter((img) => favorites.includes(img.id));
        break;
      case "Memories":
        // Show older/random images for memories
        result = result.filter((img) => img.id % 2 === 0);
        break;
      case "Places":
        // Show images with even IDs for places simulation
        result = result.filter((img) => img.id <= 3);
        break;
      case "People":
        // Show images with odd IDs for people simulation
        result = result.filter((img) => img.id >= 2);
        break;
      default:
        break;
    }

    // Apply filters
    if (filterType === "favorites") {
      result = result.filter((img) => favorites.includes(img.id));
    } else if (filterType === "recent") {
      result = result.slice(0, 2);
    }

    // Apply sorting
    if (sortBy === "name") {
      // Sort by image filename lexicographically (deterministic)
      result.sort((a, b) => {
        const nameA = a.img.split('/').pop().toLowerCase();
        const nameB = b.img.split('/').pop().toLowerCase();
        const nameCompare = nameA.localeCompare(nameB);
        // Fall back to id comparison if names are equal
        return nameCompare !== 0 ? nameCompare : a.id - b.id;
      });
    } else if (sortBy === "size") {
      // Sort by id as proxy for size (deterministic, not random)
      result.sort((a, b) => {
        const sizeCompare = a.id - b.id;
        // Fall back to id if already equal (redundant here but consistent)
        return sizeCompare !== 0 ? sizeCompare : a.id - b.id;
      });
    }

    return result;
  }, [activeSection, filterType, sortBy, favorites]);

  const renderGridView = () => {
    if (filteredGallery.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No photos in this section</p>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-4">
        {/* Hero Section - First 2 images large */}
        {filteredGallery.length >= 2 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {filteredGallery.slice(0, 2).map((image) => (
              <div
                key={image.id}
                role="button"
                tabIndex={0}
                onClick={() => handleImageClick(image)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleImageClick(image);
                  }
                }}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                <img
                  src={image.img}
                  alt={`Gallery image - photo ${image.id}`}
                  className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-200"
                />
                <button
                  onClick={(e) => toggleFavorite(e, image.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFavorite(e, image.id);
                    }
                  }}
                  aria-label={favorites.includes(image.id) ? 'Remove from favorites' : 'Add to favorites'}
                  aria-pressed={favorites.includes(image.id)}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(image.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
              </div>
            ))}
          </div>
        )}

        {/* Remaining images in masonry-style grid */}
        {filteredGallery.length > 2 && (
          <div className="grid grid-cols-3 gap-3">
            {filteredGallery.slice(2).map((image) => (
              <div
                key={image.id}
                role="button"
                tabIndex={0}
                onClick={() => handleImageClick(image)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleImageClick(image);
                  }
                }}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                <img
                  src={image.img}
                  alt={`Gallery image - photo ${image.id}`}
                  className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-200"
                />
                <button
                  onClick={(e) => toggleFavorite(e, image.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFavorite(e, image.id);
                    }
                  }}
                  aria-label={favorites.includes(image.id) ? 'Remove from favorites' : 'Add to favorites'}
                  aria-pressed={favorites.includes(image.id)}
                  className="absolute top-2 right-2 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <Heart
                    className={`w-3 h-3 ${
                      favorites.includes(image.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderListView = () => {
    if (filteredGallery.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No photos in this section</p>
        </div>
      );
    }

    return (
      <div className="p-4 space-y-2">
        {filteredGallery.map((image) => (
          <div
            key={image.id}
            role="button"
            tabIndex={0}
            onClick={() => handleImageClick(image)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick(image);
              }
            }}
            className="group flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Gallery image ${image.id}`}
          >
            <img
              src={image.img}
              alt={`Gallery image ${image.id}`}
              className="w-16 h-16 object-cover rounded border border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Gallery Image {image.id}</p>
              <p className="text-xs text-gray-500">Today at 2:45 PM</p>
            </div>
            <button
              onClick={(e) => toggleFavorite(e, image.id)}
              aria-label={favorites.includes(image.id) ? `Remove image ${image.id} from favorites` : `Add image ${image.id} to favorites`}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Heart
                className={`w-4 h-4 ${
                  favorites.includes(image.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderCarouselView = () => {
    if (filteredGallery.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No photos in this section</p>
        </div>
      );
    }

    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        {filteredGallery.length > 0 && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleImageClick(filteredGallery[0])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick(filteredGallery[0]);
              }
            }}
            className="group relative w-full max-w-md aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Gallery image ${filteredGallery[0].id}`}
          >
            <img
              src={filteredGallery[0].img}
              alt={`Gallery image ${filteredGallery[0].id}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => toggleFavorite(e, filteredGallery[0].id)}
              aria-label={favorites.includes(filteredGallery[0].id) ? `Remove image ${filteredGallery[0].id} from favorites` : `Add image ${filteredGallery[0].id} to favorites`}
              className="absolute top-4 right-4 p-3 bg-white/80 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Heart
                className={`w-5 h-5 ${
                  favorites.includes(filteredGallery[0].id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }`}
              />
            </button>
          </div>
        )}
        <p className="mt-4 text-sm text-gray-600">
          {filteredGallery.length} photo{filteredGallery.length !== 1 ? "s" : ""}
        </p>
      </div>
    );
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Gallery</h2>
      </div>

      <div className="bg-white flex h-full overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-40 border-r border-gray-200 bg-gray-50 overflow-y-auto flex flex-col">
          <div className="p-4 space-y-6">
            {/* Sidebar Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                Library
              </h3>
              <ul className="space-y-1">
                {["Library", "Memories", "Places", "People", "Favorites"].map(
                  (section) => (
                    <li key={section}>
                      <button
                        onClick={() => setActiveSection(section)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150 ${
                          activeSection === section
                            ? "bg-blue-500 text-white font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                        title={sectionDescriptions[section]}
                      >
                        {sectionIcons[section]}
                        <span>{section}</span>
                        {activeSection === section && (
                          <span className="ml-auto text-xs">
                            {filteredGallery.length}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Footer spacing */}
          <div className="flex-1" />
        </div>

        {/* Main Gallery Area - Single unified content container */}
        <div className="flex-1 overflow-y-auto">
          {/* Gallery Controls Bar - rendered as content, not structure */}
          <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {activeSection}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {sectionDescriptions[activeSection]}
              </p>
            </div>

            {/* View Mode & Filter Controls */}
            <div className="flex items-center gap-2 ml-auto">
              {/* View Mode Toggle */}
              <div className="flex gap-1 bg-gray-200 rounded p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("carousel")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "carousel"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Carousel View"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Dropdown */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:border-gray-400 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="all">All Photos</option>
                <option value="favorites">Favorites Only</option>
                <option value="recent">Recent</option>
                <option value="date">By Date</option>
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs px-2 py-1 border border-gray-300 rounded bg-white hover:border-gray-400 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
              </select>
            </div>
          </div>

          {/* Gallery Content - rendered directly in scroll container */}
          {/* Render based on view mode */}
          {viewMode === "grid" && renderGridView()}
          {viewMode === "list" && renderListView()}
          {viewMode === "carousel" && renderCarouselView()}
        </div>
      </div>
    </>
  );
};

const PhotosWindow = windowWrapper(Photos, "photos");

export default PhotosWindow;
