import React from 'react';
import Topic from '@/components/Topic';

export default function TopicList({ topics, addMessageToTopic }) {
    return (
        <div className="mt-4">
            {topics.length > 0 ? (
                topics.map((topic) => (
                    <Topic key={topic.id} topic={topic} addMessageToTopic={addMessageToTopic} />
                ))
            ) : (
                <p>Aucun topic pour le moment. Soyez le premier à en créer un !</p>
            )}
        </div>
    );
}