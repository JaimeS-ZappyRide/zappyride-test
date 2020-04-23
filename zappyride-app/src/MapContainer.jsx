import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export const MapContainer = ({google}) => {
	const [results, setResults] = useState({});

	const callApi = () => {
	    fetch('https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=h8pP3dk3ZPgI694vYTHSFmgNboSVlXdknQ4hjNep&latitude=47.7511&longitude=-120.7401&radius=infinite&limit=all&state=WA')
	        .then(res => res.json())
	        .then(res => setResults(res.fuel_stations));
    }

	return (
		<div>
			<Map google={google} initialCenter={{lat: 47.6062, lng: -122.3321}} onReady={callApi}>
				{results.length && results.map(stn => {
					return <Marker key={stn.id} position={{lat: stn.latitude, lng: stn.longitude}}/>
				})}
			</Map>
		</div>
	);
}

MapContainer.propTypes = {
    google: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBqgRvsHgJ5cuz6Spcdk6NDmQJ0V_uG_fY')
})(MapContainer);