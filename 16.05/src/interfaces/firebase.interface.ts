import INote from "./note.interface"

interface IAppStorage {
    saveNote: (note: INote) => void,
    getNotes: () => INote[],
    deleteNote: (noteId: string) => void 
}

export default INote;