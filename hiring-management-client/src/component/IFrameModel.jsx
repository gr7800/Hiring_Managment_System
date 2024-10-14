import React from "react";

const IFrameModel = ({ resumeUrl, toggleModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl relative shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
                {resumeUrl ? (
                    <iframe
                        src={resumeUrl}
                        title="Resume PDF"
                        className="w-full h-96 border rounded"
                        frameBorder="0"
                    />
                ) : (
                    <p className="text-red-500 text-center">Resume not available.</p>
                )}
                <button
                    onClick={toggleModal}
                    className="absolute top-4 right-4 p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
                    aria-label="Close resume preview"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default IFrameModel;
