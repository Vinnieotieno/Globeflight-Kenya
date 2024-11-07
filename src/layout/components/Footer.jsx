import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { X, Send, MapPin, Phone, Mail } from "lucide-react";

const Footer = ({ data }) => {
  const [showFeedback, setShowFeedback] = useState(true);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-green-600 to-green-800 text-white">
      {showFeedback && (
        <Card className="fixed bottom-4 right-4 z-50 w-full max-w-sm bg-white text-green-800 shadow-xl">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">We Value Your Opinion</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFeedback(false)}
                className="text-green-800 hover:text-green-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm mb-4">What do you think of Globeflight?</p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={() => (window.location.href = '/contact-us')}
            >
              Give Feedback Now!
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={data.brand}
                className="w-40 h-20 object-contain"
                alt="Globeflight"
              />
            </Link>
            <p className="text-sm">{data.text1}</p>
            <p className="text-sm">&copy; {data.text2}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="hover:underline">About Us</Link></li>
              <li><Link to="/services" className="hover:underline">Our Services</Link></li>
              <li><Link to="/track" className="hover:underline">Track Shipment</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>NEXTGEN MALL, 3rd Floor, Suite 39/40, Mombasa Road</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <span>+254729341277</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <span>info@globeflight.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-green-400">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {data.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-green-600 hover:bg-green-100 p-2 rounded-full transition-colors duration-300"
                >
                  {React.createElement(social.icon, { size: "20" })}
                </a>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-r-none bg-white text-green-800"
                required
              />
              <Button type="submit" className="rounded-l-none bg-white text-green-600 hover:bg-green-100">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;