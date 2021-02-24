
export const getGeoData= (setGeoData, setDenverData, denverData) =>{
    fetch( 'denver_mapping_data.geojson', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    .then(function(response) {
      // console.log(response);
      return response.json();
    })
    .then(function(json) {
      const propertiesList = json.features.map(features => features.properties);
      setGeoData(propertiesList);
      const denver = propertiesList.find(nh => {
        return nh.neighborhood_name === "Denver"
      });
      setDenverData(denver===undefined ? {} : denver);
    })
  }