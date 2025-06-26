import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Linkedin, Twitter, Mail, Quote, Briefcase, Star, Award, Users, ArrowRight } from 'lucide-react';
import { ourTeam } from '@/constants/aboutpage';

import { Link, useLocation } from "react-router-dom";
const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Enhanced team data with additional fields
  const enhancedTeam = ourTeam.map((member, idx) => ({
    ...member,
    expertise: member.expertise || (
      idx === 0 ? ["Strategic Leadership", "Business Development", "Operations Management"] :
      idx === 1 ? ["Financial Management", "Client Relations", "Regulatory Compliance"] :
      ["Customer Support", "Client Satisfaction", "Communication"]
    ),
    experience: member.experience || (
      idx === 0 ? "15+ Years" :
      idx === 1 ? "12+ Years" :
      "8+ Years"
    ),
    linkedin: member.linkedin || "#",
    twitter: member.twitter || "#",
    email: member.email || member.name.toLowerCase().split(' ')[0] + "@globeflight.com"
  }));

  return (
    <section className="py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="container px-4 mx-auto mb-16">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-6 py-2 mb-6 text-sm font-bold text-green-600 rounded-full shadow-sm bg-green-50">
            <Users className="w-4 h-4" />
            OUR LEADERSHIP
          </span>
          
          <h1 className="mb-6 text-5xl font-black leading-tight text-gray-900 md:text-7xl">
            Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Team</span>
          </h1>
          
          <p className="text-xl leading-relaxed text-gray-600 md:text-2xl">
            Our experienced team of professionals is dedicated to delivering excellence and innovation in global logistics
          </p>
        </motion.div>
      </div>

      {/* Team Grid */}
      <div className="container px-4 mx-auto">
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {enhancedTeam.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card 
                className="h-full overflow-hidden transition-all duration-500 border-0 shadow-lg cursor-pointer group hover:shadow-2xl"
                onClick={() => setSelectedMember(member)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-80">
                  <motion.img 
                    className="object-cover w-full h-full"
                    src={member.img} 
                    alt={member.name}
                    animate={{ scale: hoveredIndex === idx ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80" />
                  
                  {/* Quick Actions */}
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: hoveredIndex === idx ? 0 : 20, opacity: hoveredIndex === idx ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex gap-3">
                      <a 
                        href={member.linkedin}
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 transition-colors rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                      <a 
                        href={member.twitter}
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 transition-colors rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
                      >
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                      <a 
                        href={`mailto:${member.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 transition-colors rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
                      >
                        <Mail className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Experience Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-full shadow-lg">
                      {member.experience}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{member.name}</h3>
                  <p className="mb-4 text-sm font-semibold tracking-wider text-green-600 uppercase">
                    {member.position}
                  </p>
                  <p className="mb-4 text-gray-600 line-clamp-3">{member.desc}</p>
                  
                  {/* View Profile Button */}
                  <Button 
                    className="w-full font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 group"
                  >
                    View Full Profile
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Modal */}
      <AnimatePresence>
        {selectedMember && (
          <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
            <DialogContent className="max-w-3xl p-0 overflow-hidden">
              <div className="grid gap-0 md:grid-cols-5">
                {/* Left Side - Image */}
                <div className="relative h-64 md:col-span-2 md:h-full">
                  <img 
                    src={selectedMember.img} 
                    alt={selectedMember.name} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute text-white bottom-4 left-4">
                    <h3 className="text-2xl font-bold">{selectedMember.name}</h3>
                    <p className="text-green-400">{selectedMember.position}</p>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="p-8 md:col-span-3">
                  {/* Quote Section */}
                  <div className="mb-6">
                    <Quote className="w-8 h-8 mb-3 text-green-500" />
                    <p className="text-lg italic leading-relaxed text-gray-700">
                      {selectedMember.desc}
                    </p>
                  </div>

                  {/* Expertise Section */}
                  <div className="mb-6">
                    <h4 className="flex items-center gap-2 mb-3 text-lg font-bold text-gray-900">
                      <Award className="w-5 h-5 text-green-600" />
                      Areas of Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.expertise.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-4 py-2 text-sm font-medium text-green-700 rounded-full bg-green-50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        <span className="font-semibold">{selectedMember.experience} Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold">1000+ Happy Clients</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="flex gap-4">
                    <Button 
                      className="flex-1 text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      onClick={() => window.location.href = `mailto:${selectedMember.email}`}
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Send Email
                    </Button>
                    <Button 
                      variant="outline"
                      className="text-green-600 border-2 border-green-500 hover:bg-green-50"
                      onClick={() => window.open(selectedMember.linkedin, '_blank')}
                    >
                      <Linkedin className="w-5 h-5 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.div 
        className="container px-4 mx-auto mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-12 text-center text-white shadow-2xl bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Join Our Growing Team</h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-green-50">
            We're always looking for talented individuals who share our passion for excellence in logistics
          </p>
         <Link to="/jobs" className="inline-block">
  <Button
    size="lg"
    className="flex items-center gap-2 px-8 py-6 text-lg font-bold text-green-600 bg-white rounded-full hover:bg-gray-100"
  >
    <Briefcase className="w-5 h-5" />
    View Career Opportunities
  </Button>
</Link>
        </div>
      </motion.div>
    </section>
  );
}

export default Team;