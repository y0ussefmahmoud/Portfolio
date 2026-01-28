import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Play, Download, Image as ImageIcon, BarChart3, Lightbulb, CheckCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Translations } from '@/i18n/translations';
import { Project } from '@/types/project';
import WindowFrame from '@/components/WindowFrame';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  translations: Translations;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
  translations,
}) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleOverlayClick}
          dir={document.documentElement.dir}
        >
          <WindowFrame
            title={translations.projects.projectDetails}
            onClose={onClose}
            className="w-full max-w-5xl"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
                    <p className="mt-2 text-muted-foreground">{project.description}</p>
                  </div>
                  <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                    {project.status === 'completed' ? translations.projects.completed : translations.projects.inProgress}
                  </Badge>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              {project.details && (
                <div className="space-y-6">
                  {/* Video Demo */}
                  {project.details.video && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <Play className="h-5 w-5" />
                        {translations.projects.videoDemo}
                      </h3>
                      <div className="relative overflow-hidden rounded-lg border border-border/60 bg-muted">
                        <img
                          src={project.details.video.thumbnail}
                          alt={project.details.video.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Button size="lg" className="gap-2">
                            <Play className="h-5 w-5" />
                            {translations.projects.watchOnYoutube}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Gallery */}
                  {project.details.gallery.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <ImageIcon className="h-5 w-5" />
                        {translations.projects.imageGallery}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.details.gallery.map((image, index) => (
                          <div key={index} className="space-y-2">
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-48 object-cover rounded-lg border border-border/60"
                            />
                            <p className="text-sm text-muted-foreground">{image.caption}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {project.details.features.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <CheckCircle className="h-5 w-5" />
                        {translations.projects.features}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.details.features.map((feature, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-primary">{feature.icon}</span>
                            </div>
                            <div>
                              <h4 className="font-medium">{feature.title}</h4>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Challenges */}
                  {project.details.challenges.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <Lightbulb className="h-5 w-5" />
                        {translations.projects.challenges}
                      </h3>
                      <div className="space-y-3">
                        {project.details.challenges.map((challenge, index) => (
                          <div key={index} className="border-l-2 border-border pl-4">
                            <h4 className="font-medium">{challenge.title}</h4>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Solutions */}
                  {project.details.solutions.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <CheckCircle className="h-5 w-5" />
                        {translations.projects.solutions}
                      </h3>
                      <div className="space-y-3">
                        {project.details.solutions.map((solution, index) => (
                          <div key={index} className="border-l-2 border-primary/20 pl-4">
                            <h4 className="font-medium">{solution.title}</h4>
                            <p className="text-sm text-muted-foreground">{solution.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Statistics */}
                  {project.details.stats.length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
                        <BarChart3 className="h-5 w-5" />
                        {translations.projects.statistics}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {project.details.stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {stat.value}{stat.suffix}
                            </div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Meta */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">{translations.projects.projectMeta}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <span className="ml-2">{project.details.meta.date}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="ml-2">{project.details.meta.duration}</span>
                      </div>
                      {project.details.meta.linesOfCode && (
                        <div>
                          <span className="text-muted-foreground">Lines of Code:</span>
                          <span className="ml-2">{project.details.meta.linesOfCode.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Project Links */}
              <div>
                <h3 className="text-lg font-semibold mb-3">{translations.projects.projectLinks}</h3>
                <div className="flex flex-wrap gap-3">
                  {project.viewLink && project.viewLink !== '#' && (
                    <Button asChild>
                      <a href={project.viewLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {translations.projects.view}
                      </a>
                    </Button>
                  )}
                  {project.codeLink && project.codeLink !== '#' && (
                    <Button variant="outline" asChild>
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        {translations.projects.code}
                      </a>
                    </Button>
                  )}
                  {project.details?.links?.pdf && (
                    <Button variant="outline" asChild>
                      <a href={project.details.links.pdf} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        {translations.projects.downloadPDF}
                      </a>
                    </Button>
                  )}
                  {project.details?.links?.youtube && (
                    <Button variant="outline" asChild>
                      <a href={project.details.links.youtube} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        {translations.projects.watchOnYoutube}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </WindowFrame>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
