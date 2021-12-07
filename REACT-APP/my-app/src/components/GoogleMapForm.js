import React,{useState} from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { Marker } from "react-google-maps";
import Geocode from "react-geocode";


export default function GoogleMapForm(){


function Map()
{
  const [location,setLocation] =useState({latitudeMe:0.0,longitudeMe:0.0});
  const getLocation=()=>
  {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);}
      else{
        alert("Nu este suportata de acest browser");
      }
    }
  
    const showPosition=(position)=>
    {
      setLocation({...location, latitudeMe: position.coords.latitude, longitudeMe:position.coords.longitude});
  
    }
    
    getLocation();

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
  Geocode.setLanguage("ro");
  Geocode.setRegion("ro");
  Geocode.setLocationType("ROOFTOP");
    
  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  const [markers, setMarkers]= React.useState([]);
  
  
  const [location1,setLocation1] =useState([]);
  
 
    return(
      <div>
      < GoogleMap
      zoom={15}
      center={{lat:Number(location.latitudeMe),lng:Number(location.longitudeMe)}}
      onClick={(event)=>{


      console.log(location.latitudeMe,location.longitudeMe);
    

       Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
        (response) => {
          const address = response.results[0].formatted_address;
       
          setLocation1(address);
          console.log(location1);
        },
        (error) => {
          console.error(error);
        }
      );


      
        setMarkers((current) =>[
          ...current,
        {
          lat:event.latLng.lat(),
          lng:event.latLng.lng(),
          time: new Date(),
        },
      ]);
      }}>
        {
        
        markers.map((marker) =>(
        < Marker
                   key={marker.time.toISOString()}
                   position={{lat:marker.lat,lng: marker.lng}}
       />
       
        )
       
        
        )
        }
         
        </GoogleMap>
        </div>
      
    );
}

  const WrappedMap = withScriptjs(withGoogleMap(Map));
  
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      ></WrappedMap>
    </div>
  );
};

