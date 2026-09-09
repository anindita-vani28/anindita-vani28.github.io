export type Project = {
  title: string;
  year: string;
  description: string;
  technologies: string[];
};

export const projects: Project[] = [
  {
    title: 'Project One',
    year: '2026',
    description: 'A placeholder for the first case study and its central idea.',
    technologies: ['Design', 'Development'],
  },
  {
    title: 'Project Two',
    year: '2026',
    description: 'A placeholder for another piece of work worth talking about.',
    technologies: ['Creative Coding', '3D'],
  },
];
