import React, { useState } from 'react';

const ManualInput = ({ onAddCoordinate }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      setError('Please enter valid numbers for latitude and longitude.');
      return;
    }

    onAddCoordinate({ lat: latNum, lng: lngNum });
    setLat('');
    setLng('');
    setError('');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Manual Coordinate Entry</h3>
      <input
        type="text"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleAdd}>Add Coordinate</button>
      {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
    </div>
  );
};

export default ManualInput;
