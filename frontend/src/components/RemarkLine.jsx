import React from 'react';

const RemarkLine = ({ remark }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <img
                    src={remark.user.avatar}
                    alt={remark.user.name}
                    className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold">{remark.user.name}</h3>
                    <p className="text-gray-600">{remark.content}</p>
                </div>
            </div>
        </div>
    );
};

export default RemarkLine;