import React, { createContext, useContext, useState } from 'react';

// Create a MoodContext
const MoodContext = createContext();

// Custom hook to use MoodContext
export const useMood = () => {
  return useContext(MoodContext);
};

// Provider component
export const MoodProvider = ({ children }) => {
  const [moodEntries, setMoodEntries] = useState([]);
  const receiveMoodEntries = () => {
    fetch('http://localhost:3001/moodEntries')
      .then((response) => response.json())
      .then((data) => setMoodEntries(data.entries))
      .catch((error) => console.error('Error fetching mood entries:', error));
  };
  const addMoodEntry = (entry) => {
    setMoodEntries((prevEntries) => [...prevEntries, entry]);
  };

  const deleteMoodEntry = (index) => {
    setMoodEntries((prevEntries) => prevEntries.filter((_, i) => i !== index));
  };

  return (
    <MoodContext.Provider value={{ moodEntries, addMoodEntry, deleteMoodEntry ,receiveMoodEntries}}>
      {children}
    </MoodContext.Provider>
  );
};
