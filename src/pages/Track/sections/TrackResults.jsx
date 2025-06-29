import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package2, MapPin, Truck, FileDown, CheckCircle2, CircleDot } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TrackResults({ trackingData, getProgress, handleDownload }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 relative"
    >
      {/* Animated Gradient Blob */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse z-0" />
      {/* Shipment Overview Card */}
      <Card className="overflow-hidden bg-white border border-green-100 shadow-2xl relative z-10">
        <CardHeader className="p-8 text-white bg-gradient-to-r from-green-500 to-emerald-600">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="mb-2 text-3xl font-bold">Shipment Details</CardTitle>
              <p className="text-green-100">Tracking #{trackingData.trackingNumber || trackingData.shipment_number}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">
                <CircleDot className="w-5 h-5" />
                <span className="text-lg font-semibold capitalize">{trackingData.status}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          {/* Info Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div whileHover={{ scale: 1.05 }} className="p-5 border border-green-100 bg-green-50 rounded-xl shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Package2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">Consignment</p>
                  <p className="font-bold text-gray-900">{trackingData.trackingNumber || trackingData.shipment_number}</p>
                </div>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-5 border border-blue-100 bg-blue-50 rounded-xl shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">Origin</p>
                  <p className="font-bold text-gray-900">{trackingData.origin}</p>
                </div>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-5 border border-purple-100 bg-purple-50 rounded-xl shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">Destination</p>
                  <p className="font-bold text-gray-900">{trackingData.destination}</p>
                </div>
              </div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-5 border border-orange-100 bg-orange-50 rounded-xl shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Truck className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">Status</p>
                  <p className="font-bold text-gray-900 capitalize">{trackingData.status}</p>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Progress Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="mb-6 text-xl font-bold text-gray-900">Shipment Progress</h3>
            <div className="relative">
              {/* Progress Bar Background */}
              <div className="absolute left-0 right-0 h-1 bg-gray-200 rounded-full top-5" />
              {/* Progress Bar Fill */}
              <div 
                className="absolute left-0 h-1 transition-all duration-1000 ease-out rounded-full top-5 bg-gradient-to-r from-green-500 to-emerald-600"
                style={{ width: `${getProgress()}%` }}
              />
              {/* Timeline Steps */}
              <div className="relative flex justify-between">
                {(trackingData.updates || []).map((update, index) => {
                  const isActive = trackingData.updates.findIndex(u => u.status === trackingData.status) >= index;
                  const isCurrent = update.status === trackingData.status;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className={
                        `w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                        ${isCurrent ? 'bg-green-500 scale-125 shadow-lg shadow-green-500/30' : 
                          isActive ? 'bg-green-500' : 'bg-gray-300'}`
                      }>
                        {isActive ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="mt-3 text-center">
                        <p className={`text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                          {update.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(update.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(update.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
          {/* Download Actions */}
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => handleDownload('waybill')}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg hover:scale-105"
            >
              <FileDown className="w-5 h-5" />
              Download Waybill
            </Button>
            <Button
              onClick={() => handleDownload('invoice')}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-200 transform bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg hover:scale-105"
            >
              <FileDown className="w-5 h-5" />
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 