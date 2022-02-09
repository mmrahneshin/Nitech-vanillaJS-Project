var btn = document.getElementById("btn");
var country = document.getElementById("country-container")
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://restcountries.com/v3.1/all');
var counter = 10;

ourRequest.onload = () => {
    var ourData = JSON.parse(ourRequest.responseText);
    btn.addEventListener("click", () => {
        for(let i = counter - 10; i < counter; i++){
            const countryCard = document.createElement('div');
            const image = document.createElement('img');
            image.src = ourData[i].flags.png;
            var htmlString = "";
            htmlString += "<p>" + ourData[i].name.official + "</p>";
            countryCard.innerHTML = htmlString;
            countryCard.appendChild(image);
            country.appendChild(countryCard);
        }
        counter += 10;
        if(counter > ourData.length){
            btn.remove();
        }
    });
};
ourRequest.send();