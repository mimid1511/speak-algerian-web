import React, { useState } from 'react';
import NewMessageForm from '@/components/NewMessageForm';

export default function Topic({ topic, addMessageToTopic }) {
    const [showMessages, setShowMessages] = useState(false);

    return (
        <div className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-2xl font-semibold">{topic.title}</h2>
            <p className="text-gray-600">{topic.description}</p>
            <button
                className="mt-2 text-blue-500 hover:text-blue-700"
                onClick={() => setShowMessages(!showMessages)}
            >
                {showMessages ? 'Masquer les messages' : 'Afficher les messages'}
            </button>
            {showMessages && (
                <div className="mt-4">
                    {topic.messages.length > 0 ? (
                        topic.messages.map((message) => (
                            <p key={message.id} className="bg-gray-100 p-2 rounded mb-2">
                                {message.content}
                            </p>
                        ))
                    ) : (
                        <p>Aucun message dans ce topic.</p>
                    )}
                    <NewMessageForm topicId={topic.id} addMessageToTopic={addMessageToTopic} />
                </div>
            )}
        </div>
    );
}