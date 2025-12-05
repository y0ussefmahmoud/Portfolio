import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Translations } from '../../i18n/translations';

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServicesSection = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.bgSecondary};
  scroll-margin-top: 100px;
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.article.withConfig({
  shouldForwardProp: (prop) => !['isVisible', 'index'].includes(prop),
})<{ isVisible: boolean; index: number }>`
  background: ${props => props.theme.colors.bgPrimary};
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.border};
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${props => props.isVisible ? fadeInUp : 'none'} 0.6s ease-out;
  animation-delay: ${props => props.index * 0.1}s;
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.theme.colors.shadow};
    border-color: ${props => props.theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.primary}10, transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
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
  font-size: 2rem;
  color: white;
  position: relative;
  animation: ${float} 3s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}20, ${props => props.theme.colors.accent}20);
    z-index: -1;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const ServiceDesc = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  text-align: left;
`;

const ServiceFeature = styled.li`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const ServicePrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const PriceText = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const PriceAmount = styled.span`
  color: ${props => props.theme.colors.primary};
  font-size: 1.25rem;
  font-weight: 600;
`;

const ServiceButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

interface ServicesProps {
  translations: Translations;
}

const Services: React.FC<ServicesProps> = ({ translations }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('services');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const servicesData = [
    {
      id: 1,
      icon: '🌐',
      title: translations.services.web.title,
      description: translations.services.web.desc,
      features: [
        'Responsive Web Design',
        'Modern UI/UX',
        'Performance Optimization',
        'SEO Friendly',
        'Cross-browser Compatible'
      ],
      price: 'Custom packages available'
    },
    {
      id: 2,
      icon: '📱',
      title: translations.services.mobile.title,
      description: translations.services.mobile.desc,
      features: [
        'Cross-platform Development',
        'Native Performance',
        'App Store Deployment',
        'Push Notifications',
        'Offline Functionality'
      ],
      price: 'Custom packages available'
    },
    {
      id: 3,
      icon: '🔗',
      title: translations.services.api.title,
      description: translations.services.api.desc,
      features: [
        'RESTful API Design',
        'JWT Authentication',
        'Database Integration',
        'API Documentation',
        'Security Best Practices'
      ],
      price: 'Custom packages available'
    },
    {
      id: 4,
      icon: '🐳',
      title: translations.services.devops.title,
      description: translations.services.devops.desc,
      features: [
        'Docker Containerization',
        'CI/CD Pipelines',
        'Cloud Deployment',
        'Monitoring & Logging',
        'Scalable Architecture'
      ],
      price: 'Custom packages available'
    },
    {
      id: 5,
      icon: '🗄️',
      title: translations.services.db.title,
      description: translations.services.db.desc,
      features: [
        'Database Schema Design',
        'Query Optimization',
        'Data Migration',
        'Backup Strategies',
        'Performance Tuning'
      ],
      price: 'Custom packages available'
    },
    {
      id: 6,
      icon: '💼',
      title: translations.services.freelance.title,
      description: translations.services.freelance.desc,
      features: [
        'Project Planning',
        'Regular Updates',
        'Quality Assurance',
        'Documentation',
        'Post-launch Support'
      ],
      price: 'Custom packages available'
    }
  ];

  const handleServiceInquiry = (serviceName: string) => {
    const subject = encodeURIComponent(`Inquiry about ${serviceName}`);
    const body = encodeURIComponent(`Hi Y0ussef,\n\nI'm interested in your ${serviceName} service. Could you please provide more details?\n\nBest regards`);
    window.open(`mailto:youssef11mahmoud112002@gmail.com?subject=${subject}&body=${body}`);
  };

  return (
    <ServicesSection id="services">
      <Container>
        <Title>{translations.services.title}</Title>
        <Subtitle>{translations.services.subtitle}</Subtitle>

        <ServicesGrid>
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              isVisible={isVisible}
              index={index}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDesc>{service.description}</ServiceDesc>
              
              <ServiceFeatures>
                {service.features.map((feature, featureIndex) => (
                  <ServiceFeature key={featureIndex}>
                    {feature}
                  </ServiceFeature>
                ))}
              </ServiceFeatures>

              <ServicePrice>
                <PriceText>Price:</PriceText>
                <PriceAmount>{service.price}</PriceAmount>
              </ServicePrice>

              <ServiceButton 
                onClick={() => handleServiceInquiry(service.title)}
              >
                Get Quote
              </ServiceButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;
