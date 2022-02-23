const getData = (name) => {
    return localStorage.getItem(name);
};

const convertDataToJSON = (name) => {
    return JSON.parse(getData(name));
};

const saveLocalStorage = (comment) => {
    let comments;
    if (getData("comments") === null) {
        comments = [];
    } else {
        comments = convertDataToJSON("comments");
    }
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
};