"use client";

import React, { useState } from 'react';

const ProfileForm = ({ user, onSubmit, photoUrl }) => {
    const [name, setName] = useState(user.displayName || '');
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleUpdateProfile = async (e) => {
        // console.log(name + photoUrl);
        console.log("ok");
        await onSubmit(name, photoUrl);
    };

    const log = () => {
        console.log(name);
    }

    return (
        <form onSubmit={handleUpdateProfile} className="w-full max-w-md">
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <label className="block mb-4">
                <span className="block mb-1 text-xs font-medium text-gray-700">Nom d'utilisateur</span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder="Nom d'utilisateur"
                />
            </label>
            {/* 
            <button
                type="button"
                className="btn btn-light w-full" onClick={log}
            >
                Test
            </button> */}


            <div class="form-append mb-4">
                <input readOnly class="form-input" placeholder="Adresse mail" />
                <button class="btn btn-primary">Réinitialiser</button>
            </div>

            <div class="form-append mb-4">
                <input readOnly class="form-input" placeholder="Mot de passe" />
                <button class="btn btn-primary">Réinitialiser</button>
            </div>

            <button
                type="button" onClick={handleUpdateProfile}
                className="btn btn-primary w-full"
            >
                Mettre à jour
            </button>
        </form>
    );
};

export default ProfileForm;
