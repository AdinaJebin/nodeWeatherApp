const request = require ('request')


const foreCast = (latitude,longitude, callbk) => {
const url = 'http://api.weatherstack.com/current?access_key=e135371ccd9d6fa1d15e4a071796604a&query='+latitude+','+longitude+'&units=f'

request({url, json:true}, (error, {body})=>{
    if (error){
        return callbk ("Unable to get response from weatherstack site", undefined)
    }
    else if (body.error) {
        return callbk("Error getting a response from weatherstack", undefined)
    }
    else {
        return callbk(undefined,{weather_desc:body.current.weather_descriptions[0],
        temp:body.current.temperature,
        feelslike:body.current.feelslike})
       }
}
)
}

module.exports = foreCast