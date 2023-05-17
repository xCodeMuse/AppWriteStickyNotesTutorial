import { bucket } from "../appwrite/config";
import { APPWRITE_BUCKET_ID } from "../constant";

export const getImageUrl = (imageId: string) => {
    return bucket.getFilePreview(APPWRITE_BUCKET_ID, imageId).href;
};

export default getImageUrl;
