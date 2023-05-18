# Components

This directory encompasses the essential components required for rendering the user interface (UI) of our application.

## ./NoteForm.ts

-   The `Form` component accepts an optional `note` prop. If the `note` prop is provided, it is treated as an update form, allowing users to modify existing note data. If the `note` prop is not provided, it is treated as a new note form, enabling users to create new notes.

-   Additionally, the `Form` component can receive optional `created` and `updated` functions as props. These functions are called upon successful completion of asynchronous operations, such as submitting the form. The `created` function is called after creating a new note, while the `updated` function is called after updating an existing note. These functions allow for further actions or updates to be performed in response to successful form submissions.

-   The `submit` function within the `Form` component is responsible for handling the form submission. It internally calls methods from the `NoteContext`, which then utilize asynchronous helper functions to connect to the Appwrite database. This ensures that the necessary data operations are executed seamlessly and efficiently.

## ./NoteCard.ts

-   **Note Props:** The `NoteCard` component requires a `note` prop, which contains information such as the title, description, and image ID associated with the note.

-   **Image URL Retrieval:** The component utilizes a helper function to retrieve the image URL from the image ID stored in the note's data. This ensures that the corresponding image is displayed within the card.

-   **Progress Bar:** The `NoteCard` includes a progress bar that indicates the remaining time from the creation of the note until its expiry. The text displayed on the progress bar dynamically changes based on the specific time remaining.

-   **Delete Note Functionality:** The `NoteCard` provides a delete note feature. When triggered, it implicitly calls the delete method of the `NoteContext`, which, in turn, utilizes a helper function to delete the note from both the database and the associated image from the storage bucket.

## ./AllNotes.ts

The AllNotes component uses the NoteContext to access the list of notes. It iterates over the notes and renders a NoteCard component for each note, consuming properties like title, description, and image ID from the context.
