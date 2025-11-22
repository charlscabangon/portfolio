import AccordionItem from './AccordionItem';

export default function Accordion() {
  // MOCK
  const items = [
    {
      id: '∞',
      title: 'Frontend Engineer',
      company: 'Apple',
      date: '2028 -  ∞',
      isActive: true,
      content: 'manifest MANIFEST',
    },
    {
      id: 1,
      title: 'Graphic Artist',
      company: 'Freelance',
      date: '2024 - ∞',
      isActive: true,
      content:
        'Creating visual designs for various clients including logos, branding materials, social media graphics, and marketing collateral. Specializing in modern, clean aesthetics with a focus on typography and color theory.',
    },
    {
      id: 2,
      title: 'Intern',
      company: 'Aklan Provincial ICT Office',
      date: 'January 2025 - March 2025',
      isActive: false,
      content:
        'Assisted in developing and maintaining government web applications. Collaborated with senior developers on database management and frontend implementations. Gained hands-on experience with React, Tailwind CSS, and PostgreSQL.',
    },
    {
      id: 3,
      title: 'BS in Computer Science',
      company: 'Garcia College of Technology',
      date: 'August 2021 - May 2025',
      isActive: false,
      content:
        'Comprehensive study of computer science fundamentals including data structures, algorithms, software engineering, and web development. Participated in various hackathons and coding competitions. Graduated with honors.',
    },
  ];

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isFirst={index === 0}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}
