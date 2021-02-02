
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

const server = app.listen(port, listening);

function listening(){
    console.log("server running");
    console.log(`running on localhost:${port}`);
};


//Get Request
app.get('/all', function(req, res){
    res.send(projectData);
    console.log('Get project data');
})

//Post Request
app.post('/addData', addData);

function addData(req, res){
   let data = req.body;
   newEntry ={
       date: data.date,
       temperature: data.temperature,
       weather: data.weather,
       userResponse: data.userResponse
   }
   Object.assign(projectData, newEntry);
   res.send(projectData);
   console.log(projectData);
    };

   

    



