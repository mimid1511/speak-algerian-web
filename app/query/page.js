"use client";
import React from 'react';
import { db } from '@/api/firebaseConfig'; // Importez votre configuration Firebase
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const addQuestionsToFirestore = async () => {
    try {
        // Référence au document existant
        const docRef = doc(db, "assessments", "test891");

        // Exemple de question à ajouter
        const newQuestions = [
            {
                statement: "question 1 ?",
                answers: [
                    { wording: "reponse 1", correct: true },
                    { wording: "reponses 2", correct: false },
                    { wording: "reponses 3", correct: false },
                    { wording: "re^ponse 4", correct: false },
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
