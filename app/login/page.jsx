"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Alert from "@/components/Alert";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '' });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("/");
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAlert({ type: '', message: '' });
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setAlert({ type: 'success', message: "Connexion réussie !" });
            setEmail("");
            setPassword("");
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (error) {
            setAlert({ type: 'danger', message: "Email ou mot de passe incorrect." });
            console.error("Erreur de connexion : ", error);
        }
    };

    return (
        <section className="grid grid-cols-1 gap-0 lg:grid-cols-12 min-h-screen bg-[url('/bg.jpg')] bg-repeat bg-contain">
            <div className="w-full bg-white shadow-xl col-span-1 p-4 mx-auto mt-6 lg:col-span-8 xl:p-12 md:w-2/4">
                <Link href={"/"}><img src={'/sa-logo-green.png'} alt="Logo" className="h-10" /></Link>
                <h1 className="mt-6 mb-4 text-xl font-light text-left text-gray-800">Connectez-vous à votre compte</h1>
                {alert.message && <><Alert type={alert.type} message={alert.message} /><br /></>}
                <form className="pb-1 space-y-4" onSubmit={handleLogin}>
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">Adresse mail</span>
                        <input
                            className="form-input"
                            type="email"
                            placeholder="Ex. abdelkader@jilali.com"
                            inputMode="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </label>
                    <label className="block">
                        <span className="block mb-1 text-xs font-medium text-gray-700">Mot de passe</span>
                        <input
                            className="form-input"
                            type="password"
                            placeholder="••••••••"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </label>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="block ml-2 text-xs font-medium text-gray-700 cursor-pointer">Se souvenir de moi</span>
                        </label>
                        <input type="submit" className="btn btn-primary" value="Connexion" />
                    </div>
                </form>
                <div className="my-6 space-y-2">
                    <p className="text-xs text-gray-600">
                        Vous n'êtes pas encore abonné ?
                        <Link href="/registration" className="text-purple-700 hover:text-black"> Se créer un compte</Link>
                    </p>
                    <a href="#" className="block text-xs text-purple-700 hover:text-black">Mot de passe oublié ?</a>
                    <a href="#" className="block text-xs text-purple-700 hover:text-black">Terme, confidentialité et modalités</a>
                </div>
            </div>
            <div className="col-span-1 lg:col-span-4">
                <img
                    src="https://media.routard.com/image/26/2/photo.1509262.jpg"
                    alt="3 women looking at a laptop"
                    className="object-cover w-full h-64 min-h-full bg-gray-100"
                    loading="lazy"
                />
            </div>
        </section>
    );
}
