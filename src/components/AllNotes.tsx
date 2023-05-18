import React from "react";
import useNote from "../contexts/useNote";
import Note from "./Note";

const AllNotes = () => {
    const { notes } = useNote();

    const colorCodes: string[] = [
        "bg-[#c6f2a2]",
        "bg-[#aea2f2]",
        "bg-[#7afcff]",
        "bg-[#feff9c]",
        "bg-[#fff740]",
    ];

    return (
        <div className="flex flex-wrap gap-y-4">
            {notes.map((note, i) => (
                <div className="w-full px-2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-full" key={note.$id}>
                    <Note note={note} bgColor={colorCodes[i % colorCodes.length]} />
                </div>
            ))}
        </div>
    );
};

export default AllNotes;
