let firstName = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let phonenumber = document.getElementById('phonenumber');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');
let agree = document.getElementById('accept');
let acceptLabel = document.getElementById('accept-label');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const checkPasswordAndConfirm = (password, confirm) => {
    return password.value === confirm.value;
};

const validateSignUp = () => {
    if (!firstName.value.trim()) {
        firstName.style.borderColor = "red";
        addAlertThenRemove("firstName is empty!", "fas fa-pencil-alt", "warning-alert");
    }
    if (!lastname.value.trim()) {
        lastname.style.borderColor = "red";
        addAlertThenRemove("lastname is empty!", "fas fa-pencil-alt", "warning-alert");
    }
    if (!phonenumber.value.trim()) {
        phonenumber.style.borderColor = "red";
        addAlertThenRemove("phonenumber is empty!", "fas fa-pencil-alt", "warning-alert");
    }
    if (!email.value.trim()) {
        email.style.borderColor = "red";
        addAlertThenRemove("email is empty!", "fas fa-pencil-alt", "warning-alert");
    }
    if (!password.value.trim()) {
        password.style.borderColor = "red";
        addAlertThenRemove("password is empty!", "fas fa-pencil-alt", "warning-alert");
    }
    if (!confirmPassword.value.trim()) {
        confirmPassword.style.borderColor = "red";
        addAlertThenRemove("confirm password is empty!", "fas fa-pencil-alt", "warning-alert");
    }
    if (!validateEmail(email.value) && email.value.trim()) {
        email.style.borderColor = "red";
        addAlertThenRemove("write your email correctly!", "fas fa-pencil-alt", "warning-alert");
    }
    if (!checkPasswordAndConfirm(password, confirmPassword)) {
        password.style.borderColor = "red";
        confirmPassword.style.borderColor = "red";
        addAlertThenRemove("password and confirm password isn't same!", "fas fa-pencil-alt", "warning-alert");
    }
    if (agree.checked === false) {
        label.style.color = "red";
        addAlertThenRemove("accept all the Terms and Conditions!", "fas fa-pencil-alt", "warning-alert");
    }
}