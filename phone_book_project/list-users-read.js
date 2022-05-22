const express = require('express'); // get express function
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb+srv://PB19admin:PB19team@pbdb.wml06.mongodb.net/PBdb", {useUnifiedTopology: true, useNewUrlParser: true});

//create data schema
const peopleSchema = {
    name: String,
    phone: String,
    email: String
}
const Person = mongoose.model("Person", peopleSchema);

app.use(express.static(__dirname + '/public')); //to load css together with html

 app.get("/", function(req,res){
    res.sendFile(__dirname + "/public/list_users.html");
 });

app.post("/", function(req,res){
    let newPerson = new Person({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });
    newPerson.save();
    res.redirect('/');
});
app.listen(3000, function(){
    console.log("server is running on port 3000");
});
