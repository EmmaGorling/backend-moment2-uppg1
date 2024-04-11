const {Client} = require('pg');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const client = new Client ({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(cors());

// Routes

// Hämta
app.get('/api', (req, res) => {
    res.json({message: 'Välkommen'});
});

app.get('/api/workexperience', (req, res) => {
    res.json({message:'Hämta arbetserfarenheter'}); 
});

// Lägg till 
app.post('/api/workexperience', (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;


    res.json({message:'Lägg till arbetserfarenheter'}); 
});

// Ändra arbetserfarenhet
app.put('/api/workexperience/:id', (req, res) => {
    res.json({message:'Ändrat arbetserfarenhetet med id: ' + req.params.id}); 
});

// Radera
// Ändra arbetserfarenhet
app.delete('/api/workexperience/:id', (req, res) => {
    res.json({message:'Raderat arbetserfarenhetet med id: ' + req.params.id}); 
});

// Anslut till till server 
app.listen(process.env.PORT, () =>{
    console.log('Server körs på port: ' + process.env.PORT);
})