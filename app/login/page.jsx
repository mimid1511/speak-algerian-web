"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/api/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Alert from "@/components/Alert";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [randomImageData, setRandomImageData] = useState({});
    const [imageLoading, setImageLoading] = useState(true); // Ajout de l'état pour le chargement de l'image
    const [loading, setLoading] = useState(true);
    const [captchaValue, setCaptchaValue] = useState(false);

    useEffect(() => {
        // Liste des images avec le nom des villes et une courte description
        const imageData = [
            {
                url: '/Login/Alger.jpg',
                title: 'Alger',
                description: 'Capitale du pays, surnomée "المحروسة el-Mahroussa, la bien gradée", fut fondée par les Phéniciens au IVe siècle av. J.-C., en évoluant avec les Romains, les Arabes, et les Ottomans pour devenir un centre méditerranéen majeur. La Casbah, classée à l\'UNESCO, symbolise son riche patrimoine. Aujourd\'hui, Alger est le cœur politique, économique et culturel de l\'Algérie, abritant de nombreux musées et institutions.'
            },
            {
                url: '/Login/Constantine.jpg',
                title: 'Constantine',
                description: 'Capitale de l\'est du pays, surnomée "La Ville des Ponts Suspendus", avec plus de 2500 ans d\'histoire. Constantine, autrefois Cirta, fut un centre Numide puis Romain. Sa topographie unique, traversée par des gorges profondes, lui a valu ses célèbres ponts. Constantine est un foyer intellectuel et religieux, avec un riche patrimoine qui se perpétue dans ses universités et ses festivals.'
            },
            {
                url: '/Login/Ghardaia.jpg',
                title: 'Ghardaïa',
                description: 'Surnommée "La Perle du M\'zab", fondée au XIe siècle par les Mozabites, Ghardaïa est un centre d\'architecture unique et de culture ibadite. Ses mosquées et ses maisons en terre crue sont des exemples d\'urbanisme ingénieux, faisant de la ville un site du patrimoine mondial de l\'UNESCO.'
            },
            {
                url: '/Login/Oran.jpg',
                title: 'Oran',
                description: 'Capitale de l\'ouest du pays, surnomée "الباهية, el-Bahia, la Radieuse" fut fondée en 903 par des marins andalous, puis influencée par les Espagnols, Ottomans et Français. Connu depuis des millénaires pour ses habitants apprécient les plaisirs de la vie, c’est un centre culturel vibrant, notamment pour la musique Raï et ses forts qui protégaient autrefois la ville.'
            },
            {
                url: '/Login/Tlemcen.jpg',
                title: 'Tlemcen',
                description: 'Capitale culturelle de l\'Oranie, surnomée "La Perle du Maghreb", fondée au VIIIe siècle, Tlemcen a prospéré sous les dynasties Almoravide, Almohade et Zianide, devenant un carrefour commercial et culturel entre l\'Europe et l\'Afrique. Ses monuments, tels que le palais Mechouar, la Mansourah, ou le complexe de Sidi-Boumedienne, reflètent son héritage andalou et islamique.'
            },
            {
                url: '/Login/Tipaza.jpg',
                title: 'Tipaza',
                description: 'Fondée par les Phéniciens, devenue romaine, Tipaza est célèbre pour ses ruines antiques, notamment son amphithéâtre, qui témoignent de son riche passé historique. Aujourd\'hui, Tipaza est un site attirant de nombreux visiteurs mais surtout pour son tourisme balnéaire, ses plages et ses complexes touristiques modernes, tels que "Matarès" ou la "Corne d\'or".'
            },
            {
                url: '/Login/Hoggar.jpg',
                title: 'Le Hoggar',
                description: 'Le Parc Culturel de l\'Ahaggar, situé dans le sahara, est un vaste territoire qui s\'étend sur plus de 450 000 km². Ce parc, inscrit au patrimoine mondial de l\'UNESCO, abrite le massif de l\'Ahaggar, une région montagneuse spectaculaire dominée par le mont Tahat, le plus haut sommet d\'Algérie. Le parc est riche en histoire et en culture, étant le cœur du territoire des Touaregs.'
            },
            {
                url: '/Login/Tassili.jpg',
                title: 'Tassili',
                description: 'Le Parc Culturel du Tassili n\'Ajjer, situé dans le sud-est de l\'Algérie, couvrant une superficie d\'environ 72 000 km². Classé au patrimoine mondial de l\'UNESCO, ce parc est célèbre pour ses canyons profonds et son incroyable collection d\'art rupestre, avec plus de 15 000 peintures et gravures, certaines datant de plus de 10 000 ans.'
            },
            // Histoire de la langue
            {
                url: '/Login/Hilalien.jpg',
                title: 'L\'invasion Hilaliene et son influence sur le Darija',
                description: 'Les Beni Hilal, Beni Sulaym et Beni Maqil, tribus arabes du désert, ont migré vers l\'Algérie au XIe siècle sous l\'impulsion des Fatimides. Ils ont profondément influencé le darija algérien, notamment en étant à l\'origine des dialectes ruraux utilisant la lettre "gaf". Le dialecte algérien porte encore les traces de cette riche influence linguistique et culturelle.'
            },
            {
                url: '/Login/Phenicien.jpg',
                title: 'Les Phéniciens et leur influence sur le Darija',
                description: 'Les Phéniciens, navigateurs et commerçants venus du Liban ou de Palestine, ont fondé des comptoirs en Algérie à partir du XIIe siècle avant J.-C., comme Tipasa. Cette influence phénicienne a enrichi le substrat linguistique berbère et a laissé des traces dans les toponymes et certains termes du darija algérien.'
            },
            {
                url: '/Login/Ottoman.jpg',
                title: 'Les Ottomans et leur influence sur le Darija',
                description: 'La période ottomane en Algérie, débutant au XVIe siècle et s\'étendant jusqu\'à la conquête française en 1830, a eu un impact significatif sur le darija algérien. Les Ottomans ont introduit de nombreux mots turcs dans le dialecte, notamment dans les domaines de l\'administration, de la cuisine et de l\'art militaire.'
            },
        ];

        // Sélection aléatoire d'une image
        const randomIndex = Math.floor(Math.random() * imageData.length);
        setRandomImageData(imageData[randomIndex]);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("/");
            }
            else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!captchaValue) {
            setAlert({ type: 'danger', message: "Veuillez valider le reCAPTCHA." });
            return;
        }
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

    const handleRecaptcha = (value) => {
        setCaptchaValue(value);
    };


    return (
        <section className="grid grid-cols-1 gap-0 lg:grid-cols-12 min-h-screen bg-[url('/bg-animated-square.svg')] bg-repeat bg-contain">
            {!loading ? (
                <div className="w-full bg-white rounded-none shadow-xl col-span-1 p-4 mx-auto mt-6 lg:col-span-8 xl:p-12 md:w-2/4">
                    <Link href={"/"}><img src={'/sa-logo-green.png'} alt="Logo" className="h-10" /></Link>
                    <h1 className="mt-6 mb-4 text-xl font-light text-left text-gray-800">Connectez-vous à votre compte</h1>
                    {alert.message && <><Alert type={alert.type} message={alert.message} /><br /></>}
                    <form className="pb-1 space-y-4" onSubmit={handleLogin}>
                        <label className="block">
                            <span className="block mb-1 text-xs font-medium text-gray-700">Adresse mail</span>
                            <input
                                className="form-input rounded-none"
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
                                className="form-input rounded-none"
                                type="password"
                                placeholder="••••••••"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </label>
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            onChange={handleRecaptcha}
                        />
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="form-checkbox rounded-none" />
                                <span className="block ml-2 text-xs font-medium text-gray-700 cursor-pointer">Se souvenir de moi</span>
                            </label>
                            <input type="submit" disabled={!captchaValue} className="btn rounded-none btn-primary" value="Connexion" />
                        </div>
                    </form>
                    <div className="my-6 space-y-2">
                        <p className="text-xs text-gray-600">
                            Vous n'êtes pas encore abonné ?
                            <Link href="/registration" className="text-secondary-light hover:text-secondary-dark"> Se créer un compte</Link>
                        </p>
                        <a href="#" className="block text-xs text-secondary-light hover:text-secondary-dark">Mot de passe oublié ?</a>
                        <a href="#" className="block text-xs text-secondary-light hover:text-secondary-dark">Terme, confidentialité et modalités</a>
                    </div>
                </div>
            ) : (
                <div className="w-full bg-white rounded-none shadow-xl col-span-1 p-4 mx-auto mt-6 lg:col-span-8 xl:p-12 md:w-2/4">
                    <Link href={"/"}><img src={'/sa-logo-green.png'} alt="Logo" className="h-10 animate-pulse" /></Link>
                    <div className="w-80 h-7 bg-gray-300 mt-6 mb-9 animate-pulse"></div>
                    <div className="w-full h-10 bg-gray-300 mb-9 animate-pulse"></div>
                    <div className="w-full h-10 bg-gray-300 mb-4 animate-pulse"></div>
                    <div className="flex items-center justify-between mb-8">
                        <div className="w-40 h-5 bg-gray-300 animate-pulse"></div>
                        <div className="w-28 h-9 bg-gray-300 animate-pulse"></div>
                    </div>
                    <div className="w-80 h-4 bg-gray-300 mb-1 animate-pulse"></div>
                    <div className="w-36 h-4 bg-gray-300 mb-1 animate-pulse"></div>
                    <div className="w-52 h-4 bg-gray-300 animate-pulse"></div>
                </div>
            )}
            <div className="relative col-span-1 lg:col-span-4">
                {loading  ?
                    (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                            <div className="absolute bottom-0 left-0 right-0 p-24 bg-secondary bg-opacity-75 bg-white animate-pulse" />
                        </div>
                    )
                    :
                    (
                        <>
                            <img
                                src={randomImageData.url}
                                alt={randomImageData.title}
                                className="object-cover w-full h-64 min-h-full bg-gray-100"
                                loading="lazy" onLoad={() => setImageLoading(false)}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-secondary bg-opacity-75 text-white">
                                <h2 className="text-lg font-bold">{randomImageData.title}</h2>
                                <p className="text-sm text-justify">{randomImageData.description}</p>
                            </div>
                        </>
                    )
                }
            </div>
        </section>
    );
}
