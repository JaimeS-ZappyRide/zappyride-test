import React, { useState, useEffect } from 'react';
import MapContainer from './MapContainer.jsx';
import { FilterBox } from './FilterBox';
import './ChargersDisplay.css';

const api_key = "h8pP3dk3ZPgI694vYTHSFmgNboSVlXdknQ4hjNep";

export const ChargersDisplay = () => {
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({lat: 47.7511, lng: -120.7401, rad: "infinite", status: "E", networks: "all", level: "all", conn_type: "all", access: "public"});

    // Fetches station data from the Nearest Stations API.
    const callApi = () => {
        const { lat, lng, rad, status, networks, level, conn_type, access } = filters || {};
        fetch(`https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=${api_key}&latitude=${lat}&longitude=${lng}&radius=${rad}&status=${status}&ev_network=${networks}&ev_charging_level=${level}&ev_connector_type=${conn_type}&access=${access}&limit=all&fuel_type=ELEC&state=WA`)
            .then(res => res.json())
            .then(res => setResults(res.fuel_stations));
    }

    // Refetches when filters state changes.
    useEffect(() => {
        callApi();
    }, [filters]);

    // When a user changes a filter, refetch with the new filters to reflect changes.
    const refetchWithFilters = newFilters => {
        const { connector, status, network, level, access } = newFilters || {};
        if (!connector.length || !status.length || !network.length || !level.length || !access.length) {
            // In this case, no results should be shown as no types are selected.
            setResults([]);
        } else {
            const conn_types = connector.includes("All") ? "all" : connector.join().replace(/[-\s]/g, "").replace("CCS", "J1772COMBO").toUpperCase();
            const stats = status.includes("All") ? "all" : status.join().replace("Available", "E").replace("Planned", "P").replace("Temporarily Unavailable", "T");
            const networks = network.includes("All") ? "all" : network.join().replace(/\s/g, "+");
            const levels = level.includes("All") ? "all" : level.join().replace("Level 1", "1").replace("Level 2", "2").replace("DC Fast", "dc_fast").replace("Legacy", "legacy");
            const accs = access.includes("All?") ? "all" : access.join().toLowerCase();
            setFilters({...filters, status: stats, networks: networks, level: levels, conn_type: conn_types, access: accs});
        }
    }

	return (
        <React.Fragment>
            <div className="filters">
                <div className="searchBox">
                    <div className="inputLabel">Charging Stations in </div>
                    <input type="text" defaultValue="Seattle" className="input" size="10"/>
                    <div className="inputLabel">, WA</div>
                </div>
                <FilterBox refetch={refetchWithFilters}/>
            </div>
            <MapContainer results={results}/>
        </React.Fragment>
	);
}