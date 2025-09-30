import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play, Users, TrendingUp, DollarSign } from 'lucide-react';
import { stats } from '../data/mock';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-700">
                <TrendingUp size={16} />
                <span>Trusted by 150+ YouTube Creators</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Turn Your YouTube 
                <span className="text-gray-600"> Content Into </span>
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Revenue Machines
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                I help YouTubers multiply their content impact and monetize their audience through strategic writing services. One video becomes blog posts, social content, lead magnets, and revenue streams.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('#services')}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>View My Services</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => scrollToSection('#portfolio')}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Play size={20} />
                <span>See My Work</span>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span>No contracts required</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign size={16} />
                <span>Money-back guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="lg:pl-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial Preview */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-700 italic mb-2">
                    "The Content Multiplier package was a game-changer! My single video about Tokyo turned into 15 pieces of content."
                  </p>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Sarah Chen</div>
                    <div className="text-gray-600">Travel With Sarah • 245K subscribers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;