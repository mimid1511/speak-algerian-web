"use client";
import React, { useEffect, useState } from 'react';
import { getUnitById } from '@/api/units'; // Assurez-vous que le chemin est correct
import { getUserDetail } from '@/api/auth'; // Assurez-vous que le chemin est correct
import Layout from '@/app/layout';
import Title from '@/components/Title';
import Link from 'next/link';
import { auth } from '@/api/firebaseConfig'; // Assurez-vous que le chemin est correct
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

const SkeletonLoader = () => (
    <div className="list bg-gray-300 list-none">
        {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center p-2">
                <div className="w-24 h-8 bg-white animate-pulse mr-2"></div>
                <div className="w-full h-8 bg-white animate-pulse"></div>
            </div>
        ))}
    </div>
);

const UnitsPage = ({ params }) => {
    const [unit, setUnit] = useState(null);
    const [userCompletedLessons, setUserCompletedLessons] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const unitId = params.id; // Récupérer l'ID depuis les props ou la route
    const router = useRouter();

    useEffect(() => {

        const fetchUnit = async () => {
            try {
                const unitData = await getUnitById(unitId);
                setUnit(unitData);
            } catch (error) {
                setError('Erreur lors de la récupération des données.');
                // router.push("/404");
            } finally {
                setLoading(false);
            }
        };

        const fetchUserDetails = async (user) => {
            try {
                const userDetails = await getUserDetail(user.uid);
                setUserRole(userDetails.role);
                setUserCompletedLessons(userDetails.lessonsCompleted || []);
                console.log('User Details:', userDetails.role);
            } catch (error) {
                setUserRole("dys");
                console.error('Erreur:', error.message);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserDetails(user);
            } else {
                setUserRole("dys");
            }
            fetchUnit();
        });

        return () => unsubscribe();
    }, [unitId]);


    return (
        <Layout type="root">
            <Title title={unit ? `Unité ${unit.order}` : <div className="w-full h-8 bg-gray-300 animate-pulse"></div>} breadCrumb={[{name : "Leçons", link:"/lessons"}]} />
            <div className="p-4 bg-gray-300">
                <div className="bg-white md:p-4">
                    {/* <h2 className="text-xl font-semibold mb-8 mt-2">Leçons disponibles</h2> */}
                    {loading || !unit || userRole == "dys" && unit.reserved ? (
                        <SkeletonLoader />
                    ) : (
                        <div className="list bg-gray-300 list-none rounded-none border-none">
                            {unit.lessons.map((lesson) => {
                                const isCompleted = userCompletedLessons.includes(lesson.id);
                                return (
                                    <Link
                                        key={lesson.id}
                                        href={`/lessons/${unitId}/${unit.order}/${lesson.id}`}
                                        className={`list-item border-none focus:rounded-none required:rounded-none hover:rounded-none rounded-none justify-between ${isCompleted ? 'bg-green-200' : ''}`}
                                    >
                                        <span className={`badge bg-white rounded-none`}>{lesson.type}</span>&nbsp; {lesson.name} &nbsp; {isCompleted && '✓'}
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
