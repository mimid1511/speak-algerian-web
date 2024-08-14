"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { auth } from '@/api/firebaseConfig';
import { getUserDetail } from '@/api/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const RegistrationSuccess = () => {
    const [user, setUser] = useState(null);
    const [roleUser, setRoleUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserDetails = async (user) => {
            try {
                const userDetails = await getUserDetail(user.uid); // Récupère les détails utilisateur depuis la base de données
                setRoleUser(userDetails.role); // Mets à jour l'état avec le rôle de l'utilisateur
                console.log('User Details:', userDetails.role);
            } catch (error) {
                setRoleUser("dys"); // Définir une valeur par défaut ou gérer l'erreur de manière appropriée
                console.error('Erreur:', error.message);
                setError(error.message); // Mets à jour l'état d'erreur
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchUserDetails(user);
                setLoading(false);
            } else {
                router.push("/login")
            }
        });

        // Nettoyage de la souscription lors du démontage du composant
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <section className="bg-gray-50 min-h-screen bg-[url('/bg-rect-light.svg')] bg-cover bg-center flex items-center justify-center">
                <div className="w-full max-w-lg mx-auto p-6 bg-white shadow rounded-none text-center space-y-6">
                    <img src={'/sa-logo-green.png'} alt="Logo" className="h-16 mx-auto mb-4" />
                    <div class="spinner w-16 h-16 text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <br/>
                    <br/>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="bg-gray-50 min-h-screen bg-[url('/bg-rect-light.svg')] bg-cover bg-center flex items-center justify-center">
                <div className="w-full max-w-lg mx-auto p-6 bg-white shadow rounded-none text-center space-y-6">
                    <p className="text-red-600">Erreur: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="bg-gray-50 min-h-screen bg-[url('/bg-rect-light.svg')] bg-cover bg-center flex items-center justify-center">
                <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-none text-center space-y-6">
                    <img src={'/sa-logo-green.png'} alt="Logo" className="h-16 mx-auto mb-4" />

                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-green-500"  viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"></path></svg>

                        {roleUser != "dys" ? (
                            <>
                                <h1 className="text-2xl mb-2 font-semibold text-gray-800">Paiement Réussie !</h1>
                                <p className="text-gray-600">Vous avez créé votre compte avec succès et avez choisis l'abonnement <strong>{roleUser == "apm" && "Apprentissage"}{roleUser == "apy" && "Apprentissage +"}</strong>. Vous pouvez maintenant commencer à explorer notre site.</p>
                            </>
                        ) : (
                            <>
                                <h1 className="text-2xl mb-2 font-semibold text-gray-800">Inscription Réussie !</h1>
                                <p className="text-gray-600">Vous avez créé votre compte avec succès. Vous pouvez maintenant commencer à explorer notre site.</p>
                            </>
                        )
                        }
                    </div>

                    <Link href="/" className="btn rounded-none btn-primary btn-xl">
                        Commencer
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default RegistrationSuccess;
