"use client";
import React, { useEffect, useState } from 'react';
import { getUnitById } from '@/api/units'; // Assurez-vous que le chemin est correct
import { getUserDetail } from '@/api/auth'; // Assurez-vous que le chemin est correct
import Layout from '@/app/layout';
import Title from '@/components/Title';
import Link from 'next/link';
import { auth } from '@/api/firebaseConfig'; // Assurez-vous que le chemin est correct

const SkeletonLoader = () => (
    <div className="list bg-gray-200 list-none rounded">
        {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center p-2">
                <div className="w-24 h-8 bg-white rounded animate-pulse mr-2"></div>
                <div className="w-full h-8 bg-white rounded animate-pulse"></div>
            </div>
        ))}
    </div>
);

const UnitsPage = ({ params }) => {
    const [unit, setUnit] = useState(null);
    const [userCompletedLessons, setUserCompletedLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const unitId = params.id; // Récupérer l'ID depuis les props ou la route

    useEffect(() => {
        const fetchUnit = async () => {
            try {
                const unitData = await getUnitById(unitId);
                setUnit(unitData);

                // Vérifier si l'utilisateur est connecté et récupérer les leçons complètes
                const user = auth.currentUser;
                if (user) {
                    const userDetails = await getUserDetail(user.uid);
                    setUserCompletedLessons(userDetails.lessonsCompleted || []);
                }
            } catch (error) {
                setError('Erreur lors de la récupération des données.');
            } finally {
                setLoading(false);
            }
        };

        fetchUnit();
    }, [unitId]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Layout type="root">
            <Title>{unit ? `Unité ${unit.order}` : 'Chargement...'}</Title>
            <div className="p-4 bg-gray-200">
                <div className="bg-white p-5 md:p-10 rounded">
                    {/* <h2 className="text-xl font-semibold mb-8 mt-2">Leçons disponibles</h2> */}
                    {loading ? (
                        <SkeletonLoader />
                    ) : (
                        <div className="list bg-gray-200 list-none rounded">
                            {unit.lessons.map((lesson) => {
                                const isCompleted = userCompletedLessons.includes(lesson.id);
                                return (
                                    <Link
                                        key={lesson.id}
                                        href={`/lessons/${lesson.id}`}
                                        className={`list-item justify-between ${isCompleted ? 'bg-green-200' : ''}`}
                                    >
                                        <span className={`badge bg-white`}>{lesson.type}</span>&nbsp; {lesson.name} &nbsp; {isCompleted && '✓'}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

// Fonction pour extraire l'ID depuis le contexte de la route (Next.js)
UnitsPage.getInitialProps = async ({ query }) => {
    return { params: query };
};

export default UnitsPage;
