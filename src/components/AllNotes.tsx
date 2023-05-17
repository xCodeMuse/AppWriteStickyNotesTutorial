import React from "react";
import useNote from "../contexts/useNote";
import Note from "./Note";

const AllNotes = () => {
    const { notes } = useNote();

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {notes.map((note) => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:1/4 xl:w-1/5 h-full" key={note.$id}>
                    <Note note={note} />
                </div>
            ))}
        </div>
    );
};

export default AllNotes;
