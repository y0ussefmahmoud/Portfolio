import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const FeedbackSection = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.bgPrimary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

interface FeedbackProps {
  translations: Translations;
}

const Feedback: React.FC<FeedbackProps> = ({ translations }) => {
  return (
    <FeedbackSection id="feedback">
      <Container>
        <h2>{translations.feedback.title}</h2>
        <p>{translations.feedback.subtitle}</p>
        {/* Feedback content will be added */}
      </Container>
    </FeedbackSection>
  );
};

export default Feedback;
