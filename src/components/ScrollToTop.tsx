import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Extend window to include fbq without a separate @types package
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Meta Pixel — fire PageView on every SPA route change
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }

    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
