import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import * as LanguageContext from '../contexts/LanguageContext';
import React from 'react';

// Mock the language context
vi.mock('../contexts/LanguageContext', async () => {
  const actual = await vi.importActual('../contexts/LanguageContext');
  return {
    ...actual,
    useLanguage: () => ({
      language: 'en',
      setLanguage: vi.fn(),
      t: {
        nav: {
          home: 'Home',
          about: 'About',
          services: 'Services',
          projects: 'Projects',
          education: 'Education',
          contact: 'Contact',
        },
      },
      toggleLanguage: vi.fn(),
    }),
  };
});

describe('Navbar', () => {
  const mockOnNavigate = vi.fn();
  const mockOnOpenContact = vi.fn();
  const mockOnOpenCV = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage to ensure consistent theme state
    localStorage.removeItem('theme');
    // Reset document class
    document.documentElement.classList.remove('dark');
  });

  const defaultProps = {
    onNavigate: mockOnNavigate,
    currentSection: 'home' as const,
    onOpenContact: mockOnOpenContact,
    isContactOpen: false,
    onOpenCV: mockOnOpenCV,
    isCVOpen: false,
  };

  it('should render navbar with navigation buttons', () => {
    render(<Navbar {...defaultProps} />);

    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Stack')).toBeInTheDocument();
    expect(screen.getByLabelText('Projects')).toBeInTheDocument();
  });

  it('should render contact and CV buttons', () => {
    render(<Navbar {...defaultProps} />);

    expect(screen.getByLabelText('Contact')).toBeInTheDocument();
    expect(screen.getByLabelText('CV')).toBeInTheDocument();
  });

  it('should render theme toggle button', () => {
    render(<Navbar {...defaultProps} />);

    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  describe('navigation', () => {
    it('should navigate to home when home button clicked', () => {
      render(<Navbar {...defaultProps} currentSection="projects" />);

      fireEvent.click(screen.getByLabelText('Home'));

      expect(mockOnNavigate).toHaveBeenCalledWith('home');
    });

    it('should navigate to stack when stack button clicked', () => {
      render(<Navbar {...defaultProps} />);

      fireEvent.click(screen.getByLabelText('Stack'));

      expect(mockOnNavigate).toHaveBeenCalledWith('stack');
    });

    it('should navigate to projects when projects button clicked', () => {
      render(<Navbar {...defaultProps} />);

      fireEvent.click(screen.getByLabelText('Projects'));

      expect(mockOnNavigate).toHaveBeenCalledWith('projects');
    });

    it('should not navigate when clicking current section', () => {
      render(<Navbar {...defaultProps} currentSection="home" />);

      fireEvent.click(screen.getByLabelText('Home'));

      expect(mockOnNavigate).not.toHaveBeenCalled();
    });
  });

  describe('modals', () => {
    it('should open contact modal when contact button clicked', () => {
      render(<Navbar {...defaultProps} />);

      fireEvent.click(screen.getByLabelText('Contact'));

      expect(mockOnOpenContact).toHaveBeenCalled();
    });

    it('should open CV modal when CV button clicked', () => {
      render(<Navbar {...defaultProps} />);

      fireEvent.click(screen.getByLabelText('CV'));

      expect(mockOnOpenCV).toHaveBeenCalled();
    });

    it('should close contact modal when clicking while open', () => {
      render(<Navbar {...defaultProps} isContactOpen={true} />);

      fireEvent.click(screen.getByLabelText('Contact'));

      expect(mockOnOpenContact).toHaveBeenCalled();
    });
  });

  describe('theme toggle', () => {
    it('should toggle theme when theme button clicked', () => {
      render(<Navbar {...defaultProps} />);

      const themeButton = screen.getByLabelText('Toggle theme');

      fireEvent.click(themeButton);

      // Check if theme was toggled (dark class added)
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should persist theme to localStorage', () => {
      render(<Navbar {...defaultProps} />);

      fireEvent.click(screen.getByLabelText('Toggle theme'));

      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });

  describe('active section highlighting', () => {
    it('should highlight home button when on home section', () => {
      render(<Navbar {...defaultProps} currentSection="home" />);

      const homeButton = screen.getByLabelText('Home').closest('button');
      expect(homeButton).toHaveClass('active');
    });

    it('should highlight projects button when on projects section', () => {
      render(<Navbar {...defaultProps} currentSection="projects" />);

      const projectsButton = screen.getByLabelText('Projects').closest('button');
      expect(projectsButton).toHaveClass('active');
    });
  });
});
