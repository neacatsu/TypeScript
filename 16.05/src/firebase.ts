import firebase from "firebase";
import firebaseConfig from "./../config/firebaseConfig";
import IAppStorage from "./interfaces/firebase.interface";
import INote from "./interfaces/note.interface";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

class AppFirebaseStorage implements IAppStorage {
  constructor(){
    this.getNotes()
  } 

  async saveNote(note: INote): Promise<void> {
    await db.collection("notes").add(note);
  }

  async getNotes(): Promise<INote[]> {
    return await db.collection("notes").get().then((querySnapshot) => {
      const notes: INote[] = [];
      querySnapshot.forEach((doc) => {
          notes.push(doc.data() as INote)
      })
      return notes;
    });
  }

  async getNotesId(): Promise<string[]> {
    return await db.collection("notes").get().then((querySnapshot) => {
      const notes: string[] = [];
      querySnapshot.forEach((doc) => {
        notes.push(doc.id)
      })
      return notes;
    });
  }

  async deleteAllNotes(): Promise<boolean> {
    return await db.collection("notes").get().then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {          
        await this.deleteNote(doc.id);
      })
      return true;
  });
  }

  async deleteNote(noteId: string): Promise<void> {
    await db.collection("notes").doc(noteId).delete()
  }
}

export default AppFirebaseStorage