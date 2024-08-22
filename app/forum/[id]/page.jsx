"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMessagesByTopicId, createMessage, deleteTopic, getTopicById } from '@/api/forum';
import { auth } from '@/api/firebaseConfig';
import Layout from '@/app/layout';
import Title from '@/components/Title';
import TextEditor from '@/components/WYSIWYG/TextEditor';

const TopicPage = ({ params }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);
    const [topic, setTopic] = useState(null);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [loadingTopics, setLoadingTopics] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!params.id) return;

            try {
                const messagesData = await getMessagesByTopicId(params.id);
                setMessages(messagesData);
            } catch (error) {
                setError('Erreur lors de la récupération des messages.');
            } finally {
                setLoadingMessages(false);
            }
        };

        const fetchTopic = async () => {
            if (!params.id) return;

            try {
                const topicData = await getTopicById(params.id);
                setTopic(topicData);
            } catch (error) {
                setError('Erreur lors de la récupération du topic.');
            } finally {
                setLoadingTopics(false);
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

    // Skeleton Message Loader Component
    const SkeletonMessageLoader = () => (
        <div className="card rounded-none animate-pulse">
            <div className="grid grid-cols-[auto,1fr]">
                <div className="flex flex-col items-center p-4 bg-slate-100">
                    <div className="avatar bg-gray-300 border w-12 h-12 mb-1 rounded-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
                <div>
                    <div className="card-header rounded-none flex justify-between">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-6"></div>
                    </div>
                    <div className="card-body rounded-none p-4">
                        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    </div>
                    <div className="justify-end card-footer rounded-none">
                        <div className="h-7 bg-gray-300 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Layout type={"root"}>
            <Title breadCrumb={[{ link: "/forum", name: "Forum" }]} title={!loadingTopics ? topic?.title : <div className="w-full h-8 bg-gray-300 animate-pulse"></div>} />
            <div className="mx-auto p-4 md:p-4 bg-gray-300">
                {error && <p className="text-red-500">{error}</p>}
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
                            {loadingMessages ? (
                                // Afficher les skeletons pendant le chargement
                                <>
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <SkeletonMessageLoader key={index} />
                                    ))}
                                </>
                            ) : (
                                // Afficher les messages une fois chargés
                                messages.map(message => (
                                    <div key={message.id} className="card rounded-none">
                                        <div className="grid grid-cols-[auto,1fr]">
                                            <div className="flex flex-col items-center p-4 bg-slate-100">
                                                <div className="avatar bg-primary-light border w-12 h-12 mb-1">
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
                                                <p className="font-semibold mb-1 text-center">{message.userName}</p>
                                                <img src={message.userMedal} alt="Medal User" className="h-7"/>
                                            </div>
                                            <div>
                                                <div className="card-header rounded-none flex justify-between">
                                                    <div className="font-semibold text-gray-900">{new Date(message.createdAt.seconds * 1000).toLocaleDateString()} à {new Date(message.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                    <button className="btn btn-icon btn-sm btn-light rounded-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="12" r="1"></circle>
                                                            <circle cx="19" cy="12" r="1"></circle>
                                                            <circle cx="5" cy="12" r="1"></circle>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="card-body rounded-none p-4" dangerouslySetInnerHTML={{ __html: message.content }} />
                                                <div className="justify-end card-footer">
                                                    <a href="#" className="btn btn-primary rounded-none btn-sm">Répondre</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-4 bg-white rounded">
                            {/* <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="w-full form-input mb-4"
                                rows="4"
                                placeholder="Ajouter un message..."
                            /> */}
                            <TextEditor setNewMessage={setNewMessage} />
                            <button
                                onClick={handleAddMessage}
                                className="btn bg-red-700 text-white hover:bg-red-900 btn-lg w-full rounded-none"
                            >
                                Envoyer
                            </button>
                        </div>
                    </div>
            </div>
        </Layout>
    );
};

export default TopicPage;
