import { Client, Databases, Storage } from "appwrite";
import { APPWRITE_PROJECT_ID, APPWRITE_URL } from "../constant";

const client = new Client();

client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT_ID);

const database = new Databases(client);

const bucket = new Storage(client);

export { database, bucket };
