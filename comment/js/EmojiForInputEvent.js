const emojiInputEvent = () => {
    let dropdown = document.querySelector(".drop-down-input");
    showHideDropdown(dropdown);
};

const inputDropdownEvent = (event) => {
    let emoji = event.target.innerHTML;
    inputComment.value += emoji;
};