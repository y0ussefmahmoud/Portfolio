import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Smartphone, Wrench } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Translations } from '@/i18n/translations';

interface SkillsProps {
  translations: Translations;
}

const skillsData = {
  frontend: ['React.js', 'TypeScript', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
  backend: ['Node.js', 'Express.js', 'NestJS', 'MySQL', 'PostgreSQL', 'MongoDB'],
  mobile: ['Flutter', 'Dart', 'React Native', 'Firebase'],
  tools: ['Docker', 'Git', 'VS Code', 'Figma', 'Postman'],
} as const;

type SkillCategory = keyof typeof skillsData;

type CategoryMeta = {
  key: SkillCategory;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const categories: CategoryMeta[] = [
  { key: 'frontend', icon: Code2 },
  { key: 'backend', icon: Server },
  { key: 'mobile', icon: Smartphone },
  { key: 'tools', icon: Wrench },
];

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const Skills: React.FC<SkillsProps> = ({ translations }) => {
  const categoryTitleMap: Record<SkillCategory, string> = {
    frontend: translations.skills.frontend,
    backend: translations.skills.backend,
    mobile: translations.skills.mobile,
    tools: translations.skills.tools,
  };

  return (
    <section id="skills" className="bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {translations.skills.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {translations.skills.subtitle}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {categories.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Card className="group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {categoryTitleMap[key]}
                    </h3>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillsData[key].map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
