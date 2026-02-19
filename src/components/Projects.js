import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, } from '@/components/ui/card';
import projectsData from '@/data/projects.json';
import ProjectDetailModal from '@/components/ProjectDetail/ProjectDetailModal';
const isValidExternalLink = (url) => Boolean(url && url !== '#');
const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};
const Projects = ({ translations }) => {
    const [activeFilter, setActiveFilter] = React.useState('all');
    const [selectedProject, setSelectedProject] = React.useState(null);
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
            const otherProjects = Array.isArray(projectsData.otherProjects)
                ? projectsData.otherProjects
                : [];
            // دمج المشاريع
            const allProjects = [...projects, ...otherProjects];
            console.log('✅ تم تحميل المشاريع:', allProjects.length);
            return allProjects;
        }
        catch (error) {
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
        return (_jsx("section", { id: "projects", className: "bg-transparent", children: _jsxs("div", { className: "mx-auto max-w-6xl text-center py-20", children: [_jsx("h2", { className: "text-3xl font-bold text-foreground mb-4", children: translations.projects.title }), _jsx("p", { className: "text-muted-foreground", children: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639..." })] }) }));
    }
    const renderProjectCard = (project) => {
        const viewEnabled = isValidExternalLink(project.viewLink);
        const codeEnabled = isValidExternalLink(project.codeLink);
        return (_jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut' }, whileHover: { y: -4 }, className: "h-full", children: _jsxs(Card, { className: "group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur 'supports-[backdrop-filter]:bg-card/50'", children: [_jsxs(CardHeader, { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsx("h3", { className: "text-base font-semibold leading-tight tracking-tight text-foreground", children: project.title }), _jsx(Badge, { variant: project.status === 'completed' ? 'default' : 'secondary', className: "shrink-0", children: project.status === 'completed'
                                            ? translations.projects.completed
                                            : translations.projects.inProgress })] }), _jsx("div", { className: "relative overflow-hidden rounded-lg border border-border/60 bg-muted", children: _jsx("img", { src: project.image, alt: `${project.title} project cover`, loading: "lazy", onError: (e) => {
                                        e.currentTarget.src = '/placeholder-image.jpg';
                                    }, className: "h-44 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" }) })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: project.description }), _jsx("div", { className: "flex flex-wrap gap-2", children: project.tech.map((t) => (_jsx(Badge, { variant: "outline", className: "text-xs", children: t }, t))) })] }), _jsxs(CardFooter, { className: "flex gap-2", children: [project.details && (_jsxs(Button, { variant: "outline", onClick: () => setSelectedProject(project), className: "flex-1", children: [_jsx(ExternalLink, { className: "h-4 w-4 mr-2" }), translations.projects.viewDetails || 'التفاصيل'] })), viewEnabled ? (_jsx(Button, { asChild: true, className: project.details ? "flex-1" : "flex-1", children: _jsxs("a", { href: project.viewLink, target: "_blank", rel: "noopener noreferrer", children: [_jsx(ExternalLink, { className: "h-4 w-4 mr-2" }), translations.projects.view] }) })) : (_jsxs(Button, { disabled: true, className: project.details ? "flex-1" : "flex-1", children: [_jsx(ExternalLink, { className: "h-4 w-4 mr-2" }), translations.projects.view] })), codeEnabled ? (_jsx(Button, { asChild: true, variant: "outline", className: "flex-1", children: _jsxs("a", { href: project.codeLink, target: "_blank", rel: "noopener noreferrer", children: [_jsx(Github, { className: "h-4 w-4 mr-2" }), translations.projects.code] }) })) : (_jsxs(Button, { disabled: true, variant: "outline", className: "flex-1", children: [_jsx(Github, { className: "h-4 w-4 mr-2" }), translations.projects.code] }))] })] }) }, project.id));
    };
    return (_jsx("section", { id: "projects", className: "bg-transparent", children: _jsxs("div", { className: "mx-auto max-w-6xl", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: translations.projects.title }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground sm:text-base", children: translations.projects.subtitle })] }), _jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [_jsx(Button, { type: "button", variant: activeFilter === 'all' ? 'default' : 'secondary', onClick: () => setActiveFilter('all'), children: "All" }), _jsx(Button, { type: "button", variant: activeFilter === 'completed' ? 'default' : 'secondary', onClick: () => setActiveFilter('completed'), children: translations.projects.completed }), _jsx(Button, { type: "button", variant: activeFilter === 'in-progress' ? 'default' : 'secondary', onClick: () => setActiveFilter('in-progress'), children: translations.projects.inProgress })] }), _jsx("div", { className: "mt-8", children: _jsx(motion.div, { initial: false, className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p) => renderProjectCard(p)) }) }), _jsx(ProjectDetailModal, { project: selectedProject, isOpen: selectedProject !== null, onClose: () => setSelectedProject(null), translations: translations })] }) }));
};
export default Projects;
