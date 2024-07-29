import React from 'react';

const Title = ({ children }) => {
    return (
        <h1 className="text-4xl font-bold text-center text-gray-800 my-6 p-4 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg shadow-md">
            {children}
        </h1>
    );
};

export default Title;