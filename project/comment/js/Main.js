const customFor = (arr, func) => {
    arr.forEach((element) => {
        func(element);
    });
};

const commentMain = () => {
    let result = getDataAsJSON("comments");
    if (result) {
        customFor(result, newComment);
    }
    scrollToBottom();
};