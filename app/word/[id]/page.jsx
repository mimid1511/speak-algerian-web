"use client"

import React, { useEffect, useState } from "react";
import { getWordById } from "@/api/words"; // Assurez-vous que le chemin est correct
import Layout from "@/app/layout";

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Layout type="root">
            {word ? (
                <div>
                    <h1>{word.french.join(", ")}</h1>
                    <p>{word.arabic}</p>
                    {/* Afficher d'autres informations sur le mot ici */}
                </div>
            ) : (
                <div>Word not found</div>
            )}
        </Layout>
    );
}
