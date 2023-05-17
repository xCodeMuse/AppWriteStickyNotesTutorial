export interface IDocument {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: any;
    $updatedAt: string;
}

export interface INote {
    title: string;
    description: string;
    imageId: string;
    expireAt: string;
}

export interface IDBNote extends IDocument, INote {}
