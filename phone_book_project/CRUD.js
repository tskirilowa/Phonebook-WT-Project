const express = require("express");
const mongo = require("mongodb").MongoClient;
const app = express();

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
    
console.log(people);
    }
  connection.close();
});

app.use(express.static(__dirname + '/public')); //to load css together with html

 app.get("/", (req, res) => {
   console.log("Got a request for people");
   res.json(people);
 });

app.listen(3000, function(){
    console.log("server is running on port 3000");
});


/*
fetch('./res')
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      appendData(data);
  })
  .catch(function (err) {
      console.log('error: ' + err);
  });
  function appendData(people) {
    var mainContainer = document.getElementById("allUsers");
        for (var i = 0; i < people.length; i++) {
            var div = document.createElement("div");
            div.className = "user-box d-md-flex align-items-center justify-content-between mb-30";

            var div1 = document.createElement("div");
            div1.className = "user-left my-4 d-md-flex align-items-center flex-wrap";
            

            var img = document.createElement("img");
            img.className = "img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex";
            

            var div2 = document.createElement("div");
            div2.className = "user-content";
            

            var h = document.createElement("h5")
            h.className = "text-center text-md-left";
            

            var h1 = document.createElement("h6")
            h1.className = "text-center text-md-right";
            

            h.innerHTML = people[i].name;
            h.innerHTML = people[i].phone;

            div.appendChild(div1);
            div.appendChild(h1);
            div1.appendChild(img);
            div1.appendChild(div2);
            div2.appendChild(h);
            mainContainer.appendChild(div);
        }
    }
}*/



