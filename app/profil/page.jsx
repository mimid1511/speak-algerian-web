"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/api/firebaseConfig';
import AvatarUpload from '@/components/AvatarUpload';
import ProfileForm from '@/components/ProfileForm';
import LogoutButton from '@/components/LogoutButton';
import Layout from '../layout';
import Title from '@/components/Title';
import Alert from '@/components/Alert';
import { useUser } from "@/context/UserContext";
import {
    updateUserProfile,
    uploadProfilePicture,
    signOut,
    updateEmail,
    getLastSubscription,
    updatePassword
} from '@/api/auth'; // Assurez-vous que le chemin est correct

const ProfilePage = () => {

    const { user, userDetail, userLoading } = useUser();

    const [lastSubscription, setLastSubscription] = useState(null);
    const [photoUrl, setPhotoUrl] = useState("");
    const [activeTab, setActiveTab] = useState("profil");
    const router = useRouter();

    useEffect(() => {
        if (!userLoading && !user) {
            router.push('/login');
            return;
        }
        if (user) {
            const fetchSubscription = async () => {
                try {
                    const lastSubscriptionData = await getLastSubscription();
                    setLastSubscription(lastSubscriptionData);
                } catch (error) {
                    console.error("Error fetching last subscription: ", error);
                }
            };
            fetchSubscription();
        }
        if (user && user.photoURL) {
            setPhotoUrl(user.photoURL);
        }
    }, [user, userLoading, router]);

    const handleProfileUpdate = async (displayName, file) => {
        try {
            if (user) {
                if (displayName !== user.displayName) {
                    await updateUserProfile(displayName);
                    router.refresh();
                }
                if (file && file instanceof File) {
                    await uploadProfilePicture(file);
                    router.refresh();
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
            <Title title={"Paramètre"} />
            <nav className="tab tab-lg pb-4 bg-back justify-center">
                <a
                    className={`tab-link cursor-pointer ${activeTab === 'profil' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profil')}
                >
                    Profil
                </a>
                <a
                    className={`tab-link cursor-pointer ${activeTab === 'subscription' ? 'active' : ''}`}
                    onClick={() => setActiveTab('subscription')}
                >
                    Abonnement
                </a>
                <a
                    className={`tab-link cursor-pointer ${activeTab === 'application' ? 'active' : ''}`}
                    onClick={() => setActiveTab('application')}
                >
                    Application
                </a>
                <a
                    className={`tab-link cursor-pointer ${activeTab === 'support' ? 'active' : ''}`}
                    onClick={() => setActiveTab('support')}
                >
                    Support
                </a>
            </nav>

            <div className="m-full flex justify-center items-center md:p-4 bg-font">
                {userLoading ?
                    <div className="flex container max-w-4xl flex-col items-center bg-white p-10">
                        <div className="h-32 w-32 bg-font rounded-full mb-6 animate-pulse"></div>
                        <div className="w-96 h-10 bg-font mb-2 animate-pulse"></div>
                        <div className="w-96 h-10 bg-font mb-8 animate-pulse"></div>
                        <div className="w-full h-10 bg-font mb-4 animate-pulse"></div>
                        <div className="w-full h-10 bg-font mb-4 animate-pulse"></div>
                        <div className="w-full h-10 bg-font mb-4 animate-pulse"></div>
                        <div className="w-full h-10 bg-font mb-4 animate-pulse"></div>
                        <div className="w-full h-14 bg-font animate-pulse"></div>
                    </div>
                    :
                    <div className="flex container max-w-4xl flex-col items-center bg-white p-10">
                        {activeTab === 'profil' && (
                            <>
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
                            </>
                        )}
                        {activeTab === 'subscription' && (
                            <>
                                {/* Faire une petit design pour la div du bas */}
                                {lastSubscription ? (
                                    <>
                                        <div className="bg-primary-light p-6 mb-6 w-full">
                                            <h2 className="text-xl bg-primary text-center p-2 font-bold text-white mb-4">
                                                {lastSubscription.product === "apm" && "Apprentissage"}
                                                {lastSubscription.product === "apy" && "Apprentissage +"}
                                            </h2>
                                            <p className="text-primary text-center">
                                                <span className="font-semibold">Prix :</span>{" "}
                                                {lastSubscription.total} €
                                            </p>
                                            <p className="text-primary text-center">
                                                <span className="font-semibold">Date de début :</span>{" "}
                                                {new Date(
                                                    lastSubscription.createdAt.seconds * 1000
                                                ).toLocaleDateString("fr-FR")}
                                            </p>
                                            <p className="text-primary text-center">
                                                <span className="font-semibold">Date de fin :</span>{" "}
                                                {new Date(
                                                    lastSubscription.endDate.seconds * 1000
                                                ).toLocaleDateString("fr-FR")}
                                            </p>
                                        </div>
                                        <Alert type={"primary"} message={"Vous ne pouvez pas changer d'abonnement. Vous devez attendre l'échéance."} />
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-font p-6 mb-6 w-full">
                                            <h2 className="text-xl bg-gray-100 text-center p-2 border border-2 font-bold text-primary mb-4">
                                                Découverte
                                            </h2>
                                            <p className="text-center">
                                                Gratuit
                                            </p>
                                        </div>
                                        <div className='w-full flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 justify-center'>
                                            <script async src="https://js.stripe.com/v3/buy-button.js"></script>
                                            <stripe-buy-button
                                                buy-button-id="buy_btn_1PnNvjBw7zxkMtJLif2ZFyKe"
                                                publishable-key="pk_test_51PmjD6Bw7zxkMtJLGqqQNj4dOjyYVVUSn8dAI90kZirhL8N5l0Sjzwq1KaXvJta0ySF72fznAjBJv47sReD3VXdX00MQh5DlPT"
                                                client-reference-id={user.uid}
                                                customer-email={user.email}
                                            />
                                            <stripe-buy-button
                                                buy-button-id="buy_btn_1Pn5dmBw7zxkMtJLq0WeU6MH"
                                                publishable-key="pk_test_51PmjD6Bw7zxkMtJLGqqQNj4dOjyYVVUSn8dAI90kZirhL8N5l0Sjzwq1KaXvJta0ySF72fznAjBJv47sReD3VXdX00MQh5DlPT"
                                                client-reference-id={user.uid}
                                                customer-email={user.email}
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        {activeTab === 'application' && (
                            <div>
                                <h2>Application</h2>
                                <p>Contenu pour la section Application...</p>
                            </div>
                        )}
                        {activeTab === 'support' && (
                            <div>
                                <h2>Support</h2>
                                <p>Contenu pour la section Support...</p>
                            </div>
                        )}
                    </div>
                }
            </div>
        </Layout>
    );
};

export default ProfilePage;
