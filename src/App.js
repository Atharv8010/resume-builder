import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';

const Form = ({ type, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };
  const addItem = (section) => {
    const templates = {
      education: { degree: '', school: '', year: '', gpa: '' },
      projects: { title: '', description: '', technologies: '', link: '' },
      experience: { jobTitle: '', company: '', years: '', location: '', description: '' },
      achievements: { text: '' },
      certifications: { name: '', issuer: '', year: '' }
    };
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], templates[section]]
    }));
  };

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="form-wrapper">
      <section className="form-block">
        <h3 className="block-title">Personal Information</h3>
        <div className="input-row">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91-8010389332"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="City, Country"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>LinkedIn</label>
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>GitHub</label>
            <input
              type="url"
              name="github"
              placeholder="Github"
              value={formData.github}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      <section className="form-block">
        <h3 className="block-title">Professional Summary</h3>
        <div className="input-group full-width">
          <textarea
            name="summary"
            placeholder="Write a compelling summary of your professional background and career goals..."
            value={formData.summary}
            onChange={handleChange}
            rows="4"
          />
        </div>
      </section>

      <section className="form-block">
        <h3 className="block-title">Skills</h3>
        <div className="input-group full-width">
          <label>Languages</label>
          <textarea
            name="languages"
            placeholder="C++, Python, Java, etc."
            value={formData.languages}
            onChange={handleChange}
            rows="2"
          />
        </div>
        <div className="input-group full-width">
          <label>Web & Frameworks</label>
          <textarea
            name="frameworks"
            placeholder="React.js, HTML, CSS, etc."
            value={formData.frameworks}
            onChange={handleChange}
            rows="2"
          />
        </div>
        <div className="input-group full-width">
          <label>Databases</label>
          <textarea
            name="databases"
            placeholder="MongoDB, etc."
            value={formData.databases}
            onChange={handleChange}
            rows="2"
          />
        </div>
        <div className="input-group full-width">
          <label>Libraries & Tools</label>
          <textarea
            name="tools"
            placeholder="Git, REST APIs, etc."
            value={formData.tools}
            onChange={handleChange}
            rows="2"
          />
        </div>
      </section>

      {type === 'fresher' && (
        <section className="form-block">
          <h3 className="block-title">Academic Projects</h3>
          {formData.projects.map((project, index) => (
            <div key={index} className="repeatable-item">
              <div className="item-header">
                <span className="item-label">Project {index + 1}</span>
                {formData.projects.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeItem('projects', index)} 
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="input-group full-width">
               <b> <label>Project Title</label></b>
                <input
                  type="text"
                  placeholder="E-commerce Platform"
                  value={project.title}
                  onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                />
              </div>
              <div className="input-group full-width">
                <label>Description (separate each point with a new line)</label>
                <textarea
                  placeholder="Built a web app to track expenses&#10;Implemented authentication and CRUD features&#10;Used MERN stack for development"
                  value={project.description}
                  onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                  rows="4"
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addItem('projects')} className="add-btn">
            Add Project
          </button>
        </section>
      )}

      <section className="form-block">
        <h3 className="block-title">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="repeatable-item">
            <div className="item-header">
              <span className="item-label">Entry {index + 1}</span>
              {formData.education.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeItem('education', index)} 
                  className="remove-btn"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="input-group full-width">
              <label>Degree/Qualification</label>
              <input
                type="text"
                placeholder="B.Tech - CSE"
                value={edu.degree}
                onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
              />
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Institution</label>
                <input
                  type="text"
                  placeholder="University Name"
                  value={edu.school}
                  onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Year</label>
                <input
                  type="text"
                  placeholder="2026"
                  value={edu.year}
                  onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label>CGPA/Percentage</label>
              <input
                type="text"
                placeholder="CGPA: 8.24"
                value={edu.gpa}
                onChange={(e) => handleArrayChange('education', index, 'gpa', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={() => addItem('education')} className="add-btn">
          Add Another
        </button>
      </section>

      {type === 'experienced' && (
        <>
          <section className="form-block">
            <h3 className="block-title">Work Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="repeatable-item">
                <div className="item-header">
                  <span className="item-label">Position {index + 1}</span>
                  {formData.experience.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeItem('experience', index)} 
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      placeholder="Senior Software Engineer"
                      value={exp.jobTitle}
                      onChange={(e) => handleArrayChange('experience', index, 'jobTitle', e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Company</label>
                    <input
                      type="text"
                      placeholder="Tech Corp Inc."
                      value={exp.company}
                      onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      placeholder="Jan 2020 - Present"
                      value={exp.years}
                      onChange={(e) => handleArrayChange('experience', index, 'years', e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="San Francisco, CA"
                      value={exp.location}
                      onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-group full-width">
                  <label>Responsibilities & Achievements (separate each point with a new line)</label>
                  <textarea
                    placeholder="Led development of microservices architecture&#10;Improved system performance by 40%&#10;Mentored junior developers"
                    value={exp.description}
                    onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                    rows="4"
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addItem('experience')} className="add-btn">
              Add Experience
            </button>
          </section>

          <section className="form-block">
            <h3 className="block-title">Certifications</h3>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="repeatable-item">
                <div className="item-header">
                  <span className="item-label">Certificate {index + 1}</span>
                  {formData.certifications.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeItem('certifications', index)} 
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="input-group full-width">
                  <label>Certification Name</label>
                  <input
                    type="text"
                    placeholder="AWS Certified Solutions Architect"
                    value={cert.name}
                    onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
                  />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Issuing Organization</label>
                    <input
                      type="text"
                      placeholder="Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Year</label>
                    <input
                      type="text"
                      placeholder="2023"
                      value={cert.year}
                      onChange={(e) => handleArrayChange('certifications', index, 'year', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addItem('certifications')} className="add-btn">
              Add Certification
            </button>
          </section>

          <section className="form-block">
            <h3 className="block-title">Achievements & Awards</h3>
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="repeatable-item">
                <div className="item-header">
                  <span className="item-label">Achievement {index + 1}</span>
                  {formData.achievements.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeItem('achievements', index)} 
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="input-group full-width">
                  <textarea
                    placeholder="Describe your achievement or award..."
                    value={achievement.text}
                    onChange={(e) => handleArrayChange('achievements', index, 'text', e.target.value)}
                    rows="2"
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => addItem('achievements')} className="add-btn">
              Add Achievement
            </button>
          </section>
        </>
      )}
    </div>
  );
};

const ResumePreview = ({ type, data }) => {
  const hasContent = (arr) => arr && arr.length > 0 && arr.some(item => 
    Object.values(item).some(val => val && val.trim() !== '')
  );

  const formatDescription = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      line.trim() && <div key={index} className="desc-line">{line}</div>
    ));
  };

  return (
    <div id="resume-preview" className="resume-document">
      <div className="resume-header">
        <h1 className="resume-name">{data.fullName || 'YOUR NAME'}</h1>
        <div className="contact-bar">
          {data.phone && <span className="contact-detail">{data.phone}</span>}
          {data.email && <span className="contact-detail">{data.email}</span>}
          {data.linkedin && <span className="contact-detail contact-link">{data.linkedin.replace(/^https?:\/\//, '')}</span>}
          {data.github && <span className="contact-detail contact-link">{data.github.replace(/^https?:\/\//, '')}</span>}
        </div>
      </div>

      {data.summary && data.summary.trim() && (
        <>
          <div className="resume-section">
            <h2 className="section-heading">SUMMARY</h2>
            <p className="summary-content">{data.summary}</p>
          </div>
        </>
      )}

      {(data.languages || data.frameworks || data.databases || data.tools) && (
        <>
          <div className="resume-section">
            <h2 className="section-heading">SKILLS</h2>
            <div className="skills-categorized">
              {data.languages && data.languages.trim() && (
                <div className="skill-category">
                  <strong className="skill-category-label">Languages</strong>
                  <div className="skill-category-content">{data.languages}</div>
                </div>
              )}
              {data.frameworks && data.frameworks.trim() && (
                <div className="skill-category">
                  <strong className="skill-category-label">Web & Frameworks</strong>
                  <div className="skill-category-content">{data.frameworks}</div>
                </div>
              )}
              {data.databases && data.databases.trim() && (
                <div className="skill-category">
                  <strong className="skill-category-label">Databases</strong>
                  <div className="skill-category-content">{data.databases}</div>
                </div>
              )}
              {data.tools && data.tools.trim() && (
                <div className="skill-category">
                  <strong className="skill-category-label">Libraries & Tools</strong>
                  <div className="skill-category-content">{data.tools}</div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {type === 'fresher' && hasContent(data.projects) && (
        <>
          <div className="resume-section">
            <h2 className="section-heading">ACADEMIC PROJECTS</h2>
            {data.projects.map((project, index) => (
              (project.title || project.description) && (
                <div key={index} className="content-block">
                  <div className="project-title-line">
                    <h3 className="content-title">{project.title || 'Project'}</h3>
                  </div>
                  {project.description && (
                    <div className="content-description">
                      {formatDescription(project.description)}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </>
      )}

      {hasContent(data.education) && (
        <>
          <div className="resume-section">
            <h2 className="section-heading">EDUCATION</h2>
            {data.education.map((edu, index) => (
              (edu.degree || edu.school) && (
                <div key={index} className="content-block">
                  <div className="block-row">
                    <div className="block-left">
                      <h3 className="content-title">{edu.school || 'Institution'}</h3>
                      <div className="content-subtitle">{edu.degree}</div>
                    </div>
                    <div className="block-right">
                      {edu.year && <div className="content-meta">{edu.year}</div>}
                      {edu.gpa && <div className="content-meta gpa-text">{edu.gpa}</div>}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </>
      )}

      {type === 'experienced' && hasContent(data.experience) && (
        <>
          <div className="resume-section">
            <h2 className="section-heading">PROFESSIONAL EXPERIENCE</h2>
            {data.experience.map((exp, index) => (
              (exp.jobTitle || exp.company) && (
                <div key={index} className="content-block">
                  <div className="block-row">
                    <div className="block-left">
                      <h3 className="content-title">{exp.jobTitle || 'Position'}</h3>
                      <div className="content-subtitle">
                        {exp.company}
                        {exp.location && <span className="location-tag"> - {exp.location}</span>}
                      </div>
                    </div>
                    <div className="block-right">
                      {exp.years && <div className="content-meta">{exp.years}</div>}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="content-description">
                      {formatDescription(exp.description)}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </>
      )}

      {type === 'experienced' && hasContent(data.certifications) && (
        <>
          <div className="resume-section">
            <h2 className="section-heading">CERTIFICATIONS</h2>
            {data.certifications.map((cert, index) => (
              (cert.name || cert.issuer) && (
                <div key={index} className="cert-item">
                  <span className="cert-bullet">•</span>
                  <div className="cert-details">
                    <strong>{cert.name}</strong>
                    {cert.issuer && <span> - {cert.issuer}</span>}
                    {cert.year && <span className="cert-year"> ({cert.year})</span>}
                  </div>
                </div>
              )
            ))}
          </div>
        </>
      )}

      {type === 'experienced' && hasContent(data.achievements) && (
        <>
          <div className="resume-section">
            <h2 className="section-heading">ACHIEVEMENTS & AWARDS</h2>
            {data.achievements.map((achievement, index) => (
              achievement.text && achievement.text.trim() && (
                <div key={index} className="achievement-item">
                  <span className="achievement-bullet">•</span>
                  <div className="achievement-content">{achievement.text}</div>
                </div>
              )
            ))}
          </div>
        </>
      )}

      {!data.fullName && !data.email && !data.phone && (
        <div className="empty-placeholder">
          <div className="empty-icon">📄</div>
          <h3 className="empty-title">Begin Creating Your Resume</h3>
          <p className="empty-text">Fill out the form to see your resume come to life</p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [resumeType, setResumeType] = useState('fresher');
  const [isDownloading, setIsDownloading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: '',
    education: [{ degree: '', school: '', year: '', gpa: '' }],
    languages: '',
    frameworks: '',
    databases: '',
    tools: '',
    projects: [{ title: '', description: '' }],
    experience: [{ jobTitle: '', company: '', years: '', location: '', description: '' }],
    achievements: [{ text: '' }],
    certifications: [{ name: '', issuer: '', year: '' }]
  });

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    setIsDownloading(true);
    
    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200,
        windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 5;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${formData.fullName.replace(/\s+/g, '_') || 'resume'}_${new Date().getFullYear()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">Resume Builder</h1>
            <p className="app-subtitle">Create professional resumes instantly</p>
          </div>
          <div className="type-selector">
            <button
              className={`selector-btn ${resumeType === 'fresher' ? 'active' : ''}`}
              onClick={() => setResumeType('fresher')}
            >
              Fresher
            </button>
            <button
              className={`selector-btn ${resumeType === 'experienced' ? 'active' : ''}`}
              onClick={() => setResumeType('experienced')}
            >
              Experienced
            </button>
          </div>
        </div>
      </header>

      <div className="main-grid">
        <div className="form-panel">
          <div className="panel-header">
            <h2 className="panel-title">Information</h2>
            <p className="panel-subtitle">Complete the sections below</p>
          </div>
          <div className="form-scroll">
            <Form 
              type={resumeType} 
              formData={formData} 
              setFormData={setFormData} 
            />
          </div>
        </div>

        <div className="preview-panel">
          <div className="panel-header">
            <div>
              <h2 className="panel-title">Preview</h2>
              <p className="panel-subtitle">Real-time view</p>
            </div>
            <button 
              className={`download-button ${isDownloading ? 'downloading' : ''}`}
              onClick={handleDownloadPDF}
              disabled={isDownloading}
            >
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
          <div className="preview-scroll">
            <ResumePreview 
              type={resumeType} 
              data={formData} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;