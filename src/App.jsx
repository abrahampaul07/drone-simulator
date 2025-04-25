import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import ControlPanel from './components/ControlPanel';
import FileUpload from './components/FileUpload';
import ManualInput from './components/ManualInput';
import './App.css';

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const handleFileUpload = (newCoords) => {
    setCoordinates(newCoords);
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const handleManualCoordinate = (newCoord) => {
    setCoordinates((prev) => [...prev, newCoord]);
  };

  return (
    <div className="app-container">
      <h1>Drone Motion Simulator</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <ManualInput onAddCoordinate={handleManualCoordinate} />
      <ControlPanel isPlaying={isPlaying} onPlayPause={handlePlayPause} onReset={handleReset} />
      <MapComponent
        coordinates={coordinates}
        isPlaying={isPlaying}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default App;
