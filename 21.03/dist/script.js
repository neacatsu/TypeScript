document.addEventListener("keypress", onKeyPress);
function onKeyPress(event) {
    const key = event.key;
    const time = event.timeStamp;
    const boomSound = document.querySelector("[data-sound='boom']");
    boomSound.play();
    console.log(event);
}
