import { getLocation } from "@/app/api";
import { Dispatch, SetStateAction } from "react";

const fetchUserCity = (
  setStateCity: Dispatch<SetStateAction<string | null>>
) => {
  navigator.geolocation.getCurrentPosition((position) => {
    const promise = getLocation(position);
    promise
      .then((res) => {
        const city = res.data.address.city;
        setStateCity(city);
      })
      .catch((error) => {
        console.error(
          "não foi possível identificar a cidade em que se encontra. ",
          error
        );
        return "";
      });
  });
};

const noticesFunctions = {
  fetchUserCity,
};

export default noticesFunctions;
