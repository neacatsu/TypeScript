import INote from "./interfaces/note.interface"
import AppFirebaseStorage from "./firebase"

class FirebaseController {
    firebaseData: any;
    takenFirebaseData: string[];
    appFirebase: AppFirebaseStorage;

    constructor() {
        this.firebaseData = [];
        this.appFirebase = new AppFirebaseStorage();
        this.appFirebase.getNotes()
        this.showFirebaseStorage()
    }

    async takeNotes(): Promise<void> {
        await this.appFirebase.getNotes()
        await this.deleteAllNotes();
        const favouriteBoxNode = document.querySelectorAll(".favouriteNote__container > div") as NodeListOf<HTMLDivElement>;
        const notesBoxNode = document.querySelectorAll(".notesBox__container > div") as NodeListOf<HTMLDivElement>;
        const favouriteBox = [...favouriteBoxNode];
        const notesBox = [...notesBoxNode];

        if(favouriteBox.length !== 0) {
            favouriteBox.forEach((e: HTMLDivElement) =>  {
                const children = e.children as HTMLCollection;
                const title = children[3] as HTMLTextAreaElement;
                const content = children[4] as HTMLTextAreaElement;
                const date = children[5] as HTMLSpanElement;
                const color: string = e.style.backgroundColor;
                const favourite: boolean = true;
                
                const singleNote: INote = {
                    title: title.value,
                    content: content.value,
                    date: date.innerHTML,
                    color,
                    favourite,
                }

                this.appFirebase.saveNote(singleNote);
            }) 
        }

        if(notesBox.length !== 0) {
            notesBox.forEach((note: HTMLDivElement) => {
                const children = note.children as HTMLCollection;
                const title = children[3] as HTMLTextAreaElement;
                const content = children[4] as HTMLTextAreaElement;
                const date = children[5] as HTMLSpanElement;
                const color: string = note.style.backgroundColor;
                const favourite: boolean = false;

                const singleNote: INote = {
                    title: title.value,
                    content: content.value,
                    date: date.innerHTML,
                    color,
                    favourite,
                }

                this.appFirebase.saveNote(singleNote);
            })
        }
    }

    async deleteAllNotes() {
        this.takenFirebaseData = await this.appFirebase.idArray;
        console.log(this.takenFirebaseData);
        
        this.takenFirebaseData.forEach(async (element: string) => {
            await this.appFirebase.deleteNote(element);
        })
    }

    async showFirebaseStorage(): Promise<void> {
        this.firebaseData = await this.appFirebase.notesArray
        console.log(this.firebaseData);
        
        const notesBox = document.querySelector(".notesBox__container") as HTMLDivElement;
        const favouriteBox = document.querySelector(".favouriteNote__container") as HTMLDivElement;
        this.firebaseData.forEach((element: INote) => {
            const notes = document.createElement("div") as HTMLDivElement;
            const edit = document.createElement("button") as HTMLButtonElement;
            const favourite = document.createElement("button") as HTMLButtonElement;
            const remove = document.createElement("button") as HTMLButtonElement;
            const titleInput = document.createElement("textarea") as HTMLTextAreaElement;
            const contentInput = document.createElement("textarea") as HTMLTextAreaElement;
            const noteDate = document.createElement("span") as HTMLSpanElement;
            const color: string = element.color;

            titleInput.value = element.title;
            contentInput.value = element.content;
            noteDate.innerHTML = element.date;

            notes.setAttribute("class", "notes");
            edit.setAttribute("class","notes__edit fa fa-edit");
            favourite.setAttribute("class","notes__favourite fa fa-star");
            remove.setAttribute("class", "notes__remove fa fa-remove");
            titleInput.setAttribute("class","notes__noteTitle");
            contentInput.setAttribute("class","notes__noteContent");
            noteDate.setAttribute("class","notes__noteDate");
        
            titleInput.setAttribute("disabled", "true");
            contentInput.setAttribute("disabled", "true");
            notes.style.backgroundColor = color;
            
            if(element.favourite) {
                favourite.dataset.fav = "1";
            } else {
                favourite.dataset.fav = "0";
            }

            notes.appendChild(favourite)
            notes.appendChild(edit);
            notes.appendChild(remove);
            notes.appendChild(titleInput);
            notes.appendChild(contentInput);
            notes.appendChild(noteDate);
            element.favourite ? favouriteBox.appendChild(notes) : notesBox.appendChild(notes);
        });
    }
}

export default FirebaseController;