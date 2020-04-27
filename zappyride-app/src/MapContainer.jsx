import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import './App.css';

const MapContainer = ({google, results}) => {
	return (
		<Map style={{
			width: "100%",
			marginLeft: 0
		  }}google={google} initialCenter={{lat: 47.6062, lng: -122.3321}}>
			{results.length && results.map(stn => {
				return <Marker key={stn.id} position={{lat: stn.latitude, lng: stn.longitude}}/>
			})}
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