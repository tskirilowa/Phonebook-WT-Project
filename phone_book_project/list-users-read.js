const express = require('express'); // get express function
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const mongo = require("mongodb").MongoClient;
const path = require('path');
const multer = require('multer');
const { ObjectID } = require('bson');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views')); //to load css together with html
app.use(express.static(__dirname + '/uploads'));
app.use('/views', express.static(__dirname + '/views')); //to load css together with html
app.use('/uploads', express.static(__dirname + '/uploads'));

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

var upload = multer({
    storage : multer.diskStorage({
      destination: (req, file, cd) => {
        cd (null, './uploads');
      },
      filename : function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      }
    })
});

 app.get("/", function(req,res){
     Person.find({}, function(err, people){
      if(err) throw err;
      else res.render('list_users', {
             personList: people 
         });
     })
 });


  app.get('/user_profile/:id([0-9a-fA-F]{24})', async (req, res) => {
    var id = req.params.id;

    Person.findOne({'_id': ObjectID(id)}, function(err, person){
      if(err) throw err;
      else {
        res.render('user_profile', {person : person});
      }
    });
  });

  app.get('/user_profile/delete/:id([0-9a-fA-F]{24})', async(req, res) => {
    var id = req.params.id;

    Person.findByIdAndRemove(id, function (err, data) {
      if(err) throw err;
      else{
        console.log('Deleted successfully');
        res.redirect('/');
      } 
    });
  });

  app.get('/home', function(req, res){
    res.redirect('/');
  });

  app.post("/add",  upload.single('image'), function(req,res){

      let newPerson = new Person();
      if(req.file){
        newPerson.img = req.file.filename;
      }
      else{
        newPerson.img = 'newContact.png'
      }
      newPerson.name = req.body.name;
      newPerson.phone = req.body.phone;
      newPerson.email = req.body.email;

      newPerson.save((err, doc) => {
        if(err) console.log(err);
        else {
          console.log('Saved successfully');
          res.redirect('/');
        }
      });
    //}
    
  });

  app.listen(3000, function(){
    console.log("Server is running on port 3000");
  });