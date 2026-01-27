import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Briefcase, Check, Container, Database, Globe, Link, Mail, Smartphone, } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};
const Services = ({ translations }) => {
    const handleServiceInquiry = (serviceName) => {
        const subject = encodeURIComponent(`Inquiry about ${serviceName}`);
        const body = encodeURIComponent(`Hi Y0ussef,\n\nI'm interested in your ${serviceName} service. Could you please provide more details?\n\nBest regards`);
        window.open(`mailto:youssef11mahmoud112002@gmail.com?subject=${subject}&body=${body}`);
    };
    const servicesData = [
        {
            id: 1,
            icon: Globe,
            title: translations.services.web.title,
            description: translations.services.web.desc,
            features: [
                "Responsive Web Design",
                "Modern UI/UX",
                "Performance Optimization",
                "SEO Friendly",
                "Cross-browser Compatible",
            ],
            price: "Custom packages available",
        },
        {
            id: 2,
            icon: Smartphone,
            title: translations.services.mobile.title,
            description: translations.services.mobile.desc,
            features: [
                "Cross-platform Development",
                "Native Performance",
                "App Store Deployment",
                "Push Notifications",
                "Offline Functionality",
            ],
            price: "Custom packages available",
        },
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
        },
        {
            id: 6,
            icon: Briefcase,
            title: translations.services.freelance.title,
            description: translations.services.freelance.desc,
            features: [
                "Project Planning",
                "Regular Updates",
                "Quality Assurance",
                "Documentation",
                "Post-launch Support",
            ],
            price: "Custom packages available",
        },
    ];
    return (_jsx("section", { id: "services", className: "bg-transparent", children: _jsxs("div", { className: "mx-auto max-w-6xl px-4 py-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: translations.services.title }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground sm:text-base", children: translations.services.subtitle })] }), _jsx("div", { className: "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: servicesData.map((service) => {
                        const Icon = service.icon;
                        return (_jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: "easeOut" }, whileHover: { y: -4 }, className: "h-full", children: _jsxs(Card, { className: "group h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50", children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center", children: _jsx(Icon, { className: "h-8 w-8 text-primary-foreground" }) }), _jsx("h3", { className: "text-lg font-semibold text-foreground text-center mt-4", children: service.title })] }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm leading-relaxed text-muted-foreground text-center mb-4", children: service.description }), _jsx("div", { className: "space-y-2", children: service.features.map((feature) => (_jsxs("div", { className: "flex items-start gap-2 text-xs text-muted-foreground", children: [_jsx(Check, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), _jsx("span", { children: feature })] }, feature))) }), _jsxs("div", { className: "flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border/50", children: [_jsx("span", { className: "text-xs text-muted-foreground", children: "Price:" }), _jsx("span", { className: "text-sm font-semibold text-primary", children: service.price })] })] }), _jsx(CardFooter, { children: _jsxs(Button, { className: "w-full", onClick: () => handleServiceInquiry(service.title), children: [_jsx(Mail, {}), "Get Quote"] }) })] }) }, service.id));
                    }) })] }) }));
};
export default Services;
