//index.js
const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at port 3000'));
app.use(express.static('public'));  //serves up any files in public folder
app.use(express.json({limit:'1mb'})); //parse json data from client side
 
//app post method
app.post('/api', (request, response) => { // receiving data from client side
    console.log(request.body);
    const data = request.body;

    response.json({ // sending to client
        status: 'success',
        latitude: data.lat,
        longitude: data.lng
    });
});