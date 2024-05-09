import axios from "axios";

export async function getLocation(position: GeolocationPosition) {
  const url =
    "http://nominatim.openstreetmap.org/reverse?lat=" +
    position.coords.latitude +
    "&lon=" +
    position.coords.longitude +
    "&format=json";

  const promise = axios.get(url);
  return promise;
}
