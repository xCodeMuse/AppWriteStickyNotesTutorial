import { createContext } from "react";
import { IDBNote, INote } from "../interfaces/Note";

export const NoteContext = createContext<{
    notes: IDBNote[];
    add: (note: INote) => Promise<boolean>;
    modify: (noteId: string, updatedNote: INote) => Promise<boolean>;
    remove: (noteId: string) => Promise<boolean>;
}>({
    notes: [],
    add: (note: INote) => Promise.resolve(false),
    modify: (noteId: string, updatedNote: INote) => Promise.resolve(false),
    remove: (noteId: string) => Promise.resolve(false),
});

export const NoteProvider = NoteContext.Provider;

export default NoteContext;
