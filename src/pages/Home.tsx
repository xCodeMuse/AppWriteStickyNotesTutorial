import React from "react";
import { Outlet } from "react-router-dom";
import AllNotes from "../components/AllNotes";
import AddNoteForm from "../components/NoteForm";

const Home = () => {
    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-y-4">
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2">
                    <div className="rounded-lg shadow-sm px-2 border pt-3">
                        <AddNoteForm />
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-4/5 px-2 sm:border-l">
                    <AllNotes />
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Home;
