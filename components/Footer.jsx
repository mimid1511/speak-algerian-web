import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="px-4 bg-white  py-12 mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-10 mb-3 md:grid-cols-3 lg:grid-cols-11 lg:gap-20">
                <div className="col-span-3">
                    <Link href={"/"}><img src={'/logo-society.svg'} alt="Logo" className="h-20" /></Link>
                    <p className="my-4 text-justify text-xs leading-normal text-gray-600">
                        Cette application est hébergée en Belgique, au sein de l'Union Européenne, et est soumise aux réglementations du RGPD (Règlement Général sur la Protection des Données).
                    </p>
                </div>
                <nav className="col-span-1 md:col-span-1 lg:col-span-2">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Navigation</p>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="/">Accueil</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="forum">Forum</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="#">Actualitées</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="lessons">Leçons</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="map">Carte des dialectes</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="word">Lexique</Link>
                </nav>
                <nav className="col-span-2 md:col-span-1 lg:col-span-2">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Parametre</p>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="profil">Profil</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="profil">Abonnement</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="profil">Application</Link>
                </nav>
                <nav className="col-span-1 md:col-span-1 lg:col-span-2">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Réseaux sociaux</p>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="#">Youtube</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="#">Instagram</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="#">TikTok</Link>
                    {/* <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary" href="#">Why feature vote?</Link> */}
                </nav>
                <nav className="col-span-1 md:col-span-1 lg:col-span-2">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Application</p>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="#">FAQ</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="#">Nous contacter</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="#">Confidentialité</Link>
                    <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary hover:underline" href="#">Termes</Link>
                    {/* <Link className="flex mb-3 text-sm font-medium text-gray-800 transition md:mb-2 hover:text-secondary" href="#">Status</Link> */}
                </nav>
            </div>
            <div className="flex flex-col items-start justify-between pt-10 mt-10 border-t border-gray-100 md:flex-row md:items-center">
                <p className="mb-8 text-sm text-center text-gray-700 md:text-left md:mb-0">© Copyright 2024 - Parler Algerien. Tout droit réservé.</p>
                <div className="flex items-center space-x-6">
                    <Link href="#">
                        <span className="sr-only">Instagram</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" width="2500" height="2500" className="w-5 h-5" aria-hidden="true">
                            <defs>
                                <radialGradient id="0" cx="332.14" cy="2511.81" r="3263.54" gradientUnits="userSpaceOnUse">
                                    <stop offset=".09" stopColor="#fa8f21" />
                                    <stop offset=".78" stopColor="#d82d7e" />
                                </radialGradient>
                                <radialGradient id="1" cx="1516.14" cy="2623.81" r="2572.12" gradientUnits="userSpaceOnUse">
                                    <stop offset=".64" stopColor="#8c3aaa" stopOpacity="0" />
                                    <stop offset="1" stopColor="#8c3aaa" />
                                </radialGradient>
                            </defs>
                            <path
                                d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
                                fill="url(#0)"
                            />
                            <path
                                d="M833.4,1250c0-230.11,186.49-416.7,416.6-416.7s416.7,186.59,416.7,416.7-186.59,416.7-416.7,416.7S833.4,1480.11,833.4,1250m-225.26,0c0,354.5,287.36,641.86,641.86,641.86S1891.86,1604.5,1891.86,1250,1604.5,608.14,1250,608.14,608.14,895.5,608.14,1250M1767.27,582.69a150,150,0,1,0,150.06-149.94h-0.06a150.07,150.07,0,0,0-150,149.94M745,2267.47c-121.87-5.55-188.11-25.85-232.13-43-58.36-22.72-100-49.78-143.78-93.5s-70.88-85.32-93.5-143.68c-17.16-44-37.46-110.26-43-232.13-6.06-131.76-7.27-171.34-7.27-505.15s1.31-373.28,7.27-505.15c5.55-121.87,26-188,43-232.13,22.72-58.36,49.78-100,93.5-143.78s85.32-70.88,143.78-93.5c44-17.16,110.26-37.46,232.13-43,131.76-6.06,171.34-7.27,505-7.27s373.28,1.31,505.15,7.27c121.87,5.55,188,26,232.13,43,58.36,22.62,100,49.78,143.78,93.5s70.78,85.42,93.5,143.78c17.16,44,37.46,110.26,43,232.13,6.06,131.87,7.27,171.34,7.27,505.15s-1.21,373.28-7.27,505.15c-5.55,121.87-25.95,188.11-43,232.13-22.72,58.36-49.78,100-93.5,143.68s-85.42,70.78-143.78,93.5c-44,17.16-110.26,37.46-232.13,43-131.76,6.06-171.34,7.27-505.15,7.27s-373.28-1.21-505-7.27M734.65,7.57c-133.07,6.06-224,27.16-303.41,58.06C349,97.54,279.38,140.35,209.81,209.81S97.54,349,65.63,431.24c-30.9,79.46-52,170.34-58.06,303.41C1.41,867.93,0,910.54,0,1250s1.41,382.07,7.57,515.35c6.06,133.08,27.16,223.95,58.06,303.41,31.91,82.19,74.62,152,144.18,221.43S349,2402.37,431.24,2434.37c79.56,30.9,170.34,52,303.41,58.06C868,2498.49,910.54,2500,1250,2500s382.07-1.41,515.35-7.57c133.08-6.06,223.95-27.16,303.41-58.06,82.19-32,151.86-74.72,221.43-144.18s112.18-139.24,144.18-221.43c30.9-79.46,52.1-170.34,58.06-303.41,6.06-133.38,7.47-175.89,7.47-515.35s-1.41-382.07-7.47-515.35c-6.06-133.08-27.16-224-58.06-303.41-32-82.19-74.72-151.86-144.18-221.43S2150.95,97.54,2068.86,65.63c-79.56-30.9-170.44-52.1-303.41-58.06C1632.17,1.51,1589.56,0,1250.1,0S868,1.41,734.65,7.57"
                                fill="url(#1)"
                            />
                        </svg>
                    </Link>
                    <Link href="#">
                        <span className="sr-only">YouTube</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.43em" height="1em" viewBox="0 0 256 180"><path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"></path><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"></path></svg>
                    </Link>
                    <Link href="https://www.tiktok.com/@arabe.algerien.facile?lang=fr">
                        <span className="sr-only">Tik Tok</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 1024 1024"><path fill="currentColor" fillRule="evenodd" d="M912 224.962C912 162.575 861.425 112 799.038 112H224.962C162.575 112 112 162.575 112 224.962v574.076C112 861.426 162.575 912 224.962 912h574.076C861.425 912 912 861.426 912 799.038zM774.759 460.916c-51.615.577-99.71-15.027-141.938-43.927v202.874c0 90.166-61.72 167.62-148.996 187.848c-119.068 27.165-219.864-58.954-232.577-161.835c-13.294-102.884 52.322-193.051 152.892-213.281c19.651-4.045 49.209-4.045 64.458-.577v108.661c-4.692-1.153-9.086-2.31-13.709-2.888c-39.304-6.937-77.371 12.715-92.977 48.55c-15.605 35.838-5.16 77.451 26.629 101.73c26.586 20.806 56.085 23.694 86.14 9.822c30.057-13.291 46.21-37.567 49.676-70.512c.578-4.622.546-9.826.546-15.028V222.206c0-10.981.086-10.502 11.068-10.502h86.12c6.36 0 8.673.915 9.25 8.433c4.621 67.047 55.526 124.147 120.838 132.818c6.937 1.155 14.369 1.613 22.58 2.19z"></path></svg>                </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;