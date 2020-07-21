import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ progress }) => (
  <div className="ProgressBar">
    <div
      className="Progress"
      style={{ width: `${progress}%` }}
    />
  </div>
);
Progress.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Progress;
