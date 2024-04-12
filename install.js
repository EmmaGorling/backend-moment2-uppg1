const { Client } = require('pg');
require('dotenv').config();


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

// Ta bort tabell om den finns
client.query(`
DROP TABLE IF EXISTS workexperiences
`);

// Skapa tabell
client.query(`
CREATE TABLE workexperiences (
    id              SERIAL PRIMARY KEY,
    companyname     VARCHAR(100),
    jobtitle        VARCHAR(100),
    location        VARCHAR(100),
    startdate       DATE,
    enddate         DATE,
    description     TEXT    
)`)

// Lägg till
client.query(`
INSERT INTO workexperiences (companyname, jobtitle, location, startdate, enddate, description) VALUES 
('SF Bio', 'Popcorn-poppare', 'Linköping', '2017-12-01', '2018-01-01', 'Poppade popcorn.'),
('Benjamins hundtrim', 'Hundfrisör', 'Åtvidaberg', '2018-01-01', '2020-04-05', 'Klippte lite för långhåriga hundar.')
`, (err, res) => {
    if (err) {
        console.log("Fel vid infogande av data: " + err);
    } else {
        console.log("Fiktivt innehåll har lagts till.");
    }
});