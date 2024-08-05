import React, { useState } from 'react';

export default function NewTopicForm({ addTopic }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description) {
            addTopic(title, description);
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Créer un nouveau topic</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Titre</label>
                <input
                    type="text"
                    className="form-input w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                    className="form-textarea w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Créer le topic
            </button>
        </form>
    );
}