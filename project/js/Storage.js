const getData = (name) => {
    return localStorage.getItem(name);
};

const getDataAsJSON = (name) => {
    return JSON.parse(getData(name));
};

const setData = (data, name) => {
    localStorage.setItem(name, JSON.stringify(data));
};

const remove = (name) => {
    localStorage.removeItem(name);
};

const updateStorage = (data, name) => {
    remove(name);
    setData(data, name);
};