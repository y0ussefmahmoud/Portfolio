/**
 * Project Type Definitions
 *
 * TypeScript interfaces for project data structures.
 *
 * @author      م / يوسف محمود عبد الجواد
 * @author      Eng. Youssef Mahmoud Abdelgawad
 * @website     https://y0ussef.com
 * @version     3.0.7
 * @copyright   2024-2025 Youssef Mahmoud Abdelgawad. All rights reserved.
 */

export interface ProjectDetail {
  video?: {
    url: string;
    thumbnail: string;
    title: string;
  };
  gallery: Array<{
    url: string;
    caption: string;
    alt: string;
  }>;
  challenges: Array<{
    title: string;
    description: string;
  }>;
  solutions: Array<{
    title: string;
    description: string;
  }>;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  stats: Array<{
    value: number;
    label: string;
    suffix?: string;
  }>;
  links: {
    playStore?: string;
    github?: string;
    pdf?: string;
    youtube?: string;
    website?: string;
  };
  meta: {
    date: string;
    duration: string;
    linesOfCode?: number;
  };
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  viewLink?: string;
  codeLink?: string;
  details?: ProjectDetail;
  status: 'completed' | 'in-progress';
}
