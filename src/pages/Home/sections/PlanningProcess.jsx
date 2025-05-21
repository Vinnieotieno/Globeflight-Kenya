"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Clock, BarChart3, Workflow } from "lucide-react"
import planning from "@/assets/planning.png"

const PlanningProcess = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const steps = [
    { icon: BarChart3, text: "Strategic Planning" },
    { icon: Workflow, text: "Process Optimization" },
    { icon: Clock, text: "Time Management" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <motion.div
            className="md:w-5/12 lg:w-4/12 md:sticky md:top-28 z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="p-6 bg-white shadow-xl rounded-xl border-0 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
              <CardContent className="space-y-6 p-0">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 text-sm font-semibold text-green-600 bg-green-50 rounded-full"
                >
                  How it Works
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight leading-tight"
                >
                  Planning & <span className="text-green-600">Process</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 leading-relaxed text-lg"
                >
                  Proper logistic planning entails considering logistical aspects throughout the various stages of the
                  procurement process. It contributes to efficient procurement processes and reduces the risk of
                  incurring problems that may lead to additional cost and delay.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 pt-2"
                >
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <step.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{step.text}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <Button className="group bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="md:w-7/12 lg:w-8/12" ref={ref}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <Card className="overflow-hidden rounded-xl shadow-2xl border-0 transform transition-all duration-500 hover:translate-y-[-10px]">
                <div className="relative">
                  <img
                    src={planning || "/placeholder.svg"}
                    alt="Logistics Planning Process"
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>

                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Strategic Logistics Planning</h3>
                    <p className="text-white/90 max-w-lg">
                      Our comprehensive planning approach ensures efficient movement of goods across global supply
                      chains
                    </p>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-800">ISO Certified Process</span>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-green-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlanningProcess
