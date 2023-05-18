import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import uploadImage from "../helpers/uploadImage";
import useNote from "../contexts/useNote";
import { IDBNote } from "../interfaces/Note";
import deleteImage from "../helpers/deleteImage";
import toDatetimeLocalFormat from "../helpers/toDatetimeLocalFormat";

type Props = {
    note?: IDBNote;
    created?: () => void;
    updated?: () => void;
};

const NoteForm = ({ note, created, updated }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expireAt, setExpireAt] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const { add, modify } = useNote();

    const imageRef = useRef<HTMLInputElement>(null);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let imageId = "";

        if (imageRef.current?.files && imageRef.current.files.length > 0) {
            if (note && note.imageId) deleteImage(note.imageId);

            const uploadedImage = await uploadImage(imageRef.current.files[0]);

            if (uploadedImage) imageId = uploadedImage.$id;
        }

        const noteObj = {
            title,
            description,
            imageId: imageId ? imageId : note?.imageId || "",
            expireAt: new Date(expireAt).toISOString(),
        };

        const isDone = note ? await modify(note.$id, noteObj) : await add(noteObj);

        if (isDone) {
            setTitle("");
            setDescription("");
            setImagePreviewUrl(null);
            setExpireAt("");
            if (imageRef.current) imageRef.current.value = "";

            if (note && updated) updated();
            if (created) created();
        }
    };

    const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const allowedExt = ["image/jpg", "image/jpeg", "image/png"];

        if (e.target && e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            if (!allowedExt.includes(file.type.toLowerCase())) {
                if (imageRef.current) imageRef.current.value = "";
                return;
            }

            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setDescription(note.description);
            setExpireAt(toDatetimeLocalFormat(new Date(note.expireAt)));
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
                required
            />

            <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] mb-3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>

            <input
                className="block w-full p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-3"
                type="datetime-local"
                value={expireAt}
                onChange={(e) => setExpireAt(e.target.value)}
                required
            />

            <label className="w-full flex flex-col items-center bg-white rounded-md shadow-md tracking-wide border border-blue cursor-pointer hover:bg-black hover:text-white ease-linear transition-all duration-150 mb-3">
                {imagePreviewUrl ? (
                    <div className="rounded overflow-hidden">
                        <img src={imagePreviewUrl} alt={imagePreviewUrl} />
                    </div>
                ) : (
                    <span className="my-2 text-base leading-normal">Select a thumbnail</span>
                )}

                <input type="file" className="hidden" ref={imageRef} onChange={fileSelected} />
            </label>

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
