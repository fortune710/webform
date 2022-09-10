const addDayButton = document.getElementById("btn-add-day")
const API_URL = "https://iiqama-api.herokuapp.com/mosque-books/add"

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

    /*

    fetch(API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            book: book,
            mosque_id: mosque.id
        })
    })
    .then(res => res.json())
    .then(result => {
        alert("Book added sucessfully")
        book.name = ""
        book.teacher = ""
        book.days = []

        bookForm.reset()
    })
    .catch(() => {
        alert("Could not add book")
    })*/

})