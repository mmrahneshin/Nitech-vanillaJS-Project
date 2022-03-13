const getP = (commentId) => {
    return document.querySelector('#comment-' + commentId).querySelector(".text");
};

const getInput = (commentId) => {
    return document.querySelector('#comment-' + commentId).querySelector(".editable-input");

};

const putTextToTextarea = (paragraph, textarea) => {
    textarea.value = paragraph.innerHTML;
};

const fixDisplayStyle = (paragraph, textarea) => {
    if (paragraph.style.display === "none") {
        paragraph.style.display = "block";
        textarea.parentNode.style.display = "none";
    } else {
        paragraph.style.display = "none";
        textarea.parentNode.style.display = "flex";
    }

};

const editCommentEvent = (event) => {
    let commentId = event.target.parentNode.getAttribute("comment");
    let paragraph = getP(commentId);
    let textarea = getInput(commentId);
    putTextToTextarea(paragraph, textarea);
    fixDisplayStyle(paragraph, textarea);
};

const putTextToParagraph = (paragraph, textarea) => {
    paragraph.innerHTML = textarea.value;
};

const submitEditEvent = (event) => {
    let commentId = event.target.parentNode.getAttribute("comment");
    let paragraph = getP(commentId);
    let textarea = getInput(commentId);
    if (textarea.value.trim()) {
        putTextToParagraph(paragraph, textarea);
        fixDisplayStyle(paragraph, textarea);
        addAlertThenRemove("Successful editing", "fa fa-check", "success-alert");
    } else {
        addAlertThenRemove("type something!", "fas fa-pencil-alt", "warning-alert");
    }
};

const cancelEditEvent = (event) => {
    let commentId = event.target.parentNode.getAttribute("comment");
    let paragraph = getP(commentId);
    let textarea = getInput(commentId);
    fixDisplayStyle(paragraph, textarea);
};