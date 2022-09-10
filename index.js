import axios from 'https://cdn.skypack.dev/axios';
const API_URL = "https://iiqama-api.herokuapp.com/mosque/create"
const form = document.getElementById("form");
let mosque
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
            id: 1,
            time : {
                azan: document.getElementById("fajr-azan-time")?.value,
                iqama: document.getElementById("fajr-iqama-time")?.value
            }
        },
        dhuhr: {
            id: 2,
            time: {
                azan: document.getElementById("dhuhr-azan-time")?.value,
                iqama: document.getElementById("dhuhr-iqama-time")?.value                
            }
        },
        asr: {
            id: 3,
            time: {
                azan: document.getElementById("asr-azan-time")?.value,
                iqama: document.getElementById("asr-iqama-time")?.value
            }
        },
        maghrib: {
            id: 4,
            time: {
                azan: document.getElementById("mahgrib-azan-time")?.value,
                iqama: document.getElementById("mahgrib-iqama-time")?.value
            }
        },
        isha: {
            id: 5,
            time: {
                azan: document.getElementById("isha-azan-time")?.value,
                iqama: document.getElementById("isha-iqama-time")?.value
            }
        },
        jumaat: {
            id: 6,
            time: {
                azan: document.getElementById("jumaat-azan-time")?.value,
                iqama: document.getElementById("jumaat-iqama-time")?.value
            }
        },
    }

    console.log(JSON.stringify({
        name: mosqueName,
        address: mosqueAddress,
        imam_name: imamName,
        denomination: "n/a",
        latitude: Number(latitude),
        longitude: Number(longitude),
        phone_number: contactPersonNumber,
        prayers: prayers
    }))

    const { fajr } = prayers
    console.log(fajr)
    
    axios.post(API_URL, {
        name: mosqueName,
        address: mosqueAddress,
        imam_name: imamName,
        denomination: "n/a",
        latitude: Number(latitude),
        longitude: Number(longitude),
        phone_number: contactPersonNumber,
        prayers: prayers
    })
    .then(result => {
        alert("Mosque added sucessfully")
        mosque = result.data
    })
    .catch(() => {
        alert("Could not add mosque")
    })
    
})


const addDayButton = document.getElementById("btn-add-day")
const API_URL_2 = "https://iiqama-api.herokuapp.com/mosque-books/add"

const days = []
const list = document.getElementById("days")
const btnShow = document.getElementById("btn-show")

const book = {
    name: "",
    teacher: "",
    days: []
}



addDayButton.addEventListener("click", (event) => {
    const bookName = document.getElementById("book-name")?.value
    const teacher = document.getElementById("book-teacher")?.value

    let dayCode = parseInt(document.getElementById("book-day")?.value);
    let time = document.getElementById("book-time").value;

    book.name = bookName
    book.teacher = teacher
    
    const day = {
        code: dayCode,
        startTime: time
    }

    const DAYS_OF_THE_WEEK = {
        "0": "Sunday",
        "1": "Monday",
        "2": "Tuesday",
        "3": "Wednesday",
        "4": "Thursday",
        "5": "Friday",
        "6": "Saturday"
    }

    book.days = [...book.days, day]
    const li = document.createElement("li")
    li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center")
    
    const span = document.createElement("span")
    span.setAttribute("class", "badge bg-primary rounded-pill")

    let timeNode = document.createTextNode(time)
    let dayNode = document.createTextNode(DAYS_OF_THE_WEEK[`${dayCode}`])

    span.appendChild(timeNode)
    li.appendChild(dayNode)
    li.appendChild(span)
    list.appendChild(li)
    console.log(book)
})




const bookForm = document.getElementById('book-form')
bookForm.addEventListener("submit", (event) => {
    event.preventDefault()

    axios.post(API_URL_2, {
        book: book,
        mosque_id: mosque.response.id
    })
    .then(result => {
        alert("Book added sucessfully")
        book.name = ""
        book.teacher = ""
        book.days = []

        bookForm.reset()
    })
    .catch(() => {
        alert("Could not add book")
    })

})