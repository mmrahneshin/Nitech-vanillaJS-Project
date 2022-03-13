var tempComment = document.getElementById("temp-comment");
var tempEmojiButton = document.getElementById("emoji-button");
var allComment = selectElement(".allComment");
var inputComment = selectElement(".input-footer").querySelector(".input-comment");
var tempSelectEmoji = document.getElementById("temp-select-emoji");
var tempDropDown = document.getElementById("temp-drop-down");

var commentStorage = [];

const createReactionButton = (backgroundColor, item, template, className) => {
    const emojiButton = tempEmojiButton.content.firstElementChild.cloneNode(true);
    emojiButton.style.backgroundColor = backgroundColor;
    emojiButton.innerHTML = item.code + `<p>${item.count}</p>`;
    emojiButton.setAttribute('id', item.keyValue);
    template.querySelector(className).appendChild(emojiButton);
};

const createSelectButton = (backgroundColor, emoji, template, className) => {
    const emojiButton = tempEmojiButton.content.firstElementChild.cloneNode(true);
    emojiButton.style.backgroundColor = backgroundColor;
    emojiButton.innerHTML = emoji;
    emojiButton.removeAttribute("class");
    emojiButton.setAttribute('id', emoji);
    template.querySelector(className).appendChild(emojiButton);
};

const appendEmojiButton = (comment, template) => {
    comment.icons.forEach(item => {
        createReactionButton("#E9EDF2", item, template, ".reaction");
    });
    const selectEmoji = tempSelectEmoji.content.firstElementChild.cloneNode(true);
    const dropDown = tempDropDown.content.firstElementChild.cloneNode(true);
    selectEmoji.setAttribute('comment', comment.id);
    dropDown.setAttribute('comment', comment.id);
    template.querySelector(".emoji").appendChild(selectEmoji);
    createSelectButton("#f6f8f9", "&#128512;", template.querySelector(".emoji"), ".select-emoji");
    selectEmoji.appendChild(dropDown);
};

const addCommentToCommentStorage = (comment) => {
    commentStorage.push(comment);
};

const addCommentToPage = (comment) => {
    const template = tempComment.content.firstElementChild.cloneNode(true);
    template.id = 'comment-' + comment.id;
    template.querySelector(".username").innerHTML = comment.user;
    template.querySelector(".text").innerHTML = comment.text;
    template.querySelector(".time").innerHTML = comment.time;
    template.querySelector('.remove-edit').setAttribute('comment', comment.id);
    template.querySelector('.reaction').setAttribute('comment', comment.id);
    template.querySelector('.edit-input').setAttribute('comment', comment.id);


    appendEmojiButton(comment, template);
    allComment.appendChild(template);
};

const newComment = (comment) => {
    addCommentToCommentStorage(comment);
    addCommentToPage(comment);
    updateStorage(commentStorage, "comments");
};