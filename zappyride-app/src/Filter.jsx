import React from 'react';
import { Dropdown } from "react-bootstrap";
import PropTypes from 'prop-types';
import './Filter.css';

/**
 * Allows user to filter results by a particular field. 
 * 
 * @param {string} title
 * @param {string[]} options
 * @param {function} onSelect
 * @param {string} active
 */
export const Filter = ({ title, options, onSelect, active }) => {
	return (
		<Dropdown>
        <Dropdown.Toggle className="toggle">{title} </Dropdown.Toggle>
          <Dropdown.Menu>
          {options.map(
              opt => 
                <div key={opt}>
                    {active === opt ? 
                        <Dropdown.Item className="boldItem" eventKey={opt} onSelect={onSelect}>
                            {opt}
                        </Dropdown.Item> :
                        <Dropdown.Item className="item" eventKey={opt} onSelect={onSelect}>
                            {opt}
                        </Dropdown.Item>
                    }
                  </div>)
          }
          </Dropdown.Menu>
      </Dropdown>
	);
}

Filter.propTypes = {
    title: PropTypes.string,
    options: PropTypes.array,
    onSelect: PropTypes.func,
    active: PropTypes.string,
};