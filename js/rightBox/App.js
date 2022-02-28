const customFor = (arr, func) => {
    arr.forEach((element) => {
        func(element);
    });
};

const mounted = () => {
    let result = getDataAsJSON("comments");
    if (result) {
        customFor(result, addCommentToPage);
    } else {
        customFor(defaultComment, newComment);
        setCookie("Mammad");
    }
};

mounted();