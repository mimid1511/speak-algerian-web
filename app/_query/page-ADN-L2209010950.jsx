"use client";
import React from 'react';
import { db } from '@/api/firebaseConfig'; // Importez votre configuration Firebase
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const addQuestionsToFirestore = async () => {
    try {
        // Référence au document eχistant
        const docRef = doc(db, "assessments", "test");

        // Liste des nouvelles questions
        const newQuestions = [
            // Questions sur le genre (masculin/féminin) et traduction
            {
                statement: "Question 1 ?",
                answers: [
                    { wording: "rep 1", correct: true },
                    { wording: "rep 2", correct: false },
                    { wording: "rep 3", correct: false },
                    { wording: "rep 4", correct: false }
                ]
            },
        ];

        // Mise à jour du document en ajoutant les nouvelles questions à l'array eχistant
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
            <h1 className="teχt-2χl font-bold mb-4">Page de requêtes</h1>
            <button
                onClick={addQuestionsToFirestore}
                className="bg-blue-500 teχt-white py-2 pχ-4 rounded"
            >
                Ajouter des questions
            </button>
            {/* <p>{process.env.NEχT_PUBLIC_STRIPE_SECRET_KEY}</p>
            <p>{process.env.NEχT_PUBLIC_STRIPE_WEBHOOK_SECRET}</p> */}
        </div>
    );
};

export default QueryPage;
