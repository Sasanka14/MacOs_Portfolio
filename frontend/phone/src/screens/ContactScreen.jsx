import React, { useState } from "react";
import { AppHeader } from "#components";
import { socials } from "#constants";
import { Send, Mail, User, MessageSquare, CheckCircle } from "lucide-react";

/**
 * iOS-style Contact Screen - Messages app style
 */
const ContactScreen = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <AppHeader title="Contact" onBack={onClose} />
      
      <div className="app-content hide-scrollbar px-4 pt-4 pb-24">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Get in Touch</h2>
          <p className="text-[--color-ios-gray] text-sm">
            I'd love to hear from you
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted ? (
          <div className="ios-card p-8 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-[--color-ios-green]/20 flex-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[--color-ios-green]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-[--color-ios-gray]">
              Thanks for reaching out. I'll get back to you soon.
            </p>
          </div>
        ) : (
          <>
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="ios-card">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-lg bg-[--color-ios-blue] flex-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="flex-1 bg-transparent text-white placeholder-[--color-ios-gray] outline-none"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="ios-card">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-8 h-8 rounded-lg bg-[--color-ios-orange] flex-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="flex-1 bg-transparent text-white placeholder-[--color-ios-gray] outline-none"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="ios-card">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[--color-ios-green] flex-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      required
                      rows={4}
                      className="flex-1 bg-transparent text-white placeholder-[--color-ios-gray] outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[--color-ios-blue] text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[--color-ios-gray] text-sm">or connect via</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Links */}
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
          </>
        )}
      </div>
    </>
  );
};

export default ContactScreen;
