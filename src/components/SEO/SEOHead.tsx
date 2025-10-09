import React, { useEffect } from 'react';

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
  image = "/images/hero-800x1000.webp",
  url = "https://y0ussefmahmoud.github.io/Portfolio/",
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
