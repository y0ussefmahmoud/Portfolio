import React, { useState } from 'react';
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  text-align: center;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  background: ${props => props.theme.colors.bgPrimary};
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.border};
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 1.5rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 1.25rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  color: ${props => props.theme.colors.textPrimary};
  font-weight: 500;
`;

const ContactForm = styled.form`
  background: ${props => props.theme.colors.bgPrimary};
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.border};
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.textPrimary};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.bgSecondary};
  color: ${props => props.theme.colors.textPrimary};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.bgSecondary};
  color: ${props => props.theme.colors.textPrimary};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px ${props => props.theme.colors.primary}40;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const FormStatus = styled.div<{ type: 'success' | 'error' | 'info' }>`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  
  ${props => {
    switch (props.type) {
      case 'success':
        return `
          background: #10b98120;
          color: #10b981;
          border: 1px solid #10b98140;
        `;
      case 'error':
        return `
          background: #ef444420;
          color: #ef4444;
          border: 1px solid #ef444440;
        `;
      default:
        return `
          background: ${props.theme.colors.primary}20;
          color: ${props.theme.colors.primary};
          border: 1px solid ${props.theme.colors.primary}40;
        `;
    }
  }}
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.bgSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textPrimary};
  text-decoration: none;
  font-size: 1.25rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px ${props => props.theme.colors.primary}40;
  }
`;

interface ContactProps {
  translations: Translations;
}

const Contact: React.FC<ContactProps> = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({
        type: 'info',
        message: 'This form is currently in demo mode. To enable email functionality, configure Formspree integration.'
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      label: translations.contact.email,
      value: 'youssef11mahmoud112002@gmail.com',
      link: 'mailto:youssef11mahmoud112002@gmail.com'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+20 1129334173',
      link: 'tel:+201129334173'
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Giza, Egypt',
      link: null
    }
  ];

  const socialLinks = [
    { icon: '💼', url: 'https://www.linkedin.com/in/y0ussefmahmoud/', label: 'LinkedIn' },
    { icon: '📱', url: 'https://github.com/y0ussefmahmoud', label: 'GitHub' },
    { icon: '📘', url: 'https://www.facebook.com/y0ussefmahmoud', label: 'Facebook' },
    { icon: '✉️', url: 'mailto:youssef11mahmoud112002@gmail.com', label: 'Email' }
  ];

  return (
    <ContactSection id="contact">
      <Container>
        <Title>{translations.contact.title}</Title>
        <Subtitle>{translations.contact.subtitle}</Subtitle>

        <ContactGrid>
          <ContactInfo>
            <InfoTitle>Get in Touch</InfoTitle>
            <InfoList>
              {contactInfo.map((info, index) => (
                <InfoItem key={index}>
                  <InfoIcon>{info.icon}</InfoIcon>
                  <InfoContent>
                    <InfoLabel>{info.label}</InfoLabel>
                    <InfoValue>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          style={{ 
                            color: 'inherit', 
                            textDecoration: 'none' 
                          }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        info.value
                      )}
                    </InfoValue>
                  </InfoContent>
                </InfoItem>
              ))}
            </InfoList>

            <SocialLinks>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </SocialLinks>
          </ContactInfo>

          <ContactForm onSubmit={handleSubmit}>
            <FormTitle>Send Message</FormTitle>
            
            <FormRow>
              <Label htmlFor="name">{translations.contact.name}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={translations.contact.ph_name}
                required
              />
            </FormRow>

            <FormRow>
              <Label htmlFor="email">{translations.contact.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={translations.contact.ph_email}
                required
              />
            </FormRow>

            <FormRow>
              <Label htmlFor="message">{translations.contact.message}</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={translations.contact.ph_message}
                required
              />
            </FormRow>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : translations.contact.send}
            </SubmitButton>

            {formStatus.type && (
              <FormStatus type={formStatus.type}>
                {formStatus.message}
              </FormStatus>
            )}
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;
