import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <nav className="bg-gray-900 p-2 px-5 fixed top-0 left-0 z-50 w-full newsreader">
            <div className="grid grid-cols-2 lg:grid-cols-3 items-center">

                {/* Brand */}
                <div className="justify-self-start">
                    <Link
                        className="text-xl font-bold text-white cinzel flex flex-row justify-center items-center gap-2"
                        to="/general"
                    >
                        Headline <i className="fa-solid fa-newspaper"></i> Haven
                    </Link>
                </div>

                {/* Title / Headline (Exact Screen Center) */}
                <h2 className="justify-self-center text-center text-xl font-bold hidden lg:block">
                    <p className="text-gray-200">
                        {capitaliseFirstLetter(document.title)}{" "}
                        <i className="fa-solid fa-newspaper"></i>{" "}
                        <span className="text-red-600">Headlines</span>
                    </p>
                </h2>

                {/* Navigation */}
                <div className="justify-self-end">
                    <ul className="flex flex-row items-center gap-4">

                        {/* Home */}
                        <li>
                            <Link
                                className="text-white hover:text-gray-300"
                                to="/general"
                            >
                                <i className="fa-solid fa-house"></i>
                            </Link>
                        </li>

                        {/* Category Dropdown */}
                        <li className="relative">
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-white hover:text-gray-300 focus:outline-none"
                            >
                                <i className="fa-solid fa-list"></i>
                            </button>

                            {isOpen && (
                                <ul className="absolute -right-3 mt-3 w-48 nav-1 rounded-md shadow-lg py-2 z-50">
                                    <li>
                                        <Link
                                            className="block px-4 py-2 text-gray-700 nav-2 hover:bg-gray-100"
                                            to="/business"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Business
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="block px-4 py-2 text-gray-700 nav-2 hover:bg-gray-100"
                                            to="/sports"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sports
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="block px-4 py-2 text-gray-700 nav-2 hover:bg-gray-100"
                                            to="/entertainment"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Entertainment
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="block px-4 py-2 text-gray-700 nav-2 hover:bg-gray-100"
                                            to="/health"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Health
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="block px-4 py-2 text-gray-700 nav-2 hover:bg-gray-100"
                                            to="/technology"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Technology
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="block px-4 py-2 text-gray-700 nav-2 hover:bg-gray-100"
                                            to="/science"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Science
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            className="block px-4 py-2 text-gray-700 nav-2 hover:bg-gray-100"
                                            to="/general"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            General
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Title */}
            <h2 className="text-center text-lg font-bold lg:hidden block pt-2">
                <div className="border border-gray-400 w-full" />
                <p className="text-gray-200 pt-2">
                    {capitaliseFirstLetter(document.title)}{" "}
                    <i className="fa-solid fa-newspaper"></i>{" "}
                    <span className="text-red-600">Headlines</span>
                </p>
            </h2>
        </nav>
    );
};

export default Navbar;