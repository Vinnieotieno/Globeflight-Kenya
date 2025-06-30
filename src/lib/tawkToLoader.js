// TawkTo Script Loader
import { TAWK_TO_CONFIG } from '@/config/tawkTo';

export const loadTawkToScript = () => {
  return new Promise((resolve, reject) => {
    try {
      if (window.Tawk_API) {
        resolve(window.Tawk_API);
        return;
      }

      const propertyId = TAWK_TO_CONFIG.propertyId;
      const widgetId = TAWK_TO_CONFIG.widgetId;
      
      // Create script element
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      
      // Add load and error handlers
      script.onload = () => {
        if (window.Tawk_API) {
          // Configure API key
          window.Tawk_API.visitor = {
            name: 'Website Visitor',
            apiKey: '6926cef9a3f64cac6ebedf2660079b15107b29e7'
          };
          resolve(window.Tawk_API);
        } else {
          reject(new Error('Tawk_API not found after script load'));
        }
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Tawk.to script'));
      };

      // Append script to document
      document.body.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
};

export const isTawkToLoaded = () => {
  return !!window.Tawk_API;
}; 