import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { footerItems, navbaritems } from '@/constants/layout'
//import TawkToComponent from '@/components/TawkToComponent'


const MainLayout = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Globeflight Kenya - Logistics & Shipping Solutions</title>
        <meta name="description" content="Globeflight Kenya offers reliable, efficient, and cost-effective logistics and shipping solutions. Track your shipment, explore our services, and contact us today!" />
        <meta name="keywords" content="Globeflight Kenya, Globeflight Worldwide Express,logistics, shipping, courier, track shipment, Kenya, Africa, Worldwide, delivery, freight" />
        <meta property="og:title" content="Globeflight Kenya - Logistics & Shipping Solutions" />
        <meta property="og:description" content="Globeflight Kenya offers reliable, efficient, and cost-effective logistics and shipping solutions." />
        <meta property="og:url" content="https://globeflight.co.ke" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://globeflight.co.ke/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Globeflight Kenya - Logistics & Shipping Solutions" />
        <meta name="twitter:description" content="Globeflight Kenya offers reliable, efficient, and cost-effective logistics and shipping solutions." />
        <meta name="twitter:image" content="https://globeflight.co.ke/logo.png" />
        <link rel="canonical" href="https://globeflight.co.ke" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar data={navbaritems}/>

        {/* Outlet (Centered) */}
        <div className="flex-1 ">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer data={footerItems} />

        {/* TawkToComponent 
        <TawkToComponent />*/}
      </div>
    </HelmetProvider>
  );
}

export default MainLayout