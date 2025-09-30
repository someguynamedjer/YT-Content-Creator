import React from 'react';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Mail, Twitter, Linkedin, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    services: [
      { name: 'Content Multiplier', href: '#services' },
      { name: 'Travel Companion', href: '#services' },
      { name: 'Audience Magnet', href: '#services' },
      { name: 'Custom Projects', href: '#contact' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Content Strategy Guide', href: '#' },
      { name: 'YouTube Growth Tips', href: '#' },
      { name: 'Email Templates', href: '#' },
      { name: 'Pricing Calculator', href: '#' }
    ]
  };

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">ContentCraft</h3>
                <p className="text-gray-400 text-sm mb-4">YouTube Writing Services</p>
                <p className="text-gray-300 leading-relaxed">
                  Helping YouTubers multiply their content impact and build sustainable revenue streams through strategic writing services.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <Mail size={18} />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <Twitter size={18} />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <Linkedin size={18} />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200">
                  <Youtube size={18} />
                </button>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Resources</h4>
              <ul className="space-y-3 mb-6">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200 text-left">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-3">
                <Badge variant="outline" className="border-gray-600 text-gray-300 hover:border-gray-500">
                  ✅ 100% Money-Back Guarantee
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-300 hover:border-gray-500">
                  ⚡ 5-7 Day Turnaround
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="bg-gray-800" />
        
        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} ContentCraft. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="hover:text-white transition-colors duration-200">
                Terms of Service
              </button>
              <button className="hover:text-white transition-colors duration-200">
                Refund Policy
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span>for creators</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;