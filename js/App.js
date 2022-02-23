var tempComment = document.getElementById("temp-comment");
var allComment = document.querySelector(".allComment");

const commentsArr = [{
    id: 1,
    user: "Johannes Gerber",
    text: "Just found this here on medium as an inspiration. Thought it could be helpful for thes task...",
    time: "Yesterday . 4:29 pm"
}, {
    id: 2,
    user: "Mathias Brehm",
    text: "Nice, thx, Will check it!",
    time: "Today . 26 min"
}];


const saveLocalStorage = (comment) => {
    let comments;
    if (localStorage.getItem("comments") === null) {
        comments = [];
    } else {
        comments = JSON.parse(localStorage.getItem("comments"));
    }
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
};

const addCommentToPage = (comment) => {
    const template = tempComment.content.firstElementChild.cloneNode(true);
    template.id = comment.id;
    template.children[0].children[1].innerHTML = comment.user;
    template.children[1].innerHTML = comment.text;
    template.children[2].innerHTML = comment.time;
    allComment.appendChild(template);

};

const newComment = (comment) => {
    saveLocalStorage(comment);
    addCommentToPage(comment);
};

const mounted = () => {
    let result = JSON.parse(localStorage.getItem("comments"));
    if (result) {
        result.forEach(element => {
            addCommentToPage(element);
        });
    } else {
        commentsArr.forEach(element => {
            newComment(element);
        });
    }
};

mounted();