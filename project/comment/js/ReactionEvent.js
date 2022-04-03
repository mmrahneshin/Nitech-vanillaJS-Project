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