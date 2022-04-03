const getTimeAndDate = () => {
    let dateTime = new Date();
    let time = dateTime.toLocaleTimeString();
    let date = dateTime.toLocaleDateString();
    return date + ". " + time;
};