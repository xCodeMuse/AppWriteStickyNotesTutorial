import React, { useCallback, useEffect, useState } from "react";
import { IDBNote } from "../interfaces/Note";
import { Link } from "react-router-dom";
import getImageUrl from "../helpers/getImageUrl";
import useNote from "../contexts/useNote";
import calcPercentageOfDates from "../helpers/calcPercentageOfDates";
import useLoader from "../contexts/useLoader";

type Props = {
    note: IDBNote;
    bgColor: string;
};

const NoteCard = ({ note, bgColor }: Props) => {
    const [imgUrl, setImgUrl] = useState<string>();
    const [expiryPercentage, setExpiryPercentage] = useState(0);

    const { remove } = useNote();
    const loader = useLoader();

    const setRandomImage = useCallback(async () => {
        const { url } = await fetch("https://picsum.photos/500/300");

        setImgUrl(url);
    }, []);

    useEffect(() => {
        if (note.imageId) setImgUrl(getImageUrl(note.imageId));
        else setRandomImage();

        const percentage = calcPercentageOfDates(new Date(note.$createdAt), new Date(note.expireAt));

        setExpiryPercentage(percentage);
    }, [note, setRandomImage]);

    const deleteNote = async () => {
        loader(true);

        const isDeleted = await remove(note.$id, note.imageId);

        loader(false);
    };

    const getDate = (ISODate: string) => {
        const date = new Date(ISODate);

        return date.toLocaleTimeString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className={`rounded-lg border flex flex-wrap content-between ${bgColor}`}>
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
                <div className="relative px-4 mt-2">
                    <div className="w-full bg-gray-300 rounded-full h-1.5">
                        <div
                            className="bg-black h-1.5 rounded-full"
                            style={{
                                width: `${expiryPercentage}%`,
                            }}
                        ></div>
                    </div>
                    <p className="text-sm mt-1">
                        {expiryPercentage < 50 && "You've got enough time"}
                        {expiryPercentage >= 50 && expiryPercentage < 80 && "You don't have much time"}
                        {expiryPercentage >= 80 && expiryPercentage < 100 && "Hurry Up!"}
                        {expiryPercentage === 100 && "Time Up!"}
                    </p>
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

export default NoteCard;
