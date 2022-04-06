const increaseCountOfEmoji = (item, commentHTML) => {
    item.count++;
    showUpdatedEmoji(item, commentHTML);
};

const isValidEmoji = (comment, codeEmoji, commentHTML) => {
    let bool = false;
    let loginAccount = getUsername();
    let checkAccount = true;

    comment.icons.map(item => {
        item.accounts.map((account) => {
            if (account === loginAccount) {
                checkAccount = false;
                bool = true;
            }
        });
    });
    comment.icons.map(item => {
        if (item.keyValue === codeEmoji) {
            if (checkAccount) {
                item.accounts.push(loginAccount);
                increaseCountOfEmoji(item, commentHTML);
            }
            bool = true;
        }
    });
    return bool;
};

const addEmojiToComment = (comment, codeEmoji) => {
    let codeIcon = "&#" + codeEmoji.codePointAt() + ";";
    let iconObject = {
        accounts: [getUsername()],
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
    if (getUsername()) {
        if (!isValidEmoji(comment, event.target.innerHTML, commentHTML)) {
            let icon = addEmojiToComment(comment, event.target.innerHTML);
            createReactionButton("#E9EDF2", icon, commentHTML, ".reaction");
        }
    }
    update(comment);
}