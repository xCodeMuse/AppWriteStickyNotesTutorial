import React from "react";
import { Outlet } from "react-router-dom";
import AllNotes from "../components/AllNotes";
import AddNoteForm from "../components/AddNoteForm";

const Home = () => {
    return (
        <div className="p-4">
            <div className="flex">
                <div className="mx-auto w-full max-w-sm">
                    <AddNoteForm />
                </div>
            </div>
            <hr className="my-3" />
            <AllNotes />
            <Outlet />
        </div>
    );
};

export default Home;
