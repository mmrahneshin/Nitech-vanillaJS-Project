const mounted = () => {
    if (getToken()) {
        commentMain();
        addAlertThenRemove("Welcome!!!", "fa fa-check", "success-alert");
    } else {
        window.location.href = "login.html";
    }
};

mounted();