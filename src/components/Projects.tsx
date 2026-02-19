import * as React from 'react';
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

  // ✅ تحميل البيانات مع安全检查
  const loadProjects = React.useMemo(() => {
    try {
      // التحقق من وجود البيانات
      if (!projectsData) {
        console.error('❌ projectsData غير موجود');
        return [];
      }

      // التحقق من أن projects مصفوفة
      const projects = Array.isArray(projectsData.projects) ? projectsData.projects : [];
      
      // التحقق من أن otherProjects مصفوفة
      const otherProjects = Array.isArray((projectsData as any).otherProjects) 
        ? (projectsData as any).otherProjects 
        : [];

      // دمج المشاريع
      const allProjects = [...projects, ...otherProjects];
      
      console.log('✅ تم تحميل المشاريع:', allProjects.length);
      return allProjects;

    } catch (error) {
      console.error('❌ خطأ في تحميل المشاريع:', error);
      return [];
    }
  }, []);

  // ✅ تصفية المشاريع حسب الحالة
  const filtered = React.useMemo(() => {
    if (activeFilter === 'completed') {
      return loadProjects.filter(p => p.status === 'completed');
    }
    if (activeFilter === 'in-progress') {
      return loadProjects.filter(p => p.status === 'in-progress');
    }
    return loadProjects;
  }, [activeFilter, loadProjects]);

  // ✅ إذا مفيش مشاريع، عرض رسالة
  if (loadProjects.length === 0) {
    return (
      <section id="projects" className="bg-transparent">
        <div className="mx-auto max-w-6xl text-center py-20">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {translations.projects.title}
          </h2>
          <p className="text-muted-foreground">
            جاري تحميل المشاريع...
          </p>
        </div>
      </section>
    );
  }

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
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-image.jpg';
                }}
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
                <ExternalLink className="h-4 w-4 mr-2" />
                {translations.projects.viewDetails || 'التفاصيل'}
              </Button>
            )}
            {viewEnabled ? (
              <Button asChild className={project.details ? "flex-1" : "flex-1"}>
                <a href={project.viewLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {translations.projects.view}
                </a>
              </Button>
            ) : (
              <Button disabled className={project.details ? "flex-1" : "flex-1"}>
                <ExternalLink className="h-4 w-4 mr-2" />
                {translations.projects.view}
              </Button>
            )}

            {codeEnabled ? (
              <Button asChild variant="outline" className="flex-1">
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  {translations.projects.code}
                </a>
              </Button>
            ) : (
              <Button disabled variant="outline" className="flex-1">
                <Github className="h-4 w-4 mr-2" />
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