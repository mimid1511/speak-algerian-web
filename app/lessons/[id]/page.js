"use client"
import React, { useEffect, useState } from 'react';
import { getLessonById } from '@/api/units'; // Assurez-vous que le chemin est correct
import Layout from '@/app/layout';
import Title from '@/components/Title';
import Link from 'next/link';

const LessongPages = ({ params }) => {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const lessonId = params.id; // Récupérer l'ID depuis les props ou la route

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const unitData = await getLessonById(lessonId);
                setLesson(unitData);
            } catch (error) {
                setError('Erreur lors de la récupération des données.');
            } finally {
                setLoading(false);
            }
        };
        fetchLesson();
    }, [lessonId]);

    if (loading) {
        return <p>Chargement des données...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!lesson) {
        return <p>Unité non trouvée</p>;
    }

    return (
        <Layout type="root">
            <Title>{lesson.name}</Title>
            <div className="p-4 bg-gray-200">
                <div className="bg-white p-10 rounded shadow-md">
                    {/* a REMPLIRE */}
                </div>
            </div>
        </Layout>
    );
};

// Fonction pour extraire l'ID depuis le contexte de la route (Next.js)
LessongPages.getInitialProps = async ({ query }) => {
    return { params: query };
};

export default LessongPages;
