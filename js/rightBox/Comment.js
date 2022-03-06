var tempComment = document.getElementById("temp-comment");
var tempEmojiButton = document.getElementById("emoji-button");
var allComment = selectElement(".allComment");
var inputComment = selectElement(".input-footer").querySelector(".input-comment");
var tempSelectEmoji = document.getElementById("temp-select-emoji");
var tempDropDown = document.getElementById("temp-drop-down");
const commentStorage = [];


const addCommentToCommentStorage = (comment) => {
    commentStorage.push(comment);
};

const createComment = () => {
    let comment = {
        id: getDataAsJSON("comments") ? getDataAsJSON("comments").length + 1 : 1,
        user: getUsername(),
        text: inputComment.value,
        time: getTimeAndDate(),
        icons: [{
            code: "&#128512;"
        }]
    };
    setTimeout(() => {
        inputComment.value = "";
    });
    newComment(comment);
    addAlertThenRemove("comment send.", "fa fa-check", "success-alert");
};

const scrollToBottom = () => {
    allComment.scrollTop = allComment.scrollHeight;
};

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

const updateCommentStorage = (comment) => {
    let index = commentStorage.findIndex(item => item.id === comment.id);
    commentStorage[index] = comment;
};

const updateComment = (comment, codeEmoji) => {
    comment.icons = comment.icons.filter(item => item.code !== "&#" + codeEmoji.codePointAt() + ";");
};

const removeEvent = (comment, emojiButton) => {
    emojiButton.addEventListener("click", () => {
        updateComment(comment, emojiButton.innerHTML);
        updateCommentStorage(comment);
        updateStorage(commentStorage, "comments");
        emojiButton.remove();
    });
};

const addEventForReactions = (comment, template) => {
    removeEvent(comment, template.querySelector(".emoji").lastChild);
};

const createEmojiButton = (backgroundColor, emoji, template, className) => {
    const emojiButton = tempEmojiButton.content.firstElementChild.cloneNode(true);
    emojiButton.style.backgroundColor = backgroundColor;
    emojiButton.innerHTML = emoji;
    emojiButton.setAttribute('id', emoji)
    template.querySelector(className).appendChild(emojiButton);
};

const appendEmojiButton = (comment, template) => {
    comment.icons.forEach(emoji => {
        createEmojiButton("#E9EDF2", emoji.code, template, ".emoji");
        addEventForReactions(comment, template);
    });
    const selectEmoji = tempSelectEmoji.content.firstElementChild.cloneNode(true);
    template.querySelector(".emoji").appendChild(selectEmoji);
    createEmojiButton("#f6f8f9", "&#128512;", template.querySelector(".emoji"), ".select-emoji");
    // const dropDown = tempDropDown.content.firstElementChild.cloneNode(true);
    // selectEmoji.appendChild(dropDown);
};

const addCommentToPage = (comment) => {
    const template = tempComment.content.firstElementChild.cloneNode(true);
    template.id = comment.id;
    template.querySelector(".username").innerHTML = comment.user;
    template.querySelector(".text").innerHTML = comment.text;
    template.querySelector(".time").innerHTML = comment.time;
    appendEmojiButton(comment, template);
    allComment.appendChild(template);
};

const newComment = (comment) => {
    addCommentToCommentStorage(comment);
    addCommentToPage(comment);
    updateStorage(commentStorage, "comments");
};