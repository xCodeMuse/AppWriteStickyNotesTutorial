import { ID } from "appwrite";
import { database } from "../appwrite/config";
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID } from "../constant";
import { DBNote, Note } from "../interfaces/Note";

export const createNote = async (note: Note) => {
    try {
        const dbNote = await database.createDocument<DBNote>(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_ID,
            ID.unique(),
            note
        );

        return dbNote;
    } catch (error) {}

    return false;
};

export default createNote;
