import React, { useEffect, useState } from 'react';
import { useMood } from '../../context/MoodContext';
import './MoodHistory.css';
import TagFilter from '../TagFilter/TagFilter';
import { Link } from 'react-router-dom';
import { FaCalendar, FaStickyNote, FaTag } from 'react-icons/fa';
import { AiFillAliwangwang } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const MoodHistory = () => {
  const { moodEntries, deleteMoodEntry, receiveMoodEntries } = useMood();
  const [filteredEntries, setFilteredEntries] = useState(moodEntries);
  const [showMoodChart, setShowMoodChart] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const allTags = Array.from(new Set(moodEntries.flatMap(entry => entry.tags)));

  const handleFilter = (selectedTags) => {
    if (selectedTags.length === 0) {
      setFilteredEntries(moodEntries);
    } else {
      setFilteredEntries(moodEntries.filter(entry => 
        selectedTags.some(tag => entry.tags.includes(tag))
      ));
    }
  };

  useEffect(() => {
    receiveMoodEntries();
  }, []);


  React.useEffect(() => {
    setFilteredEntries(moodEntries);
  }, [moodEntries]);

  return (
    <div className="mood-history">
      <h2>Mood History</h2>
      <TagFilter tags={allTags} onFilter={handleFilter} />

      <div className="buttons-container" style={{textAlign:'center'}}>
        <button className="action-button" onClick={() => setShowMoodChart(!showMoodChart)}>
         <Link to="/MoodChart" style={{textDecoration:'none',color:'white'}}>Mood Chart</Link> 
        </button>
        <button className="action-button" onClick={() => setShowRecommendations(!showRecommendations)} style={{marginLeft:10}}>
          <Link to="/mood-recommendations" style={{textDecoration:'none',color:'white'}}>Mood Recommendations</Link>
        </button>
      </div>

      <ul className="entries-list" style={{margin:10}}>
        {filteredEntries.map((entry, index) => (
          <li key={index} className="mood-entry">
            <div className="entry-date">
             <FaCalendar/> {new Date(entry.date).toLocaleDateString()}
            </div>
            <div className="entry-details">
            <AiFillAliwangwang /><span className={`entry-mood mood-${entry.mood}`}>
                {entry.mood}
              </span>
              <p className="entry-notes"><FaStickyNote />{entry.notes}</p>
              <div className="entry-tags">
              <FaTag />{entry.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <button className="delete-button" onClick={() => deleteMoodEntry(index)} style={{marginLeft:230}}>
            <AiFillDelete />
            </button>
          </li>
        ))}
      </ul>
      {filteredEntries.length === 0 && <div>No mood entries match the selected tags.</div>}

      {/* Conditionally render the MoodChart and MoodRecommendations components */}
      {/* {showMoodChart && <MoodChart />}
      {showRecommendations && <MoodRecommendations />} */}
    </div>
  );
};

export default MoodHistory;
