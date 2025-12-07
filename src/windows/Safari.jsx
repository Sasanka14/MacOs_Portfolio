import { WindowControls } from "#components";
import windowWrapper from "#hoc/WindowWrapper";
import { blogPosts } from "#constants";
import useWindowStore from "#store/window";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
  X,
  ArrowUp,
  ArrowDown,
  Tag,
} from "lucide-react";
import React, { useMemo, useState, useEffect, useRef } from "react";

const Safari = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // "newest", "oldest", "alphabetical"
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredBlogId, setHoveredBlogId] = useState(null);
  const searchInputRef = useRef(null);
  const postsPerPage = 3;
  
  // Get Safari window state from store
  const safariWindow = useWindowStore((state) => state.windows?.safari);

  // Extract unique tags from blogs
  const allTags = useMemo(() => {
    const tags = new Set();
    blogPosts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, []);

  // Handle keyboard shortcut (Cmd+F or Ctrl+F to focus search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        // Only focus if Safari window is open and not minimized
        if (safariWindow?.isOpen && !safariWindow?.isMinimized) {
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [safariWindow?.isOpen, safariWindow?.isMinimized]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedTags, sortBy]);

  // Get sorted and filtered posts
  let results = blogPosts;
  const q = query.trim().toLowerCase();
  
  if (q) {
    results = results.filter(({ title, date }) => {
      const titleText = title.toLowerCase();
      const dateText = String(date).toLowerCase();
      return titleText.includes(q) || dateText.includes(q);
    });
  }

  if (selectedTags.length > 0) {
    results = results.filter(post => 
      post.tags && selectedTags.some(tag => post.tags.includes(tag))
    );
  }

  const sorted = [...results];
  if (sortBy === "newest") {
    sorted.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (isNaN(dateA) || isNaN(dateB)) return 0;
      return dateA - dateB;
    });
  } else if (sortBy === "oldest") {
    sorted.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (isNaN(dateA) || isNaN(dateB)) return 0;
      return dateB - dateA;
    });
  } else if (sortBy === "alphabetical") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Pagination
  const totalPages = Math.ceil(sorted.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = sorted.slice(startIndex, startIndex + postsPerPage);

  // Highlight search term in text (returns React elements, not HTML string)
  const highlightText = (text, searchTerm) => {
    if (!text || typeof text !== 'string') return text || '';
    if (!searchTerm) return text;
    // Escape regex special characters
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedTerm})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase()
        ? <mark key={i} style={{ backgroundColor: "yellow", padding: "0 2px" }}>{part}</mark>
        : part
    );
  };

  return (
    <>
      {/* Safari header */}
      <div id="window-header">
        <WindowControls target="safari" />

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />

          {/* Search bar */}
          <div className="search">
            <Search className="icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search or enter website name (Cmd+F)"
              className="flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="icon hover:bg-red-100"
                title="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      {/* Blog list */}
      <div className="blog">
        <div className="flex justify-between items-center mb-6">
          <h2>My Recent Blogs</h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setSortBy("newest")} className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all ${sortBy === "newest" ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}><ArrowDown size={14} /> Newest</button>
            <button type="button" onClick={() => setSortBy("oldest")} className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all ${sortBy === "oldest" ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}><ArrowUp size={14} /> Oldest</button>
            <button type="button" onClick={() => setSortBy("alphabetical")} className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition-all ${sortBy === "alphabetical" ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>A-Z</button>
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="mb-6 pb-4 border-b border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2 flex items-center gap-1"><Tag size={14} /> Filter by tags:</p>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button type="button" key={tag} onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedTags.includes(tag) ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{tag}</button>
              ))}
            </div>
          </div>
        )}

        {(query || selectedTags.length > 0) && (
          <p className="mb-4 text-sm text-slate-500">
            {query && <>Showing: <span className="font-medium">"{query}"</span></>}
            {selectedTags.length > 0 && <span>{query && " • "} Tags: {selectedTags.join(", ")}</span>}
          </p>
        )}

        <div className="space-y-8 mb-6">
          {paginatedPosts.length === 0 ? (
            <div className="text-center py-12"><div className="text-6xl mb-4">😅</div><p className="text-sm text-slate-500">No articles found.</p></div>
          ) : (
            paginatedPosts.map(({ id, image, date, title, link, tags }) => (
              <div key={id} className="blog-post group" onMouseEnter={() => setHoveredBlogId(id)} onMouseLeave={() => setHoveredBlogId(null)}>
                <div className="col-span-2 overflow-hidden rounded-md"><img src={image} alt={title} className="group-hover:scale-105 transition-transform duration-300" /></div>
                <div className="content">
                  <p className="text-xs text-gray-500">{date}</p>
                  <h3 className={`font-semibold text-base text-gray-800 group-hover:text-pink-600 ${hoveredBlogId === id ? "underline" : ""}`}>
                    {query ? highlightText(title, query) : title}
                  </h3>
                  {tags && tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap my-2">
                      {tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">{tag}</span>)}
                    </div>
                  )}
                  <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 text-xs hover:underline flex items-center gap-3 group/link">
                    Check out the full post <MoveRight className="icon-hover group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-6 border-t border-gray-200">
            <button type="button" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-1 rounded bg-gray-200 text-sm font-medium disabled:opacity-50">Previous</button>
            <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
            <button type="button" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-1 rounded bg-gray-200 text-sm font-medium disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </>
  );
};

const SafariWindow = windowWrapper(Safari, "safari", { enableDrag: true });

export default SafariWindow;
