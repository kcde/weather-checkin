const checkinBtn = document.querySelector(".checkin-btn");
const checkins = document.querySelector(".checkins")
const checkin = document.querySelector(".checkin")
const checkinsBtn = document.querySelector(".checkins-btn")
const summary = document.querySelector(".summary")
const temp = document.querySelector(".temp")
const linkSource = document.querySelector(".source")







    







// to check for goelocation and sending info to database
if ("geolocation" in navigator) {
    console.log("geoloacation availbale");

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        document.querySelector(".latitude").textContent = lat.toFixed(2);
        document.querySelector(".longitude").textContent = lon.toFixed(2);
        const api_url =`weather/${lat},${lon}`;
        const response = await fetch(api_url)
        const json = await response.json();
        const weather = json.weather;
        const aq = json.air_quality.meta.website;
        console.log(json);
        summary.textContent = weather.weather[0].description ;
        temp.textContent = weather.main.temp;
        linkSource.textContent = aq;


        const data = { lat, lon, weather, aq };
        const options = {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };
       
       
      
      
       const post_response = await fetch("/api", options);
       const resJson = await post_response.json();
       console.log(resJson);

    });
} else {
    console.log(" geolocation not available");
}







