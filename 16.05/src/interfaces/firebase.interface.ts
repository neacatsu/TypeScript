import INote from "./note.interface"

interface IAppStorage {
    saveNote: (note: INote) => Promise<void>,
    getNotes: () => Promise<INote[]>,
    getNotesId: () => Promise<string[]>
    deleteNote: (noteId: string) => Promise<void>,
    deleteAllNotes: () => Promise<boolean>
}

export default IAppStorage;