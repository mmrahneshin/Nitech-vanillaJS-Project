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
    let condition = true;
    if (!username.value.trim()) {
        username.style.borderColor = "red";
        addAlertThenRemove("username is empty!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (!password.value.trim()) {
        password.style.borderColor = "red";
        addAlertThenRemove("password is empty!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (!validateEmail(username.value) && username.value.trim()) {
        username.style.borderColor = "red";
        addAlertThenRemove("write your email correctly!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    return condition;
};

const checkEmail = () => {
    let condition = false;
    let accountStorage = getDataAsJSON("account");
    if (accountStorage) {
        accountStorage.map(item => {
            if (item.email === username.value) {
                condition = item;
            }
        })
    }
    return condition;
}

const checkPassword = (account) => {
    if (account.password === password.value) {
        return true;
    }
    return false;
}

const login = () => {
    if (validateLogin()) {
        let account = checkEmail();
        if (account) {
            if (checkPassword(account)) {
                setCookie(account.email);
                window.location.href = "index.html";
            } else {
                password.style.borderColor = "red";
                addAlertThenRemove("password is incorrect!", "fa fa-close", "danger-alert");
            }
        } else {
            username.style.borderColor = "red";
            addAlertThenRemove("email is invalid!", "fas fa-pencil-alt", "warning-alert");
        }
    }
}