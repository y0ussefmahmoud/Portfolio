import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, } from '@/components/ui/card';
const isValidExternalLink = (url) => Boolean(url && url !== '#');
const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};
const Projects = ({ translations }) => {
    const [activeFilter, setActiveFilter] = React.useState('all');
    const projectsData = {
        completed: [
            {
                id: 1,
                title: 'My Portfolio',
                description: 'My Portfolio with Html, Css & JavaScript.',
                tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
                image: '/images/My-Portfolio-1200x675.webp',
                viewLink: 'https://y0ussefmahmoud.github.io/Portfolio/',
                codeLink: 'https://github.com/y0ussefmahmoud/Portfolio',
            },
        ],
        inProgress: [
            {
                id: 4,
                title: 'Y0 Hardware',
                description: 'E-commerce website for computer hardware with modern design.',
                tech: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce'],
                image: '/images/Y0-Hardware-1200x675.webp',
                viewLink: '#',
                codeLink: '#',
            },
            {
                id: 5,
                title: 'Emg Ems Simulation',
                description: 'Healthcare app with Flutter and Clean Architecture + IOT system.',
                tech: ['Flutter', 'Dart', 'Clean Architecture', 'IOT'],
                image: '/images/Emg-ems.webp',
                viewLink: '#',
                codeLink: '#',
            },
            {
                id: 7,
                title: 'Dubai key website',
                description: 'Dubai key website is E-commerce website for computer hardware with modern design.',
                tech: ['React', 'TypeScript', 'E-commerce'],
                image: '/images/Dubai-key-website.webp',
                viewLink: '#',
                codeLink: '#',
            },
            {
                id: 6,
                title: 'Y0 AI Assistant',
                description: 'AI-powered chat assistant with modern UI and smart features.',
                tech: ['Next.js', 'TypeScript', 'OpenAI', 'NestJS'],
                image: '/images/ai-assistant-1200x675.webp',
                viewLink: '#',
                codeLink: '#',
            },
        ],
    };
    const filtered = React.useMemo(() => {
        if (activeFilter === 'completed') {
            return { completed: projectsData.completed, inProgress: [] };
        }
        if (activeFilter === 'in-progress') {
            return { completed: [], inProgress: projectsData.inProgress };
        }
        return { completed: projectsData.completed, inProgress: projectsData.inProgress };
    }, [activeFilter]);
    const renderProjectCard = (project, status) => {
        const viewEnabled = isValidExternalLink(project.viewLink);
        const codeEnabled = isValidExternalLink(project.codeLink);
        return (_jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut' }, whileHover: { y: -4 }, className: "h-full", children: _jsxs(Card, { className: "group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50", children: [_jsxs(CardHeader, { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsx("h3", { className: "text-base font-semibold leading-tight tracking-tight text-foreground", children: project.title }), _jsx(Badge, { variant: status === 'completed' ? 'default' : 'secondary', className: "shrink-0", children: status === 'completed'
                                            ? translations.projects.completed
                                            : translations.projects.inProgress })] }), _jsx("div", { className: "relative overflow-hidden rounded-lg border border-border/60 bg-muted", children: _jsx("img", { src: project.image, alt: `${project.title} project cover`, loading: "lazy", className: "h-44 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" }) })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: project.description }), _jsx("div", { className: "flex flex-wrap gap-2", children: project.tech.map((t) => (_jsx(Badge, { variant: "outline", className: "text-xs", children: t }, t))) })] }), _jsxs(CardFooter, { className: "flex gap-2", children: [viewEnabled ? (_jsx(Button, { asChild: true, className: "flex-1", children: _jsxs("a", { href: project.viewLink, target: "_blank", rel: "noopener noreferrer", children: [_jsx(ExternalLink, { className: "h-4 w-4" }), translations.projects.view] }) })) : (_jsxs(Button, { disabled: true, className: "flex-1", children: [_jsx(ExternalLink, { className: "h-4 w-4" }), translations.projects.view] })), codeEnabled ? (_jsx(Button, { asChild: true, variant: "outline", className: "flex-1", children: _jsxs("a", { href: project.codeLink, target: "_blank", rel: "noopener noreferrer", children: [_jsx(Github, { className: "h-4 w-4" }), translations.projects.code] }) })) : (_jsxs(Button, { disabled: true, variant: "outline", className: "flex-1", children: [_jsx(Github, { className: "h-4 w-4" }), translations.projects.code] }))] })] }) }, project.id));
    };
    return (_jsx("section", { id: "projects", className: "bg-transparent", children: _jsxs("div", { className: "mx-auto max-w-6xl", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: translations.projects.title }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground sm:text-base", children: translations.projects.subtitle })] }), _jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [_jsx(Button, { type: "button", variant: activeFilter === 'all' ? 'default' : 'secondary', onClick: () => setActiveFilter('all'), children: "All" }), _jsx(Button, { type: "button", variant: activeFilter === 'completed' ? 'default' : 'secondary', onClick: () => setActiveFilter('completed'), children: translations.projects.completed }), _jsx(Button, { type: "button", variant: activeFilter === 'in-progress' ? 'default' : 'secondary', onClick: () => setActiveFilter('in-progress'), children: translations.projects.inProgress })] }), _jsxs("div", { className: "mt-8 space-y-10", children: [filtered.completed.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("h3", { className: "text-lg font-semibold text-foreground", children: translations.projects.completed }), _jsx(Badge, { className: "shrink-0", children: filtered.completed.length })] }), _jsx(motion.div, { initial: false, className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.completed.map((p) => renderProjectCard(p, 'completed')) })] })), filtered.inProgress.length > 0 && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("h3", { className: "text-lg font-semibold text-foreground", children: translations.projects.inProgress }), _jsx(Badge, { className: "shrink-0", variant: "secondary", children: filtered.inProgress.length })] }), _jsx(motion.div, { initial: false, className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.inProgress.map((p) => renderProjectCard(p, 'in-progress')) })] }))] })] }) }));
};
export default Projects;
