import React from 'react';
import styled from 'styled-components';

const SkipLinkContainer = styled.a`
  position: absolute;
  top: -40px;
  left: 6px;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  z-index: 9999;
  transition: top 0.3s ease;

  &:focus {
    top: 6px;
  }

  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  return (
    <SkipLinkContainer href={href}>
      {children}
    </SkipLinkContainer>
  );
};

export default SkipLink;
