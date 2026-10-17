const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/portfolio', (req, res) => {
  res.json({
    profile: {
      name: "Nitin Kumar Meena",
      degree: "B.Tech - Mathematics and Computing",
      institute: "Indian Institute of Technology, Guwahati",
      email1: "m.nitin@iitg.ac.in",
      email2: "nitinmeenaa5117@gmail.com",
      phone: "+91-9414804982",
      codeforcesHandle: "Nitin_5117"
    },
    education: [
      { degree: "B.Tech. Major", institute: "Indian Institute of Technology, Guwahati", score: "7.54 CGPA (Current)", year: "2025 - Present" },
      { degree: "Senior Secondary", institute: "CBSE Board", score: "93.2%", year: "2024" },
      { degree: "Secondary", institute: "CBSE Board", score: "86.4%", year: "2022" }
    ],
    projects: [
      {
        title: "AI Interview Platform: GenAI-Powered Mock Interviews & ATS Scoring",
        subtitle: "Personal Project",
        date: "Sept. 2026 – Present",
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Gemini API", "NLP"],
        points: [
          "Architected a full-stack web application with a scalable RESTful API backend secured via JWT and bcrypt authentication.",
          "Engineered a resume-processing pipeline using NLP, integrating the Google Gemini API for automated resume parsing and ATS scoring.",
          "Developed Generative AI-powered mock interviews evaluating candidates on algorithms, problem-solving, and technical knowledge.",
          "Designed an interactive frontend dashboard tracking historical performance analytics and skill progression."
        ],
        github: "#",
        live: "#"
      },
      {
        title: "Decoding Customer Value: A Data-Driven Retention Strategy",
        subtitle: "Consulting & Analytics Club, IIT Guwahati",
        date: "June 2026",
        tech: ["Python", "MySQL", "Power BI", "EDA", "Statistical Analysis"],
        points: [
          "Analyzed a 3,900-record retail dataset using Python, MySQL, and Power BI to perform Exploratory Data Analysis (EDA) and segment customers by value and loyalty.",
          "Engineered predictive features, including Customer Value Score and Loyalty Score, applying data preprocessing and statistical analysis.",
          "Built an interactive data visualization dashboard to support data-driven decision-making and tailored marketing strategies."
        ],
        github: "#",
        certificate: "#"
      }
    ],
    skills: {
      "Languages": ["C/C++", "Python", "JavaScript"],
      "Core Concepts": ["Data Structures & Algorithms", "OOP", "Machine Learning"],
      "Libraries & AI": ["NumPy", "Pandas", "Scikit-learn"],
      "Web Development": ["React.js", "Node.js", "Express.js", "REST APIs"],
      "Databases & Tools": ["MySQL", "MongoDB", "Git", "GitHub"]
    },
    achievements: [
      "Codeforces: Maximum Rating 1011 (Handle: Nitin_5117)",
      "Machine Learning and AI Hackathon (Technical Board, IIT Guwahati): Secured 7th Rank in the final hackathon and received a Certificate of Excellence (June 2026)"
    ],
    extracurriculars: [
      {
        role: "WebOps Executive",
        org: "Alcheringa, IIT Guwahati",
        date: "July 2026 – Present",
        desc: "Developed and maintained a Django-based Campus Ambassador Portal, fixed software bugs, and improved backend reliability and UI responsiveness."
      },
      {
        role: "Rajya Puraskar (Governor's Award)",
        org: "Bharat Scouts and Guides",
        date: "Dec. 2023",
        desc: "Recognized for leadership, community service, and survival skills."
      },
      {
        role: "Certificate of Appreciation",
        org: "Dakshana India Educational Trust Fund",
        date: "2026",
        desc: "Volunteered for the Dakshana Selection Test 2026 at JNV Dausa, Rajasthan."
      }
    ]
  });
});

app.get('/api/codeforces/:handle',async(req,res) => {
  try{
    const {handle} = req.params;
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    res.json(responce.data.result[0]);
  }catch(err){
    res.status(404).json({err : "Failed to access data from Codeforces"});
  }
})
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`New Message from ${name} (${email}): ${message}`);
  // Later, you can add Nodemailer here to forward this to nitinmeenaa5117@gmail.com
  res.status(200).json({ success: true, message: "Message received successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));