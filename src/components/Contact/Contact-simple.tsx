import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const ContactSection = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.bgSecondary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ContactCard = styled.div`
  background: ${props => props.theme.colors.bgPrimary};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const ContactText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

interface ContactProps {
  translations: Translations;
}

const Contact: React.FC<ContactProps> = ({ translations }) => {
  return (
    <ContactSection id="contact">
      <Container>
        <Title>Get In Touch</Title>
        <Description>
          Ready to start your next project? Let's work together to create something amazing.
        </Description>
        
        <ContactInfo>
          <ContactCard>
            <ContactIcon>📧</ContactIcon>
            <ContactTitle>Email</ContactTitle>
            <ContactText>Send me a message</ContactText>
            <ContactLink href="mailto:youssef11mahmoud112002@gmail.com">
              youssef11mahmoud112002@gmail.com
            </ContactLink>
          </ContactCard>
          
          <ContactCard>
            <ContactIcon>💼</ContactIcon>
            <ContactTitle>LinkedIn</ContactTitle>
            <ContactText>Connect with me</ContactText>
            <ContactLink href="https://linkedin.com/in/y0ussefmahmoud" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/y0ussefmahmoud
            </ContactLink>
          </ContactCard>
          
          <ContactCard>
            <ContactIcon>💻</ContactIcon>
            <ContactTitle>GitHub</ContactTitle>
            <ContactText>Check out my code</ContactText>
            <ContactLink href="https://github.com/Y0ussefMahmoud" target="_blank" rel="noopener noreferrer">
              github.com/Y0ussefMahmoud
            </ContactLink>
          </ContactCard>
        </ContactInfo>
      </Container>
    </ContactSection>
  );
};

export default Contact;
