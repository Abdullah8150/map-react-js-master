import React from "react";
import { GoogleMap, CircleF, MarkerF } from "@react-google-maps/api";
function Map({ lati, longi, livePin }) {
  const center = {
    lat: livePin[0],
    lng: livePin[1],
    // lat: livePin[0] ? livePin[0] : 0,
    // lng: livePin[1] ? livePin[1] : 0,
  };

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 20,
    zIndex: 1,
  };
  const onLoad = (marker) => {
    // console.log("marker: ", marker);
    // console.log(position);
  };
  return (
    <>
      <GoogleMap
        zoom={18}
        center={{ lat: lati, lng: longi }}
        mapContainerClassName="map-container"
      >
        <MarkerF onLoad={onLoad} position={{ lat: lati, lng: longi }} />

        <CircleF
          // optional
          // onLoad={onLoad}
          // optional
          // onUnmount={onUnmount}
          // required
          center={center}
          // required
          options={options}
        />
      </GoogleMap>
    </>
  );
}
export default Map;
