import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { services } from '../data/mock';

const Services = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            My Services
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Specialized Writing Packages for 
            <span className="text-gray-600"> YouTube Creators</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each package is designed to help you maximize your content's reach, build your audience, and create new revenue streams beyond YouTube ad revenue.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={service.id} className={`relative overflow-hidden border-2 hover:border-gray-300 transition-all duration-300 hover:shadow-xl group ${
              index === 1 ? 'lg:scale-105 border-gray-300' : 'border-gray-200'
            }`}>
              {index === 1 && (
                <div className="absolute -top-1 -right-1 bg-gray-900 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 font-medium">
                  {service.tagline}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-2" />
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-1" />
                      {service.timeline}
                    </div>
                    <div className="flex items-center text-lg font-bold text-gray-900">
                      <DollarSign size={18} className="mr-1" />
                      {service.price.replace('Starting at $', '')}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => scrollToSection('#contact')}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group ${
                      index === 1 
                        ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Something Different?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I also offer custom video scripts, channel descriptions, email marketing, thumbnail copy, and monthly retainer packages for ongoing content needs.
          </p>
          <Button 
            onClick={() => scrollToSection('#contact')}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Discuss Custom Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;