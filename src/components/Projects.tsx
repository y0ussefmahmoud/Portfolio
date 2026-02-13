import * as React from 'react';
//import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Translations } from '@/i18n/translations';
import { Project } from '@/types/project';
import projectsData from '@/data/projects.json';
import ProjectDetailModal from '@/components/ProjectDetail/ProjectDetailModal';

interface ProjectsProps {
  translations: Translations;
}


const isValidExternalLink = (url?: string) => Boolean(url && url !== '#');

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const Projects: React.FC<ProjectsProps> = ({ translations }) => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'completed' | 'in-progress'>('all');
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  // HEAD
  const projectsData: Record<'completed' | 'inProgress', Project[]> = {
    completed: [
      {
        id: 1,
        title: 'My Portfolio',
        description: 'My Portfolio with Html, Css & JavaScript.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
        image: '/Portfolio/images/My-Portfolio-V2.0.0-1200x675.webp',
        viewLink: 'https://y0ussefmahmoud.github.io/Portfolio/',
        codeLink: 'https://github.com/y0ussefmahmoud/Portfolio',
        status: 'completed'
      },
      {
        id: 2,
        title: 'Daily Life Tracker app',
        description: 'Daily Life Tracker app , A Flutter app for tracking daily life with task, project, and statistics management..',
        tech: ['Flutter', 'Supabase', 'Provider', 'Google Fonts'],
        image: '/Portfolio/images/daily-life-tracker-app.webp',
        viewLink: '#',
        codeLink: 'https://github.com/y0ussefmahmoud/Daily-Life-Tracker-app',
        status: 'completed'
      },/*
      {
        id: 3,
        title: 'My Portfolio',
        description: 'My Portfolio with Html, Css & JavaScript.',
        tech: ['Flutter', 'CSS3', 'Provider', 'Google Fonts'],
        image: '/Portfolio/images/My-Portfolio-V2.0.0-1200x675.webp',
        viewLink: 'https://y0ussefmahmoud.github.io/Portfolio/',
        codeLink: 'https://github.com/y0ussefmahmoud/Portfolio',
      },*/
    ],
    inProgress: [
      {
        id: 4,
        title: 'Y0 Hardware',
        description: 'E-commerce website for computer hardware with modern design.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce'],
        image: '/Portfolio/images/Y0-Hardware-1200x675.webp',
        viewLink: '#',
        codeLink: '#',
        status: 'in-progress'
      },/*
      {
        id: 5,
        title: 'Emg Ems Simulation',
        description: 'Healthcare app with Flutter and Clean Architecture + IOT system.',
        tech: ['Flutter', 'Dart', 'Clean Architecture', 'IOT'],
        image: '/Portfolio/images/Emg-ems.webp',
        viewLink: '#',
        codeLink: '#',
      },
      {
        id: 7,
        title: 'Dubai key website',
        description:
          'Dubai key website is E-commerce website for computer hardware with modern design.',
        tech: ['React', 'TypeScript', 'E-commerce'],
        image: '/Portfolio/images/Dubai-key-website.webp',
        viewLink: '#',
        codeLink: '#',
      },
      {
        id: 6,
        title: 'Y0 AI Assistant',
        description: 'AI-powered chat assistant with modern UI and smart features.',
        tech: ['Next.js', 'TypeScript', 'OpenAI', 'NestJS'],
        image: '/Portfolio/images/ai-assistant-1200x675.webp',
        viewLink: '#',
        codeLink: '#',
      },*/
    ],
  };

  // Merge projects and otherProjects arrays
  const allProjects: Project[] = [
    ...(projectsData as any).projects,
    ...(projectsData as any).otherProjects
  ];
  // e204a8433ac09fd9da61ac67f2ad525cfba9f260

  const filtered = React.useMemo(() => {
    if (activeFilter === 'completed') {
      return allProjects.filter(p => p.status === 'completed');
    }

    if (activeFilter === 'in-progress') {
      return allProjects.filter(p => p.status === 'in-progress');
    }

    return allProjects;
  }, [activeFilter]);

  const renderProjectCard = (project: Project) => {
    const viewEnabled = isValidExternalLink(project.viewLink);
    const codeEnabled = isValidExternalLink(project.codeLink);

    return (
      <motion.div
        key={project.id}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        whileHover={{ y: -4 }}
        className="h-full"
      >
        <Card className="group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur 'supports-[backdrop-filter]:bg-card/50'">
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-tight tracking-tight text-foreground">
                {project.title}
              </h3>
              <Badge
                variant={project.status === 'completed' ? 'default' : 'secondary'}
                className="shrink-0"
              >
                {project.status === 'completed'
                  ? translations.projects.completed
                  : translations.projects.inProgress}
              </Badge>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-border/60 bg-muted">
              <img
                src={project.image}
                alt={`${project.title} project cover`}
                loading="lazy"
                className="h-44 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} variant="outline" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex gap-2">
            {project.details && (
              <Button 
                variant="outline" 
                onClick={() => setSelectedProject(project)}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4" />
                {translations.projects.viewDetails}
              </Button>
            )}
            {viewEnabled ? (
              <Button asChild className={project.details ? "flex-1" : "flex-1"}>
                <a href={project.viewLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {translations.projects.view}
                </a>
              </Button>
            ) : (
              <Button disabled className={project.details ? "flex-1" : "flex-1"}>
                <ExternalLink className="h-4 w-4" />
                {translations.projects.view}
              </Button>
            )}

            {codeEnabled ? (
              <Button asChild variant="outline" className="flex-1">
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  {translations.projects.code}
                </a>
              </Button>
            ) : (
              <Button disabled variant="outline" className="flex-1">
                <Github className="h-4 w-4" />
                {translations.projects.code}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="bg-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {translations.projects.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {translations.projects.subtitle}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            type="button"
            variant={activeFilter === 'all' ? 'default' : 'secondary'}
            onClick={() => setActiveFilter('all')}
          >
            All
          </Button>
          <Button
            type="button"
            variant={activeFilter === 'completed' ? 'default' : 'secondary'}
            onClick={() => setActiveFilter('completed')}
          >
            {translations.projects.completed}
          </Button>
          <Button
            type="button"
            variant={activeFilter === 'in-progress' ? 'default' : 'secondary'}
            onClick={() => setActiveFilter('in-progress')}
          >
            {translations.projects.inProgress}
          </Button>
        </div>

        <div className="mt-8">
          <motion.div
            initial={false}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p) => renderProjectCard(p))}
          </motion.div>
        </div>

        <ProjectDetailModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          translations={translations}
        />
      </div>
    </section>
  );
};

export default Projects;
