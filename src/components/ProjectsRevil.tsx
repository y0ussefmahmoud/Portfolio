/**
 * ProjectsRevil Component
 * 
 * Projects showcase with filtering, search, and animated cards.
 * Features:
 * - Project grid with image slideshow
 * - Tag-based filtering
 * - Search functionality
 * - Animated card hover effects
 * - Responsive design
 * - Shimmer loading effect for images
 * 
 * @component
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { X, Search } from 'lucide-react';
import projectsJson from '../data/projects.json';

/**
 * Project interface
 * @interface Project
 */
interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    tags: { name: string; color: string }[];
    repoLink: string;
    liveLink: string;
}

/**
 * CardImage Component
 * 
 * Project card image with shimmer loading effect.
 * @param src - Image source URL
 * @param alt - Image alt text
 */
const CardImage = ({ src, alt }: { src: string; alt: string }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    return (
        <>
            <div 
                className={`absolute inset-0 z-10 bg-white/5 overflow-hidden transition-opacity duration-1000 ease-out ${isImageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{ animation: 'shimmer 1.2s infinite ease-in-out' }}
                />
            </div>
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsImageLoaded(true)}
                className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-[1500ms] ease-out ${!isImageLoaded ? 'scale-105' : ''}`}
                style={{
                    filter: isImageLoaded ? 'blur(0px)' : 'blur(20px)',
                    opacity: isImageLoaded ? 1 : 0
                }}
            />
        </>
    );
};

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Slideshow logic (Card Hover)
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (isHovered && project.images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isHovered, project.images.length]);

    // Entrance animation
    useEffect(() => {
        anime({
            targets: cardRef.current,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 500,
            delay: index * 50,
            easing: 'easeOutQuad'
        });
    }, [index]);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImageIndex(0);
            }}
            onClick={onClick}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: isHovered ? -8 : 0 }}
            transition={{
                opacity: { duration: 0.3, delay: index * 0.03 },
                y: { duration: 0.2 },
                layout: { duration: 0.4, type: "tween", ease: "easeOut" }
            }}
            className={`
                group flex flex-col h-full glass-panel cursor-pointer overflow-hidden
                border border-[var(--navbar-border)] transition-shadow duration-300
                ${isHovered ? 'shadow-xl' : 'shadow-md'}
            `}
            style={{ willChange: 'transform, opacity' }}
        >
            <div className="relative h-[200px] overflow-hidden rounded-t-[20px] will-change-transform">
                {/* Slideshow Overlay */}
                <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
                    <div
                        className="flex h-full transition-transform duration-500 ease-in-out"
                        style={{
                            width: `${project.images.length * 100}%`,
                            transform: `translateX(-${(currentImageIndex * 100) / project.images.length}%)`,
                        }}
                    >
                        {project.images.map((img, i) => (
                            <div key={i} style={{ width: `${100 / project.images.length}%` }} className="h-full relative overflow-hidden">
                                <CardImage src={img} alt={project.title || 'Project'} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="flex gap-1.5 flex-wrap">
                        {(project.tags || []).slice(0, 2).map((tag, i) => (
                            <div
                                key={i}
                                className="px-2.5 py-1 rounded-full bg-white/40 backdrop-blur-md text-xs font-semibold text-gray-800 shadow-sm flex items-center gap-1"
                            >
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: tag.color || '#3b82f6' }} />
                                {tag.name}
                            </div>
                        ))}
                        {(project.tags || []).length > 2 && (
                            <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-semibold text-white shadow-sm">
                                +{(project.tags || []).length - 2} More
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="heading-md mb-2.5 text-primary">
                    {project.title}
                </h3>
                <p
                    className="text-body text-sec leading-relaxed flex-1 overflow-hidden"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {project.description}
                </p>
            </div>
        </motion.div>
    );
};

const ProjectsRevil = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const handwritingRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Convert projects.json data to Project format
    const allProjects = [
        ...((projectsJson as any).projects || []),
        ...((projectsJson as any).otherProjects || [])
    ];

    const projectsData: Project[] = allProjects.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        images: [p.image],
        tags: p.tech?.filter((t: string) => t !== '#').map((t: string) => ({
            name: t,
            color: '#61dafb' // Default color, can be customized
        })) || [],
        repoLink: p.codeLink !== '#' ? p.codeLink || '' : '',
        liveLink: p.viewLink !== '#' ? p.viewLink || '' : ''
    }));

    // Extract unique tech tags
    const techSet = new Set<string>();
    allProjects.forEach((p: any) => {
        p.tech?.forEach((t: string) => {
            if (t !== '#') techSet.add(t);
        });
    });

    const availableTags = Array.from(techSet).map((tech, idx) => ({
        id: `tag-${idx}`,
        name: tech,
        color: '#61dafb' // Default color, can be customized
    }));

    useEffect(() => {
        anime({
            targets: handwritingRef.current,
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 600,
            easing: 'easeOutExpo'
        });
        anime({
            targets: titleRef.current,
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 800,
            delay: 150,
            easing: 'easeOutExpo'
        });
    }, []);

    const toggleTag = (tagName: string) => {
        setSelectedTags(prev =>
            prev.includes(tagName)
                ? prev.filter(t => t !== tagName)
                : [...prev, tagName]
        );
    };

    const filteredProjects = projectsData.filter(project => {
        if (selectedTags.length > 0) {
            const projectTags = project.tags.map(t => t.name.toLowerCase());
            return selectedTags.every(tag => projectTags.includes(tag.toLowerCase()));
        }
        if (searchQuery.length < 2) return true;
        const query = searchQuery.toLowerCase();
        return (
            project.title.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.tags.some(t => t.name.toLowerCase().includes(query))
        );
    });

    return (
        <div className="min-h-screen bg-primary transition-colors duration-300 pt-32 pb-20">
            <div className="page-padding">
                {/* Header */}
                <div className="mb-8 pl-0">
                    <div
                        ref={handwritingRef}
                        className="text-4xl opacity-0 mb-[-15px] ml-2.5"
                        style={{
                            fontFamily: "'Rock Salt', cursive",
                            color: 'var(--accent)'
                        }}
                    >
                        Selected
                    </div>
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-primary m-0 opacity-0 transition-colors duration-300 font-inter"
                    >
                        Projects
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="mb-6 max-w-[600px]">
                    <div className="glass-surface flex items-center p-3 px-5 border border-[var(--navbar-border)] shadow-md transition-shadow duration-300">
                        <Search size={20} className="text-sec mr-3" />
                        <input
                            type="text"
                            placeholder="Search projects by title, tags, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border-none bg-transparent text-primary text-base w-full outline-none font-inter"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="bg-none border-none text-sec cursor-pointer flex items-center"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Tags */}
                <div className="mb-8 flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-black text-sec mr-2.5 uppercase tracking-widest opacity-60">
                        Filter View:
                    </span>

                    <div className="flex flex-wrap gap-2 items-center">
                        {availableTags.map(tag => {
                            const isActive = selectedTags.includes(tag.name);

                            return (
                                <button
                                    key={tag.id}
                                    onClick={() => toggleTag(tag.name)}
                                    className={`
                                        flex items-center gap-2 rounded-xl border font-bold cursor-pointer transition-all duration-300
                                        backdrop-blur-xl shadow-sm whitespace-nowrap
                                        px-4 py-2 text-sm
                                        ${isActive
                                            ? 'border-accent bg-[rgba(59,130,246,0.12)] text-accent scale-105 z-10 shadow-[0_8px_16px_-4px_rgba(59,130,246,0.25)]'
                                            : 'border-[var(--navbar-border)] bg-[var(--card-bg)] text-sec'}
                                    `}
                                >
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: tag.color }}>
                                        <span className="text-white text-xs font-bold">{tag.name.charAt(0)}</span>
                                    </div>
                                    {tag.name}
                                </button>
                            );
                        })}

                        {selectedTags.length > 0 && (
                            <button
                                onClick={() => setSelectedTags([])}
                                className="px-3 py-2 bg-transparent border-none text-accent text-xs font-black cursor-pointer transition-all duration-200 uppercase tracking-widest ml-1 hover:opacity-70"
                            >
                                [ Reset ]
                            </button>
                        )}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={() => {
                                if (project.liveLink) {
                                    window.open(project.liveLink, '_blank');
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsRevil;
