// server.js
import fs from "fs";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load data.json
const raw = fs.readFileSync("./data/data.json", "utf-8");
const data = JSON.parse(raw);

// Use a FREE model that doesn't require API key - Google's Flan-T5
const HF_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large";

// Create comprehensive context from your data
function createContext() {
    let context = `You are Elayabarathi M V's portfolio chatbot. Here's the information:\n\n`;

    // Basic info
    context += `PERSONAL INFO:\n`;
    context += `- Name: ${data.name}\n`;
    context += `- Headline: ${data.headline}\n`;
    context += `- Tagline: ${data.oneline}\n`;
    context += `- About: ${data.about}\n\n`;

    // Contact info
    context += `CONTACT:\n`;
    Object.entries(data.contact).forEach(([key, value]) => {
        context += `- ${key}: ${value}\n`;
    });
    context += `\n`;

    // Skills - formatted for better understanding
    context += `TECHNICAL SKILLS:\n`;
    if (Array.isArray(data.skills) && data.skills.length > 0) {
        const skillsObj = data.skills[0];

        context += `FULLSTACK DEVELOPMENT:\n`;
        const fullstack = skillsObj["fullstack web developer"];
        Object.entries(fullstack).forEach(([category, items]) => {
            context += `- ${category}: ${items.join(", ")}\n`;
        });
        context += `\n`;

        context += `BIOTECHNOLOGY:\n`;
        const biotech = skillsObj["biotechnologist"];
        Object.entries(biotech).forEach(([category, items]) => {
            context += `- ${category}: ${items.join(", ")}\n`;
        });
        context += `\n`;

        context += `OTHER SKILLS:\n`;
        const other = skillsObj["other skills"];
        Object.entries(other).forEach(([category, items]) => {
            context += `- ${category}: ${items.join(", ")}\n`;
        });
    }
    context += `\n`;

    // Projects - highlight key ones
    context += `KEY PROJECTS:\n`;
    data.projects.slice(0, 8).forEach((project) => {
        context += `- ${project.name}: ${project.description}\n`;
        if (project.link && project.link !== "#") context += `  Live Demo: ${project.link}\n`;
        if (project.github && project.github !== "#") context += `  Code: ${project.github}\n`;
        context += `  Technologies: ${project.skills.slice(0, 5).join(", ")}\n\n`;
    });

    // Experience
    context += `PROFESSIONAL EXPERIENCE:\n`;
    data.experience.forEach((exp) => {
        context += `- ${exp.position} at ${exp.company} (${exp.duration})\n`;
        context += `  ${exp.details}\n`;
        if (exp.skills.length > 0) context += `  Skills used: ${exp.skills.join(", ")}\n`;
        context += `\n`;
    });

    // Education
    context += `EDUCATION:\n`;
    data.education.forEach((edu) => {
        context += `- ${edu.education} from ${edu.institution} (${edu.year})\n`;
        context += `  Grade: ${edu.percentage}\n`;
        context += `  ${edu.description}\n`;
        context += `  Relevant skills: ${edu.skills.join(", ")}\n\n`;
    });

    return context;
}

const portfolioContext = createContext();
console.log("✅ Portfolio context loaded successfully");

// Enhanced prompt template for better responses
function createPrompt(question) {
    const prompt = `Answer the following question about Elayabarathi M V based on the context below. Provide a detailed, helpful response of 50-100 words.

CONTEXT:
${portfolioContext}

QUESTION: ${question}

INSTRUCTIONS:
- Be friendly and professional
- Use specific examples from the context
- Mention technologies and projects when relevant
- Keep responses informative but concise

ANSWER:`;

    return prompt;
}

