import AppStorage from "./appStorage"
import FirebaseController from "./firebaseController"
import environment from "../config/config"

class Notes { 
  appStorage: AppStorage;
  firebaseController: FirebaseController;

  constructor() {
    this.appStorage = new AppStorage();
    this.firebaseController = new FirebaseController();
  }

  favouriteNote(): void {
    const favouriteNote = document.querySelector(".favouriteNote__container") as HTMLDivElement;
    const allNote = document.querySelector(".notesBox__container") as HTMLDivElement;
    const favouriteNode = document.querySelectorAll(".notes__favourite") as NodeListOf<HTMLButtonElement>;
    const favouriteButtons = [...favouriteNode];
    
    favouriteButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener("click", async () => {
          console.log(button, button.dataset.fav);
          
        if (button.dataset.fav === "0") {
          button.dataset.fav = "1"
          favouriteNote.appendChild(button.parentElement)
        } else {
          button.dataset.fav = "0"
          allNote.appendChild(button.parentElement) 
        }

        environment === "ls" ? this.appStorage.takeNotes() : await this.firebaseController.takeNotes()   
      })
    })
  }

  removeNote(): void {
    const removeNode = document.querySelectorAll(".notes__remove") as NodeListOf<HTMLButtonElement>;
    const removeButtons = [...removeNode];
    removeButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener("click", async () => {
        button.parentElement.remove();
        environment === "ls" ? this.appStorage.takeNotes() : await this.firebaseController.takeNotes()   
      })
    })
  }

  editNote(): void {
    const editNode = document.querySelectorAll(".notes__edit") as NodeListOf<HTMLButtonElement>;
    const editButtons = [...editNode];
    
    editButtons.forEach((button: HTMLButtonElement) => {
      let index: number = 0;
      button.addEventListener("click", async () => {
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
        environment === "ls" ? this.appStorage.takeNotes() : await this.firebaseController.takeNotes()   
      })
      index = 0;
    })
  }
}

export default Notes;