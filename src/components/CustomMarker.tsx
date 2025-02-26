import { Icon } from "leaflet";

const customMarker = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

export default customMarker;
