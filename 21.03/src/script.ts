interface Recording {
    key: string,
    duration: number
}

class DrumKit {
    allAudios: HTMLAudioElement[] = []
    startButtons: HTMLButtonElement[] = []
    playButtons: HTMLButtonElement[] = []
    playAll: HTMLButtonElement

    boomSound: HTMLAudioElement
    clapSound: HTMLAudioElement
    hihatSound: HTMLAudioElement
    tomSound: HTMLAudioElement
    openhatSound: HTMLAudioElement
    rideSound: HTMLAudioElement
    snareSound: HTMLAudioElement

    allPlays: Recording[][] = [[], [], [], []]
    startPause: boolean = false
    currentStart: string
    whenTime: number
    currentSave: number
    currentPlay: number

    constructor() {
        this.startApp()
    }

    startApp(): void {
        this.createAudio()
        this.createButtons()
        document.addEventListener("keypress", (e: KeyboardEvent) => this.onKeyPress(e));
    }

    createAudio(): void {
        this.clapSound = document.querySelector('[data-sound="clap"]');
        this.boomSound = document.querySelector('[data-sound="boom"]');
        this.hihatSound = document.querySelector('[data-sound="hihat"]');
        this.tomSound = document.querySelector('[data-sound="tom"]');
        this.openhatSound = document.querySelector('[data-sound="openhat"]');
        this.rideSound = document.querySelector('[data-sound="ride"]');
        this.snareSound = document.querySelector('[data-sound="snare"]');
    }

    createButtons(): void {
        this.startButtons = this.setCreateButtons(".startRecording", this.startButtons);
        this.playButtons = this.setCreateButtons(".playRecording", this.playButtons);
        this.playAll = document.querySelector(".playAll");
        this.createMethods()
    }

    setCreateButtons(className: string, buttonArray: HTMLButtonElement[]): HTMLButtonElement[] {
        buttonArray = []
        const tempArr: NodeListOf<HTMLButtonElement> = document.querySelectorAll<HTMLButtonElement>(className);
        tempArr.forEach(element => buttonArray.push(element));
        return [...tempArr]
    }

    createMethods(): void {
        this.setCreateMethods(this.startButtons, this.startListener);
        this.setCreateMethods(this.playButtons, this.playListener);
        this.playAll.addEventListener("click", () => this.everyRecording())
    }

    setCreateMethods(buttonsArray: HTMLButtonElement[], listenerFunction: Function): void {
        buttonsArray.forEach(element => element.addEventListener('click', (e) => listenerFunction(e)));
    }

    startListener = (e): void => {
        this.currentSave = e.currentTarget.dataset.start;
        this.whenTime = e.timeStamp;
        this.startPause = !this.startPause     
    }

    nowRecording = (key: string, time: number): void => {
        const duration = time - this.whenTime
        this.allPlays[this.currentSave].push({ key, duration })
        console.log(this.allPlays)
    }

    playListener = (e): void => {
        this.currentPlay = e.currentTarget.dataset.play;
        this.allPlays[e.currentTarget.dataset.play].forEach((element) => {
            window.setTimeout(() => {
                this.playAudio(element.key)
            }, element.duration);
        })
    }

    everyRecording = (): void => {
        this.allPlays.forEach((recording) => {
            recording.forEach((element) => {
                window.setTimeout(() => {
                    this.playAudio(element.key)
                }, element.duration)
            })
        })
    }

    onKeyPress = (event: KeyboardEvent): void => {
        const key: string = event.key;
        const time: number = event.timeStamp;

        this.playAudio(key);
        this.startPause && this.nowRecording(key, time)
    }

    playAudio(key: string): void {
        switch (key) {
            case 'q':
                this.playSingleAudio(this.clapSound)
                break;
            case 'w':
                this.playSingleAudio(this.boomSound)
                break;
            case 'e':
                this.playSingleAudio(this.hihatSound)
                break;
            case 'r':
                this.playSingleAudio(this.tomSound)
                break;
            case 'u':
                this.playSingleAudio(this.openhatSound)
                break;
            case 'i':
                this.playSingleAudio(this.rideSound)
                break;
            case 'o':
                this.playSingleAudio(this.snareSound)
                break;   
            default: 
                return;
        }
    }

    playSingleAudio(audio: HTMLAudioElement): void {
        audio.currentTime = 0;
        audio.play();
    }
}

const drumKit = new DrumKit()
