import React from "react";
import loading from "../assets/loader.svg";

const Spinner = () => {
    return (
        <div className="text-center">
            <img
                className="my-5 mx-auto"
                src={loading}
                alt="Loading"
            />
        </div>
    );
};

export default Spinner;
