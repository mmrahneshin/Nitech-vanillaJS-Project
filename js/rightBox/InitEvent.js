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
        emojiInputEvent();
    }
    if (event.target.className === "input-dropdown") {
        inputDropdownEvent(event);
    }
};

document.addEventListener('click', initEvents);