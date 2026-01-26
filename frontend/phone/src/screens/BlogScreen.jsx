import React from "react";
import { AppHeader } from "#components";
import { blogPosts } from "#constants";
import { ExternalLink, Calendar, BookOpen } from "lucide-react";

/**
 * iOS-style Blog Screen - Safari/News app style
 */
const BlogScreen = ({ onClose }) => {
  const handlePostClick = (post) => {
    if (post.link) {
      window.open(post.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <AppHeader title="Articles" onBack={onClose} />
      
      <div className="app-content hide-scrollbar px-4 pt-4 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Blog Posts</h2>
          <p className="text-[--color-ios-gray] text-sm">
            Thoughts and tutorials on tech
          </p>
        </div>

        {/* Blog Posts */}
        {blogPosts.length > 0 ? (
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="w-full text-left ios-card overflow-hidden active:scale-[0.98] transition-transform"
              >
                {/* Post Image */}
                {post.image && (
                  <div 
                    className="h-44 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${post.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex-center backdrop-blur-sm">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Post Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3 h-3 text-[--color-ios-gray]" />
                    <span className="text-xs text-[--color-ios-gray]">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white leading-tight">
                    {post.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="ios-card p-8 text-center">
            <BookOpen className="w-12 h-12 text-[--color-ios-gray] mx-auto mb-4" />
            <p className="text-[--color-ios-gray]">No posts yet</p>
          </div>
        )}

        {/* View More Link */}
        <div className="mt-6 text-center">
          <a 
            href="https://sasanka14.github.io/MERN-Stack-Blog-Website/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[--color-ios-blue]"
          >
            <BookOpen className="w-4 h-4" />
            <span>View all articles</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogScreen;
