'use client';

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowRight, Star, Package } from 'lucide-react';

export default function Service() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [featuredService, setFeaturedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  // Fetch services from backend API
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('https://globeflight.co.ke/admin/api/services/public?limit=100');
        const data = await res.json();
        if (data.success) {
          setServices(data.data.services);
          // Optionally, pick a featured service (e.g., first one)
          setFeaturedService(data.data.services.find(s => s.featured) || data.data.services[0]);
        }
      } catch (err) {
        setServices([]);
      }
    }
    fetchServices();
  }, []);

  // Filter services by search/category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.shortDescription || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    // If you have category, add category filtering here
    return matchesSearch && (selectedCategory === 'all' || (service.category === selectedCategory));
  });

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category || 'Uncategorized')))];

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Helper to create slug from title
  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  // Generate structured data for services
  const generateServiceSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Globeflight Kenya International Logistics Services",
      "description": "Comprehensive international logistics and shipping services connecting Kenya and Africa to the world. Global air freight, sea freight, warehousing, and customs clearance solutions.",
      "numberOfItems": filteredServices.length,
      "itemListElement": filteredServices.map((service, index) => ({
        "@type": "Service",
        "position": index + 1,
        "name": service.title,
        "description": service.shortDescription || service.description,
        "provider": {
          "@type": "Organization",
          "name": "Globeflight Kenya",
          "url": "https://globeflight.co.ke"
        },
        "areaServed": [
          {
            "@type": "Place",
            "name": "Worldwide"
          },
          {
            "@type": "Continent",
            "name": "Africa"
          },
          {
            "@type": "Continent",
            "name": "Europe"
          },
          {
            "@type": "Continent",
            "name": "Asia"
          },
          {
            "@type": "Continent",
            "name": "North America"
          },
          {
            "@type": "Continent",
            "name": "South America"
          }
        ],
        "serviceType": ["International Shipping", "Global Logistics", "Freight Forwarding"],
        "url": `https://globeflight.co.ke/services/${service.slug || slugify(service.title)}`,
        "image": service.imageUrl
      }))
    };
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://globeflight.co.ke"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://globeflight.co.ke/services"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>International Logistics Services | Global Shipping, Air & Sea Freight - Globeflight Kenya</title>
        <meta name="description" content="Globeflight Kenya offers international logistics services worldwide. Air freight, sea freight, road transport, warehousing, customs clearance across Africa, Europe, Asia, Americas. Global shipping solutions from Kenya to the world." />
        <meta name="keywords" content="international logistics services, global shipping Kenya, worldwide freight forwarding, Africa logistics services, international air freight, global sea freight, Kenya to Europe shipping, Kenya to USA shipping, Kenya to Asia logistics, Africa to world shipping, international cargo services, global warehousing, worldwide customs clearance, international shipping company Kenya, Africa freight forwarding, global transportation services, continental logistics Africa, Globeflight international services" />
        
        {/* Open Graph */}
        <meta property="og:title" content="International Logistics Services - Globeflight Kenya | Global Shipping Solutions" />
        <meta property="og:description" content="Professional international air freight, sea freight, warehousing, and customs clearance services. Your trusted global logistics partner connecting Kenya and Africa to the world." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://globeflight.co.ke/services" />
        <meta property="og:image" content="https://globeflight.co.ke/services-hero.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="International Logistics Services - Globeflight Kenya" />
        <meta name="twitter:description" content="Global shipping solutions: Air & sea freight, warehousing & customs clearance. Connecting Africa to the world." />
        
        <link rel="canonical" href="https://globeflight.co.ke/services" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateServiceSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          {/* Header Section with enhanced SEO */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              International <span className="text-green-500">Logistics Services</span> Worldwide
            </h1>
            <h2 className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlock global opportunities with Globeflight Kenya's international logistics solutions. 
              We provide fast, reliable, and cost-effective shipping services from Kenya to anywhere in the world - 
              covering Africa, Europe, Asia, Americas, and beyond.
            </h2>
          </header>

          {/* Featured Service with Schema markup */}
          {featuredService && (
            <section className="mb-16" aria-label="Featured Service" itemScope itemType="https://schema.org/Service">
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredService.imageUrl}
                      alt={`${featuredService.title} - Featured logistics service by Globeflight Kenya`}
                      className="w-full h-64 md:h-full object-cover"
                      loading="lazy"
                      itemProp="image"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        <Star className="text-yellow-400 mr-2" aria-hidden="true" />
                        <h3 className="text-2xl font-bold">Featured Service</h3>
                      </div>
                      <h4 className="text-xl font-semibold mb-2" itemProp="name">{featuredService.title}</h4>
                      <p className="text-gray-600 mb-4" itemProp="description">
                        {featuredService.shortDescription || featuredService.description}
                      </p>
                      {featuredService.keyBenefits && featuredService.keyBenefits.length > 0 && (
                        <ul className="list-disc ml-5 mb-4">
                          {featuredService.keyBenefits.map((b, i) => (
                            <li key={i} className="text-sm text-green-700">{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <Link 
                      to={`/services/${featuredService.slug || slugify(featuredService.title)}`}
                      itemProp="url"
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Learn More About {featuredService.title} 
                        <ArrowRight className="ml-2" aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* Search and Filter with ARIA labels */}
          <section className="mb-8" aria-label="Service search and filters">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <label htmlFor="service-search" className="sr-only">
                  Search logistics services
                </label>
                <Input
                  id="service-search"
                  type="text"
                  placeholder="Search services... (e.g., air freight, warehousing)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  aria-label="Search logistics services"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory} aria-label="Filter services by category">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category ? category.charAt(0).toUpperCase() + category.slice(1) : "Uncategorized"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* Services Grid with enhanced SEO */}
          <section aria-label="All logistics services">
            <h2 className="sr-only">Our Logistics Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => {
                const slug = service.slug || slugify(service.title);
                return (
                  <article 
                    key={service.id} 
                    className="h-full"
                    itemScope 
                    itemType="https://schema.org/Service"
                  >
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                      <img
                        src={service.imageUrl}
                        alt={`${service.title} - Logistics service by Globeflight Kenya`}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        itemProp="image"
                      />
                      <CardHeader className="flex-grow">
                        <CardTitle className="flex items-center text-lg font-semibold" itemProp="name">
                          <Package className="mr-2" aria-hidden="true" />
                          {service.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2" itemProp="description">
                          {service.shortDescription || service.description}
                        </CardDescription>
                        {service.keyBenefits && service.keyBenefits.length > 0 && (
                          <ul className="list-disc ml-5 mt-2" aria-label={`Benefits of ${service.title}`}>
                            {service.keyBenefits.slice(0, 3).map((b, i) => (
                              <li key={i} className="text-xs text-green-700">{b}</li>
                            ))}
                          </ul>
                        )}
                      </CardHeader>
                      <CardContent className="flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          onClick={() => openModal(service)}
                          aria-label={`Quick view ${service.title}`}
                        >
                          Quick View
                        </Button>
                        <Link 
                          to={`/services/${slug}`}
                          itemProp="url"
                          aria-label={`Read more about ${service.title}`}
                        >
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            Read More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </article>
                );
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-green-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Need International Logistics Solutions?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Contact our global logistics experts for tailored international shipping and freight forwarding services 
              connecting Kenya and Africa to any destination worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-us">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get International Quote <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <a href="tel:+254729341277">
                <Button size="lg" variant="outline">
                  Call Us: +254 729 341 277
                </Button>
              </a>
            </div>
          </section>
        </div>

        {/* Service Preview Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          {selectedService && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{selectedService.title}</DialogTitle>
                <DialogDescription>
                  <Package className="mb-2" />
                  {selectedService.shortDescription || selectedService.description}
                  {selectedService.keyBenefits && selectedService.keyBenefits.length > 0 && (
                    <ul className="list-disc ml-5 mt-2">
                      {selectedService.keyBenefits.map((b, i) => (
                        <li key={i} className="text-xs text-green-700">{b}</li>
                      ))}
                    </ul>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={selectedService.imageUrl}
                  alt={selectedService.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <DialogFooter className="mt-4">
                <Button onClick={closeModal} variant="outline">Close</Button>
                <Link to={`/services/${selectedService.slug || slugify(selectedService.title)}`}>
                  <Button>Learn More</Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </>
  );
}