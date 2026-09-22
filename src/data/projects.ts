import pawpalCover from '../assets/pawpal-cover.webp';
import studentlifeCover from '../assets/studentlife-cover.jpg';

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
    title: 'Student Life Tracer App',
    year: '2026',
    description:
      'An all-in-one student productivity platform for managing courses, tasks, habits, expenses, mood, and academic progress with personalized AI recommendations.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'AI'],
    href: 'https://github.com/anindita-vani28/studentlife-tracer-app',
    image: studentlifeCover,
    imageAlt:
      'A student productivity dashboard displayed on a laptop at a bright university study desk',
  },
];
