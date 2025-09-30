import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, MessageCircle, Calendar, CheckCircle, Send, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { api, handleApiError } from '../services/api';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    channel: '',
    subscribers: '',
    service: '',
    project: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value, field) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare form data for API
      const submitData = {
        name: formData.name,
        email: formData.email,
        channel: formData.channel || null,
        subscribers: formData.subscribers || null,
        service: formData.service,
        project: formData.project || null,
        budget: formData.budget || null,
        message: formData.message
      };

      const response = await api.submitContactForm(submitData);
      
      toast({
        title: "Message Sent! 🎉",
        description: "I'll get back to you within 24 hours to discuss your project.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        channel: '',
        subscribers: '',
        service: '',
        project: '',
        budget: '',
        message: ''
      });
      
    } catch (err) {
      const errorMessage = handleApiError(err);
      toast({
        title: "Error Sending Message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            Let's Work Together
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to 
            <span className="text-gray-600"> Multiply Your Content?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tell me about your channel and goals. I'll create a custom strategy to help you turn your YouTube content into multiple revenue streams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <MessageCircle size={24} />
                  <span>Project Inquiry</span>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and I'll get back to you within 24 hours with a custom proposal.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="channel" className="block text-sm font-semibold text-gray-900 mb-2">
                        YouTube Channel Name
                      </label>
                      <Input
                        id="channel"
                        name="channel"
                        type="text"
                        value={formData.channel}
                        onChange={handleInputChange}
                        placeholder="My Awesome Channel"
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subscribers" className="block text-sm font-semibold text-gray-900 mb-2">
                        Subscriber Count
                      </label>
                      <Select disabled={isSubmitting} onValueChange={(value) => handleSelectChange(value, 'subscribers')} value={formData.subscribers}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1k">0 - 1K</SelectItem>
                          <SelectItem value="1k-10k">1K - 10K</SelectItem>
                          <SelectItem value="10k-50k">10K - 50K</SelectItem>
                          <SelectItem value="50k-100k">50K - 100K</SelectItem>
                          <SelectItem value="100k-500k">100K - 500K</SelectItem>
                          <SelectItem value="500k+">500K+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-2">
                        Service Interest *
                      </label>
                      <Select disabled={isSubmitting} onValueChange={(value) => handleSelectChange(value, 'service')} value={formData.service} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="content-multiplier">Content Multiplier Package</SelectItem>
                          <SelectItem value="travel-companion">Travel Companion Package</SelectItem>
                          <SelectItem value="audience-magnet">Audience Magnet Package</SelectItem>
                          <SelectItem value="video-scripts">Video Scripts</SelectItem>
                          <SelectItem value="email-marketing">Email Marketing</SelectItem>
                          <SelectItem value="custom">Custom Project</SelectItem>
                          <SelectItem value="retainer">Monthly Retainer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="budget" className="block text-sm font-semibold text-gray-900 mb-2">
                        Project Budget
                      </label>
                      <Select disabled={isSubmitting} onValueChange={(value) => handleSelectChange(value, 'budget')} value={formData.budget}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500">Under $500</SelectItem>
                          <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                          <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                          <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                          <SelectItem value="5000+">$5,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="project" className="block text-sm font-semibold text-gray-900 mb-2">
                      Project Timeline
                    </label>
                    <Select disabled={isSubmitting} onValueChange={(value) => handleSelectChange(value, 'project')} value={formData.project}>
                      <SelectTrigger>
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (Rush Order +50%)</SelectItem>
                        <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                        <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                        <SelectItem value="1-2-months">1-2 months</SelectItem>
                        <SelectItem value="flexible">I'm flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your channel, your goals, and what specific help you're looking for. The more details, the better I can customize a solution for you."
                      rows={6}
                      required
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Info & FAQ */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <Mail size={20} />
                  <span>Get In Touch</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Response Time</h4>
                    <p className="text-gray-600 text-sm">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Free Consultation</h4>
                    <p className="text-gray-600 text-sm">30-min strategy call included</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle size={18} className="text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Proposals</h4>
                    <p className="text-gray-600 text-sm">Tailored to your specific needs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick FAQ */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Quick FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Minimum project size?</h4>
                  <p className="text-gray-600 text-sm">I work with channels of all sizes, from 0 to 500K+ subscribers.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Payment terms?</h4>
                  <p className="text-gray-600 text-sm">50% upfront, 50% on completion. PayPal/Stripe accepted.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Revisions?</h4>
                  <p className="text-gray-600 text-sm">Unlimited revisions within project scope included.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;