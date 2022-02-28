const getData = (name) => {
    return localStorage.getItem(name);
};

const getDataAsJSON = (name) => {
    return JSON.parse(getData(name));
};

const saveLocalStorage = (comment, name) => {
    let data;
    if (getData(name) === null) {
        data = [];
    } else {
        data = getDataAsJSON(name);
    }
    data.push(comment);
    localStorage.setItem(name, JSON.stringify(data));
};