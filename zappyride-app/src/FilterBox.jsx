import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { Filter } from './Filter';
import { useEffect } from 'react';
import './FilterBox.css';

export const FilterBox = ({ refetch }) => {
    const connOptions = ["All", "NEMA 14-50", "NEMA 5-15", "NEMA 5-20", "J1772", "CCS", "CHAdeMO", "Tesla"];
    const statOptions = ["All", "Available", "Planned", "Temporarily Unavailable"];
    const netOptions = ["All", "Blink Network", "ChargePoint Network", "Circuit électrique", "eCharge Network", "Electrify America", "Electrify Canada", "EV Connect", "eVgo Network", "FLO", "FCN", "GE WattStation", "Greenlots", "Non-Networked", "OpConnect", "SemaCharge Network", "Sun Country Highway", "Tesla Destination", "Tesla", "Volta", "Webasto"]
    const levelOptions = ["All", "Level 1", "Level 2", "DC Fast", "Legacy"]
    const accessOptions = ["All", "Public", "Private"];
    const [filters, setFilters] = useState({connector: connOptions, status: ["Available"], network: netOptions, level: levelOptions, access: ["Public"]});

    // Updates the active options for a given filter.
    const getActiveFilters = (event, currFilters, options)  => {
        if (!currFilters.includes(event)) {
            // Add element to active filters. If "All", add all options.
            return event === "All" ? options : [...currFilters, event]
        } else {
            // Remove element from active filters.
            if (event === "All") {
                return[];
            } else if (currFilters.includes("All")) {
                return currFilters.filter(a => a !== event && a !== "All");
            } else {
                return currFilters.filter(a => a !== event);
            }
        }
    }
    
    // When user changes the connector filter, update which options are active.
    const onConnectorSelect = event => {
        const activeFilters = getActiveFilters(event, filters.connector, connOptions);
        setFilters({...filters, connector: activeFilters});
    }

    const onStatusSelect = event => {
        const activeFilters = getActiveFilters(event, filters.status, statOptions);
        setFilters({...filters, status: activeFilters});
    }

    const onNetworkSelect = event => {
        const activeFilters = getActiveFilters(event, filters.network, netOptions);
        setFilters({...filters, network: activeFilters});
    }

    const onLevelSelect = event => {
        const activeFilters = getActiveFilters(event, filters.level, levelOptions);
        setFilters({...filters, level: activeFilters});
    }

    const onAccessSelect = event => {
        const activeFilters = getActiveFilters(event, filters.access, accessOptions);
        setFilters({...filters, access: activeFilters});
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
                onSelect={onConnectorSelect}
                active={filters.connector}
            />
            <Filter 
                title="Status" 
                options={statOptions} 
                onSelect={onStatusSelect}
                active={filters.status}
            />
            <Filter 
                title="Network" 
                options={netOptions} 
                onSelect={onNetworkSelect}
                active={filters.network}
            />
            <Filter 
                title="Level" 
                options={levelOptions} 
                onSelect={onLevelSelect}
                active={filters.level}
            />
            <Filter 
                title="Access" 
                options={accessOptions} 
                onSelect={onAccessSelect}
                active={filters.access}
            />
        </div>
	);
}

FilterBox.propTypes = {
    refetch: PropTypes.func,
};