import React, { useState } from 'react';
import { useMood } from '../../context/MoodContext'; // Import the useMood hook
import './MoodEntryForm.css'; // Import the CSS file for styles
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const MoodEntryForm = () => {
  const { addMoodEntry } = useMood(); // Get addMoodEntry function from context
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [hoveredMood, setHoveredMood] = useState(null); // Track hovered mood for animation
  const navigate = useNavigate(); // Initialize useNavigate

  // List of moods with corresponding emojis
  const moods = [
    { value: 'happy', emoji: '😀' },
    { value: 'sad', emoji: '😢' },
    { value: 'angry', emoji: '😠' },
    { value: 'anxious', emoji: '😟' },
    { value: 'excited', emoji: '😃' },
    { value: 'relaxed', emoji: '😌' }
  ];

  // Handle tag input and add tags
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) {
      alert('Please select a mood');
      return;
    }
    const response = await fetch('http://localhost:3001/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({mood,notes,tags}),
    });
    const data = await response.json();
    addMoodEntry(data.add);
    setMood('');
    setNotes('');
    setTags([]);

    // Navigate to MoodHistory after submitting
    navigate('/MoodHistory');
  };

  return (
    <>
     <div className="logout" style={{position: 'absolute', right: 10, top: 10}}>
        <button type="button" onClick={() => navigate('/')} >
          Logout
        </button>
      </div>
    <form onSubmit={handleSubmit} className="mood-entry-form">
      <h2 >Log Your Mood</h2>

     
      <div className="mood-selector">
        <label>Select Your Mood:</label>
        <div className="mood-options">
          {moods.map(({ value, emoji }) => (
            <div
              key={value}
              className={`mood-option ${mood === value ? 'selected' : ''}`}
              onClick={() => setMood(value)}
              onMouseEnter={() => setHoveredMood(value)} // Set hovered mood for animation
              onMouseLeave={() => setHoveredMood(null)} // Reset hover
            >
              <span className={`emoji ${hoveredMood === value ? 'bounce' : ''}`} role="img" aria-label={value}>
                {emoji}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write about your day..."
          rows="4"
        />
      </div>

      <div className="input-group">
        <label>Tags:</label>
        <div className="tag-input">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="e.g., Relaxed, Productive"
          />
          <button type="button" onClick={handleAddTag}>Add</button>
        </div>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-button">Save Mood Entry</button>
      
    </form>
    </>
  );
};

export default MoodEntryForm;
