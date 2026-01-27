import React from 'react';
import { motion } from 'framer-motion';
import type { Translations } from '@/i18n/translations';

interface AboutProps {
  translations: Translations;
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const About: React.FC<AboutProps> = ({ translations }) => {
  return (
    <section id="about" className="bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {translations.about.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg max-w-3xl mx-auto">
            {translations.about.bio}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
