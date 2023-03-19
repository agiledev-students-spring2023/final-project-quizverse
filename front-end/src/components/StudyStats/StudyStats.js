import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudyStats.css';

/**
 * A React component that represents the StudyStats page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const StudyStats = (props) => {
  const [data1, setData1] = useState('banana');
  const [data2, setData2] = useState('apostrophe');
  const [data3, setData3] = useState('darkest depths of the ocean');
  return (
    <>
      <main>
        <div className="logo-container">
          <img src={process.env.PUBLIC_URL + '/QuizVerseLogo.png'} alt="QuizVerse" />
        </div>
        <div>
          <h1>StudyStats</h1>
        </div>
        <div className="settings-buttons-container">
          <button className="study-stats-button">Most Commonly Missed 1: {data1}</button>
          <button className="study-stats-button">Most Commonly Missed 2: {data2}</button>
          <button className="study-stats-button">Most Commonly Missed 3: {data3}</button>
        </div>
      </main>
    </>
  );
};

// make this component available to be imported into any other file
export default StudyStats;