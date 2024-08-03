"use client";
import React from 'react';
import { db } from '@/api/firebaseConfig'; // Importez votre configuration Firebase
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const addQuestionsToFirestore = async () => {
    try {
        // Référence au document existant
        const docRef = doc(db, "assessments", "NAvYeuKw2xtBCtkcP5wm");

        // Exemple de question à ajouter
        const newQuestions = [
            {
                statement: "La 3ème personne du singulier féminin",
                answers: [
                    { wording: "انا ana", correct: true },
                    { wording: "هِيَ hiya", correct: true },
                    { wording: "هُوَ huwa", correct: false },
                ]
            },
            {
                statement: "La 2ème personne du pluriel",
                answers: [
                    { wording: "انتُمَ ntuma", correct: true },
                    { wording: "انتَ enta", correct: false },
                    { wording: "انتِ enti", correct: false },
                ]
            },
            {
                statement: "La 1ère personne du pluriel",
                answers: [
                    { wording: "انا ana", correct: false },
                    { wording: "احنا ḥna", correct: true },
                    { wording: "هُوَ huwa", correct: false },
                ]
            },
            {
                statement: "L'augmentatif de je/moi",
                answers: [
                    { wording: "anāya", correct: true },
                    { wording: "anāwa", correct: false },
                    { wording: "yanāya", correct: false },
                ]
            },
            {
                statement: "L'augmentatif de tu/toi",
                answers: [
                    { wording: "ntāya ", correct: true },
                    { wording: "ntāwa", correct: false },
                    { wording: "nātaya", correct: false },
                ]
            },
        ];

        // Mise à jour du document en ajoutant les nouvelles questions à l'array existant
        await updateDoc(docRef, {
            questions: arrayUnion(...newQuestions)
        });

        console.log("Questions ajoutées avec succès!");
    } catch (error) {
        console.error("Erreur lors de l'ajout des questions: ", error);
    }
};

const QueryPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Page de requêtes</h1>
            <button
                onClick={addQuestionsToFirestore}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Ajouter des questions
            </button>
        </div>
    );
};

export default QueryPage;
