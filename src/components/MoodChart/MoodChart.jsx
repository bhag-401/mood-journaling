import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the Chart.js components automatically
import { useMood } from '../../context/MoodContext'; // Import the useMood hook

const MoodChart = () => {
  const { moodEntries } = useMood(); // Get mood entries from context
  const moods = ['happy', 'sad', 'angry', 'anxious', 'excited', 'relaxed'];

  // Prepare data for the chart
  const moodCounts = moods.map(mood => moodEntries.filter(entry => entry.mood === mood).length);
  
  const data = {
    labels: moods,
    datasets: [
      {
        label: 'Mood Count',
        data: moodCounts,
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)', // Yellow for happy
          'rgba(75, 192, 192, 0.6)', // Teal for sad
          'rgba(255, 99, 132, 0.6)',  // Red for angry
          'rgba(54, 162, 235, 0.6)',  // Blue for anxious
          'rgba(153, 102, 255, 0.6)', // Purple for excited
          'rgba(255, 159, 64, 0.6)',  // Orange for relaxed
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mood-chart">
      <h2>Mood Chart</h2>
      <div style={{ height: '400px', width: '100%' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MoodChart;
