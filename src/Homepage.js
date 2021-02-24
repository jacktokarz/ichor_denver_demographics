import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useTable } from "react-table";

import './App.css';
import {PROPERTIES_LIST} from './constants.js';

const { Header, Footer, Sider, Content } = Layout;

// make columns object generated with header: key, accessor: value of all relevant nh's
// feed react-table columns object


const statsDisplay = (thisNH) => {
  
  return (
    <div>
      <h4>{thisNH.neighborhood_name}</h4>

    </div>
  )
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
    setDisplayNeighbors(PROPERTIES_LIST.map(property => return {
      [property]: neighborhoods.map(nh => nh[property])
    }));
  }

  const columns = useMemo(() =>
    {
      Header: "",
      accessor: "show.name"
    }
  );
  
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
      console.log(json);
      setGeoData(json);
      displayNeighbors.length === 0 ? addNeighborhoodToDisplay(json.features.find(nh => {
        return nh.neighborhood_name === "Denver"
      }));
    })
  }
  
  useEffect( () => {
    getGeoData()
  }, []);

  return (
    <div className="App">
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Homepage;
