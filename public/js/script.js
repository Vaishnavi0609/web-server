const weatherForm = document.querySelector("form")
const Search = document.querySelector("input")
let messageOne = document.querySelector("#message1")
let messageTwo = document.querySelector("#message2")

weatherForm.addEventListener("submit" , (e) =>{
    e.preventDefault()
    const location = Search.value
        messageOne.textContent = "loading..."
        messageTwo.textContent = ""

    fetch(`/weather?address=${location}`).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent= data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
    
   
})
