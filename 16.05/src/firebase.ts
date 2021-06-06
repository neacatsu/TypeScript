import firebase from "firebase";
import firebaseConfig from "./../config/firebaseConfig";
import IAppStorage from "./interfaces/firebase.interface";
import INote from "./interfaces/note.interface";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

class AppFirebaseStorage implements IAppStorage {
    async saveNote(note: INote): Promise<void> {
        const res = await db.collection("notes").add(note);
    }

    async getNotes(): Promise<void> {
        const res = db.collection("notes").get().then((queryS) => {
            queryS.forEach((doc) => {
                console.log(doc.data())
            })
        });
    }

    async deleteNote(noteId: string): Promise<void> {
        const res = await db.collection("notes").doc(noteId).delete()
        
    }
    async updateNote(noteId: string, content: INote): Promise<void>{
        const res = await db.collection("notes").doc(noteId).update(content)
    }
}

export default AppFirebaseStorage