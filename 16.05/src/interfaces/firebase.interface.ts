import INote from "./note.interface"

interface IAppStorage {
    saveNote: (note: INote) => Promise<void>,
    getNotes: () => Promise<void>,
    deleteNote: (noteId: string) => Promise<void>,
    updateNote: (noteId: string, content: INote) => Promise<void>
}

export default IAppStorage;