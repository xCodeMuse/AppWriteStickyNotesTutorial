import React, { FormEvent, useRef, useState } from "react";
import uploadImage from "../helpers/uploadImage";
import useNote from "../contexts/useNote";

const AddNoteForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expireAt, setExpireAt] = useState<Date>(new Date());

    const { add } = useNote();

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
            imageId,
            expireAt: expireAt.toISOString(),
        };

        const isAdded = await add(noteObj);

        if (isAdded) {
            setTitle("");
            setDescription("");
            setExpireAt(new Date());
            if (imageRef.current) imageRef.current.value = "";
        }
    };

    return (
        <form onSubmit={submit} className="relative">
            <h2 className="text-2xl mb-3 font-semibold">Add New Note</h2>

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
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-full"
            >
                Add Note
            </button>
        </form>
    );
};

export default AddNoteForm;
