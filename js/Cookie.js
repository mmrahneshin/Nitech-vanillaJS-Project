const setCookie = (username) => {
    document.cookie = "username=" + username;
};

const getCookie = () => {
    return document.cookie;
};

const getUsername = () => {
    let username = getCookie().split("=")[1];
    return username;
};