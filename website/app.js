/* Global Variables */
let baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey=',us&appid=acf9f0f643bd5a1d014e384ed33d87cc&units=metric';







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
