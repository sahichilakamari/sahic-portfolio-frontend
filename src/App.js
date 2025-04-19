import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'; // for styling

function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    axios.get("https://sahic-portfolio-backend.onrender.com/portfolio")
      .then((res) => setPortfolio(res.data))
      .catch((err) => console.error("Error loading portfolio:", err));
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!portfolio) return <div>Loading portfolio...</div>;

  return (
    <div className={`app-container ${theme}`}>

      <h1>Portfolio of Sahic</h1>
      <p>{portfolio.bio}</p>
      
      <div className="section">
      <h2>Education</h2>
      <ul>
        {portfolio.education?.map((edu, i) => (
          <li key={i}>
            <strong>{edu.degree}</strong> - {edu.institution} ({edu.year})<br />
            {edu.cgpa && `CGPA: ${edu.cgpa}`}
            {edu.percentage && `Percentage: ${edu.percentage}`}
            {edu.gpa && `GPA: ${edu.gpa}`}
          </li>
        ))}
      </ul>
      </div>

      <div className="section">
      <h2>Skills</h2>
      {portfolio.skills && Object.entries(portfolio.skills).map(([category, skills]) => (
        <div key={category}>
          <strong>{category}</strong>
          <ul>
            {skills?.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
      ))}
      </div>
      
      <div className="section">
      <h2>Projects</h2>
      <ul>
        {portfolio.projects?.map((proj, i) => (
          <li key={i}>
            <strong>{proj.title}</strong><br />
            {proj.description}<br />
            {proj.duration && <em>{proj.duration}</em>}
          </li>
        ))}
      </ul>
      </div>

      <div className="section">
      <h2>Internships</h2>
      <ul>
        {portfolio.internships?.map((intern, i) => (
          <li key={i}>
            <strong>{intern.role}</strong> at {intern.organization}<br />
            {intern.duration && <em>{intern.duration}</em>}<br />
            {intern.description}
          </li>
        ))}
      </ul>
      </div>

      <div className="section">
      <h2>Certifications</h2>
      <ul>
        {portfolio.certifications?.map((cert, i) => (
          <li key={i}>{cert}</li>
        ))}
      </ul>
      </div>

      <div className="section">
      <h2>Achievements</h2>
      <ul>
        {portfolio.achievements?.map((ach, i) => (
          <li key={i}>{ach}</li>
        ))}
      </ul>
      </div>

      <div className="section">
      <h2>Strengths</h2>
      <ul>
        {portfolio.strengths?.map((str, i) => (
          <li key={i}>{str}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App;
