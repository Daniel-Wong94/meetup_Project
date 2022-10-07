import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const Maps = ({ apiKey, lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const center = { lat, lng };

  return (
    <>
      {isLoaded && (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
          >
            <Marker position={center} />
          </GoogleMap>
        </>
      )}
    </>
  );
};

export default React.memo(Maps);
