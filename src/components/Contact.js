import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, MapPin, } from "lucide-react";
// WhatsApp Icon Component
const WhatsAppIcon = ({ className }) => (_jsx("svg", { className: className, viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.08 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }));
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
            icon: WhatsAppIcon,
            title: translations.about.whatsapp || "WhatsApp",
            value: "+20 112 933 4173",
            link: "https://wa.me/201129334173",
            description: "Contact me for direct communication"
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
                                return (_jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut', delay: index * 0.1 }, whileHover: { y: -4 }, children: _jsx(Card, { className: "border-border/60 bg-card/60 backdrop-blur supports-backdrop-filter:bg-card/50", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "shrink-0", children: _jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/60", children: _jsx(Icon, { className: "h-6 w-6 text-primary-foreground" }) }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "text-lg font-semibold text-foreground", children: info.title }), _jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: info.description }), _jsx("a", { href: info.link, className: "mt-2 inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors", target: info.link.startsWith('http') ? "_blank" : undefined, rel: info.link.startsWith('http') ? "noopener noreferrer" : undefined, children: info.value })] })] }) }) }) }, info.title));
                            }) }), _jsx(motion.div, { variants: cardVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.25 }, transition: { duration: 0.35, ease: 'easeOut' }, children: _jsxs(Card, { className: "border-border/60 bg-card/60 backdrop-blur supports-backdrop-filter:bg-card/50", children: [_jsx(CardHeader, { children: _jsx("h3", { className: "text-xl font-semibold text-foreground", children: "Send me a message" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "name", className: "text-sm font-medium text-foreground", children: translations.contact.name }), _jsx(Input, { id: "name", type: "text", placeholder: translations.contact.ph_name, value: formData.name, onChange: (e) => handleInputChange('name', e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "text-sm font-medium text-foreground", children: translations.contact.email }), _jsx(Input, { id: "email", type: "email", placeholder: translations.contact.ph_email, value: formData.email, onChange: (e) => handleInputChange('email', e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "message", className: "text-sm font-medium text-foreground", children: translations.contact.message }), _jsx(Textarea, { id: "message", placeholder: translations.contact.ph_message, value: formData.message, onChange: (e) => handleInputChange('message', e.target.value), rows: 5, required: true })] }), _jsxs(Button, { type: "submit", className: "w-full sm:w-auto", shine: true, hoverScale: 1.05, tapScale: 0.95, children: [_jsx(Send, { className: "h-4 w-4 mr-2" }), translations.contact.send] })] }) })] }) })] })] }) }));
};
export default Contact;
