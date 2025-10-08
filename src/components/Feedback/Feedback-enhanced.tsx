import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Translations } from '../../i18n/translations';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeedbackSection = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.bgPrimary};
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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div<{ isVisible: boolean }>`
  background: ${props => props.theme.colors.bgSecondary};
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  transition: all 0.3s ease;
  animation: ${props => props.isVisible ? fadeIn : 'none'} 0.6s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px ${props => props.theme.colors.shadow};
  }
  
  &::before {
    content: '"';
    position: absolute;
    top: -0.5rem;
    left: 1.5rem;
    font-size: 4rem;
    color: ${props => props.theme.colors.primary};
    font-family: serif;
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  color: ${props => props.theme.colors.textPrimary};
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
  position: relative;
  z-index: 1;
`;

const TestimonialFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
`;

const TestimonialInfo = styled.div`
  flex: 1;
`;

const ClientName = styled.h4`
  color: ${props => props.theme.colors.textPrimary};
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`;

const ClientRole = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const Star = styled.span`
  color: #fbbf24;
  font-size: 1rem;
`;

const StatsSection = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  background: ${props => props.theme.colors.bgSecondary};
  border-radius: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  padding: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

interface FeedbackProps {
  translations: Translations;
}

const Feedback: React.FC<FeedbackProps> = ({ translations }) => {
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

    const section = document.getElementById('feedback');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const testimonialsData = [
    {
      id: 1,
      text: translations.feedback.t1.text,
      name: 'Ahmed Hassan',
      role: translations.feedback.t1.role,
      avatar: 'A',
      rating: 5
    },
    {
      id: 2,
      text: translations.feedback.t2.text,
      name: 'Sarah Mohamed',
      role: translations.feedback.t2.role,
      avatar: 'S',
      rating: 5
    },
    {
      id: 3,
      text: translations.feedback.t3.text,
      name: 'Omar Ali',
      role: translations.feedback.t3.role,
      avatar: 'O',
      rating: 5
    }
  ];

  const statsData = [
    { number: '15+', label: 'Projects Completed' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '2+', label: 'Years Experience' },
    { number: '24/7', label: 'Support Available' }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index}>
        {index < rating ? '★' : '☆'}
      </Star>
    ));
  };

  return (
    <FeedbackSection id="feedback">
      <Container>
        <Title>{translations.feedback.title}</Title>
        <Subtitle>{translations.feedback.subtitle}</Subtitle>

        <TestimonialsGrid>
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              isVisible={isVisible}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <TestimonialText>{testimonial.text}</TestimonialText>
              <TestimonialFooter>
                <Avatar>{testimonial.avatar}</Avatar>
                <TestimonialInfo>
                  <ClientName>{testimonial.name}</ClientName>
                  <ClientRole>{testimonial.role}</ClientRole>
                  <Rating>
                    {renderStars(testimonial.rating)}
                  </Rating>
                </TestimonialInfo>
              </TestimonialFooter>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>

        <StatsSection>
          <StatsGrid>
            {statsData.map((stat, index) => (
              <StatItem key={index}>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsGrid>
        </StatsSection>
      </Container>
    </FeedbackSection>
  );
};

export default Feedback;
