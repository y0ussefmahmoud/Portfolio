import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Code2, Server, Smartphone, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
const skillsData = {
    frontend: ['React.js', 'TypeScript', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'NestJS', 'MySQL', 'PostgreSQL', 'MongoDB'],
    mobile: ['Flutter', 'Dart', 'React Native', 'Firebase'],
    tools: ['Docker', 'Git', 'VS Code', 'Figma', 'Postman'],
};
const categories = [
    { key: 'frontend', icon: Code2 },
    { key: 'backend', icon: Server },
    { key: 'mobile', icon: Smartphone },
    { key: 'tools', icon: Wrench },
];
const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};
const Skills = ({ translations }) => {
    const categoryTitleMap = {
        frontend: translations.skills.frontend,
        backend: translations.skills.backend,
        mobile: translations.skills.mobile,
        tools: translations.skills.tools,
    };
    return (_jsx("section", { id: "skills", className: "bg-transparent", children: _jsxs("div", { className: "mx-auto max-w-6xl", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: translations.skills.title }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground sm:text-base", children: translations.skills.subtitle })] }), _jsx("div", { className: "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2", children: categories.map(({ key, icon: Icon }) => (_jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut' }, whileHover: { y: -4 }, className: "h-full", children: _jsxs(Card, { className: "group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50", children: [_jsx(CardHeader, { className: "space-y-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: "h-6 w-6 text-primary" }), _jsx("h3", { className: "text-lg font-semibold text-foreground", children: categoryTitleMap[key] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-wrap gap-2", children: skillsData[key].map((skill) => (_jsx(Badge, { variant: "outline", className: "text-xs", children: skill }, skill))) }) })] }) }, key))) })] }) }));
};
export default Skills;
