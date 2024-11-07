// components/ServiceDetail.jsx
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { immigrationServices } from "@/constants/servicepage"
import CallToActionSection from "@/components/CallToActionSection"
import ScrollOnSideSection from '../../components/ScrollOnSideSection'
import Hero from "@/pages/Services/sections/Hero"

export default function ServiceDetail() {
  const { id } = useParams()
  const service = immigrationServices.find(s => s.id === id)

  if (!service) {
    return <p>Service not found</p>
  }

  // Find previous and next services
  const serviceIndex = immigrationServices.indexOf(service)
  const previousService = serviceIndex > 0 ? immigrationServices[serviceIndex - 1] : null
  const nextService = serviceIndex < immigrationServices.length - 1 ? immigrationServices[serviceIndex + 1] : null

  // Related services (exclude current and adjacent services)
  const relatedServices = immigrationServices
    .filter((s) => s.id !== id && s.id !== previousService?.id && s.id !== nextService?.id)
    .slice(0, 3)

  return (
    <div className="py-10">
      {/* Hero Section */}
      <Hero />

      {/* Main Service Content */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">{service.title}</h1>
        
        {/* Centered Image */}
        <img 
          src={service.img} 
          alt={service.title} 
          className="w-full max-w-lg h-auto rounded-lg shadow-lg mx-auto"
        />

        {/* Description */}
        <div className="text-lg text-gray-700 my-6 px-4 leading-relaxed">
          {service.desc}
        </div>
      </div>

      {/* Previous, Next, and Related Services */}
      <div className="flex flex-col items-center mt-10 space-y-8">
        {/* Previous and Next Links */}
        <div className="flex justify-between w-full max-w-3xl px-6">
          {previousService && (
            <Link to={`/services/${previousService.id}`} className="text-green-500 text-lg font-semibold hover:underline">
              &larr; {previousService.title}
            </Link>
          )}
          {nextService && (
            <Link to={`/services/${nextService.id}`} className="text-green-500 text-lg font-semibold hover:underline ml-auto">
              {nextService.title} &rarr;
            </Link>
          )}
        </div>

        {/* Related Services */}
        <div className="w-full max-w-3xl text-center mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((related) => (
              <Card key={related.id} className="shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
                <Link to={`/services/${related.id}`} className="block">
                  <img src={related.img} alt={related.title} className="w-full h-32 object-cover rounded-md mb-3" />
                  <h3 className="text-lg font-semibold text-gray-700">{related.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{related.desc.slice(0, 60)}...</p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <CallToActionSection />
      <ScrollOnSideSection />
    </div>
  )
}
