async function getData() {
    const response = await fetch("/api");
    const data = await response.json();

    data.forEach((el) => {
        const marker = L.marker([el.lat, el.lon]).addTo(mymap);

        const txt = `
        the weather here is
        ${el.weather.weather.description} with a temperture of
        ${el.weather.main.temp} degrees fahrenheit
        ${el.aq}
        `;

        marker.bindPopup(txt);
    });

    console.log(data);
}

//mapping
const mymap = L.map("map").setView([0, 0], 1);

const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">openStreetMap</a> contributors`;
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();
