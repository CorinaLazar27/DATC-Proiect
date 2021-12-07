import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { Marker } from "react-google-maps";

export default function GoogleMapForm(){

function Map()
{
  const [markers, setMarkers]= React.useState([]);
    return(
      <div>
      < GoogleMap
      defaultZoom ={10}
      defaultCenter={{lat:45.8963176,lng:23.4838633}}
      onClick={(event)=>{
        setMarkers((current) =>[
          ...current,
        {
          lat:event.latLng.lat(),
          lng:event.latLng.lng(),
          time: new Date(),
        },
      ]);
      }}>
        {markers.map((marker) =>(
        < Marker key={marker.time.toISOString()}
        position={{lat:marker.lat,lng: marker.lng}}/>
        ))}
         
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

