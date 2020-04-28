import React from 'react';
import { Dropdown } from "react-bootstrap";
import PropTypes from 'prop-types';
import './Filter.css';

export const Filter = ({ title, options, onSelect, active }) => {
	return (
		<Dropdown>
        <Dropdown.Toggle className="toggle">{title} </Dropdown.Toggle>
          <Dropdown.Menu>
          {options.map(
              opt => 
                <div key={opt}>
                    {active.includes(opt) ? 
                        <Dropdown.Item className="boldItem" eventKey={opt} onSelect={onSelect}>
                            {opt}
                        </Dropdown.Item> :
                        <Dropdown.Item className="item" eventKey={opt} onSelect={onSelect}>
                            {opt}
                        </Dropdown.Item>
                    }
                    {opt === "All" && <Dropdown.Divider/>}
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
    active: PropTypes.array,
};