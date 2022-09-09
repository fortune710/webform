
const API_URL = "https://iiqama-api.herokuapp.com/mosque"
const form = document.getElementById("form");


const getCoordinatesButton = document.getElementById("btn-coords").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        document.getElementById("latitude").setAttribute("value", position.coords.latitude) 
        document.getElementById("longitude").setAttribute("value", position.coords.longitude)
    })
})


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const mosqueName = document.getElementById("mosque-name").value;
    const mosqueAddress = document.getElementById("mosque-address").value;
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;
    const imamName = document.getElementById("imam-name").value;

    const contactPersonNumber = document.getElementById("phone-number-1").value;

    


    const prayers = {
        fajr: {
            azan: document.getElementById("fajr-azan-time")?.value,
            iqama: document.getElementById("fajr-iqama-time")?.value
        },
        dhuhr: {
            azan: document.getElementById("dhuhr-azan-time")?.value,
            iqama: document.getElementById("dhuhr-iqama-time")?.value
        },
        asr: {
            azan: document.getElementById("asr-azan-time")?.value,
            iqama: document.getElementById("asr-iqama-time")?.value
        },
        maghrib: {
            azan: document.getElementById("mahgrib-azan-time")?.value,
            iqama: document.getElementById("mahgrib-iqama-time")?.value
        },
        isha: {
            azan: document.getElementById("isha-azan-time")?.value,
            iqama: document.getElementById("isha-iqama-time")?.value
        },
        jumaat: {
            azan: document.getElementById("jumaat-azan-time")?.value,
            iqama: document.getElementById("jumaat-iqama-time")?.value
        },
    }

    
    fetch(API_URL+"/create", {
        method: "POST",
        mode: "no-cors",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            name: mosqueName,
            address: mosqueAddress,
            imam_name: imamName,
            latitude: Number(latitude),
            longitude: Number(longitude),
            phone_number: contactPersonNumber,
            prayers: prayers
        })
    })
    .then(res => res.json())
    .then(result => {
        alert("Mosque added sucessfully")
        localStorage.setItem("mosque", JSON.stringify(result.data.reponse))
    })
    .then(() => window.location.pathname = "webform/books.html")
    .catch(() => {
        alert("Could not add mosque")
    })
    
})
