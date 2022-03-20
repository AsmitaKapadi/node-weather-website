
console.log('Client side js')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log(location)
    messageOne.textContent = "Loading Results..."
    messageTwo.textContent = ""
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    messageOne.textContent = ""
    response.json().then((data) => {
        if(data.error){
            /* console.log(data.error) */
            messageTwo.textContent = data.error
        }else{
            /* console.log(data.location)
            console.log(data.forecast) */
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        //console.log(data)
    })
})
})