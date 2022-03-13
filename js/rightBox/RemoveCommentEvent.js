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