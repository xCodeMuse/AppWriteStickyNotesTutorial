import { database } from "../appwrite/config";
import { APPWRITE_COLLECTION_ID, APPWRITE_DATABASE_ID } from "../constant";
import { DBNote } from "../interfaces/Note";

export const getNotes = async () => {
    try {
        const note = await database.listDocuments<DBNote>(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID);

        return note;
    } catch (error: any) {
        console.log(error);
    }

    return null;
};

export default getNotes;
