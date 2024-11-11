import React from 'react';
import { useMood } from '../../context/MoodContext'; // Assuming you have the mood context
import './MoodRecommendations.css'; // Import the CSS file for styling

const MoodRecommendations = () => {
  const { moodEntries } = useMood();
  const recommendations = getMoodRecommendations(moodEntries);

  return (
    <div className="mood-recommendations">
      <h2>Mood-Based Recommendations</h2>
      {recommendations.length > 0 ? (
        <div className="recommendations-list">
          {recommendations.map((activity, index) => (
            <div key={index} className="recommendation-card">
              <p>{activity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-recommendations">No recommendations available based on your mood history.</p>
      )}
    </div>
  );
};

const getMoodRecommendations = (moodEntries) => {
  // This function should return recommendations based on mood entries
  const moodActivities = {
    happy: ["Go for a walk in nature", "Listen to your favorite music"],
    sad: ["Watch a feel-good movie", "Practice yoga"],
    angry: ["Do some physical exercise", "Meditate"],
    anxious: ["Try deep breathing exercises", "Read a book"],
    excited: ["Plan a small outing with friends", "Start a new hobby"],
    relaxed: ["Enjoy a cup of tea", "Do some light stretching"],
  };

  const activities = moodEntries.map(entry => moodActivities[entry.mood] || []).flat();
  return [...new Set(activities)]; // Remove duplicates
};

export default MoodRecommendations;
