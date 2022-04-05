const initEvents = (event) => {
    if (event.target.id === "firstname") {
        inputFirstName(event);
    }
    if (event.target.id === "lastname") {
        inputLastName(event);
    }
    if (event.target.id === "phonenumber") {
        inputPhoneNumber(event);
    }
    if (event.target.id === "email") {
        inputEmail(event);
    }
    if (event.target.id === "password") {
        inputPassword(event);
    }
    if (event.target.id === "confirmPassword") {
        inputConfirmPassword(event);
    }
    if (event.target.id === "accept") {
        inputAccept();
    }
    if (event.target.className === "signup-button") {
        signup();
    }
}

document.addEventListener('click', initEvents);