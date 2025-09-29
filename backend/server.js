import fs from "fs"; 
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Load data.json
const rawData = fs.readFileSync('./data/data.json', 'utf-8'); 
const data = JSON.parse(rawData) 

// Simple question functions
function getAnswer(question) {
    const lowerQ = question.toLowerCase();
    console.log(`Received question: ${question}`);

    if (lowerQ.includes("skill")) {
        // Extract categories inside skills[0]
        const skillsObj = data.skills[0];
        const formattedSkills = Object.entries(skillsObj)
            .map(([category, items]) => {
                const details = Object.entries(items)
                    .map(([subCat, subItems]) => `${subCat}: ${subItems.join(", ")}`)
                    .join(" | ");
                return `${category} → ${details}`;
            })
            .join("\n\n");

        console.log(formattedSkills);
        return formattedSkills;
    }

    if (lowerQ.includes("project")) {
        const projectList = data.projects
            .map((p) => `${p.name}: ${p.description}`)
            .join("\n\n");

        console.log(projectList);
        return projectList;
    }

    if (lowerQ.includes("experience")) {
        const experienceList = data.experience
            .map((exp) => `${exp.position} at ${exp.company} (${exp.duration})`)
            .join("\n\n");

        console.log(experienceList);
        return experienceList;
    }

    console.log("I’m not sure how to answer that.");
    return "I’m not sure how to answer that. Try asking about my skills, projects, or experience!";
}


// API endpoint
app.post("/api/chat", (req, res) => {
    const { question } = req.body;
    console.log(`API received question: ${question}`);
    const answer = getAnswer(question);
    console.log(`API sending answer: ${answer}`);
    res.json({ answer });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Chatbot API running on http://localhost:${PORT}`);
});
