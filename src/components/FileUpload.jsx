import React, { useState } from 'react';
import Papa from 'papaparse';

const FileUpload = ({ onFileUpload }) => {
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      parseFile(file);
    }
  };

  const parseFile = (file) => {
    if (file.type === 'application/json') {
      parseJSON(file);
    } else if (file.type === 'text/csv') {
      parseCSV(file);
    } else {
      setError('Invalid file type. Please upload CSV or JSON.');
    }
  };

  const parseJSON = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const valid = data.filter((point) => !isNaN(point.lat) && !isNaN(point.lng));
        onFileUpload(valid);
      } catch (err) {
        setError('Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        const data = result.data
          .map((row) => {
            const lat = parseFloat(row[0]);
            const lng = parseFloat(row[1]);
            return !isNaN(lat) && !isNaN(lng) ? { lat, lng } : null;
          })
          .filter(Boolean);
        onFileUpload(data);
      },
      error: () => setError('Error parsing CSV file.'),
    });
  };

  return (
    <div>
      <input type="file" accept=".csv,.json" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
