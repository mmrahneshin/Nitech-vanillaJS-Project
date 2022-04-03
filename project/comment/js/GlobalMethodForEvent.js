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