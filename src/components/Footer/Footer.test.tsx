import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { translations } from '../../i18n/translations';
import React from 'react';

describe('Footer', () => {
  const mockTranslations = translations.en;

  it('should render footer with tagline', () => {
    render(<Footer translations={mockTranslations} />);

    expect(screen.getByText(mockTranslations.footer.tag)).toBeInTheDocument();
  });

  it('should render copyright with current year', () => {
    render(<Footer translations={mockTranslations} />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('should render copyright text', () => {
    render(<Footer translations={mockTranslations} />);

    expect(screen.getByText(new RegExp(mockTranslations.footer.rights))).toBeInTheDocument();
  });

  it('should render author name', () => {
    render(<Footer translations={mockTranslations} />);

    expect(screen.getByText(/Y0ussef Mahmoud/)).toBeInTheDocument();
  });

  it('should use semantic footer element', () => {
    render(<Footer translations={mockTranslations} />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
