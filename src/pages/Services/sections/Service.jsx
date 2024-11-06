// components/Service.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { immigrationServices } from "@/constants/servicepage"

export default function Service() {
  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 text-center">
        <h1 className="md:text-3xl text-6xl font-bold">
          Explore our <span className="text-green-500">Services</span>
        </h1>
        <div className="md:w-3/4 mx-auto">
          <p className="text-justify">
            Unlock the potential of global opportunities with our Logistics Services. We take pride in facilitating and fast-tracking the following services:
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
        {immigrationServices.map((service) => (
          <Card key={service.id} className="shadow-lg rounded-lg flex flex-col h-full transition-transform transform hover:scale-105">
            <div className="relative h-48">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <CardHeader className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center text-brandBluish mb-2">
                  {React.createElement(service.icon, { size: 24 })}
                  <h4 className="text-lg ml-3 font-semibold">{service.title}</h4>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  {service.desc.length > 100 ? `${service.desc.slice(0, 100)}...` : service.desc}
                </CardDescription>
              </div>
              <div className="mt-4">
                <Link to={`/services/${service.id}`}>
                  <span className="bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-green-600 transition-colors block text-center">
                    Read More
                  </span>
                </Link>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
