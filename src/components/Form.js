import React from 'react';

const Form = ({ formData, setFormData, resumeType }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, index, key) => {
    const updatedArray = [...formData[key]];
    updatedArray[index] = e.target.value;
    setFormData({ ...formData, [key]: updatedArray });
  };

  const addField = (key) => {
    setFormData({ ...formData, [key]: [...formData[key], ''] });
  };

  const removeField = (key, index) => {
    const updatedArray = [...formData[key]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [key]: updatedArray });
  };

  return (
    <form>
      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
      <textarea name="summary" placeholder="Professional Summary" value={formData.summary} onChange={handleChange}></textarea>

      <h3>Education</h3>
      {formData.education.map((edu, index) => (
        <div key={index}>
          <input type="text" value={edu} onChange={(e) => handleArrayChange(e, index, 'education')} placeholder="Education Details" />
          <button type="button" onClick={() => removeField('education', index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addField('education')}>Add Education</button>

      <h3>Skills</h3>
      <textarea name="skills" placeholder="Enter skills separated by commas" value={formData.skills} onChange={handleChange}></textarea>

      <h3>Projects</h3>
      {formData.projects.map((proj, index) => (
        <div key={index}>
          <input type="text" value={proj} onChange={(e) => handleArrayChange(e, index, 'projects')} placeholder="Project Details" />
          <button type="button" onClick={() => removeField('projects', index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addField('projects')}>Add Project</button>

      {resumeType === 'experienced' && (
        <>
          <h3>Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index}>
              <input type="text" value={exp} onChange={(e) => handleArrayChange(e, index, 'experience')} placeholder="Experience Details" />
              <button type="button" onClick={() => removeField('experience', index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addField('experience')}>Add Experience</button>
        </>
      )}

      <h3>Achievements</h3>
      {formData.achievements.map((ach, index) => (
        <div key={index}>
          <input type="text" value={ach} onChange={(e) => handleArrayChange(e, index, 'achievements')} placeholder="Achievement" />
          <button type="button" onClick={() => removeField('achievements', index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addField('achievements')}>Add Achievement</button>
    </form>
  );
};

export default Form;