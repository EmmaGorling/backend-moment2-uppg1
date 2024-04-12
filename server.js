const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Anslut till databas



// Routes
app.get('/api', (req, res) => {
    res.json('Välkommen till mitt api');
});

// Get workepxperience
app.get('/api/workexperience', (req, res) => {
    res.json({message: 'Hämta workexperince'});
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

// Change workexperience
app.put('/api/workexperience/:id', (req, res) => {
    res.json({message: 'Uppdaterad workexperince: ' + req.params.id});
});

// Delete Workexperience
app.delete('/api/workexperience/:id', (req, res) => {
    res.json({message: 'Raderat workexperince: ' + req.params.id});
});


// Anslut till server
app.listen(port, () => {
    console.log('Ansluten till server: ' + port);
})