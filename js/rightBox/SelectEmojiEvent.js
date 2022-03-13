const selectEmojiEvent = (event) => {
    let dropDown = event.target.parentNode.querySelector(".drop-down");
    showHideDropdown(dropDown);
};