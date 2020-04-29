import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer.jsx';
import { FilterBox } from './FilterBox';
import './ChargersDisplay.css';

/**
 * Displays all EV charging stations in Washington by interacting with the Nearest Stations and Google Maps Geocoder APIs.
 * Allows user to filter results and to recenter the map by zip code.
 */
export const ChargersDisplay = () => {
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({lat: 47.6062, lng: -122.3321, rad: "infinite", status: "E", network: "all", level: "all", conn_type: "all", access: "public"});
    const [center, setCenter] = useState({lat: filters.lat, lng: filters.lng});
    const [city, setCity] = useState("Seattle");
    const [inputClass, setInputClass] = useState("inputValid");

    // Fetches station data from the Nearest Stations API.
    const callApi = () => {
        const { lat, lng, rad, status, network, level, conn_type, access } = filters || {};
        fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=h8pP3dk3ZPgI694vYTHSFmgNboSVlXdknQ4hjNep&latitude=${lat}&longitude=${lng}&radius=${rad}&status=${status}&ev_network=${network}&ev_charging_level=${level}&ev_connector_type=${conn_type}&access=${access}&limit=all&fuel_type=ELEC&state=WA`)
            .then(res => res.json())
            .then(res => setResults(res.fuel_stations));
    }

    // Find the coordinates for an entered zip code and adjust the map center accordingly.
    const callGeocoder = zip => {
        if (zip.length === 5) {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?bounds=-124.763068,45.543541|-116.915989,49.002494&address=${zip},+WA&key=AIzaSyBqgRvsHgJ5cuz6Spcdk6NDmQJ0V_uG_fY`)
                .then(res => res.json())
                .then(res => {
                    if (res.results.length > 0 && res.results[0].address_components.length > 3) {
                        const state = res.results[0].address_components[3].short_name;
                        if (state === "WA") {
                            setCenter(res.results[0].geometry.location)
                            setCity(res.results[0].address_components[2].long_name);
                            setInputClass("inputValid");
                        }
                    } else {
                        setInputClass("inputInvalid");
                    }
                });
        } else {
            setInputClass("inputInvalid");
        }
    }

    // Refetches when filters state changes.
    useEffect(() => {
        callApi();
    }, [filters]);

    // When a user changes a filter, refetch with the new filters to reflect changes.
    const refetchWithFilters = newFilters => {
        const { connector, status, network, level, access } = newFilters || {};
        const conn = connector === "All" ? "all" : connector.replace(/[-\s]/g, "").replace("CCS", "J1772COMBO").toUpperCase();
        const stat = status === "All" ? "all" : status.replace("Available", "E").replace("Planned", "P").replace("Temporarily Unavailable", "T");
        const net = network === "All" ? "all" : network.replace(/\s/g, "+");
        const lev = level === "All" ? "all" : level.replace("Level 1", "1").replace("Level 2", "2").replace("DC Fast", "dc_fast").replace("Legacy", "legacy");
        const acc = access === "All" ? "all" : access.toLowerCase();

        setFilters({...filters, status: stat, network: net, level: lev, conn_type: conn, access: acc});
    }

	return (
        <React.Fragment>
            <div className="filters">
                <div className="searchBox">
                    <div className="inputLabel">Find Charging Stations in: </div>
                    <div className="inputLabelGreen">{city}</div>
                    <div className="inputLabel">, WA </div>
                    <input type="text" defaultValue="98101" className={inputClass} size="5" onChange={e => callGeocoder(e.target.value)}/>
                </div>
                <FilterBox refetch={refetchWithFilters}/>
            </div>
            <MapContainer results={results} center={center}/>
        </React.Fragment>
	);
}