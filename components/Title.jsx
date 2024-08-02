import React from 'react';

const Title = ({ children }) => {
    return (
        <div className="bg-white p-4">
            <h1 className="text-3xl font-bold text-center text-white p-5 bg-primary-light ">
                {children}
            </h1>

        </div>
    );
};

export default Title;