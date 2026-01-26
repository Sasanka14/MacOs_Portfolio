import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * A macOS-style loading screen component with animated logo, branding, and progress indicator.
 * Features smooth GSAP animations, particle effects, and real-time loading progress tracking.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.isLoading=true] - Controls whether the loading screen is active
 * @param {Function} [props.onLoadingComplete] - Callback fired when loading completes and exit animation finishes
 * @returns {JSX.Element|null} The loading screen overlay or null when not visible
 * 
 * @example
 * <LoadingScreen 
 *   isLoading={isAppLoading} 
 *   onLoadingComplete={() => console.log('Ready!')} 
 * />
 */
export default function LoadingScreen({ isLoading = true, onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(isLoading);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);
  
  /** @type {React.RefObject<HTMLDivElement>} Reference to the main container element */
  const containerRef = useRef(null);
  /** @type {React.RefObject<HTMLDivElement>} Reference to the logo container element */
  const logoRef = useRef(null);
  /** @type {React.RefObject<HTMLDivElement>} Reference to the logo glow effect element */
  const logoGlowRef = useRef(null);
  /** @type {React.RefObject<HTMLSpanElement>} Reference to the X brand text element */
  const xRef = useRef(null);
  /** @type {React.RefObject<HTMLSpanElement>} Reference to the sasankaWrites brand text element */
  const brandTextRef = useRef(null);
  /** @type {React.RefObject<HTMLDivElement>} Reference to the progress bar container */
  const progressBarRef = useRef(null);
  /** @type {React.RefObject<HTMLDivElement>} Reference to the progress bar fill element */
  const progressFillRef = useRef(null);
  /** @type {React.RefObject<HTMLParagraphElement>} Reference to the status text element */
  const statusTextRef = useRef(null);
  /** @type {React.RefObject<HTMLDivElement[]>} Reference array for particle elements */
  const particlesRef = useRef([]);
  /** @type {React.RefObject<number>} Timestamp when loading started */
  const loadStartTimeRef = useRef(Date.now());

  /**
   * Effect: Resets component state when isLoading becomes true again.
   * Allows the loading screen to reappear after being dismissed.
   */
  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setFadeOut(false);
      setLoadProgress(0);
      setFontsReady(false);
      loadStartTimeRef.current = Date.now();
    }
  }, [isLoading]);

  /**
   * Memoized particle configuration data.
   * Generates random positions, sizes, and animation timings for background particles.
   * @type {Array<{width: number, height: number, left: number, top: number, animationDuration: number, animationDelay: number}>}
   */
  const particlesData = useMemo(() => 
    Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      animationDelay: Math.random() * 10,
    })), []);

  /**
   * Effect: Tracks font loading readiness using the Font Loading API.
   * Sets fontsReady state to true when all fonts are loaded or if API is unsupported.
   */
  useEffect(() => {
    let isMounted = true;

    /**
     * Asynchronously checks if document fonts are loaded.
     * @async
     */
    const checkFonts = async () => {
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
          if (isMounted) {
            setFontsReady(true);
          }
        } else {
          // Fallback if Font Loading API is not supported
          if (isMounted) {
            setFontsReady(true);
          }
        }
      } catch {
        if (isMounted) {
          setFontsReady(true);
        }
      }
    };

    checkFonts();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Effect: Tracks overall asset loading progress.
   * Monitors JS readiness, font loading, and image completion to calculate progress percentage.
   */
  useEffect(() => {
    /**
     * Calculates and updates the current loading progress based on various indicators.
     * @returns {boolean} True if loading is complete (progress > 95% and JS ready)
     */
    const updateLoadProgress = () => {
      const indicators = {
        jsReady: document.readyState === 'complete' || document.readyState === 'interactive',
        fontsReady: fontsReady,
        imagesReady: document.querySelectorAll('img[src]').length === 0 || 
          Array.from(document.querySelectorAll('img[src]')).every(img => img.complete),
      };

      const baseProgress = indicators.jsReady ? 40 : 15;
      const fontProgress = indicators.fontsReady ? 25 : 0;
      const imageProgress = indicators.imagesReady ? 25 : 0;
      
      const elapsedMs = Date.now() - loadStartTimeRef.current;
      const timeProgress = Math.min(10, (elapsedMs / 4000) * 10);

      const progress = Math.min(99, baseProgress + fontProgress + imageProgress + timeProgress);
      setLoadProgress(progress);

      return progress > 95 && indicators.jsReady;
    };

    const interval = setInterval(() => {
      if (updateLoadProgress()) {
        clearInterval(interval);
      }
    }, 80);

    window.addEventListener('load', updateLoadProgress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', updateLoadProgress);
    };
  }, [fontsReady]);

  /**
   * Effect: Main GSAP animation sequence for the loading screen.
   * Handles logo entrance, brand text reveal, and continuous floating/glow animations.
   */
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Initial state
    gsap.set([logoRef.current, xRef.current, brandTextRef.current, progressBarRef.current, statusTextRef.current], {
      opacity: 0,
    });
    gsap.set(logoRef.current, { scale: 0.5, rotation: -180 });
    gsap.set(xRef.current, { scale: 0, x: -20 });
    gsap.set(brandTextRef.current, { x: -30, opacity: 0 });
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' });

    // Logo entrance with dramatic spin
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
    });

    // Logo glow pulse
    tl.to(logoGlowRef.current, {
      opacity: 0.6,
      scale: 1.2,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.6');

    // X logo appears with bounce
    tl.to(xRef.current, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, '-=0.4');

    // Brand text slides in
    tl.to(brandTextRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.3');

    // Progress bar appears
    tl.to(progressBarRef.current, {
      opacity: 1,
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.4');

    // Status text fades in
    tl.to(statusTextRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.2');

    // Continuous logo float animation
    const floatTween = gsap.to(logoRef.current, {
      y: -8,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Continuous glow pulse
    const glowTween = gsap.to(logoGlowRef.current, {
      opacity: 0.3,
      scale: 1.4,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tl.kill();
      floatTween.kill();
      glowTween.kill();
    };
  }, []);

  /**
   * Effect: Animates the progress bar fill based on current load progress.
   * Updates the scaleX transform to reflect loading percentage.
   */
  useEffect(() => {
    if (progressFillRef.current) {
      gsap.to(progressFillRef.current, {
        scaleX: loadProgress / 100,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [loadProgress]);

  /**
   * Effect: Handles the loading completion and exit animation sequence.
   * Triggers fade-out animations when loading is complete and progress exceeds 95%.
   * Calls onLoadingComplete callback after exit animation finishes.
   */
  useEffect(() => {
    /** @type {number|undefined} Timer ID for the fade delay */
    let fadeTimer;
    /** @type {gsap.core.Timeline|undefined} GSAP timeline for exit animations */
    let exitTl;

    if (!isLoading && loadProgress > 95) {
      // Complete the progress bar
      if (progressFillRef.current) {
        gsap.to(progressFillRef.current, {
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      fadeTimer = setTimeout(() => {
        // Fade out animation
        exitTl = gsap.timeline();
        
        exitTl.to([statusTextRef.current, progressBarRef.current], {
          opacity: 0,
          y: 20,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.in',
        });

        exitTl.to([brandTextRef.current, xRef.current], {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.in',
        }, '-=0.1');

        exitTl.to(logoRef.current, {
          scale: 1.2,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        }, '-=0.2');

        exitTl.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsVisible(false);
            onLoadingComplete?.();
          },
        }, '-=0.1');
      }, 400);
    }

    return () => {
      if (fadeTimer) {
        clearTimeout(fadeTimer);
      }
      if (exitTl) {
        exitTl.kill();
      }
    };
  }, [isLoading, loadProgress, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-[9999] overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particlesData.map((particle, i) => (
          <div
            key={i}
            ref={(el) => { particlesRef.current[i] = el; }}
            className="absolute rounded-full bg-white/5"
            style={{
              width: particle.width + 'px',
              height: particle.height + 'px',
              left: particle.left + '%',
              top: particle.top + '%',
              animation: `float ${particle.animationDuration}s linear infinite`,
              animationDelay: `-${particle.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center gap-12">
        
        {/* Logo + Brand Side by Side */}
        <div className="flex items-center gap-5">
          
          {/* Apple Logo with Glow */}
          <div className="relative flex items-center justify-center">
            {/* Glow effect */}
            <div
              ref={logoGlowRef}
              className="absolute inset-0 rounded-2xl opacity-0"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
                transform: 'scale(2)',
                filter: 'blur(20px)',
              }}
            />
            
            {/* Logo container */}
            <div
              ref={logoRef}
              className="relative p-4 rounded-2xl backdrop-blur-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
              }}
            >
              <img
                src="/icons/apple-svgrepo-com.svg"
                alt="Logo"
                className="w-12 h-12 drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
                }}
              />
            </div>
          </div>

          {/* Brand Name - X sasankaWrites */}
          <div className="flex items-center gap-1">
            {/* X Logo */}
            <span
              ref={xRef}
              className="text-4xl font-bold leading-none"
              style={{
                fontFamily: '"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              X
            </span>
            
            {/* sasankaWrites */}
            <span
              ref={brandTextRef}
              className="text-2xl font-medium leading-none"
              style={{
                fontFamily: '"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif',
                background: 'linear-gradient(135deg, #d0d0d0 0%, #909090 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              sasankaWrites
            </span>
          </div>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col items-center gap-4 w-72">
          {/* Progress Bar */}
          <div
            ref={progressBarRef}
            className="w-full h-1 rounded-full overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.1)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
            }}
          >
            <div
              ref={progressFillRef}
              className="h-full rounded-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
                transform: 'scaleX(0)',
              }}
            />
          </div>

          {/* Status Text */}
          <p
            ref={statusTextRef}
            className="text-xs tracking-[0.3em] uppercase"
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            }}
          >
            PREPARING WORKSPACE
          </p>
        </div>
      </div>

      {/* CSS for particle animation and fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
