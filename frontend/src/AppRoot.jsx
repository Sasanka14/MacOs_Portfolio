import DesktopApp from "./app/desktop/DesktopApp";
import IOSApp from "./app/mobile/IOSApp";

const isMobile = window.innerWidth < 768;

export default function AppRoot() {
  return isMobile ? <IOSApp /> : <DesktopApp />;
}
