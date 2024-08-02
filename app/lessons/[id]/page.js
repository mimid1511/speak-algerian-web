"use client";
import React, { useEffect, useState } from 'react';
import { getLessonById } from '@/api/units'; // Assurez-vous que le chemin est correct
import Layout from '@/app/layout';
import Title from '@/components/Title';
import Link from 'next/link';
import { storage, auth } from '@/api/firebaseConfig'; // Assurez-vous que le chemin est correct
import { ref, listAll, getDownloadURL } from "firebase/storage"; // Import Firebase storage functions
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth function

const LessongPages = ({ params }) => {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // État pour vérifier la connexion de l'utilisateur
    const lessonId = params.id; // Récupérer l'ID depuis les props ou la route

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const lessonData = await getLessonById(lessonId);
                setLesson(lessonData);
            } catch (error) {
                setError('Erreur lors de la récupération des données.');
            }
        };

        const fetchImages = async () => {
            const listRef = ref(storage, `lessons/${lessonId}`); // Chemin du dossier contenant les images

            try {
                const res = await listAll(listRef);
                const urls = await Promise.all(
                    res.items.map((itemRef) => getDownloadURL(itemRef))
                );

                setImageUrls(urls);
            } catch (error) {
                setError('Erreur lors de la récupération des images.');
            } finally {
                setLoading(false);
            }
        };

        const checkUserAuth = () => {
            onAuthStateChanged(auth, (user) => {
                setIsUserLoggedIn(!!user);
            });
        };

        fetchLesson();
        fetchImages();
        checkUserAuth();
    }, [lessonId]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Layout type="root">
            <Title>{lesson ? lesson.name : <div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>}</Title>
            <div className="md:p-8 bg-gray-200">
                <div className="bg-white md:p-5 rounded shadow-md">
                    <div className="flex flex-wrap justify-center">
                        {loading
                            ? Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="m-4 md:w-1/2 h-auto">
                                    <div className="skeleton bg-gray-50 rounded animate-pulse h-96 mb-10 w-full"></div>
                                </div>
                            ))
                            : imageUrls.map((url, index) => (
                                <React.Fragment key={index}>
                                    <img
                                        src={url}
                                        alt={`Image ${index + 1}`}
                                        className="m-4 md:w-1/2 h-auto"
                                        onContextMenu={(e) => e.preventDefault()} // Désactiver le clic droit
                                        draggable="false" // Désactiver le glisser-déposer
                                        style={{
                                            userSelect: 'none', // Empêcher la sélection de texte (et donc l'image)
                                            pointerEvents: 'none', // Désactiver les interactions
                                        }}
                                    />
                                    {index < imageUrls.length - 1 && (
                                        <hr className="w-full border-t-2 border-gray-700 my-4" />
                                    )}
                                </React.Fragment>
                            ))
                        }
                        <hr className="w-full border-t-2 border-gray-700 my-4 mb-10" />
                        <div className="btn-group mb-4" role="group" aria-label="Align Text">
                            <button type="button" className="btn btn-light btn-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 320 512" className="mr-2">
                                    <path fill="currentColor" d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256l137.3-137.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path>
                                </svg>
                                Revenir à la leçon précédente
                            </button>
                            {isUserLoggedIn ?
                                <Link href={`/assessments/${lessonId}`}>
                                    <button type="button" className="btn bg-red-700 hover:bg-red-900 text-white btn-xl flex items-center justify-center">
                                        Valider le module (Quiz)
                                    </button>
                                </Link>
                                :
                                <Link href={`/login`}>
                                    <button type="button" className="btn btn-primary btn-xl flex items-center justify-center">
                                        Connectez-vous pour valider le module
                                    </button>
                                </Link>

                            }
                            <button type="button" className="btn btn-light btn-xl flex items-center justify-center">
                                Passer à la leçon suivante
                                <svg xmlns="http://www.w3.org/2000/svg" width="0.63em" height="1em" viewBox="0 0 320 512" className="ml-2">
                                    <path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256L73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
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
