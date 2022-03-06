const customFor = (arr, func) => {
    arr.forEach((element) => {
        func(element);
    });
};

const mounted = () => {
    let result = getDataAsJSON("comments");
    if (result) {
        customFor(result, newComment);
    }
    scrollToBottom();
    setCookie("Mammad");
};

mounted();