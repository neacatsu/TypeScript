import AppFirebaseStorage from "../firebase"
import INote from "../interfaces/note.interface"

const note1: INote = {
    title: "notatka",
    content: "lorem impsum",
    date: "8/6/2021",
    color: "#e6e6e6",
    favourite: true
}

const note2: INote = {
    title: "notatka",
    content: "lorem impsum",
    date: "7/6/2021",
    color: "#e6e6e6",
    favourite: true
}

describe("AppStorage", () => {
    const fb = new AppFirebaseStorage();

    it("deleteAllNotes", () => {
        expect(fb.deleteAllNotes()).resolves.toBeTruthy();
    })

    it("instance", () => {
        expect(new AppFirebaseStorage()).toBeInstanceOf(AppFirebaseStorage);
    })

})