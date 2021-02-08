const hbs = require("hbs")
const path = require("path")
express = require("express")

const app = express()
const port = process.env.PORT  || 3000

const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

publicPath = path.join(__dirname, "../public")
viewsPath = path.join(__dirname, "../src/templates/views")
partialsPath = path.join(__dirname, "../src/templates/partials")

app.set("view engine" , ".hbs")
app.set("views" , viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))


app.get("" , (req,res) => {
    res.render("index" , {
        name:"Vaish",
        course:"NodeJS - Home"
    })
})

app.get("/about" , (req,res) => {
    res.render("about" , {
        name:"Vaish",
        course:"NodeJS - About"
    })
})

app.get("/help" , (req,res) => {
    res.render("help" , {
        name:"Vaish",
        course:"NodeJS - help"
    })
})

app.get("/weather" , (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "Specify a location"
        })
    } 
    geocode(req.query.address,(error,{ latitude,longitude,location } = {}) =>{
        if(error){
            return res.send({error})     
         }
         
      forecast(latitude,longitude, (error,forecastData)=>{
        
            if(error){
                return res.send({error}) 
            }
            res.send({
                location,
                forecast:forecastData,
                address:req.query.address
            })
         })    

    })
    
})

app.get("/help/*" , (req,res) => {
    res.render("404", {
        title : "404",
        name:"Vaish",
        errorMessage:"Help page not found"
    })
   })

   app.get("*" , (req,res) => {
    res.render("404",{
        title : "404",
        name:"Vaish",
        errorMessage:"page not found"
    })
   })

app.listen(port , () => {
    console.log("Sever is running on port " + port)
})

