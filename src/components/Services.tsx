import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Check,
  Container,
  Database,
  Globe,
  Link,
  Mail,
  Smartphone,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Translations } from "@/i18n/translations";

interface ServicesProps {
  translations: Translations;
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const Services: React.FC<ServicesProps> = ({ translations }) => {
  const handleServiceInquiry = (serviceName: string) => {
    const message = encodeURIComponent(
      `Hi Y0ussef,\n\nI'm interested in your ${serviceName} service. Could you please provide more details?\n\nBest regards`
    );
    window.open(
      `https://wa.me/201129334173?text=${message}`
    );
  };

  const servicesData = [
    {
      id: 1,
      icon: Globe,
      title: translations.services.web.title,
      description: translations.services.web.desc,
      features: [
        translations.services.web.features.responsive,
        translations.services.web.features.modernUI,
        translations.services.web.features.performance,
        translations.services.web.features.seo,
        translations.services.web.features.crossBrowser,
      ],
      price: translations.services.price,
    },
    {
      id: 2,
      icon: Smartphone,
      title: translations.services.mobile.title,
      description: translations.services.mobile.desc,
      features: [
        translations.services.mobile.features.crossPlatform,
        translations.services.mobile.features.nativePerformance,
        translations.services.mobile.features.appStore,
        translations.services.mobile.features.pushNotifications,
        translations.services.mobile.features.offline,
      ],
      price: translations.services.price,
    },/*
    {
      id: 3,
      icon: Link,
      title: translations.services.api.title,
      description: translations.services.api.desc,
      features: [
        "RESTful API Design",
        "JWT Authentication",
        "Database Integration",
        "API Documentation",
        "Security Best Practices",
      ],
      price: "Custom packages available",
    },
    {
      id: 4,
      icon: Container,
      title: translations.services.devops.title,
      description: translations.services.devops.desc,
      features: [
        "Docker Containerization",
        "CI/CD Pipelines",
        "Cloud Deployment",
        "Monitoring & Logging",
        "Scalable Architecture",
      ],
      price: "Custom packages available",
    },
    {
      id: 5,
      icon: Database,
      title: translations.services.db.title,
      description: translations.services.db.desc,
      features: [
        "Database Schema Design",
        "Query Optimization",
        "Data Migration",
        "Backup Strategies",
        "Performance Tuning",
      ],
      price: "Custom packages available",
    },*/
    {
      id: 6,
      icon: Briefcase,
      title: translations.services.freelance.title,
      description: translations.services.freelance.desc,
      features: [
        translations.services.freelance.features.planning,
        translations.services.freelance.features.updates,
        translations.services.freelance.features.quality,
        translations.services.freelance.features.documentation,
        translations.services.freelance.features.support,
      ],
      price: translations.services.price,
    },
  ];

  return (
    <section id="services" className="bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {translations.services.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {translations.services.subtitle}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="h-full"
              >
                <Card className="group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur supports-backdrop-filter:bg-card/50 relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 mx-auto rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                    >
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground text-center mt-4">
                      {service.title}
                    </h3>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground text-center mb-4">
                      {service.description}
                    </p>

                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">Price:</span>
                      <motion.span
                        className="text-sm font-semibold text-primary"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {service.price}
                      </motion.span>
                    </div>
                  </CardContent>

                  <CardFooter className="justify-center">
                    <Button
                      onClick={() => handleServiceInquiry(service.title)}
                      shine={true}
                      hoverScale={1.05}
                      tapScale={0.95}
                    >
                      <Mail />
                      {translations.services.getQuote}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
