import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Eye, Filter } from 'lucide-react';
import { portfolioItems } from '../data/mock';

const Portfolio = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const categories = ['All', 'Video Scripts', 'Content Package', 'Channel Copy', 'Lead Magnet', 'Email Marketing', 'Thumbnail Copy'];
  
  const filteredItems = selectedFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.type === selectedFilter);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            My Work
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Real Results for 
            <span className="text-gray-600"> Real Creators</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From travel vlogs to tech reviews, I've helped creators across every niche multiply their content impact and build sustainable revenue streams.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedFilter(category)}
              variant={selectedFilter === category ? "default" : "outline"}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === category 
                  ? 'bg-gray-900 hover:bg-gray-800 text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item) => (
            <Card key={item.id} className="border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg bg-white">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    {item.type}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Eye size={16} className="text-gray-500" />
                  </Button>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  {item.client}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-green-800 mb-1">Results:</h4>
                  <p className="text-sm text-green-700">{item.results}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to See Similar Results?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Every project starts with understanding your unique audience and goals. Let's discuss how I can help multiply your content impact.
          </p>
          <Button 
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center space-x-2"
          >
            <span>Start Your Project</span>
            <ExternalLink size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;