import INote from "./note.interface"

class AppStorage {
    localData: INote[];

    constructor() {
        this.localData = [];
    }

    takeNotes(): void {
        this.localData = [];
        window && window.localStorage.removeItem("notes");
        this.localData.sort(this.compareName)
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

                this.localData.push(singleNote);
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

                this.localData.push(singleNote);
            })
        }
        window && window.localStorage.setItem("notes", JSON.stringify(this.localData));
    }

    showLocalStorage(): void {
        let storagedNotes: string = "";
        if(window) {
            storagedNotes = window.localStorage.getItem("notes");
        }
        this.localData = JSON.parse(storagedNotes);
        this.localData.sort(this.compareName)
        const notesBox = document.querySelector(".notesBox__container") as HTMLDivElement;
        const favouriteBox = document.querySelector(".favouriteNote__container") as HTMLDivElement;
        this.localData.forEach((element: INote) => {
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
 
    compareName(a: INote, b: INote): number {
        const date1: string = a.date;
        const date2: string = b.date;

        let comparison: number = 0;

        if (date1 > date2) {
            comparison = 1;
        } else if (date1 < date2) {
            comparison = -1;
        }
        return comparison;
    }
}

export default AppStorage;