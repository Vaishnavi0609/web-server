
const request = require("request")
const geocode = (address,callback) =>{  
   
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmFpc2huYXZpLXJhbWFrcmlzaG5hbiIsImEiOiJja2pzcGF2ejc0MnAwMnJvN2txOTZ3emF5In0.j26YDYiFXzRJB82GyNF_wQ&limit=1`
    
    request({url, json:true},(error,{ body })=>{
        if(error){
           callback("Cannot reach the site" , undefined)
        }else if(body.features.length === 0){
           callback("Please check the value given",undefined)
        }else {
           
        let longitude = body.features[0].center[0]
        let latitude = body.features[0].center[1]        
        callback(undefined , {
                  longitude,
                  latitude,
                  location : body.features[0].place_name
        })
        }
     })

}

module.exports = geocode