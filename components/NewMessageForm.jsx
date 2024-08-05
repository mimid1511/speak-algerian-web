import React, { useState } from 'react';

export default function NewMessageForm({ topicId, addMessageToTopic }) {
    const [messageContent, setMessageContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageContent) {
            addMessageToTopic(topicId, messageContent);
            setMessageContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                className="form-textarea w-full mb-2"
                placeholder="Écrire un message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                required
            />
            <button type="submit" className="btn btn-secondary">
                Ajouter le message
            </button>
        </form>
    );
}