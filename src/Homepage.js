import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Select } from 'antd';

import './App.css';
import {PROPERTIES_LIST} from './constants.js';

const { Header, Sider, Content} = Layout;
const {Option} = Select;

// make columns object generated with header: key, accessor: value of all relevant nh's
// feed react-table columns object

const statsRow = (header, first, second, third) => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="statsRow">
      <Col className="gutter-row" span={12}>
        <div className="rowHeader">{header}</div>
      </Col>
      <Col className="gutter-row" span={4}>
        <div>{first}</div>
      </Col>
      <Col className="gutter-row" span={4}>
        <div>{second}</div>
      </Col>
      <Col className="gutter-row" span={4}>
        <div>{third}</div>
      </Col>
    </Row>
  );
}

const Homepage = () => {
  const [geoData, setGeoData] = useState([]);
  const [denverData, setDenverData] = useState({});
  const [firstNeighbor, setFirstNeighbor] = useState({});
  const [secondNeighbor, setSecondNeighbor] = useState({});
  const [displayNeighbors, setDisplayNeighbors] = useState({});
  console.log(geoData);

  const changeNeighborhoodsToDisplay = () => {
    const neighborhoods = [denverData, firstNeighbor, secondNeighbor].filter(nh => (nh!==undefined && nh!==null && nh.length!==0));
    setDisplayNeighbors(PROPERTIES_LIST.map(property => ({
      [property.key]: neighborhoods.map(nh => nh[property.key])
    })));
  }

  const statsContent = () => {
    console.log("there are "+PROPERTIES_LIST.length+" properties");
    return (
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
          </Col>
          <Col className="gutter-row" span={4}>
            <div className="neighborhoodName">{firstNeighbor.neighborhood_name}</div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div className="neighborhoodName">{secondNeighbor.neighborhood_name}</div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div className="neighborhoodName">{denverData.neighborhood_name}</div>
          </Col>
        </Row>
        {PROPERTIES_LIST.map(property => (property.key==="neighborhood_id" ? null :
          statsRow(property.display, firstNeighbor[property.key], secondNeighbor[property.key], denverData[property.key])
        ))}
      </div>
    )
  }

  const getGeoData=()=>{
    console.log("getting json data")
    fetch( 'denver_mapping_data.geojson', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(json) {
      console.log(json.features);
      const propertiesList = json.features.map(features => features.properties);
      console.log(propertiesList);
      setGeoData(propertiesList);
      const denver = propertiesList.find(nh => {
        return nh.neighborhood_name === "Denver"
      });
      setDenverData(denver===undefined ? {} : denver);
      console.log("denver data "+JSON.stringify(denverData));
    })
  }
  
  useEffect( () => {
    getGeoData()
  }, []);

  const nhSelected = (value) => {console.log("selected "+value); changeNeighborhoodsToDisplay(value);}

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
          <Option value="">None</Option>
          {geoData.map(nh => (
            <Option value={nh.neighborhood_name}>{nh.neighborhood_name}</Option>
          ))}
        </Select>
      </div>
    )
  }

  const siderContent = () => {
    return (
      <div>
        <div className="siderHeader">NEIGHBORHOODS</div>
        {neighborhoodSelector(1)}
        {neighborhoodSelector(2)}
      </div>
    )
  }

  return (
    <div className="App">
      <Layout>
        <Sider className="sider">
          {siderContent()}
        </Sider>
        <Layout>
          <Header className="header">
            <div className="headerText">
              {firstNeighbor.neighborhood_name} VS {secondNeighbor.neighborhood_name}
            </div>
          </Header>
          <Content>
            {statsContent()}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Homepage;
