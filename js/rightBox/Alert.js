const remove = (alert) => {
    alert.querySelector(".close").addEventListener("click", () => {
        alert.remove();
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
    document.body.appendChild(template);
    setTimeout(() => {
        template.remove();
    }, 2000);
    remove(template);
};