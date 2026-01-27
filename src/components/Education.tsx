import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Building2,
  Calendar,
  Check,
  GraduationCap,
} from 'lucide-react';

import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import type { Translations } from '../i18n/translations';

interface EducationProps {
  translations: Translations;
}

const educationData = [
  {
    year: '2020 - 2024',
    institution: 'Egyptian Korean Faculty of Technological Industry and Energy',
    degree: 'Bachelor of Software Engineering',
    description:
      'Specialized in Computer Engineering with focus on software development, algorithms, and system design.',
    achievements: [
      'Relevant Coursework: Data Structures, Algorithms, Database Systems',
      'Software Engineering, Web Development, Mobile Development',
      'Computer Networks, Operating Systems, Computer Architecture',
    ],
  },
] as const;

const certifications = [
  {
    name: 'Comming Soon',
    issuer: 'Compony',
    date: '2026',
    icon: '🌐',
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const Education: React.FC<EducationProps> = ({ translations }) => {
  return (
    <section id="education" className="bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {translations.education.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {translations.education.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {educationData.map((item) => (
            <motion.div
              key={item.year}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Card className="border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                <CardHeader className="space-y-4">
                  <Badge className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {item.year}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                      <Building2 className="h-5 w-5 text-primary" />
                      {item.institution}
                    </h3>
                    <h4 className="flex items-center gap-2 text-lg font-medium text-primary">
                      <GraduationCap className="h-5 w-5" />
                      {item.degree}
                    </h4>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-2">
                    {item.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            {translations.education.d2.title}
          </h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <motion.div
                key={`${cert.name}-${cert.date}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Card className="h-full border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                  <CardHeader className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <Award className="h-12 w-12 text-primary-foreground" />
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 text-center">
                    <div className="text-3xl leading-none">{cert.icon}</div>
                    <div className="text-lg font-semibold text-foreground">
                      {cert.name}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {cert.issuer}
                    </div>
                    <div className="text-xs text-muted-foreground">{cert.date}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
