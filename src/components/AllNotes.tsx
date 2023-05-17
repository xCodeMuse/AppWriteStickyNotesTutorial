import React from "react";
import useNote from "../contexts/useNote";
import Note from "./Note";

const AllNotes = () => {
    const { notes } = useNote();

    return (
        <div className="flex flex-wrap gap-y-4">
            {notes.map((note) => (
                <div className="w-full px-2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full" key={note.$id}>
                    <Note note={note} />
                </div>
            ))}
        </div>
    );
};

export default AllNotes;
