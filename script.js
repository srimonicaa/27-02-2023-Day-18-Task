let obj=[];
let data = [];

fetch('https://restcountries.com/v2/all')
    .then((response) => response.json())
    .then((res) => {
     data = res;
console.log(data.length);

for(let i=0;i<data.length;i++) {
    let arrobj={} 
    arrobj['name']=data[i].name;
    arrobj['capital']=data[i].capital;
    arrobj['region']=data[i].region;
    arrobj['flag']=data[i].flag;
    arrobj['code']=data[i].alpha3Code;
    arrobj['latlng']=data[i].latlng;
obj.push(arrobj);   }
   console.log(obj)
   display(obj);
})
  .catch((error) => {
console.error('Data Fetching Error:', error);
});

function display(obj) {
    for(let i=0;i<obj.length;i++)
{  
    const country = obj[i];
                /* Create Elements */
    const name = document.createElement("h5");
    name.textContent = country.name;

    const flagImg = document.createElement("img");
    flagImg.setAttribute("class","card-top")
    flagImg.src = country.flag;

    const capital = document.createElement("p");
    capital.textContent = country.capital;

    const region = document.createElement("p");
    region.textContent = country.region;

    const code = document.createElement("p");
    code.textContent = country.code;
    const latlng = country.latlng;

                /*Create Row & Column*/

    const row = document.getElementById("row");
    const colDiv = document.createElement("div");
    colDiv.setAttribute("class","col-lg-4 col-sm-12");
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class","card");
    row.append(colDiv);
    
                    /*Create Card-Header*/

    const cardHead = document.createElement("div");
    cardHead.setAttribute("class","card-header");
    cardHead.append(name);
    cardDiv.appendChild(cardHead);

                    /*Create Flag Image*/

    const imgDiv = document.createElement("div")
    imgDiv.setAttribute("class","imgDiv")
    imgDiv.appendChild(flagImg);
    cardDiv.appendChild(imgDiv);

                    /*Create Contents*/

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");

            const a1 = document.createElement("p");
            a1.setAttribute("class","card-text")
            const b1 = document.createTextNode("Capital:")
            const c1 = document.createTextNode(" ")
            a1.append(b1,c1,capital.innerText);
            cardBody.append(a1);
   
            const a2 = document.createElement("p");
            a2.setAttribute("class","card-text")
            const b2 = document.createTextNode("Region:")
            const c2 = document.createTextNode(" ")
            a2.append(b2,c2,region.innerText);
            cardBody.append(a2);
   
            const a3 = document.createElement("p");
            a3.setAttribute("class","card-text")
            const b3 = document.createTextNode("Country Code:")
            const c3 = document.createTextNode(" ")
            a3.append(b3,c3,code.innerText);
            cardBody.append(a3);

                /*Create Weather Report*/

        var pdv = document.createElement("div");
            pdv.setAttribute("id","popup")
            pdv.innerHTML=`<h2>Weather Report</h2>
            <p id="p1"></p>
            <button onclick="hidePopup()">Close</button>`
        document.body.append(pdv)
        
                    /*Create Button*/

        const btncard = document.createElement("button");
            btncard.setAttribute("class","btn btn-primary");
            btncard.setAttribute("type","button");
            btncard.innerText = "Click For Weather"; 
            btncard.onclick = function() {
                ftn(latlng)
                showPopup();
            }
        
        cardBody.append(btncard)
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
 
 }
}

function hidePopup() {
    var popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "none";
    }
    else {
      console.error("Popup element not found");
    }
  }
  
function showPopup() {
  var popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "block";
  }
  else {
    console.error("Popup element not found");
  }
}

function ftn(input) {
  let latitude = input[0];
  let longitude = input[1];
  console.log(latitude,longitude);
  getWeather(latitude,longitude);
}

function getWeather(lat,long) {
    const latitude = lat;
    const longitude = long;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8058f39594374fc2f6966bcad02c65df`
fetch(url)
      .then(response => response.json())
      .then(data => {
console.log(data);
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const result = document.getElementById('p1');
result.innerHTML = `Temperature : ${temperature}&deg;C <br> Humidity : ${humidity}&percnt; <br> Description : ${description}`;
})
.catch(error => console.log("Error", error));  
}