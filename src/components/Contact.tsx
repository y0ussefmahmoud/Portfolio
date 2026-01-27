import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  MapPin,
  Phone,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Translations } from "@/i18n/translations";

interface ContactProps {
  translations: Translations;
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const Contact: React.FC<ContactProps> = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "youssef11mahmoud112002@gmail.com",
      link: "mailto:youssef11mahmoud112002@gmail.com",
      description: translations.contact.subtitle
    },
    {
      icon: Phone,
      title: translations.about.phone || "Phone",
      value: "+20 101 234 5678",
      link: "tel:+201012345678",
      description: "Call me for direct communication"
    },
    {
      icon: MapPin,
      title: translations.about.location || "Location",
      value: "Cairo, Egypt",
      link: "https://maps.google.com/?q=Cairo,Egypt",
      description: "Based in Cairo, available for remote work"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/y0ussefmahmoud",
      link: "https://linkedin.com/in/y0ussefmahmoud",
      description: "Connect with me professionally"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/Y0ussefMahmoud",
      link: "https://github.com/Y0ussefMahmoud",
      description: "Check out my code"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent("Contact from " + formData.name);
    const body = encodeURIComponent(
      formData.message + "\n\nFrom: " + formData.name + "\nEmail: " + formData.email
    );
    const mailtoLink = `mailto:youssef11mahmoud112002@gmail.com?subject=${subject}&body=${body}`;
    
    window.open(mailtoLink);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="contact" className="bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {translations.contact.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {translations.contact.subtitle}
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
                            <Icon className="h-6 w-6 text-primary-foreground" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground">
                            {info.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {info.description}
                          </p>
                          <a
                            href={info.link}
                            className="mt-2 inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                            target={info.link.startsWith('http') ? "_blank" : undefined}
                            rel={info.link.startsWith('http') ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Card className="border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50">
              <CardHeader>
                <h3 className="text-xl font-semibold text-foreground">
                  Send me a message
                </h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {translations.contact.name}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={translations.contact.ph_name}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {translations.contact.email}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={translations.contact.ph_email}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      {translations.contact.message}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={translations.contact.ph_message}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {translations.contact.send}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
