import React, { useContext } from "react";
import NoteContext from "./Note";

const useNote = () => {
    const data = useContext(NoteContext);

    return data;
};

export default useNote;
