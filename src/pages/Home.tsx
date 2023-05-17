import React from "react";

const Home = () => {
    return (
        <div>
            <input
                type="datetime-local"
                onChange={(e) => console.log(new Date(e.target.value).toISOString())}
            />
        </div>
    );
};

export default Home;
