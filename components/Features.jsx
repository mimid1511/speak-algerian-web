import React from 'react';

const Features = () => {
    return (
        <section className="grid grid-cols-1 gap-20 px-4 py-16 mx-auto max-w-7xl lg:px-16 xl:px-24 md:grid-cols-2 lg:grid-cols-3 ">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-secondary" viewBox="0 0 24 24"><path fill="currentColor" d="M21 5c-1.11-.35-2.33-.5-3.5-.5c-1.95 0-4.05.4-5.5 1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v15.5C2.45 20.4 4.55 20 6.5 20s4.05.4 5.5 1.5c1.45-1.1 3.55-1.5 5.5-1.5c1.17 0 2.39.15 3.5.5c.75.25 1.4.55 2 1V6c-.6-.45-1.25-.75-2-1m0 13.5c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5c1.2 0 2.4.15 3.5.5z"></path><path fill="currentColor" d="M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99M13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99c.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24c-1.7 0-3.24.3-4.5.83m4.5 1.84c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99c.88 0 1.73.09 2.5.26v-1.52c-.79-.16-1.64-.24-2.5-.24"></path></svg>
                <h3 className="mb-3 text-lg font-medium leading-tight text-gray-900">Votre dictionnaire français – darija</h3>
                <p className="text-base text-justify leading-relaxed text-gray-600">
                    Accédez à un dictionnaire riche en mots et expressions du Darija Algérien. Recherchez, traduisez et écoutez les mots pour améliorer votre vocabulaire.
                </p>
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-secondary" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4v20h16zM6 4h5v8l-2.5-1.5L6 12z"></path></svg>
                <h3 className="mb-3 text-lg font-medium leading-tight text-gray-900">Leçons interactives</h3>
                <p className="text-base text-justify leading-relaxed text-gray-600">
                    Des leçons structurées pour vous aider à maîtriser le Darija. Vidéos, exercices interactifs et quiz pour un apprentissage complet.
                </p>
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-secondary" viewBox="0 0 24 24"><circle cx={10} cy={9} r={4} fill="currentColor"></circle><path fill="currentColor" d="M16.39 15.56C14.71 14.7 12.53 14 10 14s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 2 18.22V21h16v-2.78c0-1.12-.61-2.15-1.61-2.66M16 1h-2a9 9 0 0 0 9 9V8c-3.86 0-7-3.14-7-7"></path><path fill="currentColor" d="M20 1h-2c0 2.76 2.24 5 5 5V4c-1.65 0-3-1.35-3-3"></path></svg>
                <h3 className="mb-3 text-lg font-medium leading-tight text-gray-900">Perfectionnez votre prononciation</h3>
                <p className="text-base text-justify leading-relaxed text-gray-600">
                    Perfectionnez votre prononciation avec des guides audio clairs. Écoutez et répétez pour améliorer votre accent en Darija.
                </p>
            </div>
        </section>
    );
};

export default Features;