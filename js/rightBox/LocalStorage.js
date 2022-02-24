const getData = (name) => {
    return localStorage.getItem(name);
};

const getDataAsJSON = (name) => {
    return JSON.parse(getData(name));
};

const saveLocalStorage = (comment) => {
    let comments;
    if (getData("comments") === null) {
        comments = [];
    } else {
        comments = getDataAsJSON("comments");
    }
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
};