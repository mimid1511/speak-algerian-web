"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllWords } from "@/api/words"; // Assurez-vous que le chemin est correct

const Hero = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [words, setWords] = useState([]);

    useEffect(() => {
        // Chargez tous les mots lors du premier rendu du composant
        const fetchWords = async () => {
            try {
                const allWords = await getAllWords();
                setWords(allWords);
            } catch (error) {
                console.error("Erreur lors du chargement des mots:", error);
            }
        };
        fetchWords();
    }, []);

    useEffect(() => {
        // Filtre les mots lorsque le terme de recherche change
        if (searchTerm) {
            const filteredWords = words.filter(word =>
                word.french && word.french.some(term => term.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            // Limite le nombre de résultats à 5 éléments
            setResults(filteredWords.slice(0, 5));
        } else {
            setResults([]);
        }
    }, [searchTerm, words]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="relative w-full h-64 bg-gray-900">
            <div
                className="absolute inset-0 bg-cover bg-center bg-[url('/bg-hero.jpg')]"
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 bg-white bg-opacity-80 px-4">
                <h1 className="text-2xl font-bold text-primary-dark md:text-4xl">Bienvenue - Maraḥba - مرحبا</h1>
                <h2 className="text-md font-bold text-primary md:text-2xl">Le site conçu pour vous aider à apprendre la darija algerienne.</h2>
                <div className="w-full max-w-md relative">
                    <form className="w-full max-w-md">
                        <div className="flex items-center py-2">
                            <div className="form-append">
                                <input value={searchTerm} onChange={handleInputChange} className="form-input rounded-none border-primary" placeholder="Francais - Arabe Algérien (Darija)" />
                                <button className="btn btn-primary rounded-none"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M11.5 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l2.79 2.79a.75.75 0 1 1-1.06 1.06z" clipRule="evenodd"></path></svg></button>
                            </div>
                        </div>
                    </form>

                    {/* Liste déroulante des résultats */}
                    {results.length > 0 && (
                        <div className="list list-none absolute w-full bg-white  border border-font">
                            {results.map(word => (
                                <Link href={"/word/" + word.id} key={word.id} className="list-item">{word.french.join(", ")}</Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
