const initEvents = (event) => {
    if (event.target.id === "username") {
        inputUsername(event);
    }
    if (event.target.id === "password") {
        inputPassword(event);
    }
    if (event.target.className === "login-button") {
        validateLogin();
    }
};


document.addEventListener('click', initEvents);