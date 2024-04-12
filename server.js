const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//  Anslut till databas
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
connection.connect((err) => {
    if(err) {
        console.log('Fel vid anslutning.. ' + err);
        return;
    }

    console.log('Ansluten till databasen');
})


// Routes

// Hämta
app.get('/api', (req, res) => {
    res.json({message: 'Välkommen'});
});
// Hämta arbetsefarenheter
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

    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        res.json({error: 'Mata in all information'}); 
    }


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
app.listen(port, () =>{
    console.log('Server körs på port: ' + port);
})

