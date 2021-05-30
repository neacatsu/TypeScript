import AppStorage from "./appStorage";
import Notes from "./notes";

class Note {
    appStorage: AppStorage;
    notes: Notes;
    title: HTMLInputElement;
    content: HTMLInputElement;
    date: HTMLSpanElement;
    colorsArray: HTMLInputElement[];

    constructor() {
        this.appStorage = new AppStorage();
        this.notes = new Notes();
        this.setListener()
        this.getDate()
        this.appStorage.showLocalStorage();
        this.callListeners()
    }

    callListeners(): void {
        this.notes.favouriteNote();
        this.notes.editNote();
        this.notes.removeNote();
    }

    createNote(e: Event): void {
        e.preventDefault();
        this.title = document.querySelector(".form__title");
        this.content = document.querySelector(".form__content");
        this.date = document.querySelector(".date");
        const colorsNode = document.querySelectorAll("input[type='radio']") as NodeListOf<HTMLInputElement>;
        this.colorsArray = [...colorsNode];
        
        this.createContainer();
        this.callListeners();
        this.appStorage.takeNotes();        
    }

    setListener(): void {
        const button = document.querySelector("button") as HTMLButtonElement;
        button.addEventListener("click", (e: Event) => this.createNote(e));
    }
    
    createContainer(): void {
        const notesBox = document.querySelector(".notesBox__container") as HTMLDivElement;
        const notes = document.createElement("div") as HTMLDivElement;
        const edit = document.createElement("button") as HTMLButtonElement;
        const favourite = document.createElement("button") as HTMLButtonElement;
        const remove = document.createElement("button") as HTMLButtonElement;
        const titleInput = document.createElement("textarea") as HTMLTextAreaElement;
        const contentInput = document.createElement("textarea") as HTMLTextAreaElement;
        const noteDate = document.createElement("span") as HTMLSpanElement;
        let color: string = "#e6e6e6";

        this.colorsArray.forEach((element: HTMLInputElement) => {
            if(element.checked) {
                color = element.value;
            }
        });

        titleInput.value = this.title.value;
        contentInput.value = this.content.value;
        noteDate.innerHTML = this.date.innerHTML;

        notes.setAttribute("class", "notes");
        edit.setAttribute("class","notes__edit fa fa-edit");
        favourite.setAttribute("class","notes__favourite fa fa-star");
        remove.setAttribute("class", "notes__remove fa fa-remove");
        titleInput.setAttribute("class","notes__noteTitle");
        contentInput.setAttribute("class","notes__noteContent");
        noteDate.setAttribute("class","notes__noteDate");
       
        titleInput.setAttribute("disabled", "true");
        contentInput.setAttribute("disabled", "true");
        favourite.dataset.fav = "0";
        notes.style.backgroundColor = color;

        notes.appendChild(favourite)
        notes.appendChild(edit);
        notes.appendChild(remove);
        notes.appendChild(titleInput);
        notes.appendChild(contentInput);
        notes.appendChild(noteDate);
        notesBox.appendChild(notes);
    }

    getDate(): void {
        const dateSpan: HTMLButtonElement = document.querySelector(".date");
        const date: Date = new Date();
        const day: number = date.getDate();
        const month: number = date.getMonth();
        const year: number = date.getFullYear();
        dateSpan.innerText=`${day}/${month+1}/${year}`;
    }
}

export default Note;