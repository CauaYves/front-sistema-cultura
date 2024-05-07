function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK" && data.results.length > 0) {
            // Procura pelo componente "locality" no resultado da geocodificação
            const location = data.plus_code.compound_code;
            const locationComma = location.indexOf(",");
            const county = location.slice(8, locationComma);
            alert(county);
          } else {
            console.error(
              "Não foi possível encontrar o endereço para as coordenadas fornecidas."
            );
          }
        })
        .catch((error) => {
          console.error("Ocorreu um erro ao processar a solicitação:", error);
        });
    });
  }
}
export { getLocation };
