// for the map
var map = L.map("map").setView([51.513, -0.09], 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.513, -0.09])
  .addTo(map)
  .bindPopup("Here is the location")
  .openPopup();

// when the user clicks then this function is executed
const searchip = () => {
  const address = document.querySelector(".domain").value;
  const country = document.querySelector(".country");
  const ipaddress = document.querySelector(".ipaddress");
  const timezone = document.querySelector(".timezone");
  const continent = document.querySelector(".continent");

  if (address == "") {
    alert("field can't be empty");
  } else {
    const url = "https://ip-location5.p.rapidapi.com/get_geo_info";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "2dea794091mshc1104f41f313a87p1bb54bjsn1889793ae679",
        "X-RapidAPI-Host": "ip-location5.p.rapidapi.com",
      },
      body: new URLSearchParams({
        ip: `${address}`,
      }),
    };

    try {
      async function fetchingtheip() {
        let response = await fetch(url, options)
          .then((response) => response.json())
          .then((finaldata) => {
            console.log(finaldata)
              address
                    ipaddress.textContent = finaldata.ip;
                    //   location section
                    country.textContent =
                      finaldata.country.name
                    //   city
                    timezone.textContent = finaldata.city;
                    //   isp section
                      continent.textContent = finaldata.continent.name;
                      L.marker([finaldata.latitude, finaldata.longitude])
                        .addTo(map)
                        .bindPopup("location of "+ `${address}`)
                        .openPopup();
          });
      }

      fetchingtheip(); // Call the function here
    } catch (error) {
      console.error(error);
    }
  }
};

