import React from "react";
import windowWrapper from "#hoc/WindowWrapper";
import { socials, quickActions } from "#constants";
import { WindowControls } from "#components";
import { MapPin, Zap, Clock, Briefcase } from "lucide-react";

const Contact = () => {
  const iconMap = {
    location: MapPin,
    status: Zap,
    time: Clock,
    work: Briefcase,
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>
      <div className="p-5 space-y-5 flex flex-col">
        <div className="flex justify-between items-start gap-5 w-full">
          {/* Left side - profile and main content */}
          <div className="space-y-5 flex-1 min-w-0">
            <img
              src="/images/sasanka.jpg"
              alt="Sasanka"
              className="w-20 rounded-full"
            />
            <h3>Let's Connect</h3>
            <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
            <p>sasankawrites14@gmail.com</p>
          </div>

          {/* Right side - Quick Contact Actions */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-w-max h-fit shrink-0">
            <h4 className="text-sm font-semibold mb-3 text-gray-800 text-center">Quick Info</h4>
            <div className="text-sm space-y-2">
              {quickActions.map((action, idx) => {
                const Icon = iconMap[action.icon];
                return (
                  <div key={idx} className="flex items-center gap-2">
                    {Icon && <Icon className="w-4 h-4 text-gray-600" />}
                    <div className="flex-1">
                      <span className="text-gray-700">{action.label}</span>
                      <span className="font-semibold"> {action.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ background: bg }}>
              <a href={link} target="_blank" rel="noreferrer" title={text}>
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
const ContactWindow = windowWrapper(Contact, "contact");
export default ContactWindow;
