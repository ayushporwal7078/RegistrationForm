const http = require('http');
const express = require('express'); 
const app  = express()
const cors = require('cors');
const hostname = 'localhost';
const port = 3001;
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


app.use(cors());

mongoose.connect('mongodb://localhost/');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.post('/api/users',function(req,res){

  var firstName = req.body.firstName;
  var lastName  = req.body.lastName;
  var email  = req.body.email;
  var mobile = req.body.mobile;
  var address1 = req.body.address1;
  var address2  = req.body.address2;
  var state  = req.body.state;
  var city = req.body.city;
  var country = req.body.country;
  var zipCode = req.body.zipCode;

  var UsersSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: Number,
  address1: String,
  address2: String,
  state: String,
  city: String,
  country: String,
  zipCode: Number
});

var Register = mongoose.model('Register', UsersSchema, 'register')

})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});