/**
 * SEOHead Component
 * 
 * Manages SEO meta tags dynamically for better search engine optimization.
 * Features:
 * - Updates document title
 * - Sets meta description and keywords
 * - Configures Open Graph tags for social media
 * - Sets Twitter Card meta tags
 * - Supports custom images and URLs
 * 
 * @component
 */

import React, { useEffect } from 'react';

/**
 * Props for SEOHead component
 * 
 * @interface SEOHeadProps
 * @property {string} [title] - Page title (default: portfolio title)
 * @property {string} [description] - Meta description for SEO
 * @property {string} [image] - Social media preview image URL
 * @property {string} [url] - Canonical URL of the page
 * @property {string} [type] - Open Graph type (default: "website")
 * @property {string[]} [keywords] - SEO keywords array
 */
interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Y0ussef Mahmoud - Full-Stack Developer Portfolio",
  description = "Passionate Full-Stack Developer & Project Engineer at Shehabco. Expert in React.js, Node.js, TypeScript, MySQL, Flutter, and modern web technologies. Building responsive web and mobile applications with clean, maintainable code.",
  image = "/Portfolio-V2.0/images/hero-800x1000.webp",
  url = "https://y0ussefmahmoud.github.io/Portfolio-V2.0/",
  type = "website",
  keywords = [
    "Full-Stack Developer",
    "React.js",
    "Node.js", 
    "TypeScript",
    "JavaScript",
    "MySQL",
    "Flutter",
    "Web Development",
    "Mobile Apps",
    "Portfolio",
    "Y0ussef Mahmoud",
    "Frontend Developer",
    "Backend Developer"
  ]
}) => {
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;

  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', 'Y0ussef Mahmoud');

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullImageUrl, true);
    updateMetaTag('og:url', url, true);

    // Twitter
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullImageUrl);
  }, [title, description, fullImageUrl, url, keywords]);

  return null;
};

export default SEOHead;
