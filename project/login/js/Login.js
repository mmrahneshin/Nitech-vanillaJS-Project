let username = document.getElementById('username');
let password = document.getElementById('password');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateLogin = () => {
    if (!username.value.trim()) {
        username.style.borderColor = "red";
        addAlertThenRemove("username is empty!", "fas fa-pencil-alt", "warning-alert");
    }
    if (!password.value.trim()) {
        password.style.borderColor = "red";
        addAlertThenRemove("password is empty!", "fas fa-pencil-alt", "warning-alert");
    }

    if (!validateEmail(username.value) && username.value.trim()) {
        username.style.borderColor = "red";
        addAlertThenRemove("write your email correctly!", "fas fa-pencil-alt", "warning-alert");
    }

};