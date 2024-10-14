"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllFrenchWords } from "@/api/words";

const Hero = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [words, setWords] = useState([]);

    useEffect(() => {
        // Charger tous les mots lors du premier rendu du composant
        const fetchWords = async () => {
            try {
                const allWords = await getAllFrenchWords();
                setWords(allWords);
            } catch (error) {
                console.error("Erreur lors du chargement des mots:", error);
            }
        };
        fetchWords();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const normalizeString = (str) => {
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            };

            const normalizedSearchTerm = normalizeString(searchTerm.toLowerCase());

            const uniqueWords = new Set();
            
            const filteredWords = words.filter(word => {
                const normalizedWord = normalizeString(word.name.toLowerCase());

                if (normalizedWord.startsWith(normalizedSearchTerm)) {
                    if (!uniqueWords.has(normalizedWord)) {
                        uniqueWords.add({name: normalizedWord, id: word.id});
                        return true;
                    }
                }
                return false;
            });

            setResults(Array.from(uniqueWords).slice(0, 5)); // Limiter à 5 résultats
        } else {
            setResults([]); // Réinitialiser les résultats lorsque le champ est vide
        }
    }, [searchTerm, words]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="relative w-full h-64 bg-gray-900">
            <div className="absolute inset-0 bg-cover bg-center bg-[url('/bg-hero.jpg')]" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 bg-white bg-opacity-80 px-4">
                <h1 className="text-2xl font-bold text-primary-dark md:text-4xl">Bienvenue - Maraḥba - مرحبا</h1>
                <h2 className="text-md font-bold text-primary md:text-2xl">Le site conçu pour vous aider à apprendre la darija algérienne.</h2>
                <div className="w-full max-w-md relative">
                    <form className="w-full max-w-md">
                        <div className="flex items-center py-2">
                            <div className="form-append">
                                <input
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                    className="form-input rounded-none border-primary"
                                    placeholder="Français - Arabe Algérien (Darija)"
                                />
                                <button className="btn btn-primary rounded-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                                        <path fill="currentColor" fillRule="evenodd" d="M11.5 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l2.79 2.79a.75.75 0 1 1-1.06 1.06z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Liste déroulante des résultats */}
                    {results.length > 0 && (
                        <div className="list list-none absolute w-full bg-white border border-font">
                            {results.map((word, index) => (
                                <Link href={`/word/${word.id}`} key={index} className="list-item capitalize">{word.name}</Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
