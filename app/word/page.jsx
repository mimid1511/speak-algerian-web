"use client";

import React, { useEffect, useState } from 'react';
import { getAllFrenchWordsByLetter } from '@/api/words';
import Link from 'next/link';
import Title from '@/components/Title';
import Layout from '@/app/layout';

const DictionaryPage = () => {
    const [sortedWords, setSortedWords] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const words = await getAllFrenchWordsByLetter();
                setSortedWords(words);
            } catch (error) {
                setError("Erreur lors de la récupération des mots français.");
            } finally {
                setLoading(false);
            }
        };

        fetchWords();
    }, []);

    const renderSkeletons = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="bg-white p-3 rounded-none">
                    <div className="h-14 bg-font mb-4 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                    <div className="h-4 bg-font mb-2 animate-pulse"></div>
                </div>
            ))}
        </div>
    );

    return (
        <Layout type={"root"}>
            <Title title={"Lexique"} />
            <div className="mx-auto p-4 bg-font">
                {error && <p className="text-red-500">{error}</p>}
                {loading ? (
                    renderSkeletons() // Affiche les skeletons pendant le chargement
                ) : sortedWords.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {sortedWords.map(({ letter, words }) => (
                            <div key={letter} className="bg-white p-3 rounded-none">
                                <h2 className="text-3xl font-bold mb-2 p-2 text-center bg-primary-light text-primary">{letter}</h2>
                                {/* <hr className="border-gray-400 mb-3" /> */}
                                <ul className="list-disc m-4 list-inside space-y-1">
                                    {words.map((word, index) => (
                                        <li key={index}>
                                            <Link href={`/word/${word.id}`} className="text-primary-dark capitalize hover:font-semibold hover:underline">
                                                {word.name.toLowerCase()}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ) : (
                    renderSkeletons()
                )}
            </div>
        </Layout>
    );
};

export default DictionaryPage;
