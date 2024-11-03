import React from 'react'
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { immigrationServices } from "@/constants/servicepage"

export default function Service() {
  return (
    <div className="py-10">
      {/* Header Section */}
      <div className="flex flex-col space-y-4">
        <h4 className="md:text-base text-xs text-brandBluish font-medium">Start Immigration right now</h4>
        <h1 className="md:text-3xl text-xl font-bold">
          Explore our <span className="text-green-500">Services</span>
        </h1>

        <div className="md:flex items-center space-x-5">
          <div className="md:w-11/12 mb-2">
            <p className="text-justify">
              Unlock the potential of global opportunities with our immigration services...
            </p>
            <h4 className="md:text-base text-xs font-medium my-2">
              We take pride in facilitating and fast-tracking the following services:
            </h4>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {immigrationServices.map((service, idx) => (
          <Card key={idx} className="shadow-xl flex flex-col h-full">
            <div className="relative h-40">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <CardHeader className="py-4 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center text-brandBluish">
                  {React.createElement(service.icon, { size: 20 })}
                  <h4 className="text-base ml-3 font-medium">{service.title}</h4>
                </div>
                <CardDescription>
                  {service.desc.length > 80 ? `${service.desc.slice(0, 80)}...` : service.desc}
                </CardDescription>
              </div>
              <div className="mt-4">
                <a 
                  href={`/services/${service.id}`} 
                  className="bg-green-500 text-white text-xs font-medium px-4 py-2 rounded-md w-full text-center hover:bg-green-600 transition-colors inline-block"
                >
                  Read More
                </a>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}