import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export const MapContainer = ({google}) => {
	const [results, setResults] = useState([]);

	const callApi = () => {
	    fetch('https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=h8pP3dk3ZPgI694vYTHSFmgNboSVlXdknQ4hjNep&location=Seattle+WA')
	        .then(res => res.json())
	        .then(res => setResults(res));
    }

    useEffect(callApi, []);

	return (
		<div>
			<Map google={google}/>
		</div>
	);
}

MapContainer.propTypes = {
    google: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBqgRvsHgJ5cuz6Spcdk6NDmQJ0V_uG_fY')
})(MapContainer);