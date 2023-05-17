export interface Document {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: any;
    $updatedAt: string;
}

export interface Note {
    title: string;
    imageId: string;
    expireAt: string;
}

export interface DBNote extends Document, Note {}
