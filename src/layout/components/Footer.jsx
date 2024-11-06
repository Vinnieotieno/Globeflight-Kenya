import Container from "@/components/Container"
import { X } from "lucide-react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Footer = ({ data }) => {
  const [showFeedback, setShowFeedback] = useState(true)

  return (
    <>
      {showFeedback && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 py-1 px-2 flex items-center justify-between z-50 border-t shadow-lg">
          <div className="flex-1 text-center sm:text-left">
            <span className="font-medium">Your opinion is important to us:</span>{" "}
            What do you think of Globeflight?
          </div>
          <div className="flex items-center gap-4">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap"
              onClick={() => window.location.href = '/feedback'}
            >
              Give feedback now!
            </Button>
            <button
              onClick={() => setShowFeedback(false)}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Close feedback"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      
      <footer className="w-full py-10 px-4 sm:px-6 lg:px-8 mx-auto bg-white">
        <Container>
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center">
              <img 
                src={data.brand} 
                className="w-52 h-24 object-cover" 
                alt="rollinscodes.com" 
              />
            </Link>

            <div className="mt-3">
              <p className="text-gray-500">{data.text1}</p>
              <p className="text-gray-500">&copy; {data.text2}</p>
            </div>

            <div className="mt-3 space-x-2">
              {data.socials.map((social, idx) => (
                <a
                  target="blank"
                  key={idx}
                  className="inline-flex justify-center items-center size-10 text-center hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                  href={social.link}
                >
                  {React.createElement(social.icon, { size: "20" })}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </footer>

      {/* Add padding to prevent content from being hidden behind the feedback bar */}
      {showFeedback && <div className="h-16" />}
    </>
  )
}

export default Footer