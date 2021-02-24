import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const {Option} = Select;


const SiderContent = ({geoData, setFirstNeighbor, setSecondNeighbor}) => {
	const neighborhoodSelector = (number) => {
		return (
		  <div>
		    <div className="selectorHeader">Neighborhood {number}</div>
		    <Select className="selecter"
		      onChange = {(value) => {
		        const nh = geoData.find(entry => entry.neighborhood_name === value);
		        if (number===1) {
		          setFirstNeighbor(nh===undefined ? {} : nh);
		        }
		        else if (number === 2) {
		          setSecondNeighbor(nh===undefined ? {} : nh);
		        }
		      }}
		    >
		      <Option key="null" value="">None</Option>
		      {geoData.map(nh => (
		        <Option key={nh.neighborhood_name} value={nh.neighborhood_name}>{nh.neighborhood_name}</Option>
		      ))}
		    </Select>
		  </div>
		)
	}

	return (
	  <div>
	    <div className="siderHeader">NEIGHBORHOODS</div>
	    {neighborhoodSelector(1)}
	    {neighborhoodSelector(2)}
	  </div>
	)
}

export default SiderContent;