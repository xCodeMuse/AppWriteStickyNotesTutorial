import { bucket } from "../appwrite/config";
import { APPWRITE_BUCKET_ID } from "../constant";

export const deleteImage = async (fileId: string) => {
    try {
        await bucket.deleteFile(APPWRITE_BUCKET_ID, fileId);
        return true;
    } catch (error) {}

    return false;
};

export default deleteImage;
