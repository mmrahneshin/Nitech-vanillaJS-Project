const setUsernameCookie = (username) => {
    document.cookie = "username=" + username;
};

const setTokenCookie = (token) => {
    document.cookie = "token=" + token;
}

const getCookie = () => {
    return document.cookie;
};

const removeCookies = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const getUsername = () => {
    let username = undefined;
    if (getCookie().includes("username")) {
        username = getCookie().split("; ").find(row => row.startsWith("username=")).split("=")[1];
    }
    return username;
};

const getToken = () => {
    let token = false;
    if (getCookie().includes("token")) {
        token = getCookie().split("; ").find(row => row.startsWith("token=")).split("=")[1];
    }
    return token;
}


const removeToken = () => {
    removeCookies("token");
}