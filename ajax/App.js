var ajaxBtn = document.getElementById("ajax");
var btn = document.getElementById("btn");
var loadDiv = document.getElementById("loading");
var tempLi = document.getElementById("tempLi");

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

        func(ourData);
    };

    ourRequest.send();
};

const showCountries = (data) => {
    countryData = data;
    var counter = 10;
    const country = document.createElement("ol");
    for (let i = counter - 10; i < counter; i++) {
        appendCountry(countryData[i], country, i);
    }
    countries.appendChild(country);
    counter += 10;
    addCountries(counter, country);
};

const addCountries = (counter, country) => {
    btn.addEventListener("click", () => {
        for (let i = counter - 10; i < counter; i++) {
            appendCountry(countryData[i], country, i);
        }
        counter += 10;
        countries.appendChild(country);
        if (counter > countryData.length) {
            btn.remove();
        }
    });
};

const appendCountry = (theCountry, country, i) => {
    const template = tempLi.content.firstElementChild.cloneNode(true);
    template.id = "country" + `${i+1}`;
    template.children[1].src = theCountry.flags.png;
    template.children[0].innerHTML = theCountry.name.official;
    console.log(template);
    country.appendChild(template);
    btn.style.display = "block";
};