const express = require('express');
const app = express();
const cors = require('cors');
const { Client } = require('pg');
const port = process.env.DB_PORT || 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Anslut till databasen
const client = new Client ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Meddelanden
client.connect((err) => {
    if(err) {
        console.log('Fel vid anslutning:' + err)
    } else {
        console.log('Ansluten till databasen...')
    }
});

// Routes
app.get('/api', (req, res) => {
    res.json('Välkommen till mitt api');
});

// Get workexperience
app.get('/api/workexperience', (req, res) => {
    // Get workexperiences
    client.query(`SELECT * FROM workexperiences;`, (err, results) => {
        if(err) {
            res.status(500).json({error: 'Something went wrong..' + err});
        }

        if(results.length = 0) {
            res.status(404).json({message: 'No workexperiences found.'});
        } else {
            res.json(results.rows);
        }

    })
});

// Add workexperience
app.post('/api/workexperience', (req, res) => {
    // Hämta parametrar
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    // Error-object
    let errors = {
        message: '',
        detail: '',
        https_response: {

        }
    }

    // Check parameters
    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        // Error-message
        errors.message = 'The right parameters is not included';
        errors.detail = 'Include all parameters to add workexperience';

        // Response
        errors.https_response.message = 'Bad request';
        errors.https_response.code = 400;

        // Send error-message
        res.status(400).json(errors);

        return;
    }

    // Add workexperience to database
    client.query(`
    INSERT INTO workexperiences (companyname, jobtitle, location, startdate, enddate, description) VALUES 
    ($1, $2, $3, $4, $5, $6);`, [companyname, jobtitle, location, startdate, enddate, description], (err, results) => {
        if (err) {
            res.status(500).json({error: 'Something went wrong..' + err});
            return;
        }

        console.log('Query succesful' + results);

        let workexperience = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description
        }
    
        res.json({message: 'Lagt till workexperience', workexperience});
    });

    

});

// Change workexperience
app.put('/api/workexperience/:id', (req, res) => {
    // Get params
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    // Error-object
    let errors = {
        message: '',
        detail: '',
        https_response: {

        }
    }

    // Check parameters
    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        // Error-message
        errors.message = 'The right parameters is not included';
        errors.detail = 'Include all parameters to add workexperience';

        // Response
        errors.https_response.message = 'Bad request';
        errors.https_response.code = 400;

        // Send error-message
        res.status(400).json(errors);

        return;
    }
    // Update row
    client.query(`
    UPDATE workexperiences SET companyname=$1, jobtitle=$2, location=$3, startdate=$4, enddate=$5, description=$6 WHERE ID=$7;`,
    [companyname, jobtitle, location, startdate, enddate, description, req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({error: 'Something went wrong..' + err});
            return;
        }

        console.log('Query succesful' + results);
    
        res.json({message: 'Uppdaterad workexperience: ' + req.params.id + results});
    });
    
});

// Delete Workexperience
app.delete('/api/workexperience/:id', (req, res) => {
    // Delete query
    client.query(`
    DELETE FROM workexperiences WHERE ID=$1;`,[req.params.id], (err, results) => {
        if(err) {
            res.status(500).json({error: 'Something went wrong..' + err});
            return;
        }
        res.json({message: 'Raderat workexperience: ' + req.params.id});
    })
});


// Anslut till server
app.listen(port, () => {
    console.log('Ansluten till server: ' + port);
});

