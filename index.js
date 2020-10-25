const express = require('express');
const config = require('./config');
const app = express();



/*===================================================================
                    Middleware initilization         
==================================================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frontEndServer = "http://localhost:3000";
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",frontEndServer );
    res.header("Access-Control-Allow-Credentials","true")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers", "Origin, Authorization , X-Requested-With, Content-Type, Accept");
    next();
});



app.get('/',function (req, res) {
    ping = {status : 'live' , time :new Date().getTime() }
    res.status(200).send(ping);
})


app.use('/api', require('./routes'));


/*===========================================================================
---------------------------------  Run Server - -----------------------------
=============================================================================*/

const PORT = config.port
module.exports = app.listen( PORT  , ()=>{
    console.log('Server started , Listing on PORT : ',PORT)
});

