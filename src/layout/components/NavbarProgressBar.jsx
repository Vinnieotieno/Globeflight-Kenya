import React from "react"
import { motion } from "framer-motion"

const NavbarProgressBar = ({ scrollProgress }) => (
  <div className="h-1 bg-gray-200">
    <motion.div 
      className="h-full bg-gradient-to-r from-green-400 to-green-600"
      style={{ width: `${scrollProgress}%` }}
      transition={{ duration: 0.1 }}
    />
  </div>
)

export default NavbarProgressBar 