const certificates = [
    {
        id: "ai-tools",
        title: "AI Tools",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423456/Be10X_ji6nux.webp",
        company: "be10X",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/ai_gqzbmi.webp",
        year: "2026",
        technologiesLearned: ["ChatGPT", "Midjourney", "DALL-E", "AI Productivity Tools", "Prompt Engineering"],
        description: "Comprehensive certification in AI tools covering various artificial intelligence applications for productivity and creative work. This certification focuses on leveraging AI tools like ChatGPT for content creation, Midjourney for image generation, and DALL-E for design tasks."
    },
    {
        id: "java",
        title: "Java",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423473/Java_palekh.webp",
        company: "SimpliLearn",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434470/java_hxpga9.webp",
        year: "2025",
        technologiesLearned: ["Java", "OOP Concepts", "Collections Framework", "Exception Handling", "Multithreading"],
        description: "Complete Java programming certification covering core and advanced concepts. Learned object-oriented programming principles, data structures, algorithms, and best practices for building robust Java applications."
    },
    {
        id: "bootstrap",
        title: "Bootstrap",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423456/Bootstrap_hoigmr.webp",
        company: "LetsUpgrade",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/bootstrap_qmwh5f.webp",
        year: "2025",
        technologiesLearned: ["Bootstrap 5", "Responsive Design", "CSS Grid", "Flexbox", "Component Library"],
        description: "Bootstrap framework certification focusing on building responsive, mobile-first websites. Mastered the Bootstrap component library, grid system, and utility classes for rapid UI development."
    },
    {
        id: "react-js",
        title: "React JS",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423487/React_JS_wsmi1j.webp",
        company: "LetsUpgrade",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434475/react_gnucsa.webp",
        year: "2025",
        technologiesLearned: ["React", "JSX", "React Hooks", "State Management", "Component Architecture"],
        description: "Comprehensive React.js certification covering modern frontend development. Learned component-based architecture, state management with hooks, and best practices for building scalable React applications."
    },
    {
        id: "tailwind-css",
        title: "Tailwind CSS",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423494/Tailwind_CSS_o4iugc.webp",
        company: "LetsUpgrade",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434476/tailwind_r5wge9.webp",
        year: "2025",
        technologiesLearned: ["Tailwind CSS", "Utility-First CSS", "Responsive Design", "Custom Configuration", "Dark Mode"],
        description: "Tailwind CSS certification emphasizing utility-first CSS framework for rapid styling. Mastered custom configuration, responsive design patterns, and creating beautiful UIs efficiently."
    },
    {
        id: "html",
        title: "HTML",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423470/HTML1_bi5gxq.webp",
        company: "Mimo",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434457/html_dwujyf.webp",
        year: "2024",
        technologiesLearned: ["HTML5", "Semantic HTML", "Accessibility", "SEO Fundamentals", "Forms"],
        description: "HTML5 certification covering modern markup language fundamentals. Learned semantic HTML, document structure, forms, and accessibility best practices for building web pages."
    },
    {
        id: "css",
        title: "CSS",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423457/CSS1_c9a6qx.webp",
        company: "Mimo",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/css_qhlggt.webp",
        year: "2024",
        technologiesLearned: ["CSS3", "Animations", "Transitions", "Flexbox", "CSS Grid"],
        description: "CSS3 certification covering modern styling techniques. Mastered animations, transitions, flexbox layout, and grid system for creating responsive web designs."
    },
    {
        id: "javascript-learnz",
        title: "JavaScript",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423473/JavaScript1_mkmft4.webp",
        company: "Learnz Development Hub",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434470/javascript_fvnrqr.webp",
        year: "2025",
        technologiesLearned: ["JavaScript", "DOM Manipulation", "ES6+ Features", "Async JavaScript", "JSON"],
        description: "JavaScript certification from Learnz Development Hub covering programming fundamentals. Learned JavaScript syntax, DOM manipulation, and modern ES6+ features."
    },
    {
        id: "javascript-letsupgrade",
        title: "JavaScript",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423476/js_oe777u.webp",
        company: "LetsUpgrade",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434470/javascript_fvnrqr.webp",
        year: "2025",
        technologiesLearned: ["JavaScript", "Web Development", "Event Handling", "AJAX", "Local Storage"],
        description: "JavaScript certification from LetsUpgrade focusing on interactive web development. Covered event handling, asynchronous programming, and building dynamic web applications."
    },
    {
        id: "javascript-simplilearn",
        title: "JavaScript",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423478/js1_yboegq.webp",
        company: "SimpliLearn",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434470/javascript_fvnrqr.webp",
        year: "2026",
        technologiesLearned: ["JavaScript", "Advanced Concepts", "Design Patterns", "Testing", "Performance Optimization"],
        description: "Advanced JavaScript certification from SimpliLearn covering professional development practices. Learned design patterns, testing methodologies, and performance optimization techniques."
    },
    {
        id: "wordpress",
        title: "Wordpress",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423501/Wordpress1_rxc0ie.webp",
        company: "Coursera",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434481/wordpress_d5qwmo.webp",
        year: "2024",
        technologiesLearned: ["WordPress", "CMS", "Theme Development", "Plugin Development", "WooCommerce"],
        description: "WordPress certification from Coursera covering content management system development. Learned theme customization, plugin development, and building e-commerce sites with WooCommerce."
    },
    {
        id: "mern-stack",
        title: "MERN Stack",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423479/MERN_Stack_aovxux.webp",
        company: "SimpliLearn",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434470/mern_zse1dy.webp",
        year: "2025",
        technologiesLearned: ["MongoDB", "Express.js", "React", "Node.js", "RESTful APIs"],
        description: "MERN Stack certification covering full-stack web development. Mastered MongoDB database, Express.js backend, React frontend, and Node.js runtime for building complete web applications."
    },
    {
        id: "full-stack",
        title: "Full Stack",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423463/Full_Stack_plxjrh.webp",
        company: "SimpliLearn",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434470/mern_zse1dy.webp",
        year: "2026",
        technologiesLearned: ["Full Stack Development", "Frontend", "Backend", "Database", "DevOps Basics"],
        description: "Full Stack development certification covering end-to-end application development. Learned frontend technologies, backend development, database management, and deployment strategies."
    },
    {
        id: "seo-coursera",
        title: "SEO",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423492/SEO2_wcydao.webp",
        company: "Coursera",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434475/seo_hewd33.webp",
        year: "2024",
        technologiesLearned: ["Search Engine Optimization", "Keyword Research", "On-Page SEO", "Off-Page SEO", "Analytics"],
        description: "SEO certification from Coursera covering search engine optimization techniques. Learned keyword research, on-page and off-page optimization, and analytics for improving website visibility."
    },
    {
        id: "seo-programminghub",
        title: "SEO",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423491/SEO1_bfzdt6.webp",
        company: "Programming Hub",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434475/seo_hewd33.webp",
        year: "2025",
        technologiesLearned: ["SEO", "Content Optimization", "Technical SEO", "Link Building", "SEO Tools"],
        description: "SEO certification from Programming Hub focusing on practical optimization strategies. Learned content optimization, technical SEO, and various SEO tools for better search rankings."
    },
    {
        id: "generative-ai",
        title: "Generative AI",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423465/Generative_AI_dlsf6d.webp",
        company: "Guvi",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/ai_gqzbmi.webp",
        year: "2024",
        technologiesLearned: ["Generative AI", "LLMs", "Prompt Engineering", "AI Models", "ChatGPT API"],
        description: "Generative AI certification from Guvi covering large language models and AI generation. Learned prompt engineering techniques, API integration, and building AI-powered applications."
    },
    {
        id: "git-github",
        title: "Git & GitHub",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423466/Git_GitHub_o0trwo.webp",
        company: "LetsUpgrade",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434457/github_kbsa0m.webp",
        year: "2025",
        technologiesLearned: ["Git", "GitHub", "Version Control", "Branching", "Collaboration"],
        description: "Git & GitHub certification covering version control and collaborative development. Learned Git commands, branching strategies, pull requests, and team collaboration workflows."
    },
    {
        id: "git",
        title: "Git",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423467/Git1_lxuyuh.webp",
        company: "Programming Hub",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434457/git_arftg5.webp",
        year: "2025",
        technologiesLearned: ["Git", "Version Control", "Repository Management", "Conflict Resolution", "Git Workflows"],
        description: "Git certification from Programming Hub focusing on version control fundamentals. Learned repository management, conflict resolution, and various Git workflows for projects."
    },
    {
        id: "frontend-development",
        title: "Frontend Development",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423462/Frontend1_t8eqcv.webp",
        company: "SimpliLearn",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/frontend_sobuut.webp",
        year: "2025",
        technologiesLearned: ["HTML", "CSS", "JavaScript", "Responsive Design", "Web Performance"],
        description: "Frontend Development certification covering modern web technologies. Learned HTML5, CSS3, JavaScript, and best practices for building responsive, performant websites."
    },
    {
        id: "python-mimo",
        title: "Python",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423485/Python1_yiywkm.webp",
        company: "Mimo",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434475/python_vcladc.webp",
        year: "2024",
        technologiesLearned: ["Python", "Syntax", "Data Types", "Functions", "Basic Algorithms"],
        description: "Python certification from Mimo covering programming fundamentals. Learned Python syntax, data types, functions, and basic algorithmic concepts."
    },
    {
        id: "python-dev",
        title: "Python Dev",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423484/Python_Dev_qr346w.webp",
        company: "Mimo",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434475/python_vcladc.webp",
        year: "2024",
        technologiesLearned: ["Python", "Web Development", "File Handling", "Error Handling", "Libraries"],
        description: "Advanced Python developer certification covering practical applications. Learned web development with Python, file handling, and working with various libraries."
    },
    {
        id: "chatgpt",
        title: "ChatGPT for Everyone",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423457/ChatGPT1_tlizxd.webp",
        company: "Guvi",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434457/chatgpt_seyh9r.webp",
        year: "2024",
        technologiesLearned: ["ChatGPT", "AI Assistants", "Prompt Engineering", "Productivity", "Automation"],
        description: "ChatGPT certification from Guvi covering AI assistant usage. Learned prompt engineering, productivity tips, and using AI for various personal and professional tasks."
    },
    {
        id: "tech-career",
        title: "Tech Career Kickstart",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423499/techcareer1_tpysbj.webp",
        company: "SimpliLearn",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434476/techcareer_lbizkj.webp",
        year: "2025",
        technologiesLearned: ["Career Planning", "Resume Building", "Interview Prep", "Portfolio Development", "Industry Trends"],
        description: "Tech Career certification covering professional development. Learned resume building, interview preparation, portfolio development, and staying updated with industry trends."
    },
    {
        id: "canva",
        title: "Canva",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423457/Canva1_zoc2lc.webp",
        company: "LetsUpgrade",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/canva_sfewqn.webp",
        year: "2025",
        technologiesLearned: ["Canva", "Graphic Design", "Social Media Graphics", "Presentations", "Brand Design"],
        description: "Canva certification covering graphic design fundamentals. Learned creating social media graphics, presentations, and brand identity materials using Canva."
    },
    {
        id: "canva-video",
        title: "Video Editing with Canva",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423456/Canva_Video_oqng8n.webp",
        company: "Coursera",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434476/videoediting_tcrm6m.webp",
        year: "2024",
        technologiesLearned: ["Canva Video", "Video Editing", "Motion Graphics", "Animations", "Social Media Videos"],
        description: "Video editing certification with Canva covering visual content creation. Learned video editing techniques, motion graphics, and creating engaging video content."
    },
    {
        id: "social-media",
        title: "Social Media Management",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423492/Social_Media_Management_qz1tsn.webp",
        company: "Great Learning",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434475/socialmedia_cky3hq.webp",
        year: "2024",
        technologiesLearned: ["Social Media Strategy", "Content Planning", "Analytics", "Community Management", "Brand Presence"],
        description: "Social Media Management certification from Great Learning covering strategic planning. Learned content strategy, analytics, community management, and building brand presence."
    },
    {
        id: "digital-marketing",
        title: "Digital Marketing Fundamentals",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423458/Digital_Marketing_Fundamentals_grwmik.webp",
        company: "IIDE The Digital School",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434470/marketing_vxzddh.webp",
        year: "2025",
        technologiesLearned: ["Digital Marketing", "SEO", "SEM", "Email Marketing", "Content Marketing"],
        description: "Digital Marketing certification covering online marketing strategies. Learned SEO, search engine marketing, email marketing, and content marketing fundamentals."
    },
    {
        id: "business-analysis",
        title: "Business Analysis",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423456/Business_Analysis_m9axqu.webp",
        company: "Coursera",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/analysis_zgqkjr.webp",
        year: "2025",
        technologiesLearned: ["Business Analysis", "Requirements Gathering", "Data Analysis", "Process Modeling", "Stakeholder Management"],
        description: "Business Analysis certification from Coursera covering analytical methodologies. Learned requirements gathering, data analysis, and stakeholder management for business projects."
    },
    {
        id: "irm",
        title: "Investment Risk Management",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423471/IRM1_d4aboc.webp",
        company: "Coursera",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434470/irm_toghhz.webp",
        year: "2024",
        technologiesLearned: ["Risk Management", "Investment Analysis", "Portfolio Management", "Financial Modeling", "Assessment"],
        description: "Investment Risk Management certification covering financial risk assessment. Learned investment analysis, portfolio management, and risk evaluation techniques."
    },
    {
        id: "power-bi",
        title: "Power BI",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423481/Power_BI_qe1f47.webp",
        company: "Great Learning",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434471/powerbi_oo0rvt.webp",
        year: "2024",
        technologiesLearned: ["Power BI", "Data Visualization", "DAX", "Dashboard Creation", "Data Analysis"],
        description: "Power BI certification covering business intelligence and data visualization. Learned creating interactive dashboards, DAX formulas, and data analysis using Power BI."
    },
    {
        id: "excel-intro",
        title: "Introduction to Microsoft Excel",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423461/Excel2_zqlckt.webp",
        company: "Coursera",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/excel_minug7.webp",
        year: "2024",
        technologiesLearned: ["Microsoft Excel", "Spreadsheets", "Formulas", "Charts", "Data Entry"],
        description: "Introduction to Microsoft Excel covering spreadsheet fundamentals. Learned formulas, charts, data entry, and basic data manipulation in Excel."
    },
    {
        id: "excel-letsupgrade",
        title: "Excel",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423460/Excel1_vvflgu.webp",
        company: "LetsUpgrade",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/excel_minug7.webp",
        year: "2025",
        technologiesLearned: ["Excel", "Advanced Formulas", "Pivot Tables", "Macros", "Data Analysis"],
        description: "Excel certification from LetsUpgrade covering advanced spreadsheet skills. Learned advanced formulas, pivot tables, macros, and data analysis techniques."
    },
    {
        id: "excel-data-analysis",
        title: "Excel Data Analysis",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423459/Excel_Data_Analysis_lpaxa4.webp",
        company: "Coursera",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/data_analysis_jifiuv.webp",
        year: "2024",
        technologiesLearned: ["Excel", "Data Analysis", "Statistical Functions", "Data Visualization", "Reporting"],
        description: "Excel Data Analysis certification covering analytical techniques. Learned statistical functions, data visualization, and creating meaningful reports from data."
    },
    {
        id: "google-ads",
        title: "Google Ads for Beginners",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423468/Google_Ads_hiliee.webp",
        company: "Coursera",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434457/googleads_i4ueko.webp",
        year: "2024",
        technologiesLearned: ["Google Ads", "PPC Advertising", "Campaign Management", "Keyword Bidding", "Ad Optimization"],
        description: "Google Ads certification covering pay-per-click advertising. Learned campaign setup, keyword bidding, ad optimization, and measuring advertising performance."
    },
    {
        id: "video-editing",
        title: "Video Editing",
        imgSrc: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774423500/Video_Editing_vwqkw1.webp",
        company: "Great Learning",
        logo: "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434476/videoediting_tcrm6m.webp",
        year: "2024",
        technologiesLearned: ["Video Editing", "Transitions", "Color Grading", "Sound Design", "Export"],
        description: "Video Editing certification covering post-production techniques. Learned transitions, color grading, sound design, and exporting videos for various platforms."
    }
];

export { certificates };
