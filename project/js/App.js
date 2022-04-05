const mounted = () => {
    if (getCookie()) {
        commentMain();
    } else {
        window.location.href = "login.html";
    }
};

mounted();