import { database } from "../appwrite/config";
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID } from "../constant";
import { DBNote } from "../interfaces/Note";

export const getNote = async (noteId: string) => {
    try {
        const note = await database.getDocument<DBNote>(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, noteId);

        return note;
    } catch (error) {}

    return null;
};

export default getNote;
