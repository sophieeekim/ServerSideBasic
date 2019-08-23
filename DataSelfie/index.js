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
    const dataResponse = [];
    
    data.forEach (element => {
        const dataElement = {
            status: 'success',
            latitude: element.lat,
            longitude: element.lng,
            timestamp: element.timestamp
        };
        dataResponse.push(dataElement);
    })
    
    response.json(dataResponse);
    // data.forEach(element => {
    //     response.json({ // sending to client
    //         status: 'success',
    //         latitude: element.lat,
    //         longitude: element.lng,
    //         timestamp: element.timestamp
    //     });
    // });
    
});