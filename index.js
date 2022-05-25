const express = require('express')
const app = express()
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const pug =  require('pug')
require('dotenv').config()

app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())

if(process.env.NODE_ENV === 'develop'){
    app.use(morgan('tiny'))
}

app.get('/', (req,res)=>{
    res.render('index.pug', {title : 'Header'})
})

app.get('/about', (req,res)=>{
    res.render('about.pug', {title : 'Header'})
})

app.get('/contact', (req,res)=>{
    res.render('contact.pug', {title : 'Header'})
})

app.post('/sign', (req,res)=>{
    let name = req.body.name
    let password = req.body.password
    
    res.render('sign.pug', {title : 'Header', name, password})
})


try {
    const port = normalizePort(process.env.PORT || 5000)
    app.listen(port, ()=>{
        console.log('Server workig on port', port);
    })
} catch (error) {
    console.log(error);
}

function normalizePort(val) {
    let port = parseInt(val)
    if(!port){
        return val
    }
    if(isNaN(port)){
        return val
    }
    if(port > 1){
        return port
    }

    return false
}