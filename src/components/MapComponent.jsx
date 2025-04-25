import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue with Leaflet + Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const MapComponent = ({ coordinates, isPlaying, currentIndex, setCurrentIndex }) => {
  const [dronePosition, setDronePosition] = useState(null);

  useEffect(() => {
    if (coordinates.length > 0) {
      setDronePosition(coordinates[currentIndex]);
    }
  }, [coordinates, currentIndex]);

  useEffect(() => {
    let interval;
    if (isPlaying && coordinates.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < coordinates.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, coordinates, setCurrentIndex]);

  return (
    <MapContainer
      center={dronePosition || [37.7749, -122.4194]}
      zoom={15}
      style={{ height: '500px', width: '100%', marginTop: '20px' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {coordinates.length > 0 && (
        <>
          <Polyline positions={coordinates} color="blue" />
          {dronePosition && (
            <Marker position={dronePosition}>
              <Popup>Drone Position</Popup>
            </Marker>
          )}
        </>
      )}
    </MapContainer>
  );
};

export default MapComponent;
