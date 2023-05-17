import { ID } from "appwrite";
import { bucket } from "../appwrite/config";
import { APPWRITE_BUCKET_ID } from "../constant";

export const uploadImage = async (imageFile: File) => {
    try {
        const file = await bucket.createFile(APPWRITE_BUCKET_ID, ID.unique(), imageFile);

        return file;
    } catch (error) {}

    return false;
};

export default uploadImage;
