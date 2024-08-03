// pages/forum/add.js

"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTopic } from '@/api/forum';
import { auth } from '@/api/firebaseConfig';
import Layout from '@/app/layout';
import Title from '@/components/Title';

const AddTopicPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createTopic(title, description);
            router.push('/forum');
        } catch (error) {
            setError('Erreur lors de la création du topic.');
        }
    };

    return (
        <Layout type={"root"}>
            <Title className="text-2xl font-bold mb-4">Ajouter un nouveau topic</Title>
            <div className="mx-auto md:p-8 bg-gray-300">
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className='bg-white p-5 md:p-10 rounded'>
                    <div className="mb-4">
                        {/* <label htmlFor="title" className="block text-lg font-medium mb-2">Titre</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        /> */}
                        <label class="block mb-1" for="title">Titre</label>
                        <input class="form-input" value={title} required id="title" onChange={(e) => setTitle(e.target.value)} />

                    </div>
                    <div className="mb-6">
                        {/* <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="4"
                            required
                        /> */}

                        <label class="block mb-1" for="story">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required class="form-input" id="story" rows="4"></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-red-700 hover:bg-red-900 w-full text-white py-2 rounded"
                    >
                        Créer le topic
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddTopicPage;