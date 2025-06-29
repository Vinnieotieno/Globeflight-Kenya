import logo from '@/assets/logo.png'
import { Facebook, Instagram, Twitter, Linkedin, Youtube,  } from 'lucide-react';

export const navbaritems = {
  logo: logo,
  navItems: [
    { link: 'Home', path: '/' },
    { link: 'Services', path: '/services', dropdown: true },
    { link: 'About', path: '/about-us' },
    { link: 'Contact', path: '/contact-us' },
    
    
    { link: 'WMS Logins', path: 'https://globeflight.thinksynergyltd.com/', external: true },

  ],
};


export const footerItems = {
  brand: logo,
  text1: "We are Globeflight Family.",
  text2: " 2024. All rights reserved.",
  socials: [
    {
      icon: Facebook,
      link: "https://shorturl.at/Mjx08",
    },
    
    {
      icon: Twitter,
      link: "https://x.com/globeflight_ke",
    },
    {
      icon: Linkedin,
      link: "https://shorturl.at/zUxYI",
    
    },
    {
      icon: Youtube,
      link: "https://shorturl.at/6enHI",
    },
  ],
};