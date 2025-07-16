import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import { footerItems, navbaritems } from '@/constants/layout'
import TawkToComponent from '@/components/TawkToComponent'

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GTM
    const initGTM = () => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "pageview",
          page: {
            url: window.location.href,
            path: location.pathname,
          },
        });
      }
    };

    initGTM();
  }, [location]);

  // Get page-specific meta data
  const getPageMeta = () => {
    const pathname = location.pathname;
    const baseTitle = "Globeflight Kenya";
    
    switch(pathname) {
      case '/':
        return {
          title: `${baseTitle} - International Logistics & Global Shipping Solutions`,
          description: "Globeflight Kenya offers reliable international logistics and shipping solutions worldwide. Air freight, sea freight, warehousing, and customs clearance connecting Kenya and Africa to the global market.",
        };
      case '/services':
        return {
          title: `${baseTitle} - International Logistics Services | Global Shipping Solutions`,
          description: "Explore Globeflight Kenya's comprehensive international logistics services including air freight, sea freight, road transport, warehousing, and customs clearance. Connecting Africa to the world.",
        };
      case '/track':
        return {
          title: `${baseTitle} - Track Your Shipment | Real-time Tracking`,
          description: "Track your Globeflight Kenya shipment in real-time. Enter your tracking number to get instant updates on your cargo location and delivery status.",
        };
      case '/contact-us':
        return {
          title: `${baseTitle} - Contact Us | Get in Touch`,
          description: "Contact Globeflight Kenya for all your logistics needs. Located in Nairobi, we provide 24/7 customer support for shipping and freight inquiries.",
        };
      case '/about-us':
        return {
          title: `${baseTitle} - About Us | Your Trusted Logistics Partner`,
          description: "Learn about Globeflight Kenya's journey as a leading logistics company. Discover our mission, values, and commitment to excellence in shipping services.",
        };
      case '/blog':
        return {
          title: `${baseTitle} - Blog | Latest News & Industry Updates`,
          description: "Stay updated with Globeflight Kenya's latest news, shipping industry insights, logistics tips, and company announcements.",
        };
      case '/jobs':
        return {
          title: `${baseTitle} - Careers | Join Our Team`,
          description: "Explore career opportunities at Globeflight Kenya. Join our dynamic team and build your career in the logistics and shipping industry.",
        };
      default:
        return {
          title: `${baseTitle} - Your Global Logistics Partner`,
          description: "Globeflight Kenya - International logistics and shipping company offering reliable freight forwarding, warehousing, and distribution services worldwide.",
        };
    }
  };

  const { title, description } = getPageMeta();

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Globeflight Kenya, international logistics, global shipping, worldwide freight forwarding, Africa logistics hub, Kenya to world shipping, international air freight, global sea freight, continental road transport, international warehousing, global customs clearance, Africa cargo services, worldwide track shipment, international express delivery" />
        <meta name="author" content="Globeflight Kenya Ltd" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://globeflight.co.ke${location.pathname}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://globeflight.co.ke/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Globeflight Kenya" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://globeflight.co.ke${location.pathname}`} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://globeflight.co.ke/logo.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://globeflight.co.ke${location.pathname}`} />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* JSON-LD Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LogisticsService",
            "name": "Globeflight Kenya",
            "url": "https://globeflight.co.ke",
            "logo": "https://globeflight.co.ke/logo.png",
            "description": "Leading international logistics and shipping company based in Kenya, connecting Africa to the world with reliable freight forwarding, warehousing, and global distribution services.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road",
              "addressLocality": "Nairobi",
              "addressCountry": "KE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-1.3195",
              "longitude": "36.897"
            },
            "sameAs": [
              "https://www.facebook.com/globeflightkenya",
              "https://twitter.com/globeflight_ke",
              "https://www.linkedin.com/company/globeflight-kenya",
              "https://www.youtube.com/@globeflightkenya"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+254729341277",
              "contactType": "customer service",
              "availableLanguage": ["English", "Swahili", "French", "Arabic", "Chinese", "Spanish", "Portuguese"]
            },
            "serviceArea": {
              "@type": "Place",
              "name": "Worldwide - Specializing in Africa to Global Routes"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Logistics Services",
              "itemListElement": [
                {
                  "@type": "Service",
                  "name": "International Air Freight"
                },
                {
                  "@type": "Service",
                  "name": "Global Sea Freight"
                },
                {
                  "@type": "Service",
                  "name": "Continental Road Transport"
                },
                {
                  "@type": "Service",
                  "name": "International Warehousing"
                },
                {
                  "@type": "Service",
                  "name": "Global Customs Clearance"
                }
              ]
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://globeflight.co.ke/track?trackingNumber={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
        {/* Google Tag Manager - GTM-PVKKQVN */}
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PVKKQVN');
          `}
        </script>
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        {/* Google Tag Manager (noscript) - GTM-PVKKQVN */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PVKKQVN"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          ></iframe>
        </noscript>
        
        {/* Navbar */}
        <Navbar data={navbaritems}/>
        
        {/* Outlet (Centered) */}
        <div className="flex-1 ">
          <Outlet />
        </div>
        
        {/* Footer */}
        <Footer data={footerItems} />
        
        {/* TawkTo Chat Widget */}
        <TawkToComponent />
      </div>
    </>
  );
}

export default MainLayout