const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name: 'Asmita Kapadi'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About myself',
        name: 'Asmita Kapadi',
        error_msg: 'About not found'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help!',
        name: 'Asmita Kapadi',
        error_msg: 'Help not found'
    })
})

app.get('/help/*',(req,res)=>{
    res.send("Help article not found")
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must return an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location, 
                address: req.query.address
            })
        })
    })
    /* res.send({
        forecast: 'It is snowing',
        location: req.query.address
    }) */
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide Search term'
        })
    }
    //console.log("req",req.query)
    res.send({
        products: []
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title : 'Error!',
        name: 'Asmita Kapadi',
        errorMessage: 'Page not found'
    })
    //res.send("My 404 page")
})

app.listen(3000,() =>{
    console.log('Server is up on port 3000')
})