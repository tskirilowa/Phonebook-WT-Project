const express = require('express'); // get express function
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { application } = require('express');
const app = express();
const mongo = require("mongodb").MongoClient;
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));

/* Взема хората от базата под форма на масив
--------------------------------------------*/
var people = [];
const mongoUrl = "mongodb+srv://PB19admin:PB19team@pbdb.wml06.mongodb.net/?retryWrites=true&w=majority";
mongo.connect(mongoUrl, { useNewUrlParser: true }, async function(
    err,
    connection
  ) {
    if (err) {
      console.error(err);
    } else {
      console.log("Succesfully connected to the database");
      const db = connection.db("PBdb");
      const peopleCollection = db.collection("people");
      people = await peopleCollection.find({}).toArray();
      }
    connection.close();
  });
/* -----------------------------------------*/

mongoose.connect("mongodb+srv://PB19admin:PB19team@pbdb.wml06.mongodb.net/PBdb", {useUnifiedTopology: true, useNewUrlParser: true});

//create data schema
const peopleSchema = {
    img: String,
    name: String,
    phone: String,
    email: String
}
const Person = mongoose.model("Person", peopleSchema);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views')); //to load css together with html

 app.get("/", function(req,res){
     Person.find({}, function(err, people){
         res.render('list_users', {
             personList: people 
         })
     })
 });

app.get("/user_profile", function(req, res){
  res.sendFile(path.join(__dirname, '/user_profile.html'));
});

app.post("/add", function(req,res){
    let newPerson = new Person({
        img: req.body.image,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });
    newPerson.save();
    res.redirect('/');
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

