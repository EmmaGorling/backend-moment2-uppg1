const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


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