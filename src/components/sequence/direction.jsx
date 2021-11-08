import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer,Marker } from 'react-google-maps';


class DirectionMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
          directions:[]
        };
      }


     renderDirection(origin,destination){
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: [...this.state.directions,result]
            });
            console.log("state",this.state);
            console.log("result",result);
            
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
     }


  render() {
    if(this.props.post){ 
      const dList=this.props.post;
      const start=this.props.start; 
      console.log("post",this.props.post)   
    const newarr = [];
    {dList.length >0 ? dList.map((d,i) =>{
      if((i===0)) {
        const element = {origin:{lat:parseFloat(start.latitude),lng:parseFloat(start.longitude)},destination:{lat:parseFloat(dList[i].coords[0]),lng:parseFloat(dList[i].coords[1])}};
        newarr.push(element);
      }
      if( (i!=0)) {
        const element = {origin:{lat:parseFloat(dList[i-1].coords[0]),lng:parseFloat(dList[i-1].coords[1])},destination:{lat:parseFloat(dList[i].coords[0]),lng:parseFloat(dList[i].coords[1])}};
        newarr.push(element);
      }
      if((i===dList.length-1)) {
        const element = {origin:{lat:parseFloat(dList[i].coords[0]),lng:parseFloat(dList[(dList.length)-1].coords[1])},destination:{lat:parseFloat(start.latitude),lng:parseFloat(start.longitude)}};
        newarr.push(element);
      }
  })  :<></>                }
        
       for(let route of newarr){
        this.renderDirection(route.origin,route.destination);
       }     
              

      const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
          defaultZoom = { 5 }          
        >
          {/* <Marker position={{ lat: 6.8028, lng: 80.8091}} /> */}
         
        {this.state.directions.map((d,i)=>
        <div>          
        <DirectionsRenderer
          directions={d}
          key={i}
          >
          
        </DirectionsRenderer>
        
        
        </div>
      )}

      </GoogleMap>
     ));
      return(        
        <div>          
          <GoogleMapExample
            containerElement={ <div style={{ height: `400px`, width:"100%" }} /> }
            mapElement={ <div style={{ height: `100%`}} /> }
          />
        </div>
       
        
     );
      
      }else{
        return(
          <h1></h1>
        )
      }
   // console.log("direction",this.props.post )    
    
    
   }
};
export default DirectionMap;