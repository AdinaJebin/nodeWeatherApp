const request = require('request')

const geoCode = (address, callbk) => {

const url = 'http://api.positionstack.com/v1/forward?access_key=f0c666c8f0b7dc62751616f8275b9aac&query='+address+'&limit=1'

request({json:true,url},(err1,{body})=>{
    if (err1){
        return callbk ("Unable to get response from positionstack site", undefined)
    }
    else if (body.error){
        return callbk("Error getting a response from positionstack", undefined)
    }
    else {
        const latitude = body.data[0].latitude
        const longitude = body.data[0].longitude
        callbk(undefined,{latitude,longitude})


        //const url = 'http://api.weatherstack.com/current?access_key=e135371ccd9d6fa1d15e4a071796604a&query='+latitude+','+longitude+'&units=f'

        //request({url:url, json:true}, (error, response)=>{

        //callbk(undefined, {latitude, longitude})
    
//}
//)
     
    }
})
}

module.exports = geoCode