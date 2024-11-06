// components/ServiceDetail.jsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { immigrationServices } from "@/constants/servicepage"

export default function ServiceDetail() {
  const { id } = useParams() // Extract the dynamic id from the URL

  // Find the service that matches the id
  const service = immigrationServices.find(service => service.id === id)

  if (!service) {
    return <div className="text-center text-red-500">Service not found</div>
  }

  return (
    <div className="py-10">
      <h1 className="md:text-3xl text-xl font-bold">{service.title}</h1>
      <p className="text-justify">{service.desc}</p>
    </div>
  )
}
