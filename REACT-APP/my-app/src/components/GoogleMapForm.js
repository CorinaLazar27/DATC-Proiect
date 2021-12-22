import React,{useState} from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { Marker } from "react-google-maps";
import Geocode from "react-geocode";
import axios from "axios";

export default function GoogleMapForm(){

  
function Map()
{
  const putLocationToDataBase= async () => {

    const data = {
      PartitionKey: "corinaa@yahoo.com",
      RowKey: "invalid",
      Latitude: locationToDataBase.lat,
      Longitude: locationToDataBase.long
    };

    await axios
      .post("/request",data,

      )
      .then((response) => response)
      .then((json) => {
        console.log(json.data);
        return json.data;
      });

     
  };
  
  const [location,setLocation] =useState({latitudeMe:"",longitudeMe:""});
  const [locationToDataBase,setLocationToDataBase]=useState({lat:"",long:""});
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
      zoom={18}
      center={
        { lat: Number(location.latitudeMe),
          lng: Number(location.longitudeMe)}
        }
      onClick={(event)=>{
      
      
      putLocationToDataBase();
      console.log([locationToDataBase.lat,locationToDataBase.long]);

       Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
        (response) => {
          const address = response.results[0].formatted_address;

          setLocation1(address);
          console.log(location1);
          setLocationToDataBase({...locationToDataBase, lat : response.results[0].geometry.location.lat, long : response.results[0].geometry.location.lng});
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
      }}
      >
        {
        
        markers.map((marker) =>
        (
         
        < Marker
                   key={marker.time.toISOString()}
                   position={{lat:marker.lat,lng: marker.lng}}
                      set
                 icon={{
                   url:"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
                  }
                }
       />
        )
        )
        }
        </GoogleMap>
        </div>
      
    );
}
function refreshPage() {
  window.location.reload(false);
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
       <div>
      <button onClick={refreshPage}>Click to refresh map!</button>
    </div>
    </div>
  );
};

