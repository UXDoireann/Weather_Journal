/* Global Variables */
let baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey=',us&appid=acf9f0f643bd5a1d014e384ed33d87cc&units=metric';

const reply =document.getElementById('entryHolder');







// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//POST request 
const postData = async(url = '', data = {}) =>{
    console.log(data);
     const response = await fetch(url, {
         method: 'POST',
         credentials: 'same-origin',
         headers:{
             'Content-Type':'application/json',
         },
         body:JSON.stringify(data),
     });
      
           try{
               const newData = await response.json();
               console.log(newData);
               return newData;
           }catch(error){
               console.log("error", error);
           }
}

//postData('/addData',{temperature: '3 degrees', date: '25 Jan 2021', userResponse: 'feeling chilly but happy!' });

//Event listener
document.getElementById('generate').addEventListener('click', doThisThing);


//
function doThisThing(e){
    let feelings = document.getElementById('feelings').value
    let zip = document.getElementById('zip').value
    getZip(baseURL, zip, apiKey)
    
    .then(function(data){
       console.log(data);
        postData('/addData', {date: newDate, temperature:data.main.temp, weather:data.weather[0].description, userResponse:feelings});
        
    })

.then(function() {
  updateUI()
})

.then(function(){
    scroll()
})
.then(function(){
    kate()
})
}


const getZip = async (baseURL, zip, apiKey)=> {
    const res = await fetch(baseURL + zip + apiKey);

    try {
        const newData = await res.json();
        console.log(newData)
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};







//Update UI
const updateUI = async()=>{
    const request = await fetch ('/all');
     try{
        const allData = await request.json();
        document.getElementById('date').innerHTML=allData.date;
        document.getElementById('temp').innerHTML="It's me, Cathy. I've come home. It's "+ allData.temperature +"C, let me in your window!";
        document.getElementById('content').innerHTML="I know your heart is "+allData.userResponse+", my love";
        document.getElementById('weather').innerHTML="Remember everything is fleeting just like the "+allData.weather+" of today.";
        
       

    }catch(error){
        console.log("UI could not be updated", error);
    
}  
};

//scroll into view
const scroll = async()=>{
   const request = await fetch('/all');
   try{
       const allData= await request.json();
    reply.scrollIntoView({
        behavior:"smooth",
        block:"end"
    });}catch(error){
        console.log("no scrolling", error);
    }
}

//Kate Bush
const kate =async()=>{
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        reply.style.backgroundImage="url('/Images/Kate.jpg')";
    }catch(error){
        console.log("No Kate", error);
    }
}