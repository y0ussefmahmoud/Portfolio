import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};
const About = ({ translations }) => {
    return (_jsx("section", { id: "about", className: "bg-transparent", children: _jsx("div", { className: "mx-auto max-w-6xl px-4 py-8", children: _jsxs(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut' }, className: "text-center", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: translations.about.title }), _jsx("p", { className: "mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg max-w-3xl mx-auto", children: translations.about.bio })] }) }) }));
};
export default About;
