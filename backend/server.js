const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 1. Endpoint to serve your Resume Data (CPI & Percentages removed)
app.get('/api/portfolio', (req, res) => {
  res.json({
    profile: {
      name: "Nitin Kumar Meena",
      rollNo: "250123044",
      degree: "B.Tech - Mathematics and Computing",
      institute: "Indian Institute of Technology, Guwahati",
      email1: "m.nitin@iitg.ac.in",
      email2: "nitinmeenaa5117@gmail.com",
      phone: "+91-9414804982",
      github: "https://github.com/nkmeenaa",
      linkedin: "https://www.linkedin.com/in/nkmeenaa/",
      codeforcesHandle: "Nitin_5117",
      codeforcesUrl: "https://codeforces.com/profile/Nitin_5117"
    },
    education: [
      { degree: "B.Tech. Major — Mathematics and Computing", institute: "Indian Institute of Technology, Guwahati", year: "2025 – Present" },
      { degree: "Senior Secondary (Class XII)", institute: "Jawahar Navodaya Vidyalaya, Alwar", year: "2024" },
      { degree: "Secondary (Class X)", institute: "Jawahar Navodaya Vidyalaya, Alwar", year: "2022" }
    ],
    projects: [
      {
        title: "AI Interview Platform: AI-Powered Mock Interviews & ATS Scoring",
        subtitle: "Personal Project",
        date: "Sept. 2026 – Present",
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT & bcrypt", "Google Gemini API", "NLP"],
        points: [
          "Architected a full-stack web application using React.js, Node.js, Express.js, and MongoDB, with a scalable RESTful API backend secured via JWT and bcrypt authentication.",
          "Engineered a resume-processing pipeline using Natural Language Processing (NLP), integrating the Google Gemini API for automated resume parsing and ATS scoring.",
          "Developed Generative AI-powered mock interviews evaluating candidates on algorithms, problem-solving, and technical knowledge.",
          "Designed an interactive frontend dashboard tracking historical performance analytics and skill progression."
        ],
        github: "https://github.com/Nitin5117/AI-Resume-Interviewer",
        live: "https://ai-resume-interviewer-six.vercel.app/",
        certificate: null
      },
      {
        title: "Decoding Customer Value: A Data-Driven Retention Strategy",
        subtitle: "Consulting & Analytics Club, IIT Guwahati",
        date: "June 2026",
        tech: ["Python", "MySQL", "Power BI", "EDA", "Statistical Analysis"],
        points: [
          "Analyzed a 3,900-record retail dataset using Python, MySQL, and Power BI to perform Exploratory Data Analysis (EDA) and segment customers by value and loyalty.",
          "Engineered predictive features, including Customer Value Score and Loyalty Score, applying data preprocessing and statistical analysis to clean and structure raw data.",
          "Built an interactive data visualization dashboard to support data-driven decision-making and tailored marketing strategies."
        ],
        github: "https://github.com/Nitin5117/Decoding-Customer-Value",
        live: null,
        certificate: "https://drive.google.com/file/d/1xhFfLv8IhNS91m8n67P0hQxY0Jy-SBS5/view?usp=drive_link"
      },{
        title: "CalcInk: Handwritten Math Calculator",
        date: "Sept. 2026", // fill in
        subtitle: "Personal Project",
        points: [
          "Built a browser-based calculator in React where users write expressions by hand with a mouse, stylus or touch, with undo, redo, clear and eraser tools.",
          "Integrated the pretrained CoMER handwriting recognition model through ink-on and ONNX Runtime Web, running INT8 encoder and decoder models (about 7.2 MB combined) entirely in the browser with no inference API.",
          "Added a math parser that evaluates the recognized expression with standard BODMAS precedence and shows the result.",
        ],
        tech: ["React", "Vite", "ONNX Runtime Web", "CoMER", "ink-on", "Canvas API"],
        github: "https://github.com/nkmeenaa/CalcInk",
        live: "https://boot-camp-zeta.vercel.app/",
      },
    ],
    skills: {
      "Languages": ["C/C++", "Python", "JavaScript*"],
      "Core Concepts": ["Data Structures & Algorithms", "Object-Oriented Programming", "Machine Learning"],
      "Libraries & AI": ["NumPy", "Pandas", "Scikit-learn"],
      "Web Development": ["React.js", "Node.js", "Express.js", "REST APIs"],
      "Databases & Tools": ["MySQL", "MongoDB*", "Git", "GitHub"]
    },
    achievements: [
      {
        title: "Machine Learning and AI Hackathon — Technical Board, IIT Guwahati",
        subtitle: "Secured 7th Rank in the final hackathon and received a Certificate of Excellence.",
        date: "June 2026",
        linkText: "Certificate",
        linkUrl: "https://drive.google.com/file/d/1vziaMu5nSh5D1y7wnxjU0YgubS2TpPjv/view?usp=share_link"
      }
    ],
    extracurriculars: [
      {
        role: "WebOps Executive",
        org: "Alcheringa, IIT Guwahati",
        date: "July 2026 – Present",
        desc: "Developed and maintained a Django-based Campus Ambassador Portal, fixed software bugs, and improved backend reliability and UI responsiveness.",
        certificate: null
      },
      {
        role: "Rajya Puraskar (Governor's Award)",
        org: "Bharat Scouts and Guides",
        date: "Dec. 2023",
        desc: "Recognized for leadership, community service, and survival skills.",
        certificate: "https://drive.google.com/file/d/1xa0jSLo_K3-IkY5-arGV2gKjI5IF9mgc/view?usp=share_link"
      },
      {
        role: "Certificate of Appreciation",
        org: "Dakshana India Educational Trust Fund",
        date: "2026",
        desc: "Volunteered for the Dakshana Selection Test 2026 at JNV Dausa, Rajasthan.",
        certificate: "https://drive.google.com/file/d/1TTmpWSSQ4G814bt8z_Q9VFSOOEBrLouv/view?usp=share_link"
      }
    ]
  });
});

// 2. Endpoint to fetch Live Codeforces Rating
app.get('/api/codeforces/:handle', async (req, res) => {
  try {
    const { handle } = req.params;
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    res.json(response.data.result[0]);
  } catch (err) {
    res.status(404).json({ err: "Failed to access data from Codeforces" });
  }
});

// 3. Contact Form Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`New Message from ${name} (${email}): ${message}`);
  res.status(200).json({ success: true, message: "Message received successfully!" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend listening on port ${PORT}`));
