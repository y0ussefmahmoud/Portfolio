import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const EducationSection = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.bgSecondary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

interface EducationProps {
  translations: Translations;
}

const Education: React.FC<EducationProps> = ({ translations }) => {
  return (
    <EducationSection id="education">
      <Container>
        <h2>{translations.education.title}</h2>
        <p>{translations.education.subtitle}</p>
        {/* Education content will be added */}
      </Container>
    </EducationSection>
  );
};

export default Education;
