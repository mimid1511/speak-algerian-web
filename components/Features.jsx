import React from 'react';

const Features = () => {
    return (
        <section className="grid grid-cols-1 gap-20 px-4 py-16 mx-auto max-w-7xl lg:px-16 xl:px-24 md:grid-cols-2 lg:grid-cols-3 ">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-secondary" viewBox="0 0 576 512"><path fill="currentColor" d="M183.6 469.6C177.5 476.2 169 480 160 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2l32.4 35.3V64c0-17.7 14.3-32 32-32s32 14.3 32 32v301.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 320c0-17.7 14.3-32 32-32h128c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L429.3 416H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l73.4-73.3H352c-17.7 0-32-14.3-32-32m96-288c12.1 0 23.2 6.8 28.6 17.7l64 128l16 32c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3l-7.2-14.3h-88.4l-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9l16-32l64-128C392.8 38.8 403.9 32 416 32m-20.2 144h40.4L416 135.6z"></path></svg>
                <h3 className="mb-3 text-lg font-medium leading-tight text-gray-900">Votre dictionnaire français – darija</h3>
                <p className="text-base text-justify leading-relaxed text-gray-600">
                    Accédez à un dictionnaire riche en mots et expressions du Darija Algérien. Recherchez, traduisez et écoutez les mots pour améliorer votre vocabulaire.
                </p>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-secondary" viewBox="0 0 512 512"><path fill="currentColor" d="M160 96a96 96 0 1 1 192 0a96 96 0 1 1-192 0m80 152v264l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32h30.3c63.6 0 125.6 19.6 177.7 56m32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32v203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3z"></path></svg>
                <h3 className="mb-3 text-lg font-medium leading-tight text-gray-900">Leçons interactives</h3>
                <p className="text-base text-justify leading-relaxed text-gray-600">
                    Des leçons structurées pour vous aider à maîtriser le Darija. Vidéos, exercices interactifs et quiz pour un apprentissage complet.
                </p>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-secondary" viewBox="0 0 512 512"><path fill="currentColor" d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48v128c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80V288C0 146.6 114.6 32 256 32s256 114.6 256 256v112c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80"></path></svg>
                <h3 className="mb-3 text-lg font-medium leading-tight text-gray-900">Perfectionnez votre prononciation</h3>
                <p className="text-base text-justify leading-relaxed text-gray-600">
                    Perfectionnez votre prononciation avec des guides audio clairs. Écoutez et répétez pour améliorer votre accent en Darija.
                </p>
            </div>
        </section>
    );
};

export default Features;