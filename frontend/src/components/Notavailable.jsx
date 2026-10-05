import React from "react";
import { Link } from "react-router-dom";

const Notavailable = ({ category }) => {
    return (
        <div className="w-full mt-20 flex justify-center px-4">
            <div className="w-full max-w-xl">
                <div className="bg-gray-500 shadow-2xl rounded-xl p-6 text-center">

                    {/* Warning Icon */}
                    <i className="fas fa-exclamation-triangle text-white text-6xl mb-6"></i>

                    {/* Title */}
                    <h5 className="text-white text-3xl font-bold mb-4">
                        No {category} Headlines Available
                    </h5>

                    {/* Description */}
                    <p className="text-white text-lg">
                        It looks like there are no headlines to display right
                        now. Please check back later!
                    </p>

                    {/* Refresh Button */}
                    <Link
                        to="/"
                        className="inline-block bg-white text-gray-700 mt-6 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition duration-200"
                    >
                        Refresh
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Notavailable;
