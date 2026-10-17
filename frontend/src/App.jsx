import { useEffect, useState } from 'react';
import axios from 'axios';
import PortfolioView from './PortfolioView.jsx';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const CODEFORCES_HANDLE = import.meta.env.VITE_CODEFORCES_HANDLE || 'Nitin_5117';

// Pre-loaded data so all links work immediately even before backend restarts
const INITIAL_DATA = {
  profile: {
    name: "Nitin Kumar Meena",
    rollNo: "250123044",
    degree: "B.Tech - Mathematics and Computing",
    institute: "Indian Institute of Technology, Guwahati",
    email1: "m.nitin@iitg.ac.in",
    email2: "nitinmeenaa5117@gmail.com",
    phone: "+91-9414804982",
    github: "https://github.com/Nitin5117",
    linkedin: "https://www.linkedin.com/in/nkmeenaa/",
    codeforcesHandle: "Nitin_5117",
    codeforcesUrl: "https://codeforces.com/profile/Nitin_5117"
  },
  education: [
    { degree: "B.Tech. Major — Mathematics and Computing", institute: "Indian Institute of Technology, Guwahati", year: "2025 – Present" },
    { degree: "Senior Secondary (Class XII)", institute: "CBSE Board", year: "2024" },
    { degree: "Secondary (Class X)", institute: "CBSE Board", year: "2022" }
  ],
  projects: [
    {
      title: "AI Interview Platform: GenAI-Powered Mock Interviews & ATS Scoring",
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
    }
  ],
  skills: {
    "Languages": ["C/C++", "Python", "JavaScript*"],
    "Core Concepts": ["Data Structures & Algorithms", "Object-Oriented Programming", "Machine Learning"],
    "Libraries & AI": ["NumPy", "Pandas", "Scikit-learn"],
    "Web Development": ["React.js", "Node.js", "Express.js", "REST APIs"],
    "Databases & Tools": ["MySQL", "MongoDB*", "Git", "GitHub"]
  },
  courses: {
    "Computer Science": ["Data Structures and Algorithms", "Introduction to Computing"],
    "Mathematics": ["Linear Algebra", "Probability Theory and Random Processes", "Real Analysis"]
  },
  achievements: [
    {
      title: "Codeforces Competitive Programming",
      subtitle: "Maximum Rating: 1011 — Handle: Nitin_5117",
      date: "Active",
      linkText: "Codeforces Profile",
      linkUrl: "https://codeforces.com/profile/Nitin_5117"
    },
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
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [cfData, setCfData] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Also fetch from backend if updated there
    axios.get(`${API_BASE}/api/portfolio`)
      .then(res => {
        // Only override if backend has the updated links (not "#")
        if (res.data?.projects?.[0]?.github !== "#") {
          setData(res.data);
        }
      })
      .catch(err => console.error(err));

    // Fetch Codeforces directly as a fallback if backend route fails
    axios.get(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(CODEFORCES_HANDLE)}`)
      .then(res => setCfData(res.data.result[0]))
      .catch(err => console.error(err));
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/contact`, contact);
      setStatus(res.data.message);
      setContact({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message.');
    }
  };

  const handleContactChange = (field, value) => {
    setContact(current => ({ ...current, [field]: value }));
  };

  return (
    <PortfolioView
      data={data}
      cfData={cfData}
      contact={contact}
      status={status}
      onContactSubmit={handleContactSubmit}
    />
  );
}

export default App;
