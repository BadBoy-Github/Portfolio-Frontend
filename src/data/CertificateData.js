const certificates = [
    {
        id: "ai-tools",
        title: "AI Tools",
        imgSrc: "/img/certificates/Be10X.webp",
        company: "be10X",
        logo: "/img/certificates/icons/ai.webp",
        year: "2026",
        technologiesLearned: ["ChatGPT", "Midjourney", "DALL-E", "AI Productivity Tools", "Prompt Engineering"],
        description: "Comprehensive certification in AI tools covering various artificial intelligence applications for productivity and creative work. This certification focuses on leveraging AI tools like ChatGPT for content creation, Midjourney for image generation, and DALL-E for design tasks."
    },
    {
        id: "java",
        title: "Java",
        imgSrc: "/img/certificates/Java.webp",
        company: "SimpliLearn",
        logo: "/img/certificates/icons/java.webp",
        year: "2025",
        technologiesLearned: ["Java", "OOP Concepts", "Collections Framework", "Exception Handling", "Multithreading"],
        description: "Complete Java programming certification covering core and advanced concepts. Learned object-oriented programming principles, data structures, algorithms, and best practices for building robust Java applications."
    },
    {
        id: "bootstrap",
        title: "Bootstrap",
        imgSrc: "/img/certificates/Bootstrap.webp",
        company: "LetsUpgrade",
        logo: "/img/certificates/icons/bootstrap.webp",
        year: "2025",
        technologiesLearned: ["Bootstrap 5", "Responsive Design", "CSS Grid", "Flexbox", "Component Library"],
        description: "Bootstrap framework certification focusing on building responsive, mobile-first websites. Mastered the Bootstrap component library, grid system, and utility classes for rapid UI development."
    },
    {
        id: "react-js",
        title: "React JS",
        imgSrc: "/img/certificates/React JS.webp",
        company: "LetsUpgrade",
        logo: "/img/certificates/icons/react.webp",
        year: "2025",
        technologiesLearned: ["React", "JSX", "React Hooks", "State Management", "Component Architecture"],
        description: "Comprehensive React.js certification covering modern frontend development. Learned component-based architecture, state management with hooks, and best practices for building scalable React applications."
    },
    {
        id: "tailwind-css",
        title: "Tailwind CSS",
        imgSrc: "/img/certificates/Tailwind CSS.webp",
        company: "LetsUpgrade",
        logo: "/img/certificates/icons/tailwind.webp",
        year: "2025",
        technologiesLearned: ["Tailwind CSS", "Utility-First CSS", "Responsive Design", "Custom Configuration", "Dark Mode"],
        description: "Tailwind CSS certification emphasizing utility-first CSS framework for rapid styling. Mastered custom configuration, responsive design patterns, and creating beautiful UIs efficiently."
    },
    {
        id: "html",
        title: "HTML",
        imgSrc: "/img/certificates/HTML1.webp",
        company: "Mimo",
        logo: "/img/certificates/icons/html.webp",
        year: "2024",
        technologiesLearned: ["HTML5", "Semantic HTML", "Accessibility", "SEO Fundamentals", "Forms"],
        description: "HTML5 certification covering modern markup language fundamentals. Learned semantic HTML, document structure, forms, and accessibility best practices for building web pages."
    },
    {
        id: "css",
        title: "CSS",
        imgSrc: "/img/certificates/CSS1.webp",
        company: "Mimo",
        logo: "/img/certificates/icons/css.webp",
        year: "2024",
        technologiesLearned: ["CSS3", "Animations", "Transitions", "Flexbox", "CSS Grid"],
        description: "CSS3 certification covering modern styling techniques. Mastered animations, transitions, flexbox layout, and grid system for creating responsive web designs."
    },
    {
        id: "javascript-learnz",
        title: "JavaScript",
        imgSrc: "/img/certificates/JavaScript1.webp",
        company: "Learnz Development Hub",
        logo: "/img/certificates/icons/javascript.webp",
        year: "2025",
        technologiesLearned: ["JavaScript", "DOM Manipulation", "ES6+ Features", "Async JavaScript", "JSON"],
        description: "JavaScript certification from Learnz Development Hub covering programming fundamentals. Learned JavaScript syntax, DOM manipulation, and modern ES6+ features."
    },
    {
        id: "javascript-letsupgrade",
        title: "JavaScript",
        imgSrc: "/img/certificates/js.webp",
        company: "LetsUpgrade",
        logo: "/img/certificates/icons/javascript.webp",
        year: "2025",
        technologiesLearned: ["JavaScript", "Web Development", "Event Handling", "AJAX", "Local Storage"],
        description: "JavaScript certification from LetsUpgrade focusing on interactive web development. Covered event handling, asynchronous programming, and building dynamic web applications."
    },
    {
        id: "javascript-simplilearn",
        title: "JavaScript",
        imgSrc: "/img/certificates/js1.webp",
        company: "SimpliLearn",
        logo: "/img/certificates/icons/javascript.webp",
        year: "2026",
        technologiesLearned: ["JavaScript", "Advanced Concepts", "Design Patterns", "Testing", "Performance Optimization"],
        description: "Advanced JavaScript certification from SimpliLearn covering professional development practices. Learned design patterns, testing methodologies, and performance optimization techniques."
    },
    {
        id: "wordpress",
        title: "Wordpress",
        imgSrc: "/img/certificates/Wordpress1.webp",
        company: "Coursera",
        logo: "/img/certificates/icons/wordpress.webp",
        year: "2024",
        technologiesLearned: ["WordPress", "CMS", "Theme Development", "Plugin Development", "WooCommerce"],
        description: "WordPress certification from Coursera covering content management system development. Learned theme customization, plugin development, and building e-commerce sites with WooCommerce."
    },
    {
        id: "mern-stack",
        title: "MERN Stack",
        imgSrc: "/img/certificates/MERN Stack.webp",
        company: "SimpliLearn",
        logo: "/img/certificates/icons/mern.webp",
        year: "2025",
        technologiesLearned: ["MongoDB", "Express.js", "React", "Node.js", "RESTful APIs"],
        description: "MERN Stack certification covering full-stack web development. Mastered MongoDB database, Express.js backend, React frontend, and Node.js runtime for building complete web applications."
    },
    {
        id: "full-stack",
        title: "Full Stack",
        imgSrc: "/img/certificates/Full Stack.webp",
        company: "SimpliLearn",
        logo: "/img/certificates/icons/mern.webp",
        year: "2026",
        technologiesLearned: ["Full Stack Development", "Frontend", "Backend", "Database", "DevOps Basics"],
        description: "Full Stack development certification covering end-to-end application development. Learned frontend technologies, backend development, database management, and deployment strategies."
    },
    {
        id: "seo-coursera",
        title: "SEO",
        imgSrc: "/img/certificates/SEO2.webp",
        company: "Coursera",
        logo: "/img/certificates/icons/seo.webp",
        year: "2024",
        technologiesLearned: ["Search Engine Optimization", "Keyword Research", "On-Page SEO", "Off-Page SEO", "Analytics"],
        description: "SEO certification from Coursera covering search engine optimization techniques. Learned keyword research, on-page and off-page optimization, and analytics for improving website visibility."
    },
    {
        id: "seo-programminghub",
        title: "SEO",
        imgSrc: "/img/certificates/SEO1.webp",
        company: "Programming Hub",
        logo: "/img/certificates/icons/seo.webp",
        year: "2025",
        technologiesLearned: ["SEO", "Content Optimization", "Technical SEO", "Link Building", "SEO Tools"],
        description: "SEO certification from Programming Hub focusing on practical optimization strategies. Learned content optimization, technical SEO, and various SEO tools for better search rankings."
    },
    {
        id: "generative-ai",
        title: "Generative AI",
        imgSrc: "/img/certificates/Generative AI.webp",
        company: "Guvi",
        logo: "/img/certificates/icons/ai.webp",
        year: "2024",
        technologiesLearned: ["Generative AI", "LLMs", "Prompt Engineering", "AI Models", "ChatGPT API"],
        description: "Generative AI certification from Guvi covering large language models and AI generation. Learned prompt engineering techniques, API integration, and building AI-powered applications."
    },
    {
        id: "git-github",
        title: "Git & GitHub",
        imgSrc: "/img/certificates/Git & GitHub.webp",
        company: "LetsUpgrade",
        logo: "/img/certificates/icons/github.webp",
        year: "2025",
        technologiesLearned: ["Git", "GitHub", "Version Control", "Branching", "Collaboration"],
        description: "Git & GitHub certification covering version control and collaborative development. Learned Git commands, branching strategies, pull requests, and team collaboration workflows."
    },
    {
        id: "git",
        title: "Git",
        imgSrc: "/img/certificates/Git1.webp",
        company: "Programming Hub",
        logo: "/img/certificates/icons/git.webp",
        year: "2025",
        technologiesLearned: ["Git", "Version Control", "Repository Management", "Conflict Resolution", "Git Workflows"],
        description: "Git certification from Programming Hub focusing on version control fundamentals. Learned repository management, conflict resolution, and various Git workflows for projects."
    },
    {
        id: "frontend-development",
        title: "Frontend Development",
        imgSrc: "/img/certificates/Frontend1.webp",
        company: "SimpliLearn",
        logo: "/img/certificates/icons/frontend.webp",
        year: "2025",
        technologiesLearned: ["HTML", "CSS", "JavaScript", "Responsive Design", "Web Performance"],
        description: "Frontend Development certification covering modern web technologies. Learned HTML5, CSS3, JavaScript, and best practices for building responsive, performant websites."
    },
    {
        id: "python-mimo",
        title: "Python",
        imgSrc: "/img/certificates/Python1.webp",
        company: "Mimo",
        logo: "/img/certificates/icons/python.webp",
        year: "2024",
        technologiesLearned: ["Python", "Syntax", "Data Types", "Functions", "Basic Algorithms"],
        description: "Python certification from Mimo covering programming fundamentals. Learned Python syntax, data types, functions, and basic algorithmic concepts."
    },
    {
        id: "python-dev",
        title: "Python Dev",
        imgSrc: "/img/certificates/Python Dev.webp",
        company: "Mimo",
        logo: "/img/certificates/icons/python.webp",
        year: "2024",
        technologiesLearned: ["Python", "Web Development", "File Handling", "Error Handling", "Libraries"],
        description: "Advanced Python developer certification covering practical applications. Learned web development with Python, file handling, and working with various libraries."
    },
    {
        id: "chatgpt",
        title: "ChatGPT for Everyone",
        imgSrc: "/img/certificates/ChatGPT1.webp",
        company: "Guvi",
        logo: "/img/certificates/icons/chatgpt.webp",
        year: "2024",
        technologiesLearned: ["ChatGPT", "AI Assistants", "Prompt Engineering", "Productivity", "Automation"],
        description: "ChatGPT certification from Guvi covering AI assistant usage. Learned prompt engineering, productivity tips, and using AI for various personal and professional tasks."
    },
    {
        id: "tech-career",
        title: "Tech Career Kickstart",
        imgSrc: "/img/certificates/techcareer1.webp",
        company: "SimpliLearn",
        logo: "/img/certificates/icons/techcareer.webp",
        year: "2025",
        technologiesLearned: ["Career Planning", "Resume Building", "Interview Prep", "Portfolio Development", "Industry Trends"],
        description: "Tech Career certification covering professional development. Learned resume building, interview preparation, portfolio development, and staying updated with industry trends."
    },
    {
        id: "canva",
        title: "Canva",
        imgSrc: "/img/certificates/Canva1.webp",
        company: "LetsUpgrade",
        logo: "/img/certificates/icons/canva.webp",
        year: "2025",
        technologiesLearned: ["Canva", "Graphic Design", "Social Media Graphics", "Presentations", "Brand Design"],
        description: "Canva certification covering graphic design fundamentals. Learned creating social media graphics, presentations, and brand identity materials using Canva."
    },
    {
        id: "canva-video",
        title: "Video Editing with Canva",
        imgSrc: "/img/certificates/Canva Video.webp",
        company: "Coursera",
        logo: "/img/certificates/icons/videoediting.webp",
        year: "2024",
        technologiesLearned: ["Canva Video", "Video Editing", "Motion Graphics", "Animations", "Social Media Videos"],
        description: "Video editing certification with Canva covering visual content creation. Learned video editing techniques, motion graphics, and creating engaging video content."
    },
    {
        id: "social-media",
        title: "Social Media Management",
        imgSrc: "/img/certificates/Social Media Management.webp",
        company: "Great Learning",
        logo: "/img/certificates/icons/socialmedia.webp",
        year: "2024",
        technologiesLearned: ["Social Media Strategy", "Content Planning", "Analytics", "Community Management", "Brand Presence"],
        description: "Social Media Management certification from Great Learning covering strategic planning. Learned content strategy, analytics, community management, and building brand presence."
    },
    {
        id: "digital-marketing",
        title: "Digital Marketing Fundamentals",
        imgSrc: "/img/certificates/Digital Marketing Fundamentals.webp",
        company: "IIDE The Digital School",
        logo: "/img/certificates/icons/marketing.webp",
        year: "2025",
        technologiesLearned: ["Digital Marketing", "SEO", "SEM", "Email Marketing", "Content Marketing"],
        description: "Digital Marketing certification covering online marketing strategies. Learned SEO, search engine marketing, email marketing, and content marketing fundamentals."
    },
    {
        id: "business-analysis",
        title: "Business Analysis",
        imgSrc: "/img/certificates/Business Analysis.webp",
        company: "Coursera",
        logo: "/img/certificates/icons/analysis.webp",
        year: "2025",
        technologiesLearned: ["Business Analysis", "Requirements Gathering", "Data Analysis", "Process Modeling", "Stakeholder Management"],
        description: "Business Analysis certification from Coursera covering analytical methodologies. Learned requirements gathering, data analysis, and stakeholder management for business projects."
    },
    {
        id: "irm",
        title: "Investment Risk Management",
        imgSrc: "/img/certificates/IRM1.webp",
        company: "Coursera",
        logo: "/img/certificates/icons/irm.webp",
        year: "2024",
        technologiesLearned: ["Risk Management", "Investment Analysis", "Portfolio Management", "Financial Modeling", "Assessment"],
        description: "Investment Risk Management certification covering financial risk assessment. Learned investment analysis, portfolio management, and risk evaluation techniques."
    },
    {
        id: "power-bi",
        title: "Power BI",
        imgSrc: "/img/certificates/Power BI.webp",
        company: "Great Learning",
        logo: "/img/certificates/icons/powerbi.webp",
        year: "2024",
        technologiesLearned: ["Power BI", "Data Visualization", "DAX", "Dashboard Creation", "Data Analysis"],
        description: "Power BI certification covering business intelligence and data visualization. Learned creating interactive dashboards, DAX formulas, and data analysis using Power BI."
    },
    {
        id: "excel-intro",
        title: "Introduction to Microsoft Excel",
        imgSrc: "/img/certificates/Excel2.webp",
        company: "Coursera",
        logo: "/img/certificates/icons/excel.webp",
        year: "2024",
        technologiesLearned: ["Microsoft Excel", "Spreadsheets", "Formulas", "Charts", "Data Entry"],
        description: "Introduction to Microsoft Excel covering spreadsheet fundamentals. Learned formulas, charts, data entry, and basic data manipulation in Excel."
    },
    {
        id: "excel-letsupgrade",
        title: "Excel",
        imgSrc: "/img/certificates/Excel1.webp",
        company: "LetsUpgrade",
        logo: "/img/certificates/icons/excel.webp",
        year: "2025",
        technologiesLearned: ["Excel", "Advanced Formulas", "Pivot Tables", "Macros", "Data Analysis"],
        description: "Excel certification from LetsUpgrade covering advanced spreadsheet skills. Learned advanced formulas, pivot tables, macros, and data analysis techniques."
    },
    {
        id: "excel-data-analysis",
        title: "Excel Data Analysis",
        imgSrc: "/img/certificates/Excel Data Analysis.webp",
        company: "Coursera",
        logo: "/img/certificates/icons/data analysis.webp",
        year: "2024",
        technologiesLearned: ["Excel", "Data Analysis", "Statistical Functions", "Data Visualization", "Reporting"],
        description: "Excel Data Analysis certification covering analytical techniques. Learned statistical functions, data visualization, and creating meaningful reports from data."
    },
    {
        id: "google-ads",
        title: "Google Ads for Beginners",
        imgSrc: "/img/certificates/Google Ads.webp",
        company: "Coursera",
        logo: "/img/certificates/icons/googleads.webp",
        year: "2024",
        technologiesLearned: ["Google Ads", "PPC Advertising", "Campaign Management", "Keyword Bidding", "Ad Optimization"],
        description: "Google Ads certification covering pay-per-click advertising. Learned campaign setup, keyword bidding, ad optimization, and measuring advertising performance."
    },
    {
        id: "video-editing",
        title: "Video Editing",
        imgSrc: "/img/certificates/Video Editing.webp",
        company: "Great Learning",
        logo: "/img/certificates/icons/videoediting.webp",
        year: "2024",
        technologiesLearned: ["Video Editing", "Transitions", "Color Grading", "Sound Design", "Export"],
        description: "Video Editing certification covering post-production techniques. Learned transitions, color grading, sound design, and exporting videos for various platforms."
    }
];

export { certificates };
