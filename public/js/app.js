

const locForm = document.querySelector("form")
const Loc = document.querySelector("input")
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


locForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        msg1.textContent = 'Loading......'
        msg2.textContent = ''

        const address = Loc.value
        if (address.length == 0){
            msg1.textContent = 'Please enter location'
            msg2.textContent = ''
        }
        fetch('/weather?address='+address).
        then((response)=>{
              response.json().then((data)=>{
                if (data.error){
                    return console.log(data.error)
                }
                else {
                    // fetch('http://api.weatherstack.com/current?access_key=e135371ccd9d6fa1d15e4a071796604a&query='+data.data[0].latitude+','+data.data[0].longitude+'&units=f')
                    // .then((response)=>{
                    //     response.json().then((forecastData)=>{
                    //         if (forecastData.error){
                    //             msg1.textContent = forecastData.error
                    //             msg2.textContent = ''

                    //         }
                    //         else {
                                 msg1.textContent = data.weather_desc
                                 msg2.textContent = data.temperature
        
                    //         }
                    //     })
                    // })
                }
              })
        })
        

        

})
