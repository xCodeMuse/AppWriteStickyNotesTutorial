import React, { useCallback, useEffect, useState } from "react";
import { IDBNote } from "../interfaces/Note";
import { Link } from "react-router-dom";
import getImageUrl from "../helpers/getImageUrl";
import useNote from "../contexts/useNote";

type Props = {
    note: IDBNote;
};

const Note = ({ note }: Props) => {
    const [imgUrl, setImgUrl] = useState<string>();

    const { remove } = useNote();

    const setRandomImage = useCallback(async () => {
        const { url } = await fetch("https://picsum.photos/500/300");

        setImgUrl(url);
    }, []);

    useEffect(() => {
        if (note.imageId) setImgUrl(getImageUrl(note.imageId));
        else setRandomImage();
    }, [note, setRandomImage]);

    const deleteNote = async () => {
        const isDeleted = await remove(note.$id);
    };

    return (
        <div className={`rounded-md border`}>
            <Link to={`/note/${note.$id}`}>
                <img src={imgUrl} alt={note.title} className="h-[200px] w-full rounded-md object-cover" />
            </Link>
            <div className="p-4">
                <Link to={`/note/${note.$id}`}>
                    <h2 className="text-lg font-semibold">{note.title}</h2>
                </Link>
                <button
                    type="button"
                    className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={deleteNote}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Note;
