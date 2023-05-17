import React, { useCallback, useEffect, useState } from "react";
import { NoteProvider } from "./contexts/Note";
import { IDBNote, INote } from "./interfaces/Note";
import getNotes from "./helpers/getNotes";
import createNote from "./helpers/createNote";
import updateNote from "./helpers/updateNote";
import deleteNote from "./helpers/deleteNote";
import { Outlet } from "react-router-dom";

function App() {
    const [notes, setNotes] = useState<IDBNote[]>([]);

    const addNote = useCallback(async (note: INote) => {
        const resNote = await createNote(note);

        if (resNote) {
            setNotes((prev) => [...prev, resNote]);
            return true;
        }

        return false;
    }, []);

    const modifyNote = useCallback(async (noteId: string, updatedNote: Partial<INote>) => {
        const resNote = await updateNote(noteId, updatedNote);

        if (resNote) {
            setNotes((prev) => prev.map((prev) => (prev.$id === resNote.$id ? resNote : prev)));
            return true;
        }

        return false;
    }, []);

    const removeNote = useCallback(async (noteId: string) => {
        const res = await deleteNote(noteId);

        if (res) {
            setNotes((prev) => prev.filter((note) => note.$id !== noteId));
            return true;
        }

        return false;
    }, []);

    useEffect(() => {
        getNotes().then((notesDocument) => {
            if (notesDocument) setNotes(notesDocument.documents);
        });
    }, []);

    return (
        <NoteProvider value={{ notes, add: addNote, modify: modifyNote, remove: removeNote }}>
            <Outlet />
        </NoteProvider>
    );
}

export default App;
