export interface Theme {
  colors: {
    primary: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
    bgPrimary: string;
    bgSecondary: string;
    border: string;
    shadow: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  direction?: string;
}

export const lightTheme: Theme = {
  colors: {
    primary: '#2f6fed',
    accent: '#00d3a7',
    textPrimary: '#1a1a1a',
    textSecondary: '#6b7280',
    bgPrimary: '#ffffff',
    bgSecondary: '#f8fafc',
    border: '#e5e7eb',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  fonts: {
    primary: "'Poppins', sans-serif",
    secondary: "'Nunito', sans-serif",
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#2f6fed',
    accent: '#00d3a7',
    textPrimary: '#ffffff',
    textSecondary: '#d1d5db',
    bgPrimary: '#0b1220',
    bgSecondary: '#1e293b',
    border: '#374151',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
  fonts: {
    primary: "'Poppins', sans-serif",
    secondary: "'Nunito', sans-serif",
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
};
