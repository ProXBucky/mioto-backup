import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix icon issue with leaflet in React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const MapComponent = ({ locationName }) => {
    const [position, setPosition] = useState([0, 0]); // Tọa độ
    const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi

    useEffect(() => {
        if (locationName) {
            handleSearch(locationName);
        }
    }, [locationName]);

    const handleSearch = async (loc) => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: loc,
                    format: 'json',
                    addressdetails: 1,
                    limit: 1
                }
            });
            const data = response.data;
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setPosition([parseFloat(lat), parseFloat(lon)]);
            } else {
                setErrorMessage('Không tìm thấy địa điểm.');
            }
        } catch (error) {
            console.error('Lỗi khi tìm kiếm địa điểm:', error);
            setErrorMessage('Đã xảy ra lỗi khi tìm kiếm địa điểm.');
        }
    };

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        {locationName}
                    </Popup>
                </Marker>
                <Circle center={position} radius={3000} />
                {position && <ChangeView center={position} zoom={13} />}
            </MapContainer>
        </div>
    );
};

// Component ChangeView giúp bản đồ zoom vào vị trí mới
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

export default MapComponent;
