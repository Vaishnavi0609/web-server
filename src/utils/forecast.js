const request = require("request")

const forecast = (latitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5a089d13c50d12ececfcece72d2cf703&query=${latitude},${longitude}`
    request({url, json:true},(error,{ body })=>{
        if(error){
           callback("Cannot reach the site" , undefined)
        }else if(body.error){
           
           callback("Please check the value given",undefined)
        }else{
            let temp = body.current.temperature;
            let precip = body.current.precip;
            let feelsLike = body.current.feelslike;
            let desc = body.current.weather_descriptions[0]
        callback(undefined , `${desc}. It is currently ${temp} degree and feels like ${feelsLike} degree. There is ${precip} % of rain`)
        }
     })

}

module.exports = forecast