// Hugging Face API call with retry logic
async function askHuggingFace(question) {
    const prompt = createPrompt(question);

    const maxRetries = 2;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            console.log(`🔄 Attempt ${retries + 1} to call Hugging Face...`);

            const response = await fetch(HF_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // No authorization header needed for this model
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 150,
                        temperature: 0.7,
                        top_p: 0.9,
                        do_sample: true
                    },
                    options: {
                        use_cache: true,
                        wait_for_model: false // Don't wait if model is loading
                    }
                }),
            });

            if (response.status === 503) {
                // Model is loading
                console.log(`⏳ Model is loading, retry ${retries + 1}/${maxRetries}`);
                await new Promise(resolve => setTimeout(resolve, 3000));
                retries++;
                continue;
            }

            if (response.status === 429) {
                // Rate limited
                console.log(`⏳ Rate limited, retry ${retries + 1}/${maxRetries}`);
                await new Promise(resolve => setTimeout(resolve, 5000));
                retries++;
                continue;
            }

            if (!response.ok) {
                console.log(`❌ HTTP error: ${response.status}`);
                // If we get auth error, use fallback immediately
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Authentication failed - using fallback");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            // Extract the generated text
            let answer = result[0]?.generated_text || "I'd be happy to tell you more about my background and skills!";

            // Clean up the response
            answer = answer.trim();

            // Ensure minimum length
            if (answer.split(' ').length < 15) {
                answer = enhanceShortResponse(question, answer);
            }

            console.log(`✅ Successfully generated response`);
            return answer;

        } catch (error) {
            console.error(`❌ Attempt ${retries + 1} failed:`, error.message);
            retries++;

            if (retries === maxRetries) {
                throw error;
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

// Enhance short responses with more detail
function enhanceShortResponse(question, shortAnswer) {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes("skill") || lowerQuestion.includes("technology")) {
        return `${shortAnswer} I have comprehensive skills in full-stack web development including React, JavaScript, Python, Flask, and various modern frameworks. I'm also experienced in biotechnology with expertise in microbiology, genetic engineering, and nanobiotechnology. I'm always learning new technologies and applying them to real-world projects.`;
    }

    if (lowerQuestion.includes("project")) {
        return `${shortAnswer} Some of my notable projects include Bamboo Blogs (a Flask-based blog platform), Spotify Clone (with React), LinkedIn Profile Clone, Budget Map (AI finance tool), and several eCommerce applications. Each project demonstrates different aspects of my technical skills and problem-solving abilities.`;
    }

    if (lowerQuestion.includes("experience") || lowerQuestion.includes("intern")) {
        return `${shortAnswer} I've gained practical experience through web development internships at Corizo Edutech and biotechnology internships at Elies Biotech. I'm currently enhancing my Java fullstack skills through training at QSpider.`;
    }

    return `${shortAnswer} I'd be happy to provide more details about my background, skills, projects, or experience. What specific area would you like to know more about?`;
}

// Store conversation history
const conversationHistory = new Map();

// Chat endpoint
app.post("/api/chat", async (req, res) => {
    let currentQuestion = ""; // Define question variable at function scope

    try {
        const { question, sessionId = "default" } = req.body;
        currentQuestion = question; // Store for error handling

        if (!currentQuestion || typeof currentQuestion !== "string") {
            return res.status(400).json({ error: "Missing 'question' string in body." });
        }

        console.log(`💬 Received question: "${currentQuestion}"`);

        // Get or create conversation history for this session
        if (!conversationHistory.has(sessionId)) {
            conversationHistory.set(sessionId, []);
        }
        const history = conversationHistory.get(sessionId);

        // Add user question to history
        history.push({ sender: "User", text: currentQuestion });

        const answer = await askHuggingFace(currentQuestion);

        // Add bot response to history (keep last 6 messages)
        history.push({ sender: "Assistant", text: answer });
        if (history.length > 6) {
            conversationHistory.set(sessionId, history.slice(-6));
        }

        res.json({
            answer,
            source: "huggingface",
            sessionId
        });

    } catch (err) {
        console.error("Chat error:", err.message);

        // Use the stored currentQuestion for fallback
        const questionForFallback = currentQuestion || "";
        const lowerQuestion = questionForFallback.toLowerCase();

        // Comprehensive fallback responses
        const fallbackAnswers = {
            skills: `I have comprehensive skills in full-stack web development including React, JavaScript, Python, Flask, and various modern frameworks. On the biotechnology side, I'm experienced in microbiology, genetic engineering, nanobiotechnology, and bioinformatics. I've worked with technologies like MongoDB, PostgreSQL, Tailwind CSS, and have experience in both wet lab and dry lab biotech procedures.`,

            projects: `I've developed numerous projects showcasing my full-stack capabilities. These include Bamboo Blogs (a Flask-based blog platform), Spotify Clone (with React and Clerk authentication), LinkedIn Profile Clone, Budget Map (AI-assisted finance tool), and several eCommerce applications. My projects demonstrate expertise in React, Python, database management, and responsive design.`,

            experience: `I have hands-on experience as a Fullstack Web Developer Intern at Corizo Edutech where I built real-world projects including CRUD applications and eCommerce sites. I'm currently training as a Java Fullstack Developer at QSpider. My biotechnology background includes internships at Elies Biotech and Biorith Techno Products.`,

            education: `I hold a Bachelor of Technology in Biotechnology from K. S. Rangasamy College of Technology (2020-2024) with an excellent 88.10% score. My education provided a strong foundation in both biotechnology principles and practical IT applications. I've studied subjects like microbiology, genetic engineering, bioinformatics, and nanobiotechnology.`,

            contact: `You can reach me via email at elayabarathiedison@gmail.com or connect on LinkedIn at https://www.linkedin.com/in/elayabarathi/. My portfolio is at https://elayabarathimv-portfolio.vercel.app/ and GitHub at https://github.com/BadBoy-Github. I'm always open to discussing new opportunities!`,

            default: `I'd love to help you learn more about my professional background! I have extensive experience in full-stack web development with React, JavaScript, Python, and various frameworks. I also have a strong biotechnology background. Feel free to ask about my projects, skills, experience, or education!`
        };

        // Smart keyword matching for fallback
        let fallbackAnswer = fallbackAnswers.default;

        if (lowerQuestion.includes("skill") || lowerQuestion.includes("technology") || lowerQuestion.includes("framework")) {
            fallbackAnswer = fallbackAnswers.skills;
        } else if (lowerQuestion.includes("project") || lowerQuestion.includes("portfolio") || lowerQuestion.includes("github")) {
            fallbackAnswer = fallbackAnswers.projects;
        } else if (lowerQuestion.includes("experience") || lowerQuestion.includes("intern") || lowerQuestion.includes("work")) {
            fallbackAnswer = fallbackAnswers.experience;
        } else if (lowerQuestion.includes("education") || lowerQuestion.includes("degree") || lowerQuestion.includes("study")) {
            fallbackAnswer = fallbackAnswers.education;
        } else if (lowerQuestion.includes("contact") || lowerQuestion.includes("email") || lowerQuestion.includes("linkedin") || lowerQuestion.includes("reach")) {
            fallbackAnswer = fallbackAnswers.contact;
        }

        res.json({
            answer: `I'm currently using a fallback response: ${fallbackAnswer}`,
            source: "fallback"
        });
    }
});

// Simple health check endpoint
app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        model: "google/flan-t5-large",
        message: "Chatbot API is running",
        timestamp: new Date().toISOString()
    });
});

// Test endpoint with simple response
app.post("/api/test", (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: "Missing question" });
    }

    const response = `This is a test response for: "${question}". The chatbot is working correctly!`;

    res.json({
        answer: response,
        source: "test"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🤖 Chatbot API running on http://localhost:${PORT}`);
    console.log(`🔗 Using free model: google/flan-t5-large`);
    console.log(`💡 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
});