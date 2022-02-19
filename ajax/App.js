var ajaxBtn = document.getElementById("ajax");
var btn = document.getElementById("btn");
var loadDiv = document.getElementById("loading");
loadDiv.style.display = "none";
btn.style.display = "none";
var countries = document.getElementById("country-container");
var countryData;
ajaxBtn.addEventListener("click", () => {
    getApi('https://restcountries.com/v3.1/all', showCountries);
    ajaxBtn.remove();
});

const getApi = (url, func) => {
    loadDiv.style.display = "block";
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', url);

    ourRequest.onload = () => {
        loadDiv.style.display = "none";

        var ourData = JSON.parse(ourRequest.responseText);
        data = ourData
        func(ourData);
    };

    ourRequest.send();
};

const showCountries = (data) => {
    countryData = data;
    var counter = 10;
    const country = document.createElement("ol");
    for (let i = counter - 10; i < counter; i++) {
        const countryCard = document.createElement('li');
        const image = document.createElement('img');
        image.src = countryData[i].flags.png;
        var htmlString = "";
        htmlString += "<p>" + countryData[i].name.official + "</p>";
        countryCard.innerHTML = htmlString;
        countryCard.appendChild(image);
        country.appendChild(countryCard);
        btn.style.display = "block";
    }
    countries.appendChild(country);
    counter += 10;
    addCountries(counter, country);
};

const addCountries = (counter, country) => {
    btn.addEventListener("click", () => {
        for (let i = counter - 10; i < counter; i++) {
            const countryCard = document.createElement('li');
            const image = document.createElement('img');
            image.src = countryData[i].flags.png;
            var htmlString = "";
            htmlString += "<p>" + countryData[i].name.official + "</p>";
            countryCard.innerHTML = htmlString;
            countryCard.appendChild(image);
            country.appendChild(countryCard);
        }
        counter += 10;
        countries.appendChild(country);
        if (counter > countryData.length) {
            btn.remove();
        }
    });
};