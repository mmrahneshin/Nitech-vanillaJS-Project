let firstNameInput = document.getElementById('firstname');
let lastnameInput = document.getElementById('lastname');
let phonenumberInput = document.getElementById('phonenumber');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let confirmPasswordInput = document.getElementById('confirmPassword');
let agree = document.getElementById('accept');
let acceptLabel = document.getElementById('accept-label');


var accountStorage = [];

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
    let condition = true;
    if (!firstNameInput.value.trim()) {
        firstNameInput.style.borderColor = "red";
        addAlertThenRemove("firstName is empty!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (!lastnameInput.value.trim()) {
        lastnameInput.style.borderColor = "red";
        addAlertThenRemove("lastname is empty!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (!phonenumberInput.value.trim()) {
        phonenumberInput.style.borderColor = "red";
        addAlertThenRemove("phonenumber is empty!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (!emailInput.value.trim()) {
        emailInput.style.borderColor = "red";
        addAlertThenRemove("email is empty!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (!passwordInput.value.trim()) {
        passwordInput.style.borderColor = "red";
        addAlertThenRemove("password is empty!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (!confirmPasswordInput.value.trim()) {
        confirmPasswordInput.style.borderColor = "red";
        addAlertThenRemove("confirm password is empty!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (!validateEmail(emailInput.value) && emailInput.value.trim()) {
        emailInput.style.borderColor = "red";
        addAlertThenRemove("write your email correctly!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (!checkPasswordAndConfirm(passwordInput, confirmPasswordInput)) {
        passwordInput.style.borderColor = "red";
        confirmPasswordInput.style.borderColor = "red";
        addAlertThenRemove("password and confirm password isn't same!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    if (agree.checked === false) {
        acceptLabel.style.color = "red";
        addAlertThenRemove("accept all the Terms and Conditions!", "fas fa-pencil-alt", "warning-alert");
        condition = false;
    }
    return condition;
}

const addAccountToAccountStorage = (account) => {
    accountStorage.push(account);
}

const newAccount = (account) => {
    addAccountToAccountStorage(account);
    updateStorage(accountStorage, "account");
}

const createAccount = () => {
    let account = {
        id: getDataAsJSON("account") ? getDataAsJSON("account")[getDataAsJSON("account").length - 1].id + 1 : 1,
        firstName: firstNameInput.value,
        lastName: lastnameInput.value,
        phoneNumber: phonenumberInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }
    setTimeout(() => {
        firstNameInput.value = "";
        firstNameInput.style.borderColor = "#b4b7bb";

        lastnameInput.value = "";
        lastnameInput.style.borderColor = "#b4b7bb";

        phonenumberInput.value = "";
        phonenumberInput.style.borderColor = "#b4b7bb";

        emailInput.value = "";
        emailInput.style.borderColor = "#b4b7bb";

        passwordInput.value = "";
        passwordInput.style.borderColor = "#b4b7bb";

        confirmPasswordInput.value = "";
        confirmPasswordInput.style.borderColor = "#b4b7bb";

        agree.checked = false;
    });

    newAccount(account);
    addAlertThenRemove("succesfully sign up!", "fa fa-check", "success-alert");
}

const checkAccountStorages = () => {
    let storage = getDataAsJSON("account");
    let condition = true
    if (storage) {
        storage.map(item => {
            if (item.email === emailInput.value) {
                condition = false;
            }
        });
    }
    return condition;
}

const signup = () => {
    if (validateSignUp()) {
        if (checkAccountStorages()) {
            createAccount();
        } else {
            emailInput.style.borderColor = "red";
            addAlertThenRemove("email is valid!", "fas fa-pencil-alt", "warning-alert");
        }
    }
}