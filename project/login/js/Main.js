const mounted = () => {
    if (getToken()) {
        window.location.href = "index.html";
    }
}

mounted();