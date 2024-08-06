"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/api/firebaseConfig';
import AvatarUpload from '@/components/AvatarUpload';
import ProfileForm from '@/components/ProfileForm';
import LogoutButton from '@/components/LogoutButton';
import Layout from '../layout';
import Title from '@/components/Title';
import {
    updateUserProfile,
    uploadProfilePicture,
    signOut,
    updateEmail,
    updatePassword
} from '@/api/auth'; // Assurez-vous que le chemin est correct

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [photoUrl, setPhotoUrl] = useState("");
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setPhotoUrl(currentUser.photoURL || ""); // Initialiser photoUrl avec l'URL de l'utilisateur
            } else {
                router.push('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const handleProfileUpdate = async (displayName, file) => {
        try {
            if (user) {
                if (displayName != user.displayName) {
                    await updateUserProfile(displayName);
                    alert('Profile updated successfully!');
                }
                if (file && file instanceof File) {
                    console.log("logg : " + file);
                    await uploadProfilePicture(file);
                    alert('Profile picture uploaded and updated successfully.');
                }
            }
        } catch (error) {
            console.error("Error updating profile: ", error);
        }
    };

    const handleEmailUpdate = async (newEmail) => {
        try {
            if (user) {
                await updateEmail(user, newEmail);
                alert('Email updated successfully!');
            }
        } catch (error) {
            console.error("Error updating email: ", error);
        }
    };

    const handlePasswordUpdate = async (newPassword) => {
        try {
            if (user) {
                await updatePassword(user, newPassword);
                alert('Password updated successfully!');
            }
        } catch (error) {
            console.error("Error updating password: ", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <Layout type="root">
            <Title title={"Profil"}/>
            <div className="m-full flex justify-center items-center md:p-4 bg-gray-300">
                {user && !loading ?
                    <div className="flex container max-w-2xl flex-col items-center bg-white p-10">
                        <AvatarUpload
                            photoUrl={photoUrl}
                            setPhotoUrl={setPhotoUrl}
                        />
                        <ProfileForm
                            user={user}
                            onSubmit={handleProfileUpdate}
                            onEmailUpdate={handleEmailUpdate}
                            photoUrl={photoUrl}
                            onPasswordUpdate={handlePasswordUpdate}
                        />
                        <LogoutButton onSignOut={handleSignOut} />
                    </div>
                    :
                    <div className="flex container max-w-2xl flex-col items-center bg-white p-10 animate-pulse">
                        {/* Ce div imitera le contenu lorsque les données sont en cours de chargement */}
                        <div className="h-32 w-32 bg-gray-300 rounded-full mb-6"></div>
                        <div className="w-96 h-10 bg-gray-300  mb-2"></div>
                        <div className="w-96 h-10 bg-gray-300  mb-8"></div>
                        <div className="w-full h-10 bg-gray-300  mb-4"></div>
                        <div className="w-full h-10 bg-gray-300  mb-4"></div>
                        <div className="w-full h-10 bg-gray-300  mb-4"></div>
                        <div className="w-full h-10 bg-gray-300  mb-4"></div>
                        <div className="w-full h-14 bg-gray-300 "></div>
                    </div>
                }
            </div>
        </Layout>
    );
};

export default ProfilePage;
