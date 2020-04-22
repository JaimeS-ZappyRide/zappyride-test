import React from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export const MapContainer = ({google}) => {
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
  apiKey: ('AIzaSyA-Vbcywqd7a3ulv1f0jIzCb1iZlGLw7Gg')
})(MapContainer);