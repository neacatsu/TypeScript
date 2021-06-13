import AppStorage from "../AppStorage"
import INote from "../interfaces/note.interface"

const note1: INote = {
    title: "notatka",
    content: "lorem impsum",
    date: "8/6/2021",
    color:"#e6e6e6",
    favourite:true
}

const note2: INote = {
    title: "notatka",
    content: "lorem impsum",
    date: "7/6/2021",
    color:"#e6e6e6",
    favourite:true
}

describe("AppStorage", () => {
    const appStorge = new AppStorage();

    it("compareName pass with 1", () => {
        expect(appStorge.compareName(note1, note2)).toBe(1);
    })
    it("compareName failed test", () => {
        expect(appStorge.compareName(note2, note1)).toBe(-1);
    })

})