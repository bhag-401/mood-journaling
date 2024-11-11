import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TagFilter.css';

const TagFilter = ({ tags, onFilter }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag) // Remove tag if already selected
        : [...prevSelected, tag] // Add tag if not selected
    );
  };

  const handleFilter = () => {
    onFilter(selectedTags);
  };

  return (
    <div className="tag-filter">
      <h3>Filter by Tags</h3>
      <div className="tags-container">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
      <button className="filter-button" onClick={handleFilter}>
        Apply Filter
      </button>
    </div>
  );
};

TagFilter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default TagFilter;
