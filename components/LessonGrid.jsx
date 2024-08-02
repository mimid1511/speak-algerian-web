"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllUnits } from '@/api/units';
import { auth } from "@/api/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getUserDetail } from '@/api/auth';


const ReservedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
        <path fill="currentColor" d="M144 144v48h160v-48c0-44.2-35.8-80-80-80s-80 35.8-80 80m-64 48v-48C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64v192c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64z"></path>
    </svg>
);

const NotReservedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
        <path fill="currentColor" d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64v192c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144z"></path>
    </svg>
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
                    <div className='p-4 bg-white mb-4 rounded'>
                        <progress class="progress" max="100" />
                    </div>
                }

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} class="w-full h-72 bg-white rounded animate-pulse"></div>
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
                <div className='p-4 bg-white mb-4 rounded'>
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
                            className={`text-${unit.reserved && roleUser == "free" ? 'secondary' : 'primary'} border-${unit.reserved && roleUser == "free" ? 'neutral-400' : 'primary-light'} bg-${unit.reserved && roleUser == "free" ? 'white' : 'green-50'}  card`}
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
                                <Link href={unit.reserved && roleUser == "free" ? "/registration" : "/units/" + unit.id} className={`btn btn-${unit.reserved && roleUser == "free" ? 'secondary' : 'primary'} btn-sm`}>
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
                    <Link href="/lessons" className="btn bg-red-700 hover:bg-red-900 text-white btn-xl w-full">
                        Voir toutes les leçons
                    </Link>
                </div>
            )}
        </div>
    );
};

export default LessonGrid;
