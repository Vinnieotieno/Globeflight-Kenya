import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { immigrationServices } from '@/constants/servicepage';
import Hero from '@/components/sections/Hero';
import CallToActionSection from '@/components/CallToActionSection';

export default function ServiceDetail() {
  const router = useRouter();
  const { id } = router.query; // Get `id` from the URL query parameters
  const [service, setService] = useState(null);

  useEffect(() => {
    // Wait until the router is ready before accessing the query parameter
    if (router.isReady && id) {
      const foundService = immigrationServices.find((item) => item.id === id);
      setService(foundService);

      // Debugging logs
      console.log("Router ID:", id);
      console.log("Found Service:", foundService);
    }
  }, [id, router.isReady]);

  // If the service is still loading
  if (service === null) {
    return <div>Loading...</div>;
  }

  // If no service is found, display 404 message
  if (!service) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">404 - Service Not Found</h1>
        <p className="text-lg mt-4">The service you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Service Content */}
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
        <img 
          src={service.img} 
          alt={service.title} 
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
        <p className="text-lg text-gray-700">{service.desc}</p>
      </div>

      {/* Call to Action Section */}
      <CallToActionSection />
    </div>
  );
}
