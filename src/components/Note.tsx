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

    const getStickyColor = () => {
        const colorCodes: string[] = [
            "bg-[#c6f2a2]",
            "bg-[#aea2f2]",
            "bg-[#7afcff]",
            "bg-[#feff9c]",
            "bg-[#fff740]",
        ];

        const index = Math.floor(Math.random() * colorCodes.length);

        return colorCodes[index];
    };

    const getDate = (ISODate: string) => {
        const date = new Date(ISODate);

        return date.toLocaleTimeString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            // timeStyle: "full",
        });
    };

    return (
        <div className={`rounded-lg border flex flex-wrap content-between ${getStickyColor()}`}>
            <div className="relative w-full">
                <Link to={`/note/${note.$id}`}>
                    <div className="p-4 pb-0">
                        <img
                            src={imgUrl}
                            alt={note.title}
                            className="h-[150px] w-full rounded-lg object-cover"
                        />
                    </div>
                </Link>
                <div className="pt-4 px-4">
                    <Link to={`/note/${note.$id}`}>
                        <h2 className="text-lg font-semibold">{note.title}</h2>
                        <p className="text-sm text-gray-600">{note.description}</p>
                        <p className="text-sm mt-3">
                            <span className="font-semibolg">Created: </span>
                            <span className="text-gray-600">{getDate(note.$createdAt)}</span>
                        </p>
                    </Link>
                </div>
            </div>
            <div className="pb-4 relative w-full px-4">
                <button
                    type="button"
                    className="mt-4 px-4 rounded-lg bg-black py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={deleteNote}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Note;
