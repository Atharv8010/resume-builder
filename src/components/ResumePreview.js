import React from 'react';

const ResumePreview = ({ formData, resumeType }) => {
  return (
    <div id="resume-preview" className="resume-preview">
      <h1>{formData.fullName}</h1>
      <p>Email: {formData.email}</p>
      <p>Phone: {formData.phone}</p>
      <h2>Summary</h2>
      <p>{formData.summary}</p>
      
      <h2>Education</h2>
      <ul>
        {formData.education.map((edu, index) => (
          <li key={index}>{edu}</li>
        ))}
      </ul>

      <h2>Skills</h2>
      <p>{formData.skills}</p>

      <h2>Projects</h2>
      <ul>
        {formData.projects.map((proj, index) => (
          <li key={index}>{proj}</li>
        ))}
      </ul>

      {resumeType === 'experienced' && (
        <>
          <h2>Experience</h2>
          <ul>
            {formData.experience.map((exp, index) => (
              <li key={index}>{exp}</li>
            ))}
          </ul>
        </>
      )}

      <h2>Achievements</h2>
      <ul>
        {formData.achievements.map((ach, index) => (
          <li key={index}>{ach}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResumePreview;