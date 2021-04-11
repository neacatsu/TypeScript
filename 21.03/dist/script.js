class DrumKit {
    constructor() {
        this.allAudios = [];
        this.startButtons = [];
        this.playButtons = [];
        this.allPlays = [[], [], [], []];
        this.startPause = false;
        this.startListener = (e) => {
            this.currentSave = e.currentTarget.dataset.start;
            this.whenTime = e.timeStamp;
            this.startPause = !this.startPause;
        };
        this.nowRecording = (key, time) => {
            const duration = time - this.whenTime;
            this.allPlays[this.currentSave].push({ key, duration });
            console.log(this.allPlays);
        };
        this.playListener = (e) => {
            this.currentPlay = e.currentTarget.dataset.play;
            this.allPlays[e.currentTarget.dataset.play].forEach((element) => {
                window.setTimeout(() => {
                    this.playAudio(element.key);
                }, element.duration);
            });
        };
        this.everyRecording = () => {
            this.allPlays.forEach((recording) => {
                recording.forEach((element) => {
                    window.setTimeout(() => {
                        this.playAudio(element.key);
                    }, element.duration);
                });
            });
        };
        this.onKeyPress = (event) => {
            const key = event.key;
            const time = event.timeStamp;
            this.playAudio(key);
            this.startPause && this.nowRecording(key, time);
        };
        this.startApp();
    }
    startApp() {
        this.createAudio();
        this.createButtons();
        document.addEventListener("keypress", (e) => this.onKeyPress(e));
    }
    createAudio() {
        this.clapSound = document.querySelector('[data-sound="clap"]');
        this.boomSound = document.querySelector('[data-sound="boom"]');
        this.hihatSound = document.querySelector('[data-sound="hihat"]');
        this.tomSound = document.querySelector('[data-sound="tom"]');
        this.openhatSound = document.querySelector('[data-sound="openhat"]');
        this.rideSound = document.querySelector('[data-sound="ride"]');
        this.snareSound = document.querySelector('[data-sound="snare"]');
    }
    createButtons() {
        this.startButtons = this.setCreateButtons(".startRecording", this.startButtons);
        this.playButtons = this.setCreateButtons(".playRecording", this.playButtons);
        this.playAll = document.querySelector(".playAll");
        this.createMethods();
    }
    setCreateButtons(className, buttonArray) {
        buttonArray = [];
        const tempArr = document.querySelectorAll(className);
        tempArr.forEach(element => buttonArray.push(element));
        return [...tempArr];
    }
    createMethods() {
        this.setCreateMethods(this.startButtons, this.startListener);
        this.setCreateMethods(this.playButtons, this.playListener);
        this.playAll.addEventListener("click", () => this.everyRecording());
    }
    setCreateMethods(buttonsArray, listenerFunction) {
        buttonsArray.forEach(element => element.addEventListener('click', (e) => listenerFunction(e)));
    }
    playAudio(key) {
        switch (key) {
            case 'q':
                this.playSingleAudio(this.clapSound);
                break;
            case 'w':
                this.playSingleAudio(this.boomSound);
                break;
            case 'e':
                this.playSingleAudio(this.hihatSound);
                break;
            case 'r':
                this.playSingleAudio(this.tomSound);
                break;
            case 'u':
                this.playSingleAudio(this.openhatSound);
                break;
            case 'i':
                this.playSingleAudio(this.rideSound);
                break;
            case 'o':
                this.playSingleAudio(this.snareSound);
                break;
            default:
                return;
        }
    }
    playSingleAudio(audio) {
        audio.currentTime = 0;
        audio.play();
    }
}
const drumKit = new DrumKit();
