import React from 'react';
import { Badge } from './ui/badge';
import { Lightbulb, Target, Users, TrendingUp, Award, Coffee } from 'lucide-react';

const About = () => {
  const skills = [
    { icon: Lightbulb, name: "Content Strategy", description: "Turning one piece of content into multiple revenue streams" },
    { icon: Target, name: "Audience Growth", description: "Building engaged communities beyond YouTube" },
    { icon: Users, name: "Creator Psychology", description: "Understanding what makes audiences take action" },
    { icon: TrendingUp, name: "Revenue Optimization", description: "Maximizing monetization opportunities" }
  ];

  const achievements = [
    "5+ years writing for digital creators",
    "150+ YouTube channels helped",
    "$250K+ revenue generated for clients",
    "Specialized in travel, lifestyle, and tech niches"
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            About Me
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Hi, I'm the Writer Behind 
            <span className="text-gray-600"> ContentCraft</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Story */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gray-100 rounded-full p-3">
                  <Coffee size={24} className="text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">My Story</h3>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I started as a travel blogger who realized that great content deserves to live everywhere, not just on one platform. After seeing too many creators struggle to monetize their amazing work, I specialized in content multiplication strategies.
                </p>
                
                <p>
                  Today, I help YouTubers transform their video content into comprehensive content ecosystems - from blog posts and social media content to lead magnets and email sequences that build lasting audience relationships.
                </p>
                
                <p>
                  My approach isn't just about repurposing content; it's about understanding your audience's journey and creating touchpoints that guide them from casual viewers to engaged community members and paying customers.
                </p>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gray-100 rounded-full p-3">
                  <Award size={24} className="text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Track Record</h3>
              </div>
              
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-gray-100 rounded-full p-3">
                  <Target size={24} className="text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">My Expertise</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={index} className="text-center p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors duration-200">
                      <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <IconComponent size={20} className="text-gray-700" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{skill.name}</h4>
                      <p className="text-sm text-gray-600">{skill.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Process */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How I Work</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Deep Dive Discovery</h4>
                    <p className="text-gray-600 text-sm">I analyze your content, audience, and goals to create a custom strategy</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Strategic Content Creation</h4>
                    <p className="text-gray-600 text-sm">Every piece is crafted to serve your broader business objectives</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Results & Optimization</h4>
                    <p className="text-gray-600 text-sm">We track performance and refine strategies for maximum impact</p>
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

export default About;