import { createContext } from "react";
import { Note } from "../interfaces/Note";

export const NoteContext = createContext<{
    notes: Note[];
    add: (note: Note) => Promise<boolean>;
    update: (noteId: string, updatedNote: Note) => Promise<boolean>;
    delete: (noteId: string) => Promise<boolean>;
}>({
    notes: [],
    add: (note: Note) => Promise.resolve(false),
    update: (noteId: string, updatedNote: Note) => Promise.resolve(false),
    delete: (noteId: string) => Promise.resolve(false),
});

export const NoteProvider = NoteContext.Provider;

export default NoteContext;
