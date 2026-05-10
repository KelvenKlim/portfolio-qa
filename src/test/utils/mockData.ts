/**
 * Mock data for tests
 * Centralized location for reusable test data
 */

export const mockTranslations = {
  nav: {
    about: 'About',
    services: 'Services',
    impact: 'Impact',
    techStack: 'Tech Stack',
    testimonials: 'Testimonials',
    contact: 'Contact',
  },
  hero: {
    title: 'Engineering Quality Beyond Testing.',
    subtitle: 'Strategic QA for Fintechs',
    text: 'Quality engineering description',
    cta1: 'Talk to me',
    cta2: 'View services',
  },
  about: {
    label: 'About',
    title: 'Strategic Vision',
    p1: 'Paragraph 1',
    p2: 'Paragraph 2',
    p3: 'Paragraph 3',
    highlights: [
      { value: '5+', label: 'Years in QA' },
      { value: 'AI', label: 'Applied to QA' },
    ],
  },
};

export const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  role: 'QA Engineer',
};

export const mockNavLinks = [
  { key: 'about', href: '#about', label: 'About' },
  { key: 'services', href: '#services', label: 'Services' },
  { key: 'contact', href: '#contact', label: 'Contact' },
];
