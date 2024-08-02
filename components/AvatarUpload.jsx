"use client";

import React, { useState, useEffect } from 'react';
import { deleteProfilePicture } from '@/api/auth';
import { auth } from '@/api/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AvatarUpload = ({ setPhotoUrl, photoUrl }) => {
    const [fileName, setFileName] = useState('');
    const [selectedImage, setSelectedImage] = useState(photoUrl || '');

    // Met à jour l'image sélectionnée lorsqu'une nouvelle photo est chargée
    useEffect(() => {
        setSelectedImage(photoUrl);
    }, [photoUrl]);

    const handleFileChange = (e) => {

        if (e.target.files[0]) {
            const file = e.target.files[0];
            setPhotoUrl(e.target.files[0]);

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // Met à jour l'URL de l'image
                // Met à jour l'URL de la photo dans le parent
                setFileName(file.name);
            };
            reader.readAsDataURL(file); // Lit le fichier comme une URL de données
        }
    };

    const handleReset = () => {
        if (photoUrl) {
            if (typeof photoUrl === 'string') {
                if (confirm("Etes vous sur de vouloir réinitialiser votre photo de profil") == true) {
                    setSelectedImage(photoUrl); // Réinitialise l'image à l'URL actuelle
                    setPhotoUrl(''); // Vide l'URL de l'image
                    setFileName('');
                    deleteProfilePicture();
                }
            }
            else{
                setPhotoUrl(''); // Vide l'URL de l'image
                setFileName('');
            }
        }
    };

    return (
        <div className="mb-6 flex flex-col items-center w-full">
            <div className="avatar avatar-xl mb-4">
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full"
                    />
                ) : (
                    <svg className="h-32 w-32 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 288a144 144 0 1 0 0-288a144 144 0 1 0 0 288m-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7h450.6c17 0 30.7-13.8 30.7-30.7c0-89.1-72.2-161.3-161.3-161.3z"></path>
                    </svg>
                )}
            </div>
            <form className="w-full max-w-md" action="#" method="POST">
                <label className="form-input cursor-pointer block">
                    <input
                        type="file" accept="image/gif, image/jpeg, image/png"
                        className="sr-only"
                        id="file-upload"
                        onChange={handleFileChange}
                    />
                    <span className="block w-full truncate">
                        {fileName || 'Choisir un fichier...'}
                    </span>
                </label>
                <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-light w-full mt-2"
                >
                    Réinitialiser
                </button>
            </form>
        </div>
    );
};

export default AvatarUpload;
