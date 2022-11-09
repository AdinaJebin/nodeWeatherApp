const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const geoCode = require('../src/utils/geoCode')
const foreCast = require('../src/utils/foreCast')
const request = require ('request')
const { response } = require('express')

console.log(__dirname)
console.log(__filename)

//Setup paths for express
const staticPath = path.join(__dirname,'../public')
const viewsPath =  path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup static assets path
app.use(express.static(staticPath))

//Setup views and its path
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req, res)=>{
    res.render('index',{
        title:"Welcome to Weather App",
        created:"Ancy"
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About weather app",
        created:"Ancy"
    })
})


app.get('/help',(req, res)=>{
    res.render('help',{
        message: "Please contact xxx for any support",
        title:"Support",
        created:"Ancy"
    })
})

app.get('/weather', (req,res)=>{
    const address = req.query.address
    if (!address){
        return res.send('Please enter an address')
    }
    
    geoCode(address, (error, {latitude,longitude}={})=>{
        if (!error == undefined)
        return res.send(error)
        else {
            foreCast(latitude, longitude, (forcastErr, forcastRes)=>{
                if (!forcastErr == undefined){
                    return res.send(forcastErr)
                }
                else {
                    res.send({"weather_desc":forcastRes.weather_desc,
                    "temperature": forcastRes.temp,
                    "feelslike": forcastRes.feelslike
                })
                }
            })
        }
    })
})

app.get('/help/*',(req,res)=>{
    res.render('err2',{
        //title:"Help article not found",
        created:"Ancy"
    })
})

app.get('*',(req,res)=>{
    res.render('err1',{
        //title:"404 Error - Page not found",
        created:"Ancy"
    })
})


app.listen(3000, ()=>{console.log('Server up and running at node 3000')})