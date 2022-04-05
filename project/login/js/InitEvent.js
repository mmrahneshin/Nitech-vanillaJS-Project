const initEvents = (event) => {
    if (event.target.id === "username") {
        inputUsername(event);
    }
    if (event.target.id === "password") {
        inputPassword(event);
    }
    if (event.target.className === "login-button") {
        login();
    }
};


document.addEventListener('click', initEvents);