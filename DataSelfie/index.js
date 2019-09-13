
const express = require('express');
const Datastore = require('nedb'); 
//import node package
const fs = require('fs');
const app = express();
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));  //serves up any files in public folder
app.use(express.json({limit:'1mb'})); //parse json data from client side
 
const database  = new Datastore('database.db'); // instead of simple array
database.loadDatabase(); 
// load the file / data from the previous time the server ran into memory
// key aspect of working with database is having every record assosiated with a unique key "ID"

let index = 0;
database.count({}, (err, count ) => { // counting the current database data
    index = count;
    console.log(index);
});


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
    let image = data.image64;
    index++;
    
    const imageData = image.replace(/^data:image\/\w+;base64,/, "");
    const buf = new Buffer.from(imageData, 'base64');
    const fileName = `image${index}`;
    let path = `public/images/${fileName}.png`;
    fs.writeFile(path, buf, function(err, result) {
        if(err) console.log('error', err);
    });
    path = `images/${fileName}.png`;
    
    const newData = {
        index: index,
        lat: data.lat,
        lng: data.lng,
        url: path,
        mood: data.mood,
        timestamp: data.timestamp
    };

    database.insert(newData);
    //instead of "push", "insert" puts data into database.db 
    response.json(newData);
   
});

//use MongoDB API 
//npm install nedb