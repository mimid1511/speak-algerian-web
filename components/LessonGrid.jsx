"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllUnits } from '@/api/units';
import { auth } from "@/api/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getUserDetail } from '@/api/auth';


const ReservedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 24 24"><path fill="currentColor" d="M20 8h-3V6.21c0-2.61-1.91-4.94-4.51-5.19A5.01 5.01 0 0 0 7 6v2H4v14h16zm-8 9c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2M9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2z"></path></svg>
);

const NotReservedIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 24 24"><path fill="currentColor" d="M20 8h-3V6.21c0-2.61-1.91-4.94-4.51-5.19A5.01 5.01 0 0 0 7 6h2c0-1.13.6-2.24 1.64-2.7C12.85 2.31 15 3.9 15 6v2H4v14h16zm-2 12H6V10h12zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2"></path></svg>
);

const LessonGrid = ({ limited }) => {
    const [roleUser, setRoleUser] = useState("free");
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lessonsCompleted, setLessonsCompleted] = useState([]);

    useEffect(() => {
        const fetchUserDetails = async (user) => {
            try {
                const userDetails = await getUserDetail(user.uid);
                setRoleUser(userDetails.role);
                setLessonsCompleted(userDetails.lessonsCompleted || []); // Récupérer les leçons complétées
                console.log('User Details:', userDetails.role);
            } catch (error) {
                setRoleUser("free");
                console.error('Erreur:', error.message);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserDetails(user);
            } else {
                setRoleUser("free");
            }
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const unitsData = await getAllUnits();
                setUnits(unitsData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch units:', error);
                setLoading(false);
            }
        };

        fetchUnits();
    }, []);

    const calculateProgress = (unit) => {
        const completedLessons = unit.lessons.filter(lesson =>
            lessonsCompleted.includes(lesson.id)
        ).length;

        return (completedLessons / unit.lessons.length) * 100;
    };

    const calculateCompletedUnits = () => {
        return units.filter(unit =>
            unit.lessons.every(lesson => lessonsCompleted.includes(lesson.id))
        ).length;
    };


    if (loading) {
        return (
            <div className="p-4 bg-gray-300">
                {roleUser != "free" && !limited &&
                    <div className='p-4 bg-white mb-4'>
                        <progress class="progress" max="100" />
                    </div>
                }

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} class="w-full h-72 bg-white animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    const displayedUnits = limited ? units.slice(0, 6) : units;

    const totalUnits = units.length;
    const completedUnits = calculateCompletedUnits();

    return (
        <div className="p-4 bg-gray-300">

            {/* Grande barre de progression */}
            {roleUser != "free" && !limited &&
                <div className='p-4 bg-white mb-4'>
                    {/* <div className="text-center text-gray-700 mt-2">
                    {`${completedUnits} xp / ${totalUnits}`}
                </div> */}
                    <progress className="progress text-primary" value={completedUnits} max={totalUnits}>
                        {`${completedUnits}/${totalUnits}`}
                    </progress>
                </div>
            }

            {/* Grille des unités */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {displayedUnits.map((unit) => {
                    const progress = calculateProgress(unit); // Calculer la progression pour cette unité
                    return (
                        <div
                            key={unit.id}
                            className={`text-${unit.reserved && roleUser == "free" ? 'secondary' : 'primary'} rounded-none border-none card`}
                        >
                            <div className="card-header">
                                <strong>{`Unité ${unit.order}`}</strong>
                                {unit.reserved && roleUser == "free" ? <ReservedIcon /> : <NotReservedIcon />}
                            </div>
                            <div className="card-body">
                                {roleUser != "free" && !limited ? <progress className="progress h-1 text-gray-300" value={progress} max="100">{progress}%</progress> : ""}
                                <ul className="list list-flush">
                                    {unit.lessons.map((lesson, index) => (
                                        <li className="list-item" key={index}>
                                            <p>
                                                {unit.reserved && roleUser == "free"
                                                    ? <span className="badge bg-gray-100 text-gray-900">{lesson.type}</span>
                                                    : <span className="badge bg-green-200 text-green-800">{lesson.type}</span>
                                                }
                                                &nbsp; {lesson.name}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={`justify-end card-footer bg-${unit.reserved && roleUser == "free" ? 'neutral' : 'green-100'}`}>
                                <Link href={unit.reserved && roleUser == "free" ? "/registration" : "/units/" + unit.id} className={`btn rounded-none btn-${unit.reserved && roleUser == "free" ? 'secondary' : 'primary'} btn-sm`}>
                                    {unit.reserved && roleUser == "free" ? "S'abonner" : "Suivre la leçon"}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Si `limited` est vrai, afficher le bouton pour voir toutes les leçons */}
            {limited && (
                <div className="mt-4 text-center">
                    <Link href="/lessons" className="btn rounded-none bg-red-700 hover:bg-red-900 text-white btn-xl w-full">
                        Voir toutes les leçons
                    </Link>
                </div>
            )}
        </div>
    );
};

export default LessonGrid;
