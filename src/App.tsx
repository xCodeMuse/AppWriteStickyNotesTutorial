import React, { useCallback, useEffect, useState } from "react";
import { NoteProvider } from "./contexts/Note";
import { IDBNote, INote } from "./interfaces/Note";
import getNotes from "./helpers/getNotes";
import createNote from "./helpers/createNote";
import updateNote from "./helpers/updateNote";
import deleteNote from "./helpers/deleteNote";
import { Outlet } from "react-router-dom";
import deleteImage from "./helpers/deleteImage";
import { LoaderProvider } from "./contexts/Loader";

function App() {
    const [notes, setNotes] = useState<IDBNote[]>([]);
    const [loader, setLoader] = useState(false);

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

    const removeNote = useCallback(async (noteId: string, imageId?: string) => {
        const isNoteDeleted = await deleteNote(noteId);

        if (imageId) deleteImage(imageId);

        if (isNoteDeleted) {
            setNotes((prev) => prev.filter((note) => note.$id !== noteId));
            return true;
        }

        return false;
    }, []);

    useEffect(() => {
        setLoader(true);
        getNotes()
            .then((notesDocument) => {
                if (notesDocument) setNotes(notesDocument.documents);
            })
            .finally(() => setLoader(false));
    }, []);

    return (
        <NoteProvider value={{ notes, add: addNote, modify: modifyNote, remove: removeNote }}>
            <LoaderProvider value={setLoader}>
                <Outlet />
            </LoaderProvider>
            {loader && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-white/80">
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                    >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                        </span>
                    </div>
                </div>
            )}
        </NoteProvider>
    );
}

export default App;
