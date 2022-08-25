import "./App.css";
import Map from "./components/Map";
import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
// import useOnclickOutside from "react-cool-onclickoutside";

export default function App() {
  const [lati, setLati] = useState(36.171563);
  const [longi, setLongi] = useState(-115.1391009);
  const [livelocation, setLivelocation] = useState(true);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  // const ref = useOnclickOutside(() => {
  //   // When user clicks outside of the component, we can dismiss
  //   // the searched suggestions by calling this method
  //   clearSuggestions();
  // });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      console.log("handel pkr liya hai");
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
        setLati(lat);
        setLongi(lng);
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      // console.log(suggestion);
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}sd</small>
        </li>
      );
    });
  const getposition = () => {
    navigator.geolocation.getCurrentPosition(showPosition);
  };
  const showPosition = (position) => {
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
    setLati(position.coords.latitude);
    setLongi(position.coords.longitude);
    setLivelocation(false);
  };
  if (navigator.geolocation) {
    console.log("Geo Location Available");
    console.log(livelocation);
    if (livelocation) {
      getposition();
    }
  } else {
    console.log("Geo Not Available");
  }
  // const { isLoaded } = useLoadScript({
  //   googleMapsApikey: "AIzaSyDpICQ0ywhJWL484i8jMbzzgQ5uciKmLq4",
  // });
  // if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="app-container">
        <div className="nav bg-green-700">
          <div className="nav-wrap">
            <div className="search-bar">
              <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                className="input-bar ml-5"
                type="text"
                name="box"
                placeholder="Type Here to Search Anything on GOOGLE MAP"
              />
              <span className="search-icon mr-1" onClick={() => getposition()}>
                <i className="fa-solid fa-solid fa-location-crosshairs"></i>
              </span>
            </div>

            {status === "OK" && (
              <ul className="suggestion-list">{renderSuggestions()}</ul>
            )}
          </div>
        </div>

        <Map lati={lati} longi={longi} />
      </div>
    </>
  );
}
