import React, { useEffect, useState } from "react";

const Card = ({
    title,
    description,
    images,
    newsurl,
    sourcename,
    author,
    publishedAt,
    content,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded((prev) => !prev);
    };

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isExpanded]);

    return (
        <>
            {/* Standard Grid Card */}
            <div className="rounded-xl shadow-lg overflow-hidden h-full flex flex-col justify-between" style={{ backgroundColor: "antiquewhite" }}>
                <div>
                    {/* Source Badge */}
                    <div className="relative">
                        <span className="absolute top-0 right-0 z-10 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {sourcename}
                        </span>
                    </div>

                    {/* Image */}
                    {images && !imageError ? (
                        <img
                            src={images}
                            className="w-full h-52 object-cover border border-gray-200 p-1 rounded-xl"
                            alt={title || "News image"}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-52 flex items-center justify-center bg-gray-100">
                            <i className="fa-solid fa-image text-gray-400 text-7xl"></i>
                        </div>
                    )}

                    {/* Card Body */}
                    <div className="p-4 pb-0">
                        <h5 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                            {title}
                        </h5>
                        <p className="text-gray-700 text-sm line-clamp-3 mb-3">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="p-4 pt-0">
                    <div className="flex justify-between items-center mt-4 font-semibold">
                        {/* Published Time */}
                        <div className="flex justify-center items-center gap-2 bg-gray-100 text-gray-800 px-2 py-1 rounded-md border border-gray-400 text-xs font-extrabold text-center">
                            <i className="fa-solid fa-clock"></i>
                            <span>
                                {new Intl.DateTimeFormat('en-IN', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                    timeZone: 'Asia/Kolkata',
                                    timeZoneName: 'short'
                                }).format(new Date(publishedAt))}
                            </span>
                        </div>

                        {/* Expand Button */}
                        <button
                            type="button"
                            onClick={toggleExpansion}
                            className="p-2 text-gray-700 hover:text-black hover:bg-gray-200 rounded-full transition duration-200"
                            aria-label="Expand article"
                        >
                            <i className="fa-solid fa-file-arrow-up text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded Modal Popup (Overlay) */}
            {isExpanded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative"
                        style={{ backgroundColor: "antiquewhite" }}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={toggleExpansion}
                            className="absolute top-4 right-4 flex justify-center items-center bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full transition duration-200 z-10"
                            aria-label="Close modal"
                        >
                            <i className="fa-solid fa-xmark text-lg"></i>
                        </button>

                        {/* Source Badge */}
                        <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                            {sourcename}
                        </span>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {title}
                        </h3>

                        {/* Image */}
                        {images && !imageError ? (
                            <img
                                src={images}
                                className="w-full h-52 object-cover border border-gray-200 p-1 rounded-xl"
                                alt={title || "News image"}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-52 flex items-center justify-center bg-gray-100">
                                <i className="fa-solid fa-image text-gray-400 text-7xl"></i>
                            </div>
                        )}

                        {/* Description & Content */}
                        <p className="text-gray-800 text-base mb-3 font-medium">
                            {description}
                        </p>
                        <p className="text-gray-700 text-sm mb-4">
                            {content}
                        </p>

                        {/* Author */}
                        <p className="text-gray-900 font-semibold mb-6">
                            - By {author}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <a
                                href={newsurl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center bg-red-600 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-red-700 transition duration-200"
                            >
                                Read Full Article on Source
                            </a>
                            <button
                                type="button"
                                onClick={toggleExpansion}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-xl text-sm font-medium hover:bg-gray-400 transition duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card