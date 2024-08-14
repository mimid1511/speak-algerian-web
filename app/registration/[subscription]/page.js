'use client'

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { signUp } from '@/api/auth';
import Alert from '@/components/Alert';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from "react-google-recaptcha";

const Registration = ({ params }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");

    useEffect(() => {
        if(params.subscription != "discovery" && params.subscription != "student" && params.subscription != "studentyear"){
            router.push('/registration');
        }
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleRecaptcha = (value) => {
        setRecaptchaToken(value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        let formErrors = {};

        if (!validateEmail(formData.email)) {
            formErrors.email = "Adresse email invalide.";
        }

        if (!validatePassword(formData.password)) {
            formErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }

        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }

        if (!formData.termsAccepted) {
            formErrors.termsAccepted = "Vous devez accepter les termes.";
        }

        if (!recaptchaToken) {
            formErrors.recaptcha = "Vous devez vérifier reCAPTCHA.";
        }


        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);
            // Logic to handle successful submission
            console.log("Formulaire soumis avec succès:", formData);

            signUp(formData.email, formData.password).then(
                (user) => {
                    setMessage("Bienvenue !");
                    setTimeout(() => {

                        if (params.subscription == 'student') {
                            router.push("https://buy.stripe.com/test_aEUbJM2yz9tpd44145?__customer_email=" + user.email + "&client_reference_id=" + user.uid);
                        }
                        else if (params.subscription == 'studentyear') {
                            router.push("https://buy.stripe.com/test_3cs158dddeNJ2pqbIK?__customer_email=" + user.email + "&client_reference_id=" + user.uid);
                        }
                        else {
                            router.push("/registration/success");
                        }
                    }, "1000");
                }
            )

            // Reset form fields after successful submission
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                termsAccepted: false,
            });
            setRecaptchaToken('');
            setIsSubmitting(false);
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <>
            <section className="bg-gray-50 min-h-screen bg-[url('/bg-rect-light.svg')]  bg-contain bg-no-repeat bg-cover bg-center content-center">
                <div className="mx-auto max-w-7xl">
                    <Link href="/" title="Kutty Home Page" className="flex items-center justify-start sm:justify-center">
                        <img src={'/sa-logo-white.png'} alt="Logo" className="h-16" />
                    </Link>
                    <div
                        className="w-full px-0 pt-5 pb-6 mx-auto mt-4 shadow-lg mb-0 space-y-4 bg-transparent border-0 border-gray-200 rounded-none bg-white md:border sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 md:px-6 px-4 sm:mt-8 sm:mb-5"
                    >
                        <h1 className="mb-5 text-xl font-light text-left text-gray-800 sm:text-center">Réjoingnez-nous dès maintenant !</h1>
                        {message && <Alert type={type} message={message} />}
                        <form onSubmit={handleSubmit} className="pb-1 space-y-4">
                            <label className="block">
                                <span className="block mb-1 text-xs font-medium text-gray-700">Adresse mail</span>
                                <input
                                    className={`form-input rounded-none ${errors.email ? 'border-red-500' : ''}`}
                                    type="email"
                                    name="email"
                                    placeholder="Ex. jilali@boualem.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </label>
                            <label className="block">
                                <span className="block mb-1 text-xs font-medium text-gray-700">Mot de passe</span>
                                <input
                                    className={`form-input rounded-none ${errors.password ? 'border-red-500' : ''}`}
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </label>
                            <label className="block">
                                <span className="block mb-1 text-xs font-medium text-gray-700">Confirmer le mot de passe</span>
                                <input
                                    className={`form-input rounded-none ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </label>
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                onChange={handleRecaptcha}
                            />
                            <div className="flex flex-col items-start justify-between sm:items-center sm:flex-row">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="termsAccepted"
                                        className="form-checkbox rounded-none"
                                        checked={formData.termsAccepted}
                                        onChange={handleChange}
                                    />
                                    <span className="block ml-2 text-xs font-medium text-gray-700 cursor-pointer">J'accepte les termes</span>
                                </label>
                                {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
                                <input
                                    type="submit"
                                    className={`w-full rounded-none mt-5 btn btn-primary sm:w-auto sm:mt-0 ${!formData.termsAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    value="S'inscrire"
                                    disabled={!formData.termsAccepted || !recaptchaToken || isSubmitting}
                                />
                            </div>
                        </form>
                    </div>
                    <p className="my-0 text-xs font-medium text-center text-white sm:my-5">
                        Vous avez déjà un compte ? <Link href="/login" className="text-gray-300 hover:text-gray-400">Connexion</Link>
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Registration;
