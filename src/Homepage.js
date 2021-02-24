import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';

import './App.css';
import SiderContent from './SiderContent.js';
import StatsRow from './StatsRow';
import {PROPERTIES_LIST} from './constants.js';
import { getGeoData } from './utilities.js'

const { Header, Sider, Content} = Layout;

// make columns object generated with header: key, accessor: value of all relevant nh's
// feed react-table columns object

const Homepage = () => {
  const [geoData, setGeoData] = useState([]);
  const [denverData, setDenverData] = useState({});
  const [firstNeighbor, setFirstNeighbor] = useState({});
  const [secondNeighbor, setSecondNeighbor] = useState({});

  const statsContent = () => {
    return (
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={11}>
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
        {PROPERTIES_LIST.map(property => (property.key==="neighborhood_id" || property.key==="neighborhood_name" ? null :
          StatsRow(property.display, firstNeighbor[property.key], secondNeighbor[property.key], denverData[property.key])
        ))}
      </div>
    )
  }
  
  useEffect( () => {
    getGeoData(setGeoData, setDenverData, denverData);
  }, []);

  return (
    <div className="App">
      <Layout>
        <Sider className="sider">
          <SiderContent geoData={geoData} setFirstNeighbor={setFirstNeighbor} setSecondNeighbor={setSecondNeighbor} />
        </Sider>
        <Layout>
          <Header className="header">
            <div className="headerText">
              {firstNeighbor.neighborhood_name} VS {secondNeighbor.neighborhood_name}
            </div>
          </Header>
          <Content className="content">
            {statsContent()}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Homepage;
