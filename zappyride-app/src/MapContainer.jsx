import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import './MapContainer.css';

const MapContainer = ({ google, results }) => {
	const [activeMarker, setActiveMarker] = useState({});
	const [showInfo, setShowInfo] = useState(false);

	const onMarkerClick = (props, marker, e) => {
		if (marker !== activeMarker) {
			setActiveMarker(marker);
			setShowInfo(true);
		} else {
			setShowInfo(false);
		}
	}

	useEffect(() => {
        setShowInfo(false);
    }, [results]);

	return (
		<Map style={{
			width: "100%",
			marginLeft: 0
		  }}google={google} initialCenter={{lat: 47.6062, lng: -122.3321}}>
			{results && results.length && results.map(stn => {
				return <Marker 
					key={stn.id} 
					name={stn.station_name} 
					network={stn.ev_network}
					conn={stn.ev_connector_types}
					acc={stn.access_code}
					address={stn.street_address}
					city={stn.city}
					hours={stn.access_days_time}
					position={{lat: stn.latitude, lng: stn.longitude}}
					onClick={onMarkerClick}
				/>}
			)}
			<InfoWindow visible={showInfo} marker={activeMarker}>
				<table>
					<tr>
						<td className="infoLabel">Name:</td>
						<td>{activeMarker.name}</td>
					</tr>
					<tr>
						<td className="infoLabel">Hours:</td>
						<td>{activeMarker.hours && activeMarker.hours.includes("Not Specified") ? "Not Specified" : activeMarker.hours}</td>
					</tr>
					<tr>
						<td className="infoLabel">Location:</td>
						<td>{activeMarker.address}, {activeMarker.city}, WA</td>
					</tr>
					<tr>
						<td className="infoLabel">Access:</td>
						<td>{activeMarker.acc}</td>
					</tr>
					<tr>
						<td className="infoLabel">Network:</td>
						<td>{activeMarker.network}</td>
					</tr>
					<tr>
						<td className="infoLabel">Connector Types:</td>
						<td>{activeMarker.conn}</td>
					</tr>
				</table>
			</InfoWindow>
		</Map>
	);
}

MapContainer.propTypes = {
	google: PropTypes.object,
	results: PropTypes.array,
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBqgRvsHgJ5cuz6Spcdk6NDmQJ0V_uG_fY')
})(MapContainer);