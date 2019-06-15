const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();

const db = require('./config/database'); // Database Connection

app.use(bodyParser.urlencoded({
    extended: true
})); // To parse the data inside body in urlecodedd

app.use(bodyParser.json()); // To parse the data inside body in JSON

// routes imported
const routes = require('./route/route');
app.use(routes);

require('./config/relation'); // Database table relations

// force: true will drop all the data and create fresh tables
db.sync({
    force: false
})
    .then(res => {
        console.log('Drop and Resync with { force: false }');
    })

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("App listening at ", PORT);
})