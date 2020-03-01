const express = require('express');
// Top-level function of express
const app = express(); 

const path = require('path');
const apiData = require('./plants.json');

const port = 3000;

// Displays on web page
app.use((req , res , next) =>{
	console.log(`${req.method} request for ${req.url}`);
	next();
});

// All files from public folder must be included
app.use(express.static('public'));
// Links bootstrap from node_modules
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// Adds jquery from node_modules
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
// adds popper.js from node_modules
app.use('/popper', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));

// Pages that will display based on where the user is on the application
app.get('/' , (req , res) =>{
	res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/about.html' , (req , res) =>{
	res.sendFile(path.join(__dirname + '/public/about.html'));
});

// res.sendFile(path.join(__dirname + '/node_moduels/bootstrap/dist/css/bootstrap.min.css'));

// Gives access to api data
app.get('/plants' , (req,res) =>{
	res.json(apiData);
});

// Displays in console when the server is turned on
app.listen(port, () => console.log(`Example app listening on port YeEeEeeeEeEEEst ${port}!`));