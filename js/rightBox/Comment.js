var tempComment = document.getElementById("temp-comment");
var tempEmojiButton = document.getElementById("emoji-button");
var allComment = selectElement(".allComment");
var inputComment = selectElement(".input-footer").querySelector(".input-comment");
var tempSelectEmoji = document.getElementById("temp-select-emoji");
var tempDropDown = document.getElementById("temp-drop-down");
const commentStorage = [];

console.log(tempEmojiButton);

const addCommentToCommentStorage = (comment) => {
    commentStorage.push(comment);
};

const createComment = () => {
    let comment = {
        id: getDataAsJSON("comments") ? getDataAsJSON("comments").length + 1 : 1,
        user: getUsername(),
        text: inputComment.value,
        time: getTimeAndDate(),
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

const removeEmojiFromComment = (comment, codeEmoji) => {
    comment.icons = comment.icons.filter(item => item.code !== "&#" + codeEmoji.codePointAt() + ";");
};

const addEmojiToComment = (comment, codeEmoji) => {
    let codeIcon = "&#" + codeEmoji.codePointAt() + ";";
    let iconObject = {
        code: codeIcon,
        count: 1
    };
    comment.icons.push(iconObject);
};

const update = (comment) => {
    updateCommentStorage(comment);
    updateStorage(commentStorage, "comments");
};

const removeEvent = (comment, emojiButton) => {
    emojiButton.addEventListener("click", () => {
        removeEmojiFromComment(comment, emojiButton.innerHTML);
        update(comment);
        emojiButton.remove();
    });
};

const addEventForReactions = (comment, template) => {
    removeEvent(comment, template.querySelector(".reaction").lastChild);
};

const createReactionButton = (backgroundColor, emoji, template, className) => {
    const emojiButton = tempEmojiButton.content.firstElementChild.cloneNode(true);
    emojiButton.style.backgroundColor = backgroundColor;
    emojiButton.innerHTML = emoji + "<p>1</p>";
    emojiButton.setAttribute('class', "k" + emoji);
    template.querySelector(className).appendChild(emojiButton);
};

const createSelectButton = (backgroundColor, emoji, template, className) => {
    const emojiButton = tempEmojiButton.content.firstElementChild.cloneNode(true);
    emojiButton.style.backgroundColor = backgroundColor;
    emojiButton.innerHTML = emoji;
    emojiButton.setAttribute('id', emoji)
    template.querySelector(className).appendChild(emojiButton);
};

const showUpdatedEmoji = (count, codeString, template) => {
    console.log(template.querySelector(".emoji").querySelector(".reaction"));
    template.querySelector(".emoji").querySelector(".reaction").querySelector(".k" + codeString).innerHTML = codeString + `<p>${count}</p>`;
};

const updateCountOfEmoji = (item, codeString, template) => {
    item.count++;
    showUpdatedEmoji(item.count, codeString, template);
};

const isValidEmoji = (comment, codeEmoji, template) => {
    let bool = false;
    let codeString = "&#" + codeEmoji.codePointAt() + ";";
    comment.icons.map(item => {
        if (item.code === codeString) {
            updateCountOfEmoji(item, codeString, template);
            bool = true;
        }
    });
    return bool;
};

const addEventForDropdownButtons = (dropDown, template, comment) => {
    dropDown.addEventListener("click", event => {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }
        if (!isValidEmoji(comment, event.target.innerHTML, template)) {
            addEmojiToComment(comment, event.target.innerHTML);
            createReactionButton("#E9EDF2", event.target.innerHTML, template, ".reaction");
        }
        update(comment);
        addEventForReactions(comment, template);
    });
};

const selectEvent = (selectEmojiDiv, template, comment) => {
    var dropDown = selectEmojiDiv.querySelector(".drop-down");
    selectEmojiDiv.firstElementChild.addEventListener("click", () => {
        if (dropDown.style.display === "block") {
            dropDown.style.display = "none";
            addEventForDropdownButtons(dropDown, template, comment);
        } else {
            dropDown.style.display = "block";
        }
    });
};

const appendEmojiButton = (comment, template) => {
    comment.icons.forEach(emoji => {
        createReactionButton("#E9EDF2", emoji.code, template, ".reaction");
        addEventForReactions(comment, template);
    });
    const selectEmoji = tempSelectEmoji.content.firstElementChild.cloneNode(true);
    const dropDown = tempDropDown.content.firstElementChild.cloneNode(true);
    template.querySelector(".emoji").appendChild(selectEmoji);
    createSelectButton("#f6f8f9", "&#128512;", template.querySelector(".emoji"), ".select-emoji");
    selectEmoji.appendChild(dropDown);
    selectEvent(selectEmoji, template, comment);
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