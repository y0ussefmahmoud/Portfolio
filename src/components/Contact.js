import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, MapPin, Phone, } from "lucide-react";
import { Card, CardContent, CardHeader, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
};
const Contact = ({ translations }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            value: "youssef11mahmoud112002@gmail.com",
            link: "mailto:youssef11mahmoud112002@gmail.com",
            description: translations.contact.subtitle
        },
        {
            icon: Phone,
            title: translations.about.phone || "Phone",
            value: "+20 101 234 5678",
            link: "tel:+201012345678",
            description: "Call me for direct communication"
        },
        {
            icon: MapPin,
            title: translations.about.location || "Location",
            value: "Cairo, Egypt",
            link: "https://maps.google.com/?q=Cairo,Egypt",
            description: "Based in Cairo, available for remote work"
        },
        {
            icon: Linkedin,
            title: "LinkedIn",
            value: "linkedin.com/in/y0ussefmahmoud",
            link: "https://linkedin.com/in/y0ussefmahmoud",
            description: "Connect with me professionally"
        },
        {
            icon: Github,
            title: "GitHub",
            value: "github.com/Y0ussefMahmoud",
            link: "https://github.com/Y0ussefMahmoud",
            description: "Check out my code"
        }
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent("Contact from " + formData.name);
        const body = encodeURIComponent(formData.message + "\n\nFrom: " + formData.name + "\nEmail: " + formData.email);
        const mailtoLink = `mailto:youssef11mahmoud112002@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailtoLink);
        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    return (_jsx("section", { id: "contact", className: "bg-transparent", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: translations.contact.title }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground sm:text-base", children: translations.contact.subtitle })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx("div", { className: "space-y-4", children: contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (_jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut', delay: index * 0.1 }, whileHover: { y: -4 }, children: _jsx(Card, { className: "border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60", children: _jsx(Icon, { className: "h-6 w-6 text-primary-foreground" }) }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-lg font-semibold text-foreground", children: info.title }), _jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: info.description }), _jsx("a", { href: info.link, className: "mt-2 inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors", target: info.link.startsWith('http') ? "_blank" : undefined, rel: info.link.startsWith('http') ? "noopener noreferrer" : undefined, children: info.value })] })] }) }) }) }, info.title));
                            }) }), _jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut' }, children: _jsxs(Card, { className: "border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/50", children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-xl font-semibold text-foreground", children: "Send me a message" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "name", className: "text-sm font-medium text-foreground", children: translations.contact.name }), _jsx(Input, { id: "name", type: "text", placeholder: translations.contact.ph_name, value: formData.name, onChange: (e) => handleInputChange('name', e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "text-sm font-medium text-foreground", children: translations.contact.email }), _jsx(Input, { id: "email", type: "email", placeholder: translations.contact.ph_email, value: formData.email, onChange: (e) => handleInputChange('email', e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "message", className: "text-sm font-medium text-foreground", children: translations.contact.message }), _jsx(Textarea, { id: "message", placeholder: translations.contact.ph_message, value: formData.message, onChange: (e) => handleInputChange('message', e.target.value), rows: 5, required: true })] }), _jsxs(Button, { type: "submit", className: "w-full sm:w-auto", children: [_jsx(Send, { className: "h-4 w-4 mr-2" }), translations.contact.send] })] }) })] }) })] })] }) }));
};
export default Contact;
