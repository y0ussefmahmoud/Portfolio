import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Award, Building2, Calendar, Check, GraduationCap, } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
const educationData = [
    {
        year: '2020 - 2024',
        institution: 'Egyptian Korean Faculty of Technological Industry and Energy',
        degree: 'Bachelor of Software Engineering',
        description: 'Specialized in Computer Engineering with focus on software development, algorithms, and system design.',
        achievements: [
            'Relevant Coursework: Data Structures, Algorithms, Database Systems',
            'Software Engineering, Web Development, Mobile Development',
            'Computer Networks, Operating Systems, Computer Architecture',
        ],
    },
];
const certifications = [
    {
        name: 'Comming Soon',
        issuer: 'Compony',
        date: '2026',
        icon: '🌐',
    },
];
const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};
const Education = ({ translations }) => {
    return (_jsx("section", { id: "education", className: "bg-transparent", children: _jsxs("div", { className: "mx-auto max-w-6xl", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: translations.education.title }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground sm:text-base", children: translations.education.subtitle })] }), _jsx("div", { className: "space-y-6", children: educationData.map((item) => (_jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut' }, whileHover: { y: -4 }, className: "h-full", children: _jsxs(Card, { className: "border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50", children: [_jsx(CardHeader, { className: "space-y-4", children: _jsxs(Badge, { className: "inline-flex items-center gap-2", children: [_jsx(Calendar, { className: "h-4 w-4" }), item.year] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("h3", { className: "flex items-center gap-2 text-xl font-semibold text-foreground", children: [_jsx(Building2, { className: "h-5 w-5 text-primary" }), item.institution] }), _jsxs("h4", { className: "flex items-center gap-2 text-lg font-medium text-primary", children: [_jsx(GraduationCap, { className: "h-5 w-5" }), item.degree] })] }), _jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: item.description }), _jsx("ul", { className: "space-y-2", children: item.achievements.map((achievement) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [_jsx(Check, { className: "h-4 w-4 text-primary mt-0.5" }), _jsx("span", { children: achievement })] }, achievement))) })] })] }) }, item.year))) }), _jsxs("div", { className: "mt-12", children: [_jsx("h3", { className: "text-2xl font-semibold text-foreground mb-6", children: translations.education.d2.title }), _jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: certifications.map((cert) => (_jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut' }, whileHover: { y: -4 }, className: "h-full", children: _jsxs(Card, { className: "h-full border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50", children: [_jsx(CardHeader, { className: "space-y-4", children: _jsx("div", { className: "w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center", children: _jsx(Award, { className: "h-12 w-12 text-primary-foreground" }) }) }), _jsxs(CardContent, { className: "space-y-2 text-center", children: [_jsx("div", { className: "text-3xl leading-none", children: cert.icon }), _jsx("div", { className: "text-lg font-semibold text-foreground", children: cert.name }), _jsx("div", { className: "text-sm text-primary font-medium", children: cert.issuer }), _jsx("div", { className: "text-xs text-muted-foreground", children: cert.date })] })] }) }, `${cert.name}-${cert.date}`))) })] })] }) }));
};
export default Education;
