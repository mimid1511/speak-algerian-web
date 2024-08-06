"use client";

import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/api/firebaseConfig';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            window.location.href = '/login'; // Redirection après déconnexion
        } catch (error) {
            console.error("Erreur lors de la déconnexion : ", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="btn rounded-none btn-lg btn-danger w-full mt-4"
        >
            Déconnexion
        </button>
    );
};

export default LogoutButton;
