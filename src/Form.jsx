import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function Form() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [summary, setSummary] = useState('');
  const [mernRating, setMernRating] = useState(0);
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert('Please upload your resume before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('dob', dob);
    formData.append('summary', summary);
    formData.append('mernRating', Number(mernRating)); 
    formData.append('resume', resume);

    try {
      await axios.post('http://localhost:5000/submit', formData);
      // alert('Form submitted successfully!');
      navigate('/thank-you');
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">TASK FOR 1ST ROUND</h2>

      <div className="form-section">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-section">
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
              required
            />{' '}
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
            />{' '}
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Prefer not to say"
              onChange={(e) => setGender(e.target.value)}
            />{' '}
            Prefer not to say
          </label>
        </div>
      </div>

      <div className="form-section">
        <label>Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </div>

      <div className="form-section">
        <label>Summarise about yourself</label>
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div className="form-section">
        <label>Knowledge in MERN Stack</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= mernRating ? 'star filled' : 'star'}
              onClick={() => setMernRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="form-section">
        <label>Upload Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
          required
        />
      </div>
    
      <div className="form-section">
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;
