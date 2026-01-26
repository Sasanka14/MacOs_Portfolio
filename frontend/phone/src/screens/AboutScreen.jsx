import React from "react";
import { AppHeader } from "#components";
import { aboutData, socials } from "#constants";
import { MapPin, Clock, Briefcase, MessageCircle } from "lucide-react";

/**
 * iOS-style About Screen - Contact card style
 */
const AboutScreen = ({ onClose }) => {
  const iconMap = {
    location: MapPin,
    status: MessageCircle,
    time: Clock,
    work: Briefcase,
  };

  return (
    <>
      <AppHeader title="About" onBack={onClose} />
      
      <div className="app-content hide-scrollbar px-4 pt-4 pb-24">
        {/* Profile Card */}
        <div className="ios-card mb-4">
          <div className="p-6 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-white/20">
              <img 
                src={aboutData.avatar} 
                alt={aboutData.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Name & Role */}
            <h2 className="text-2xl font-bold text-white mb-1">
              {aboutData.name}
            </h2>
            <p className="text-[--color-ios-gray] text-base mb-4">
              {aboutData.role}
            </p>
            
            {/* Bio */}
            <p className="text-white/80 text-sm leading-relaxed">
              {aboutData.bio}
            </p>
          </div>
        </div>

        {/* Details List */}
        <div className="ios-card mb-4">
          {aboutData.details.map((detail, index) => {
            const Icon = iconMap[detail.icon] || MapPin;
            return (
              <div key={index} className="ios-list-item">
                <div 
                  className="ios-list-item-icon"
                  style={{ backgroundColor: 'var(--color-ios-blue)' }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="ios-list-item-content">
                  <p className="ios-list-item-subtitle">{detail.label}</p>
                  <p className="ios-list-item-title">{detail.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Links */}
        <h3 className="text-xs uppercase text-[--color-ios-gray] px-4 mb-2 tracking-wide">
          Connect
        </h3>
        <div className="ios-card">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ios-list-item"
            >
              <div 
                className="ios-list-item-icon"
                style={{ backgroundColor: social.bg }}
              >
                <img 
                  src={social.icon} 
                  alt={social.text}
                  className="w-4 h-4 invert"
                />
              </div>
              <div className="ios-list-item-content">
                <p className="ios-list-item-title">{social.text}</p>
              </div>
              <span className="ios-list-item-chevron">›</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutScreen;
