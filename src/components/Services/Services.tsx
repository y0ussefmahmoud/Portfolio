import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const ServicesSection = styled.section`
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

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textPrimary};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled.article`
  background: ${props => props.theme.colors.bgPrimary};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px ${props => props.theme.colors.shadow};
  transition: transform 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    font-size: 2rem;
    color: white;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textPrimary};
`;

const ServiceDesc = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

interface ServicesProps {
  translations: Translations;
}

const Services: React.FC<ServicesProps> = ({ translations }) => {
  const servicesData = [
    {
      icon: 'fas fa-code',
      title: translations.services.web.title,
      desc: translations.services.web.desc,
    },
    {
      icon: 'fas fa-mobile-screen',
      title: translations.services.mobile.title,
      desc: translations.services.mobile.desc,
    },
    {
      icon: 'fas fa-plug',
      title: translations.services.api.title,
      desc: translations.services.api.desc,
    },
    {
      icon: 'fab fa-docker',
      title: translations.services.devops.title,
      desc: translations.services.devops.desc,
    },
    {
      icon: 'fas fa-database',
      title: translations.services.db.title,
      desc: translations.services.db.desc,
    },
    {
      icon: 'fas fa-briefcase',
      title: translations.services.freelance.title,
      desc: translations.services.freelance.desc,
    },
  ];

  return (
    <ServicesSection id="services">
      <Container>
        <SectionTitle>{translations.services.title}</SectionTitle>
        <SectionSubtitle>{translations.services.subtitle}</SectionSubtitle>
        
        <ServicesGrid>
          {servicesData.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>
                <i className={service.icon}></i>
              </ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDesc>{service.desc}</ServiceDesc>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;
