const selectElement = (name) => {
    return document.querySelector(name);
};

var tempComment = document.getElementById("temp-comment");
var allComment = selectElement(".allComment");

const commentsArr = [{
        id: 1,
        user: "Johannes Gerber",
        text: "Just found this here on medium as an inspiration. Thought it could be helpful for thes task...",
        time: "Yesterday . 4:29 pm",
    },
    {
        id: 2,
        user: "Mathias Brehm",
        text: "Nice, thx, Will check it!",
        time: "Today . 26 min",
    },
];


const addCommentToPage = (comment) => {
    const template = tempComment.content.firstElementChild.cloneNode(true);
    template.id = comment.id;
    template.querySelector(".username").innerHTML = comment.user;
    template.querySelector(".text").innerHTML = comment.text;
    template.querySelector(".time").innerHTML = comment.time;
    allComment.appendChild(template);
};

const newComment = (comment) => {
    saveLocalStorage(comment);
    addCommentToPage(comment);
};

const customFor = (arr, func) => {
    arr.forEach((element) => {
        func(element);
    });
};

const mounted = () => {
    let result = convertDataToJSON("comments");
    if (result) {
        customFor(result, addCommentToPage);
    } else {
        customFor(commentsArr, newComment);
    }
};

mounted();