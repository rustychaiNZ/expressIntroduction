const express = require('express');
// Top-level function of express
const app = express(); 

const path = require('path');
// Plant api data set
const apiData = require('./plants.json');
// Car details api data set
const apiData2 = require('./carDetails.json');

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
// Adds popper.js from node_modules
app.use('/popper', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));
// Adds images from assets folder
app.use('/images', express.static(path.join(__dirname, 'public/assets')));
// Add custom css
app.use('/css', express.static(path.join(__dirname, 'public/css')));
// Add custom js
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Pages that will display based on where the user is on the application
app.get('/' , (req , res) =>{
	res.sendFile(path.join(__dirname + '/public/index.html'));
});
// Allows the user to go to the about page 
app.get('/about.html' , (req , res) =>{
	res.sendFile(path.join(__dirname + '/public/about.html'));
});
// Allows the user to go to the contactus page
app.get('/contactPage.html' , (req , res) =>{
	res.sendFile(path.join(__dirname + '/public/contactPage.html'));
});

// res.sendFile(path.join(__dirname + '/node_moduels/bootstrap/dist/css/bootstrap.min.css'));

// Gives access to the plant api data
app.get('/plants' , (req,res) =>{
	res.json(apiData);
});
// The user is able to get the api information by searching 192.168.33.10:3000/plantFamily/pf=plant family the user wants
app.get('/plantFamily/pf=:plantFamily' , (req , res) =>{
	const plantFamilyParam = req.params.plantFamily;
	if((plantFamilyParam === 'Asteraceae') || (plantFamilyParam === 'Cyperaceae')){
		// array to push the matching objects
		let filteredArray = []; 
		for(let i = 0; i < apiData.length; i++){
			// Takes the search paramater and compares it with all of the plant families in the api array
			if (plantFamilyParam.toLowerCase() === apiData[i].plantFamily.toLowerCase()) {
			 	// When a matching plant is found, pushes the plant into a new array to be displayed
			 	filteredArray.push(apiData[i]);
		 	}
		}
		// Sends new array of plants to be visable by the user
		res.send(filteredArray);
	}
	else{
		res.send('Invalid parameter');
	}
});

// Gives access to the car api data
app.get('/carDetails' , (req,res) =>{
	res.json(apiData2)
});
app.get('/carDetails/o=:owner&m=:carMaker' , (req , res) =>{
	const carMakerParam = req.params.carMaker;
	const ownerParam = req.params.owner;

	let ownersFilterdArray = [];
	for(let i = 0; i < apiData2.length; i++){
		if((ownerParam.toLowerCase() === apiData2[i].owner.toLowerCase()) && (carMakerParam.toLowerCase() === apiData2[i].carMaker.toLowerCase())){
			ownersFilterdArray.push(apiData2[i]);
		}
	}
	res.send(ownersFilterdArray);
});

// Displays in console when the server is turned on
app.listen(port, () => console.log(`Example app listening on port YeEeEeeeEeEEEst ${port}!`));