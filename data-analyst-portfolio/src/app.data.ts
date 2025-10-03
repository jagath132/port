// Define a type for a single project for better type safety
export type Project = {
  title: string;
  imgSrc: string;
  tags: string[];
  caseStudy: {
    problem: string;
    process: string;
    outcome: string;
  };
};

export type Experience = {
  role: string;
  company: string;
  date: string;
  align: 'left' | 'right';
  points: string[];
}

export const initialTechProficiencies = [
    {
      category: 'AI & Automation',
      icon: 'fas fa-robot text-indigo-500',
      skills: [
        { name: 'Quadratic.ai', icon: 'fas fa-brain' },
        { name: 'UiPath', icon: 'fas fa-cogs' },
        { name: 'Power Automate', icon: 'fas fa-bolt' },
        { name: 'N8N', icon: 'fas fa-sitemap' },
      ]
    },
    {
      category: 'Programming & Databases',
      icon: 'fas fa-code text-emerald-500',
      skills: [
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'SQL', icon: 'fas fa-database' },
        { name: 'MySQL', icon: 'fas fa-database' },
      ]
    },
    {
      category: 'Data & Analytics',
      icon: 'fas fa-chart-pie text-rose-500',
      skills: [
        { name: 'Power BI', icon: 'fas fa-chart-line' },
        { name: 'Tableau', icon: 'fas fa-chart-bar' },
        { name: 'Microsoft Excel', icon: 'fas fa-file-excel' },
      ]
    },
    {
      category: 'Frameworks & Libraries',
      icon: 'fas fa-book-open text-amber-500',
      skills: [
        { name: 'Pandas', icon: 'fas fa-table' },
        { name: 'NumPy', icon: 'fas fa-calculator' },
      ]
    },
    {
      category: 'Testing & Development',
      icon: 'fas fa-tools text-sky-500',
      skills: [
        { name: 'Selenium WebDriver', icon: 'fas fa-vial' },
        { name: 'Power Apps', icon: 'fas fa-mobile-alt' },
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'Visual Studio Code', icon: 'fas fa-code' },
        { name: 'PyCharm', icon: 'fas fa-terminal' },
      ]
    }
  ];

export const initialProjects: Project[] = [
    {
      title: 'Incident Dashboard for SOC Monitoring',
      imgSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      tags: ['Python', 'Power BI', 'Microsoft Excel', 'SQL'],
      caseStudy: {
        problem: 'The Security Operations Center (SOC) team lacked a centralized, real-time view of security incidents, leading to delayed response times and difficulty in identifying threat patterns across disparate systems.',
        process: 'I engineered a data pipeline using SQL to extract and aggregate logs from firewalls, proxies, and endpoints. Using Python (Pandas) for data cleaning and transformation, I structured the data for analysis. The final step was to build an interactive dashboard in Power BI, featuring drill-down capabilities and trend visualizations.',
        outcome: 'Delivered a unified dashboard that reduced incident identification time by 40%. The visualizations helped the SOC team proactively identify recurring threats and strengthen security protocols, leading to a 15% decrease in low-priority alerts.'
      }
    },
    {
      title: 'HR Analytics Dashboard',
      imgSrc: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      tags: ['Python', 'Power BI', 'Microsoft Excel', 'SQL'],
      caseStudy: {
          problem: 'The HR department relied on manual, time-consuming spreadsheet analysis for key metrics like employee attrition and performance, which made strategic workforce planning difficult and reactive.',
          process: 'I consolidated data from multiple Excel sources into a structured dataset. Using Power BI and DAX, I developed key performance indicators (KPIs) for attrition rate, headcount, and performance scores. The final product was an interactive dashboard that allowed HR managers to filter data by department, tenure, and other dimensions.',
          outcome: 'The dashboard provided a clear, real-time view of HR metrics, saving the team approximately 10 hours of manual reporting per week. The insights from the attrition analysis led to a new employee retention strategy, which contributed to a 5% reduction in voluntary turnover in the following quarter.'
      }
    },
  ];

export const initialExperiences: Experience[] = [
     {
      role: 'Data Analyst Intern',
      company: 'Intelizign, Chennai',
      date: 'Jan 2025 - Mar 2025',
      align: 'right',
      points: [
        'Engineered and maintained data pipelines using SQL and Python, transforming raw data into actionable datasets for analysis.',
        'Developed interactive Power BI dashboards that provided key stakeholders with insights into workforce performance and operational efficiency.',
        'Optimized dashboard query performance by 30% through advanced DAX formulas and data model refinements.',
        'Translated complex findings into clear, concise reports that enabled data-driven strategic planning.',
      ],
    },
    {
      role: 'SOC Operation Intern',
      company: 'L&T Technology Services, Chennai',
      date: 'Jul 2024 - Aug 2024',
      align: 'left',
      points: [
        'Conducted real-time threat monitoring and analysis within a fast-paced Security Operations Center (SOC) environment.',
        'Utilized industry-leading SIEM platforms to dissect logs from firewalls, proxies, and endpoints, identifying anomalous patterns indicative of security threats.',
        'Played an active role in the incident investigation process by escalating credible threats and providing detailed analysis to senior team members.',
        'Contributed to the refinement of threat detection workflows, directly helping to strengthen the organization\'s overall security posture.'
      ],
    },
  ];

export const initialCertifications = [
    {
      title: 'Automation Testing',
      authority: 'Tech Veel Edu tech',
      icon: 'fas fa-robot text-indigo-500',
      description: 'Mastered Selenium WebDriver, Appium, and modern testing methodologies for web and mobile applications. Developed expertise in creating automated test scripts and implementing continuous integration practices, gaining comprehensive knowledge in test automation frameworks and tools.'
    },
    {
      title: 'Deloitte Australia Data Analytics Job Simulation',
      authority: 'Forage - June 2025',
      icon: 'fas fa-chart-pie text-blue-500',
      description: 'Completed a comprehensive job simulation with Deloitte, focusing on advanced data analysis and forensic technology. Key accomplishments include creating an interactive Tableau dashboard, using Excel for data classification and statistical analysis, and applying real-world consulting methodologies to solve complex business problems.'
    }
  ];

export const initialHeadlineParts = [
    [
      { text: 'Turning ', class: 'text-gray-900' },
      { text: 'Data', class: 'text-indigo-600' }
    ],
    [
      { text: 'Into ', class: 'text-gray-900' },
      { text: 'Insights', class: 'text-emerald-500' }
    ]
  ];
