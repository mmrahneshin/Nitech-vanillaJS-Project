const customFor = (arr, func) => {
    arr.forEach((element) => {
        func(element);
    });
};

const signupMain = () => {
    let result = getDataAsJSON("account");
    if (result) {
        customFor(result, newAccount);
    }
};

const mounted = () => {
    if (getToken()) {
        signupMain();
        window.location.href = "index.html";
    }
    signupMain();
};

mounted();