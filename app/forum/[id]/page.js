"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMessagesByTopicId, createMessage, deleteTopic, getTopicById } from '@/api/forum';
import { auth } from '@/api/firebaseConfig';
import Layout from '@/app/layout';
import Title from '@/components/Title';

const TopicPage = ({ params }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);
    const [topic, setTopic] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!params.id) return;

            try {
                const messagesData = await getMessagesByTopicId(params.id);
                setMessages(messagesData);
                console.log(messagesData);
            } catch (error) {
                setError('Erreur lors de la récupération des messages.');
            }
        };

        const fetchTopic = async () => {
            if (!params.id) return;

            try {
                const topicData = await getTopicById(params.id);
                setTopic(topicData);
            } catch (error) {
                setError('Erreur lors de la récupération du topic.');
            }
        };

        fetchMessages();
        fetchTopic();
    }, [params.id]);

    const handleAddMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            await createMessage(params.id, newMessage);
            setNewMessage('');
            // Re-fetch messages
            const updatedMessages = await getMessagesByTopicId(params.id);
            setMessages(updatedMessages);
        } catch (error) {
            setError('Erreur lors de l\'ajout du message.');
        }
    };

    const handleDeleteTopic = async () => {
        try {
            await deleteTopic(params.id);
            router.push('/forum');
        } catch (error) {
            setError('Erreur lors de la suppression du topic.');
        }
    };

    return (
        <Layout type={"root"}>
            {topic && <Title>{topic.title}</Title>}
            <div className="mx-auto p-4 md:p-8 bg-gray-200">
                {error && <p className="text-red-500">{error}</p>}
                {topic && (
                    <div>
                        {/* Commentaire pour suppression de topic */}
                        {/* 
                        <button
                            onClick={handleDeleteTopic}
                            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
                        >
                            Supprimer le topic
                        </button>
                        */}
                        <div className="space-y-4">
                            {messages.map(message => (
                                <div key={message.id} className="bg-white md:p-6 rounded flex items-start">
                                    <div className="avatar bg-primary-light border w-6 h-6 mr-4">
                                        {message.userAvatar ? (
                                            <img
                                                src={message.userAvatar}
                                                alt={message.userName}
                                                className="w-12 h-12 rounded-full"
                                            />
                                        ) : (
                                            <svg className="h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 288a144 144 0 1 0 0-288a144 144 0 1 0 0 288m-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7h450.6c17 0 30.7-13.8 30.7-30.7c0-89.1-72.2-161.3-161.3-161.3z"></path></svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{message.userName}</p>
                                        <p className="text-gray-600 text-sm">{new Date(message.createdAt.seconds * 1000).toLocaleDateString()} à {new Date(message.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        <p className="mt-2">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 bg-white p-8 rounded">
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="w-full form-input mb-4"
                                rows="4"
                                placeholder="Ajouter un message..."
                            />
                            <button
                                onClick={handleAddMessage}
                                className="btn bg-red-700 text-white hover:bg-red-900 btn-lg w-full rounded"
                            >
                                Envoyer
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default TopicPage;
