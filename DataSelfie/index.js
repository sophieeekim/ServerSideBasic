
const express = require('express');
const Datastore = require('nedb'); 
//import node package

const app = express();
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));  //serves up any files in public folder
app.use(express.json({limit:'1mb'})); //parse json data from client side
 
const database  = new Datastore('database.db'); // instead of simple array
database.loadDatabase(); 
// load the file / data from the previous time the server ran into memory
// key aspect of working with database is having every record assosiated with a unique key "ID"

//app get method
app.get('/api', (request, response) => {
    database.find({},(err, data) => {
        if(err){
            console.log("error");
            response.end();
            return;
        } else {
            response.json(data);
        }
    });
   
});
//app post method
app.post('/api', (request, response) => { // receiving data from client side
    console.log("I got a request!");
    const data = request.body;
    database.insert(data);
    //instead of "push", "insert" puts data into database.db 
    response.json(data);
   
});

//use MongoDB API 
//npm install nedb