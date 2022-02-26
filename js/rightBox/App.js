const selectElement = (name) => {
    return document.querySelector(name);
};

var tempComment = document.getElementById("temp-comment");
var allComment = selectElement(".allComment");
var inputComment = selectElement(".input-footer").querySelector(".input-comment");
var tempAlert = document.getElementById("alert");


const createComment = () => {
    let comment = {
        id: getDataAsJSON("comments").length + 1,
        user: document.cookie,
        text: inputComment.value,
        time: "Today . now",
        icons: []
    };
    setTimeout(() => {
        inputComment.value = "";
    });
    newComment(comment);
    addAlertThenRemove("comment send.", "fa fa-check", "success-alert");
};

const scrollToBottom = () => {
    allComment.scrollTop = allComment.scrollHeight;
}

const validText = (event) => {
    return event.keyCode === 13 && !event.shiftKey;
};

inputComment.addEventListener("keypress", (event) => {
    if (validText(event)) {
        if (inputComment.value.trim()) {
            createComment();
            scrollToBottom();
        } else {
            addAlertThenRemove("type something!", "fas fa-pencil-alt", "warning-alert");
        }
    }
});

const createEmojiButton = (backgroundColor, emoji, template) => {
    let emojiButton = document.createElement("button");
    emojiButton.style.backgroundColor = backgroundColor;
    emojiButton.innerHTML = emoji;
    template.querySelector(".emoji").appendChild(emojiButton);
};

const appendEmojiButton = (icon, template) => {
    icon.forEach(emoji => {
        createEmojiButton("#E9EDF2", emoji, template);
    });
    createEmojiButton("#f6f8f9", "&#128512;", template);
};

const addCommentToPage = (comment) => {
    const template = tempComment.content.firstElementChild.cloneNode(true);
    template.id = comment.id;
    template.querySelector(".username").innerHTML = comment.user;
    template.querySelector(".text").innerHTML = comment.text;
    template.querySelector(".time").innerHTML = comment.time;
    appendEmojiButton(comment.icons, template);
    allComment.appendChild(template);
};



const newComment = (comment) => {
    saveLocalStorage(comment);
    addCommentToPage(comment);
};

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
        document.cookie = "Mammad";
    }
};

mounted();