document.addEventListener("keypress", onKeyPress);

function onKeyPress(event:KeyboardEvent):void {
    const key:string = event.key;
    const time:number = event.timeStamp;
    const boomSound:HTMLAudioElement = document.querySelector("[data-sound='boom']");

    boomSound.play();
    console.log(event);
}