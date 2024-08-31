"use client"

import React, { useEffect, useState } from "react";
import { getWordById } from "@/api/words"; // Assurez-vous que le chemin est correct
import Layout from "@/app/layout";
import Title from "@/components/Title";
import WordMain from "@/components/WordMain";

export default function Word({ params }) {
    const [word, setWord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const wordData = await getWordById(params.id);
                setWord(wordData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWord();
    }, [params.id]);

    return (
        <Layout type="root">
            {word && !loading ? (
                <div>
                    <Title breadCrumb={[{ name: "Lexique", link: "/word" }]} title={word.french.join(", ")} />
                    <WordMain words={word.darija} />
                </div>
            ) : (
                <div>
                    <Title breadCrumb={[{ name: "Lexique", link: "/word" }]} title={loading ? <div class="spinner text-white mb-1" role="status"><span class="sr-only">Loading...</span></div> : word.french.join(", ")} />
                    {/* <WordMain words={word.darija} /> */}
                    <div className="container mx-auto p-4 bg-font">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="rounded-none border-none card">
                                    <div className="card-header">
                                        <div className="w-full h-5 bg-font animate-pulse" />
                                    </div>
                                    <div className="card-body">
                                        <div className="w-full mb-2 h-5 bg-font animate-pulse" />
                                        <div className="w-full mb-2 h-5 bg-font animate-pulse" />
                                        <div className="w-full h-5 bg-font animate-pulse" />
                                    </div>
                                    <div className="card-footer rounded-none border-none">
                                        <div className="w-full h-5 bg-font animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
