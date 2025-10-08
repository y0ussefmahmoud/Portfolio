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
`;

interface ContactProps {
  translations: Translations;
}

const Contact: React.FC<ContactProps> = ({ translations }) => {
  return (
    <ContactSection id="contact">
      <Container>
        <h2>{translations.contact.title}</h2>
        <p>{translations.contact.subtitle}</p>
        {/* Contact form will be added */}
      </Container>
    </ContactSection>
  );
};

export default Contact;
