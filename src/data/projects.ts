import pawpalCover from '../assets/pawpal-cover.webp';

export type Project = {
  title: string;
  year: string;
  description: string;
  technologies: string[];
  href?: string;
  image?: string;
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    title: 'PawPal AI Care Assistant',
    year: '2026',
    description:
      'An AI-powered pet-care planner combining task scheduling, retrieval-augmented guidance, safety guardrails, confidence scoring, and reliability testing.',
    technologies: ['Python', 'Streamlit', 'RAG', 'AI Guardrails', 'Pytest'],
    href: 'https://github.com/anindita-vani28/pawpal-ai-care-assistant',
    image: pawpalCover,
    imageAlt: 'A dog, cat, and rabbit together in an energetic studio portrait',
  },
  {
    title: 'Project Two',
    year: '2026',
    description: 'A placeholder for another piece of work worth talking about.',
    technologies: ['Creative Coding', '3D'],
  },
];
