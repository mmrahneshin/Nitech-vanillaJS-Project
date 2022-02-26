var notify = selectElement(".notify");

const removeTransition = (temolate) => {
    temolate.classList.add("remove");

    setTimeout(() => {
        temolate.remove()
    }, 490);
};
const removeButton = (temolate) => {
    temolate.querySelector(".close").addEventListener("click", () => {
        removeTransition(temolate);
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