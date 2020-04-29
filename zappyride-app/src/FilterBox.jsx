import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Filter } from './Filter';
import { useEffect } from 'react';
import './FilterBox.css';

/**
 * Contains filters for connector type status, network, and level.
 * 
 * @param {function} refetch - function to update filters in parent component and trigger refetch of map results
 */
export const FilterBox = ({ refetch }) => {
    const connOptions = ["All", "NEMA 14-50", "NEMA 5-15", "NEMA 5-20", "J1772", "CCS", "CHAdeMO", "Tesla"];
    const statOptions = ["All", "Available", "Planned", "Temporarily Unavailable"];
    const netOptions = ["All", "Blink Network", "ChargePoint Network", "Circuit électrique", "eCharge Network", "Electrify America", "Electrify Canada", "EV Connect", "eVgo Network", "FLO", "FCN", "GE WattStation", "Greenlots", "Non-Networked", "OpConnect", "SemaCharge Network", "Sun Country Highway", "Tesla Destination", "Tesla", "Volta", "Webasto"]
    const levelOptions = ["All", "Level 1", "Level 2", "DC Fast", "Legacy"]
    const accessOptions = ["All", "Public", "Private"];
    const [filters, setFilters] = useState({connector: "All", status: "Available", network: "All", level: "All", access: "Public"});

    // Updates the current filter.
    const onSelect = (event, field) => {
        if (filters[field] !== event) {
            setFilters({...filters, [field]: event});
        }
    }

    // Refetches when filters state changes.
    useEffect(() => {
        refetch(filters);
    }, [filters]);

	return (
        <div className="filterBox">
            <Filter 
                title="Connector Type" 
                options={connOptions} 
                onSelect={e => onSelect(e, "connector")}
                active={filters.connector}
            />
            <Filter 
                title="Status" 
                options={statOptions} 
                onSelect={e => onSelect(e, "status")}
                active={filters.status}
            />
            <Filter 
                title="Network" 
                options={netOptions} 
                onSelect={e => onSelect(e, "network")}
                active={filters.network}
            />
            <Filter 
                title="Level" 
                options={levelOptions} 
                onSelect={e => onSelect(e, "level")}
                active={filters.level}
            />
            <Filter 
                title="Access" 
                options={accessOptions} 
                onSelect={e => onSelect(e, "access")}
                active={filters.access}
            />
        </div>
	);
}

FilterBox.propTypes = {
    refetch: PropTypes.func,
};