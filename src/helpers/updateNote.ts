import { database } from "../appwrite/config";
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID } from "../constant";
import { DBNote, Note } from "../interfaces/Note";

export const updateNote = async (noteId: string, updatedNote: Partial<Note>) => {
    try {
        const dbNote = await database.updateDocument<DBNote>(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_ID,
            noteId,
            updatedNote
        );

        return dbNote;
    } catch (error) {}

    return false;
};

export default updateNote;
