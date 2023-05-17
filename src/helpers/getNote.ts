import { database } from "../appwrite/config";
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID } from "../constant";
import { IDBNote } from "../interfaces/Note";

export const getNote = async (noteId: string) => {
    try {
        const note = await database.getDocument<IDBNote>(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_ID,
            noteId
        );

        return note;
    } catch (error) {}

    return null;
};

export default getNote;
