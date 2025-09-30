import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Quote, Loader2, AlertCircle } from 'lucide-react';
import { api, handleApiError } from '../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            Client Success Stories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Creators Are 
            <span className="text-gray-600"> Saying</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what YouTubers are saying about the impact of our content multiplication strategies.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
            <span className="ml-3 text-gray-600">Loading testimonials...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Testimonials</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && testimonials.length > 0 && (
          <>
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white relative">
                  <div className="absolute -top-2 -left-2 bg-gray-100 rounded-full p-2">
                    <Quote size={16} className="text-gray-600" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      {/* Testimonial Text */}
                      <blockquote className="text-gray-700 leading-relaxed text-lg italic">
                        "{testimonial.testimonial}"
                      </blockquote>
                      
                      {/* Client Info */}
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 text-lg">
                              {testimonial.name}
                            </div>
                            <div className="text-gray-600">
                              {testimonial.channel}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-sm px-2 py-1">
                              {testimonial.subscribers} subs
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && testimonials.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Testimonials</h3>
            <p className="text-gray-600">Client testimonials will appear here once they are added.</p>
          </div>
        )}

        {/* Bottom CTA */}
        {!loading && !error && testimonials.length > 0 && (
          <div className="text-center bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join 150+ Successful Creators
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to multiply your content impact and build new revenue streams? Let's create your success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="px-4 py-2 text-sm">
                ✅ 100% Money-Back Guarantee
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                ⚡ 5-7 Day Turnaround
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                🎯 Unlimited Revisions
              </Badge>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;