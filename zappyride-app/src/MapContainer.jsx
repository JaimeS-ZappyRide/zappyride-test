import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import './App.css';

const MapContainer = ({google, results}) => {
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

	return (
		<Map style={{
			width: "100%",
			marginLeft: 0
		  }}google={google} initialCenter={{lat: 47.6062, lng: -122.3321}}>
			{results.length && results.map(stn => 
				<Marker 
					key={stn.id} 
					name={stn.station_name} 
					position={{lat: stn.latitude, lng: stn.longitude}}
					onClick={onMarkerClick}
				/>
			)}
			<InfoWindow visible={showInfo} marker={activeMarker}>
				<div>{activeMarker.name}</div>
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