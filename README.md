# StickyTrack - Track Notes, Track Time, Stay Organized

StickyTrack is an intuitive task management application that combines the convenience of sticky notes with powerful tracking features. With StickyTrack, you can easily stay organized and manage your tasks effectively.

## Getting Started

1. Create a new React app using Create React App.
2. Install the necessary dependencies by running the following command:\
   `$ npm install appwrite react-router-dom`

3. Install Tailwind CSS as a development dependency by running the command:\
   `$ npm install -D tailwindcss`

4. Configure Tailwind CSS by running the following command:\
   `$ npx tailwindcss init`

## Appwrite

#### What is Appwrite and why do we need it?

Appwrite is an open-source backend server infrastructure that simplifies the development of web applications by providing a wide range of pre-built APIs. We need Appwrite because it provides a NoSQL database and API endpoints, allowing developers to easily store and retrieve data.

#### How to configure Appwrite in our project?

To configure Appwrite in your project, follow these steps:

1. Open [Appwrite Cloud](https://cloud.appwrite.io/) and create a new project.
2. Choose the "Web App" platform and provide a name for your app.
3. In the hostname field, enter your domain name without any protocol or port (e.g., "localhost"). Be cautious as incorrect configuration can lead to CORS errors.
4. Proceed with the next steps and save the connection URL (End Point) and then navigate to the dashboard.
5. Create a new database and within the database, create a new collection.
6. In the collection settings, add roles and assign appropriate permissions for create, read, update, and delete operations. For example, create an "any" role and grant all available permissions.
7. Define the necessary attributes for the collection. In our case, we will create four attributes:
    - `title`: A string type attribute to store the title of the note.
    - `description`: A string type attribute to store the description of the note.
    - `expireAt`: A date type attribute to track the expiration date of the note.
    - `imageId`: A string type attribute to store the associated image ID for the note.
8. Create a new storage to handle image uploads and storage in the designated bucket.
9. Configure permissions in the storage settings similar to the collection settings.
10. Take note of the Project ID, Database ID, Collection ID, and Bucket ID as they will be required to access and store data in the database.
11. To learn more about the configuration of Appwrite in our project, refer to the [src/appwrite/README.md](./src/appwrite/README.md).

\
 By following these steps, you will be able to configure Appwrite in your project.

## constant.ts

In this file, we have provided the essential credentials like the Appwrite project ID, database ID, collection ID, and endpoint. These credentials are crucial for establishing a secure connection with the Appwrite backend and facilitating effective data management within your project.

## ./contexts

In this directory, you will find the NoteContext, responsible for efficient management of notes within the local memory. Additionally, the LoaderContext provides comprehensive control over the global loader. To know more, [click here](./src/contexts/README.md)

## ./helpers

In this directory, you will find the essential asynchronous operations associated with the sticky notes, seamlessly integrated with the Appwrite backend. To know more, [click here](./src/helpers/README.md)

## ./components

This directory houses all the indispensable components required for effective note management. You will discover components such as the form, note card, and note list, which collectively contribute to an intuitive and streamlined user experience. To know more, [click here](./src/components/README.md)

## ./pages

This directory encompasses all the routing pages essential for seamless navigation within the application.

---

\
With these components, context, helpers, and routing pages, StickyTrack empowers you to effortlessly manage and organize your tasks. The intuitive interface, combined with seamless integration with the Appwrite backend, ensures a smooth user experience. Stay productive, track your notes, and make the most out of your time with StickyTrack.
