// event listener --------------------------------------------------------------------------------------------------------------------------

const findCommentById = (id) => {
    return commentStorage.find(item => item.id === Number(id));
};

const showUpdatedEmoji = (item, commentHTML) => {
    commentHTML.querySelector(".emoji").querySelector(".reaction").querySelector("#" + item.keyValue).innerHTML = item.code + `<p>${item.count}</p>`;
};

const updateCommentStorage = (comment) => {
    let index = commentStorage.findIndex(item => item.id === comment.id);
    commentStorage[index] = comment;
};

const update = (comment) => {
    updateCommentStorage(comment);
    updateStorage(commentStorage, "comments");
};

const showHideDropdown = (dropdown) => {
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
};

// input comment event-----------------------------------------------------------------------------


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
// input comment event-----------------------------------------------------------------------------


// remove comment event-----------------------------------------------------------------------------

const removeCommentFromCommentStorage = (commentId) => {
    commentStorage = commentStorage.filter(item => item.id !== Number(commentId));
};

const removeCommentFromDocument = (commentId) => {
    document.querySelector('#comment-' + commentId).remove();
};

const removeCommentEvent = (event) => {
    let commentId = event.target.parentNode.getAttribute("comment");
    var strconfirm = confirm("Are you sure you want to delete?");
    if (strconfirm) {
        removeCommentFromDocument(commentId);
        removeCommentFromCommentStorage(commentId);
        updateStorage(commentStorage, "comments");
    }
};

// remove comment event-----------------------------------------------------------------------------


// edit comment event-----------------------------------------------------------------------------

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

// edit comment event-----------------------------------------------------------------------------



// select emoji event-----------------------------------------------------------------------------

const selectEmojiEvent = (event) => {
    let dropDown = event.target.parentNode.querySelector(".drop-down");
    showHideDropdown(dropDown);
};

// select emoji event-----------------------------------------------------------------------------





// drop down event-----------------------------------------------------------------------------

const increaseCountOfEmoji = (item, commentHTML) => {
    item.count++;
    showUpdatedEmoji(item, commentHTML);
};

const isValidEmoji = (comment, codeEmoji, commentHTML) => {
    let bool = false;
    comment.icons.map(item => {
        if (item.keyValue === codeEmoji) {
            increaseCountOfEmoji(item, commentHTML);
            bool = true;
        }
    });
    return bool;
};

const addEmojiToComment = (comment, codeEmoji) => {
    let codeIcon = "&#" + codeEmoji.codePointAt() + ";";
    let iconObject = {
        code: codeIcon,
        count: 1,
        keyValue: codeEmoji
    };
    comment.icons.push(iconObject);
    return iconObject;
};

const dropDownEvent = (event) => {
    let commentId = event.target.parentNode.getAttribute("comment");
    let comment = findCommentById(commentId);
    let commentHTML = document.querySelector('#comment-' + commentId);

    if (!isValidEmoji(comment, event.target.innerHTML, commentHTML)) {
        let icon = addEmojiToComment(comment, event.target.innerHTML);
        createReactionButton("#E9EDF2", icon, commentHTML, ".reaction");
    }
    update(comment);
}

// drop down event-----------------------------------------------------------------------------


// reaction event-----------------------------------------------------------------------------

const removeEmojiFromComment = (comment, codeEmoji) => {
    comment.icons = comment.icons.filter(item => item.keyValue !== codeEmoji);
};

const decreaseCountOfEmoji = (item, template) => {
    item.count--;
    showUpdatedEmoji(item, template);
};

const removeORDecreaseEvent = (comment, emojiButton, commentHTML) => {
    comment.icons.map(item => {
        if (item.keyValue === emojiButton.id) {
            if (item.count <= 1) {
                removeEmojiFromComment(comment, emojiButton.id);
                emojiButton.remove();
            } else {
                decreaseCountOfEmoji(item, commentHTML);
            }
            update(comment);
        }
    });
};

const addEventForReactions = (event) => {
    let commentId = event.target.parentNode.getAttribute("comment");
    let comment = findCommentById(commentId);
    let commentHTML = document.querySelector('#comment-' + commentId);
    removeORDecreaseEvent(comment, event.target, commentHTML);
};

// reaction event -----------------------------------------------------------------------------


// emoji input event -----------------------------------------------------------------------------

const emojiInputEvent = (event) => {
    let dropdown = document.querySelector(".drop-down-input");
    showHideDropdown(dropdown);
};

// emoji input event -----------------------------------------------------------------------------

const inputDropdownEvent = (event) => {
    let emoji = event.target.innerHTML;
    inputComment.value += emoji;
};


const initEvents = (event) => {
    if (event.target.className === "remove-comment") {
        removeCommentEvent(event)
    }
    if (event.target.className === "edit-comment") {
        editCommentEvent(event);
    }
    if (event.target.className === "submit-edit") {
        submitEditEvent(event);
    }
    if (event.target.className === "cancel-edit") {
        cancelEditEvent(event);
    }
    if (event.target.id === "&#128512;") {
        selectEmojiEvent(event);
    }
    if (event.target.className === "drop-down-emoji") {
        dropDownEvent(event);
    }
    if (event.target.className === "remove-btn") {
        addEventForReactions(event);
    }
    if (event.target.className === "emoji-select") {
        emojiInputEvent(event);
    }
    if (event.target.className === "input-dropdown") {
        inputDropdownEvent(event);
    }
};

document.addEventListener('click', initEvents);

// event listener --------------------------------------------------------------------------------------------------------------------------