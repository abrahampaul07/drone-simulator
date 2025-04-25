import React from 'react';

const ControlPanel = ({ isPlaying, onPlayPause, onReset }) => {
  return (
    <div style={{ margin: '10px 0' }}>
      <button onClick={onPlayPause} style={{ marginRight: '10px' }}>
        {isPlaying ? 'Pause' : 'Start'}
      </button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default ControlPanel;
