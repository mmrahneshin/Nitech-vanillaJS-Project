const initialEvents = (event) => {
    if (event.target.id === "exit") {
        exit();
    }
}

document.addEventListener('click', initialEvents);