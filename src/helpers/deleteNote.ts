import { database } from "../appwrite/config";
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID } from "../constant";

export const deleteNote = async (noteId: string) => {
    try {
        await database.deleteDocument(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, noteId);
        return true;
    } catch (error) {}

    return false;
};

export default deleteNote;
