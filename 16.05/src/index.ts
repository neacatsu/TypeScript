import Note from "./note";
import Notes from "./notes";
import AppStorage from "./appStorage";
import './main.scss';

class Index {
    note: Note;
    notes: Notes;
    appStorage: AppStorage;

    constructor() {
        this.note = new Note();
        this.notes = new Notes();
        this.appStorage = new AppStorage();
    }
}

const index = new Index();
