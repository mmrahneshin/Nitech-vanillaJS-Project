var tempComment = document.getElementById("temp-comment");
var tempEmojiButton = document.getElementById("emoji-button");
var allComment = selectElement(".allComment");
var inputComment = selectElement(".input-footer").querySelector(".input-comment");
var tempSelectEmoji = document.getElementById("temp-select-emoji");
var tempDropDown = document.getElementById("temp-drop-down");

var commentStorage = [];

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

const update = (comment) => {
    updateCommentStorage(comment);
    updateStorage(commentStorage, "comments");
};

const showUpdatedEmoji = (item, template) => {
    template.querySelector(".emoji").querySelector(".reaction").querySelector("." + item.keyValue).innerHTML = item.code + `<p>${item.count}</p>`;
};

const decreaseCountOfEmoji = (item, template) => {
    item.count--;
    showUpdatedEmoji(item, template);
};

const increaseCountOfEmoji = (item, template) => {
    item.count++;
    showUpdatedEmoji(item, template);
};

const removeEmojiFromComment = (comment, codeEmoji) => {
    comment.icons = comment.icons.filter(item => item.keyValue !== codeEmoji);
};

const removeORDecreaseEvent = (comment, emojiButton, template) => {
    emojiButton.addEventListener("click", () => {
        comment.icons.map(item => {
            if (item.keyValue === emojiButton.className) {
                if (item.count <= 1) {
                    removeEmojiFromComment(comment, emojiButton.className);
                    emojiButton.remove();
                } else {
                    decreaseCountOfEmoji(item, template);
                }
                update(comment);
            }
        });
    });
};

const addEventForReactions = (comment, template) => {
    removeORDecreaseEvent(comment, template.querySelector(".reaction").lastChild, template);
};

const createReactionButton = (backgroundColor, item, template, className, comment) => {
    const emojiButton = tempEmojiButton.content.firstElementChild.cloneNode(true);
    emojiButton.style.backgroundColor = backgroundColor;
    emojiButton.innerHTML = item.code + `<p>${item.count}</p>`;
    emojiButton.setAttribute('class', item.keyValue);
    template.querySelector(className).appendChild(emojiButton);
    addEventForReactions(comment, template);
};

const createSelectButton = (backgroundColor, emoji, template, className) => {
    const emojiButton = tempEmojiButton.content.firstElementChild.cloneNode(true);
    emojiButton.style.backgroundColor = backgroundColor;
    emojiButton.innerHTML = emoji;
    emojiButton.setAttribute('id', emoji);
    template.querySelector(className).appendChild(emojiButton);
};

const isValidEmoji = (comment, codeEmoji, template) => {
    let bool = false;
    comment.icons.map(item => {
        if (item.keyValue === codeEmoji) {
            increaseCountOfEmoji(item, template);
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
            let icon = addEmojiToComment(comment, event.target.innerHTML);
            createReactionButton("#E9EDF2", icon, template, ".reaction", comment);
        }
        update(comment);
    });
};

const selectEvent = (selectEmojiDiv, template, comment) => {
    var dropDown = selectEmojiDiv.querySelector(".drop-down");
    selectEmojiDiv.firstElementChild.addEventListener("click", () => {
        if (dropDown.style.display === "block") {
            dropDown.style.display = "none";
        } else {
            dropDown.style.display = "block";
            addEventForDropdownButtons(dropDown, template, comment);
        }
    });
};

const appendEmojiButton = (comment, template) => {
    comment.icons.forEach(item => {
        createReactionButton("#E9EDF2", item, template, ".reaction", comment);

    });
    const selectEmoji = tempSelectEmoji.content.firstElementChild.cloneNode(true);
    const dropDown = tempDropDown.content.firstElementChild.cloneNode(true);
    template.querySelector(".emoji").appendChild(selectEmoji);
    createSelectButton("#f6f8f9", "&#128512;", template.querySelector(".emoji"), ".select-emoji");
    selectEmoji.appendChild(dropDown);
    selectEvent(selectEmoji, template, comment);
};

const removeCommentFromCommentStorage = (comment) => {
    commentStorage = commentStorage.filter(item => item !== comment);
};

const removeCommentEvent = (comment, template) => {
    template.querySelector(".remove-comment").addEventListener("click", () => {
        var strconfirm = confirm("Are you sure you want to delete?");
        if (strconfirm) {
            template.remove();
            removeCommentFromCommentStorage(comment);
            updateStorage(commentStorage, "comments");
        }
    });
};

const addCommentToPage = (comment) => {
    const template = tempComment.content.firstElementChild.cloneNode(true);
    template.id = 'comment-' + comment.id;
    template.querySelector(".username").innerHTML = comment.user;
    template.querySelector(".text").innerHTML = comment.text;
    template.querySelector(".time").innerHTML = comment.time;
    template.querySelector('.remove-comment-test').setAttribute('comment', comment.id)
    appendEmojiButton(comment, template);
    removeCommentEvent(comment, template);
    allComment.appendChild(template);
};

const newComment = (comment) => {
    addCommentToCommentStorage(comment);
    addCommentToPage(comment);
    updateStorage(commentStorage, "comments");
};





document.addEventListener('click', initEvents);

function initEvents(e) {
  if(e.target.className === 'remove-comment-test') {
    let commentId = e.target.getAttribute('comment')
    removeComment_test(commentId)
  }
}

function removeComment_test(commentId) {
    removeCommentFromDocument_test(commentId)
    removeCommentFromCommentStorage_test(commentId);
    updateStorage(commentStorage, "comments");
}
function removeCommentFromDocument_test(commentId) {
    document.querySelector('#comment-' + commentId).remove();
}
const removeCommentFromCommentStorage_test = (commentId) => {
    commentStorage.forEach((item, index) => {
        if (item.id == commentId) {
            commentStorage.splice(index, 1)
        }
    })
}