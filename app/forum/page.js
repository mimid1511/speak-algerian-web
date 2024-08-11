"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllTopics, getMessagesByTopicId } from '@/api/forum';
import Title from '@/components/Title';
import Layout from '../layout';
import Link from 'next/link';

const ForumPage = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topicsData = await getAllTopics();
                const topicsWithLastMessage = await Promise.all(
                    topicsData.map(async (topic) => {
                        const messages = await getMessagesByTopicId(topic.id);
                        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
                        return { ...topic, lastMessage };
                    })
                );

                // Trier les topics par la date du dernier message, puis par la date de création
                const sortedTopics = topicsWithLastMessage.sort((a, b) => {
                    const dateA = a.lastMessage ? a.lastMessage.createdAt.seconds : a.createdAt.seconds;
                    const dateB = b.lastMessage ? b.lastMessage.createdAt.seconds : b.createdAt.seconds;
                    return dateB - dateA;
                });

                setTopics(sortedTopics);
            } catch (error) {
                setError('Erreur lors de la récupération des topics.');
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    const truncateDescription = (description) => {
        const maxLength = 100;
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + ' [...]';
        }
        return description;
    };

    // Skeleton Loader Component
    const SkeletonLoader = () => (
        <div className="list-item flex justify-between items-center animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
        </div>
    );

    return (
        <Layout type={"root"}>
            <Title title={"Forum"} />
            <section className="px-4 pt-4 bg-gray-300">
                <div className='p-4 bg-white'>
                    <button
                        onClick={() => router.push('/forum/add')}
                        className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded-none flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" className="mr-2">
                            <path fill="currentColor" d="M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512m-24-168v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24"></path>
                        </svg>
                        Ajouter un nouveau topic
                    </button>
                </div>
            </section>
            <div className="bg-gray-300 mx-auto w-full p-4">
                {error && <p className="text-red-500">{error}</p>}
                <div className="list list-none bg-white">
                    {loading ? (
                        // Afficher les skeletons lors du chargement
                        <>
                            <SkeletonLoader />
                            <SkeletonLoader />
                            <SkeletonLoader />
                            <SkeletonLoader />
                            <SkeletonLoader />
                            <SkeletonLoader />
                            <SkeletonLoader />
                            <SkeletonLoader />
                        </>
                    ) : (
                        // Afficher les topics une fois chargés
                        topics.map(topic => (
                            <Link key={topic.id} href={`/forum/${topic.id}`} className="list-item flex justify-between items-center">
                                <p className="flex-grow text-lg mb-2">
                                    <strong>{topic.title}</strong> : {truncateDescription(topic.description)}
                                </p>
                                {topic.lastMessage ? (
                                    <p className="text-gray-500">
                                        Dernier message le <strong>{new Date(topic.lastMessage.createdAt.seconds * 1000).toLocaleDateString()}</strong> à <strong>{new Date(topic.lastMessage.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                                    </p>
                                ) : (
                                    <p className="text-gray-500">
                                        Créé le <strong>{new Date(topic.createdAt.seconds * 1000).toLocaleDateString()}</strong> à <strong>{new Date(topic.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                                    </p>
                                )}
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ForumPage;
