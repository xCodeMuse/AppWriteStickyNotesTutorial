import React, { FormEvent, useEffect, useRef, useState } from "react";
import uploadImage from "../helpers/uploadImage";
import useNote from "../contexts/useNote";
import { IDBNote } from "../interfaces/Note";

type Props = {
    note?: IDBNote;
    created?: () => void;
    updated?: () => void;
};

const NoteForm = ({ note, created, updated }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expireAt, setExpireAt] = useState<Date>(new Date());

    const { add, modify } = useNote();

    const imageRef = useRef<HTMLInputElement>(null);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let imageId = "";

        if (imageRef.current?.files && imageRef.current.files.length > 0) {
            const uploadedImage = await uploadImage(imageRef.current.files[0]);

            if (uploadedImage) imageId = uploadedImage.$id;
        }

        const noteObj = {
            title,
            description,
            imageId: imageId ? imageId : note?.imageId || "",
            expireAt: expireAt.toISOString(),
        };

        const isDone = note ? await modify(note.$id, noteObj) : await add(noteObj);

        if (isDone) {
            setTitle("");
            setDescription("");
            setExpireAt(new Date());
            if (imageRef.current) imageRef.current.value = "";

            if (note && updated) updated();
            if (created) created();
        }
    };

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setDescription(note.description);
            setExpireAt(new Date(note.expireAt));
        }
    }, [note]);

    return (
        <form onSubmit={submit} className="relative">
            <h2 className="text-2xl mb-3 font-semibold">{note ? "Update" : "Add New"} Note</h2>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-3"
                placeholder="Title"
            />

            <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] mb-3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
                className="block w-full p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-3"
                type="file"
                ref={imageRef}
            />

            <button
                type="submit"
                className={`focus:outline-none text-white ${
                    note ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                } focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full`}
            >
                {note ? "Update Note" : "Add Note"}
            </button>
        </form>
    );
};

export default NoteForm;