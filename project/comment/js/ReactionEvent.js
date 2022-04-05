const removeEmojiFromComment = (comment, codeEmoji) => {
    comment.icons = comment.icons.filter(item => item.keyValue !== codeEmoji);
};

const decreaseCountOfEmoji = (item, template, loginAccount) => {
    item.accounts = item.accounts.filter(account => account !== loginAccount);
    item.count--;
    showUpdatedEmoji(item, template);
};

const removeORDecreaseEvent = (comment, emojiButton, commentHTML) => {
    let loginAccount = getUsername();
    comment.icons.map(item => {
        let checkAccount = false;
        item.accounts.map(account => {
            if (account === loginAccount) {
                checkAccount = true;
            }
        });
        if (item.keyValue === emojiButton.id) {
            if (checkAccount) {
                if (item.count <= 1) {
                    removeEmojiFromComment(comment, emojiButton.id);
                    emojiButton.remove();
                } else {
                    decreaseCountOfEmoji(item, commentHTML, loginAccount);
                }
                update(comment);
            }
        }
    });
};

const addEventForReactions = (event) => {
    let commentId = event.target.parentNode.getAttribute("comment");
    let comment = findCommentById(commentId);
    let commentHTML = document.querySelector('#comment-' + commentId);
    removeORDecreaseEvent(comment, event.target, commentHTML);
};