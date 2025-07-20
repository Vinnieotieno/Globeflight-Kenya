import React from "react"
import { Heart } from "lucide-react"

const FooterBottom = () => (
  <div className="mt-12 pt-8 border-t border-gray-700">
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
        <span>&copy; {new Date().getFullYear()} Globeflight Kenya. All rights reserved.</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Heart className="w-4 h-4 text-red-400" />
        <span>Made with love for Globeflight Kenya</span>
      </div>
    </div>
  </div>
)

export default FooterBottom 