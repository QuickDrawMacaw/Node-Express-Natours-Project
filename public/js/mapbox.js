/*eslint- disable*/

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoieWVydHRhbmdvIiwiYSI6ImNsNDI3NGl2YjRnMGEzYnA3d3p4aWl3dm4ifQ.NF4f-WCg4SA9BL__Vf59wA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/yerttango/cl429uli1001314ovdbetiqni',
    scrollZoom: false,
    //   center: [],
    //   zoom: 4,
    //   interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //Add marker
    const el = document.createElement('div');
    el.className = 'marker';

    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    //Add popup message
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description} <p>`)
      .addTo(map);
    //Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
