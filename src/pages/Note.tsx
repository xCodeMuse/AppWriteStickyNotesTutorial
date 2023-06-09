import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import useNote from "../contexts/useNote";
import { IDBNote } from "../interfaces/Note";
import getImageUrl from "../helpers/getImageUrl";
import getNote from "../helpers/getNote";
import useLoader from "../contexts/useLoader";

const Note = () => {
    const [imgUrl, setImgUrl] = useState<string>();
    const [note, setNote] = useState<IDBNote>();

    const loader = useLoader();

    const { id } = useParams();
    const navigate = useNavigate();

    const { notes } = useNote();

    useEffect(() => {
        const run = async () => {
            let filteredNote: IDBNote | null = notes.filter((note) => note.$id === id)[0];

            if (id && !filteredNote) {
                loader(true);

                filteredNote = await getNote(id);

                loader(false);
            }

            if (!id || !filteredNote) {
                navigate("/");
                return;
            }

            setNote(filteredNote);

            if (filteredNote.imageId) {
                const imgUrl = getImageUrl(filteredNote.imageId);
                setImgUrl(imgUrl);
            }
        };

        run();
    }, [id, navigate, notes]);

    const updated = () => {
        navigate("/");
    };

    return (
        <div className="fixed inset-0 bg-black/30">
            <div className="relative inset-0 text-right p-4">
                <Link
                    to={"/"}
                    className="bg-white inline-block text-black px-4 py-2 rounded-lg shadow-xl hover:bg-slate-200 transition"
                >
                    X
                </Link>
            </div>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex">
                <div className="w-full max-w-4xl bg-white mx-auto p-4 rounded-lg relative">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 lg:w-3/5 p-2 flex items-center justify-center">
                            <img src={imgUrl} alt={note?.title} className="rounded-lg border" />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-2/5 p-2">
                            <NoteForm note={note} updated={updated} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Note;
