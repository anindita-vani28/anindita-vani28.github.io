export type ExperienceItem = {
  role: string;
  organization: string;
  date: string;
  summary: string;
  highlights: string[];
};

export type ExperienceGroup = {
  id: 'work' | 'academic';
  label: string;
  description: string;
  items: ExperienceItem[];
};

// Keep roles and dates here so the experience section remains easy to update.
export const experienceGroups: ExperienceGroup[] = [
  {
    id: 'work',
    label: 'Work Experience',
    description:
      'Technical growth, student leadership, and community-centered work.',
    items: [
      {
        role: 'AI Fellow',
        organization: 'Cornell Break Through Tech · Remote',
        date: 'May 2026 — May 2027',
        summary:
          'Building applied machine-learning skills through an intensive, industry-connected program.',
        highlights: [
          'Completed Python and machine-learning foundations covering model evaluation and feature engineering.',
          'Developing a capstone before an industry-mentored partner project.',
        ],
      },
      {
        role: 'Resident Advisor',
        organization: 'Residence Life · RIT',
        date: 'Aug 2026 — May 2027',
        summary:
          'Supporting 25 first-year residents as they navigate academic and community life.',
        highlights: [
          'Hold individual check-ins, mediate concerns, and connect residents with support.',
          'Plan community events that help residents feel welcome and involved.',
        ],
      },
      {
        role: 'Orientation Leader',
        organization: 'New Student Orientation · RIT',
        date: 'Aug 2025',
        summary:
          'Helped welcome and guide a group within 200 incoming students during orientation.',
        highlights: [
          'Led activities, answered questions, and supported students through their transition to RIT.',
        ],
      },
    ],
  },
  {
    id: 'academic',
    label: 'Academic Experience',
    description:
      'Teaching support, peer mentorship, and accessible academic communication.',
    items: [
      {
        role: 'CS Course Grader',
        organization: 'Mechanics of Programming · RIT',
        date: 'Jan 2026 — Present',
        summary:
          'Supporting students in a TA-style role through careful code review and feedback.',
        highlights: [
          'Grade programming assignments for correctness, efficiency, and course alignment.',
          'Provide constructive written feedback that helps students improve their code.',
        ],
      },
      {
        role: 'RIT 365 Peer Facilitator',
        organization: 'RIT 365 · Scholarship-supported role',
        date: 'Current',
        summary:
          'Helping students connect, participate, and learn through peer-led conversations.',
        highlights: [
          'Facilitate discussions and create an approachable environment for shared learning.',
        ],
      },
      {
        role: 'Student Note Taker',
        organization: 'Student Access Services · RIT',
        date: 'Aug 2025 — Present',
        summary:
          'Creating clear, well-structured Intro to CS Theory notes for accessible learning.',
        highlights: [
          'Organize detailed course notes to support Deaf and Hard-of-Hearing students.',
        ],
      },
    ],
  },
];
