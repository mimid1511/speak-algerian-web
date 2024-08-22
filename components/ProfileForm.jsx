"use client";

import React, { useState } from 'react';

const ProfileForm = ({ user, onSubmit, photoUrl }) => {
    const [name, setName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
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
        <form onSubmit={handleUpdateProfile} className="w-full">
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <label className="block mb-4 ">
                <span className="block mb-1 text-xs font-medium text-gray-700">Nom d'utilisateur</span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input rounded-none"
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


            <div className="form-append mb-4">
                <input readOnly className="form-input rounded-none" placeholder="Adresse mail" />
                <button className="btn rounded-none btn-primary">Réinitialiser</button>
            </div>

            <div className="form-append mb-4">
                <input readOnly className="form-input rounded-none" placeholder="Mot de passe" />
                <button className="btn rounded-none btn-primary">Réinitialiser</button>
            </div>

            <button
                type="button" onClick={handleUpdateProfile}
                className="btn rounded-none btn-md btn-primary w-full"
            >
                Mettre à jour
            </button>
        </form>
    );
};

export default ProfileForm;
