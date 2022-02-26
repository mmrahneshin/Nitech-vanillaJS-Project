const selectElement = (name) => {
    return document.querySelector(name);
};

var tempComment = document.getElementById("temp-comment");
var allComment = selectElement(".allComment");
var inputComment = selectElement(".input-footer").querySelector(".input-comment");


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
        window.alert("comment send.");
    });
    newComment(comment);
};

const scrollToBottom = () => {
    allComment.scrollTop = allComment.scrollHeight;
}

inputComment.addEventListener("keypress", (event) => {
    if (event.keyCode === 13 && inputComment.value.trim() && !event.shiftKey && !event.ctrlKey) {
        createComment();
        scrollToBottom();
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