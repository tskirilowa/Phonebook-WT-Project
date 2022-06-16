var people = [], matches1 = document.querySelectorAll("#Parent h5");
for (var i = 0, l = matches1.length; i < l; i++) 
people.push(matches1[i].innerHTML);

var phones = [], matches2 = document.querySelectorAll("#Parent h6");
for (var i = 0, l = matches2.length; i < l; i++) 
phones.push(matches2[i].innerHTML);

var images = [], matches3 = document.querySelectorAll("#Parent img");
for (var i = 0, l = matches3.length; i < l; i++) 
images.push(matches3[i].getAttribute("src"));


var searchCont = document.getElementById('searchContact');
searchCont.addEventListener('keyup',function(e){
 var searchValue = e.target.value;
 var mainContainer = document.getElementById("Parent");
 mainContainer.innerHTML =  ``;
 for (var i = 0, l = people.length; i < l; i++){
    if(people[i].startsWith(searchValue) || phones[i].startsWith(searchValue))
    {
        var div1 = document.createElement("div");
        div1.className = "user-box d-md-flex align-items-center justify-content-between mb-30"
        var div2 = document.createElement("div");
        div2.className = "user-left my-4 d-md-flex align-items-center flex-wrap"
        var img = document.createElement("img");
        img.className = "img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex";
        img.src = images[i];
        var div3 = document.createElement("div");
        div3.className = "user-content";
        var h5 = document.createElement("h5");
        h5.innerHTML = people[i];
        var h6 = document.createElement("h6");
        h6.innerHTML = phones[i];

        div3.appendChild(h5);
        div2.appendChild(img);
        div2.appendChild(div3);
        div1.appendChild(div2);
        div1.appendChild(h6);
       
        mainContainer.appendChild(div1);
    } 
 }
});
