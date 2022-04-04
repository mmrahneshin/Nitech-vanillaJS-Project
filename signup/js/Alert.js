var tempAlert = document.getElementById("alert");
var notify = selectElement(".notify");

const removeTransition = (notification) => {
    notification.classList.add("remove");

    notification.addEventListener("transitionend", e => {
        notification.remove();
    });
};
const removeButton = (notification) => {
    notification.querySelector(".close").addEventListener("click", () => {
        removeTransition(notification);
    });
};

const idGenereator = () => {
    return Math.random() * 1000000 + 1;
};

const addAlertThenRemove = (massage, icon, className) => {
    const template = tempAlert.content.firstElementChild.cloneNode(true);
    template.id = idGenereator();
    template.querySelector(".massage").innerHTML = massage;
    template.querySelector(".alert-icon").className = icon;
    template.classList.add(className);
    notify.appendChild(template);
    setTimeout(() => {
        removeTransition(template);
    }, 3000);
    removeButton(template);
};