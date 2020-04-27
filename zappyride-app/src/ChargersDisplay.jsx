import React, { useState, useEffect } from 'react';
import './App.css';
import MapContainer from './MapContainer.jsx';
import { FilterBox } from './FilterBox';

const api_key = "h8pP3dk3ZPgI694vYTHSFmgNboSVlXdknQ4hjNep";

export const ChargersDisplay = () => {
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({lat: 47.7511, lng: -120.7401, rad: "infinite", status: "all", networks: "all", level: "all", conn_type: "all"});

    const callApi = () => {
        const {lat, lng, rad, status, networks, level, conn_type} = filters;
        fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=${api_key}&latitude=${lat}&longitude=${lng}&radius=${rad}&status=${status}&ev_network=${networks}&ev_charging_level=${level}&ev_connector_type=${conn_type}&limit=all&fuel_type=ELEC&state=WA`)
            .then(res => res.json())
            .then(res => setResults(res.fuel_stations));
    }

    // Refetches when filters state changes.
    useEffect(() => {
        callApi();
    }, [filters]);

    // Inefficient - recalculates all filters when only one has changed.
    const refetchWithFilters = newFilters => {
        const {connector, status, network, level} = newFilters;
        if (!connector.length || !status.length || !network.length || !level.length) {
            // In this case, no results should be shown as no types are selected.
            setResults([]);
        } else {
            const conn_types = connector.includes("All") ? "all" : connector.join().replace(/[-\s]/g, "").replace("CCS", "J1772COMBO").toUpperCase();
            const stats = status.includes("All") ? "all" : status.join().replace("Available", "E").replace("Planned", "P").replace("Temporarily Unavailable", "T");
            const networks = network.includes("All") ? "all" : network.join().replace(/\s/g, "+");
            const levels = level.includes("All") ? "all" : level.join().replace("Level 1", "1").replace("Level 2", "2").replace("DC Fast", "dc_fast");
            setFilters({...filters, status: stats, networks: networks, level: levels, conn_type: conn_types});
        }
    }

	return (
        <React.Fragment>
            <div className="filters">
                {/* <div className="headerText">
                    WA Charging Stations
                </div> */}
                <FilterBox refetch={refetchWithFilters}/>
            </div>
            <MapContainer results={results}/>
        </React.Fragment>
	);
}