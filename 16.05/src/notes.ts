import AppStorage from "./appStorage"

class Notes { 
    appStorage: AppStorage;

    constructor() {
        this.appStorage = new AppStorage();
    }

    favouriteNote(): void {
        const favouriteNote = document.querySelector(".favouriteNote__container") as HTMLDivElement;
        const allNote = document.querySelector(".notesBox__container") as HTMLDivElement;
        const favouriteNode = document.querySelectorAll(".notes__favourite") as NodeListOf<HTMLButtonElement>;
        const favouriteButtons = [...favouriteNode];
        
        favouriteButtons.forEach((button: HTMLButtonElement) => {
            button.addEventListener("click", () => {
                if (button.dataset.fav === "0") {
                    button.dataset.fav = "1"
                    favouriteNote.appendChild(button.parentElement)
                } else {
                    button.dataset.fav = "0"
                    allNote.appendChild(button.parentElement) 
                }
                this.appStorage.takeNotes()
            })
        })
    }

    removeNote(): void {
        const removeNode = document.querySelectorAll(".notes__remove") as NodeListOf<HTMLButtonElement>;
        const removeButtons = [...removeNode];
        removeButtons.forEach((button: HTMLButtonElement) => {
            button.addEventListener("click",() => {
                button.parentElement.remove();
                this.appStorage.takeNotes();
            })
        })
    }

    editNote(): void {
        const editNode = document.querySelectorAll(".notes__edit") as NodeListOf<HTMLButtonElement>;
        const editButtons = [...editNode];
        
        editButtons.forEach((button: HTMLButtonElement) => {
            let index: number = 0;
            button.addEventListener("click", () => {
                if(index % 2 == 0)  {
                    const title = button.parentNode.children[3] as HTMLTextAreaElement;
                    const content = button.parentNode.children[4] as HTMLTextAreaElement;

                    title.disabled = false;
                    content.disabled = false;
                    index++;

                } else {
                    const title = button.parentNode.children[3] as HTMLTextAreaElement;
                    const content = button.parentNode.children[4] as HTMLTextAreaElement;

                    title.disabled = true;
                    content.disabled = true;
                    index++;
                }
                this.appStorage.takeNotes();
            })
            index = 0;
        })
    }
}

export default Notes;