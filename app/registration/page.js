'use client'

import React, {useEffect} from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { auth } from '@/api/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';


const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className='flex-none w-4 h-4 mt-1 mr-2 text-green-600' viewBox="0 0 448 512">
        <path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"></path>
    </svg>
);

const XmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className='flex-none w-4 h-4 mt-1 mr-2 text-red-700' viewBox="0 0 384 512"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7L86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256z"></path></svg>
);


const Pricing = () => {

    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/');
            }
        });
        return () => unsubscribe();
    }, []);

    return (

        <>

            <section className="max-w-full px-4 pt-12 pb-12 mx-auto bg-[url('/bg.jpg')] bg-repeat">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                    <div className='flex justify-center items-center mb-4'>
                        <Link href={"/"}>
                            <img src={'/sa-logo-green.png'} alt="Logo" className="h-20" />
                        </Link>
                    </div>
                    <p className="px-0 mb-10 text-secondary text-lg text-gray-500 md:text-lg lg:px-24">
                        Découvrez le Darija algérien avec notre dictionnaire gratuit et nos leçons interactives. <br /> Tous nos abonnements sont sans engagement !
                    </p>
                </div>
                <div className="w-full mx-auto xl:w-4/5 ">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8 ">
                        <div className="border-0 rounded-none shadow-md  card  md:border">
                            <div className="flex flex-col justify-between p-6 border-b border-gray-200">
                                <p className="mb-1 text-lg font-semibold text-gray-500">Découverte</p>
                                <p className="pb-0 my-2 font-mono text-4xl font-extrabold text-gray-900">0€</p>
                                <p className="text-sm text-gray-500">Pas de frais, pas d'engagement</p>
                                <Link href="registration/discovery" className="w-full mt-6 btn btn-light btn-lg rounded-none">Démarrer gratuitement</Link>
                            </div>
                            <ul className="flex flex-col flex-grow p-6 space-y-3">
                                <li className="flex items-start">
                                    <XmarkIcon />
                                    <span className="text-gray-700"> Leçons interactives </span>
                                </li>
                                <li className="flex items-start">
                                    <XmarkIcon />
                                    <span className="text-gray-700"> Vidéos, exercices et quiz </span>
                                </li>
                                <li className="flex items-start">
                                    <XmarkIcon />
                                    <span className="text-gray-700"> Notifications </span>
                                </li>
                                <li className="flex items-start">
                                    <XmarkIcon />
                                    <span className="text-gray-700"> Mots régionaux spécifiques du dictionnaire </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Dictionnaire du Darija algérien </span>
                                </li>
                                {/* <li className="flex items-start">
                                <CheckIcon />
                                <span className="text-gray-700"> Recherche par mots clés et traduction instantané </span>
                            </li> */}
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Forum de discussion du Darija algérien </span>
                                </li>
                            </ul>
                        </div>
                        <div className="border-0 rounded-none shadow-none card  md:border shadow-xl">
                            <div className="flex flex-col justify-between p-6 border-b border-gray-200">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <p className="mb-1 text-lg font-semibold text-primary">Apprentissage</p>
                                    </div>
                                    <p className="my-2 text-4xl font-bold text-gray-900">29,99€</p>
                                    <p className="text-sm text-gray-500">Par mois et sans engagement</p>
                                </div>
                                <Link href="registration/student" className="w-full rounded-none mt-6 btn btn-primary btn-lg">Démarrer</Link>
                            </div>
                            <ul className="flex flex-col flex-grow p-6 space-y-3">
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Profitez de toutes nos leçons interactives et captivantes </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Accès illimité aux vidéos, exercices et quiz </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Notifications de rappel pour vous aider à rester sur la bonne voie </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Mots régionaux spécifiques du dictionnaire pour une compréhension approfondie </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Dictionnaire du Darija algérien </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Recherche par mots clés et traduction instantané </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Forum de discussion du Darija algérien </span>
                                </li>
                            </ul>
                        </div>
                        <div className="border-0 rounded-none shadow-none card  md:border shadow-xl">
                            <div className="flex flex-col justify-between p-6 border-b border-gray-200">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <p className="mb-1 text-lg font-semibold text-secondary">Apprentissage +</p>
                                        <span className="badge bg-secondary text-white">Le plus populaire</span>
                                    </div>
                                    <p className="my-2 text-4xl font-bold text-gray-900">24,99€</p>
                                    <p className="text-sm text-gray-500"><strong>299,99€</strong>/an (24,99 €/mois) sans engagement</p>
                                </div>
                                <Link href="registration/studentyear" className="w-full rounded-none mt-6 btn bg-red-700 hover:bg-red-900 text-white btn-lg">Démarrer</Link>
                            </div>
                            <ul className="flex flex-col flex-grow p-6 space-y-3">
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Profitez de toutes nos leçons interactives et captivantes </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Accès illimité aux vidéos, exercices et quiz </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Notifications de rappel pour vous aider à rester sur la bonne voie </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Mots régionaux spécifiques du dictionnaire pour une compréhension approfondie </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Dictionnaire du Darija algérien </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Recherche par mots clés et traduction instantané </span>
                                </li>
                                <li className="flex items-start">
                                    <CheckIcon />
                                    <span className="text-gray-700"> Forum de discussion du Darija algérien </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

        </>

    );
};

export default Pricing;
