"use client";
import React from 'react';
import { db } from '@/api/firebaseConfig'; // Importez votre configuration Firebase
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const addQuestionsToFirestore = async () => {
    try {
        // Référence au document existant
        const docRef = doc(db, "assessments", "NAvYeuKw2xtBCtkcP5wm");

        // Liste des nouvelles questions
        const newQuestions = [
            // Questions de l'arabe au français
            {
                statement: "Que signifie انا ana ?",
                answers: [
                    { wording: "Moi", correct: true },
                    { wording: "Tu", correct: false },
                    { wording: "Il", correct: false },
                    { wording: "Nous", correct: false }
                ]
            },
            {
                statement: "Que signifie انتَ enta ?",
                answers: [
                    { wording: "Elle", correct: false },
                    { wording: "Toi (masculin)", correct: true },
                    { wording: "Ils", correct: false },
                    { wording: "Toi (féminin)", correct: false }
                ]
            },
            {
                statement: "Que signifie انتِ enti ?",
                answers: [
                    { wording: "Lui", correct: false },
                    { wording: "Vous", correct: false },
                    { wording: "Toi (féminin)", correct: true },
                    { wording: "Toi (masculin)", correct: false }
                ]
            },
            {
                statement: "Que signifie هُوَ huwa ?",
                answers: [
                    { wording: "Elle", correct: false },
                    { wording: "Eux", correct: false },
                    { wording: "Lui", correct: true },
                    { wording: "Aucun", correct: false }
                ]
            },
            {
                statement: "Que signifie هِيَ hiya ?",
                answers: [
                    { wording: "Elle", correct: true },
                    { wording: "Il", correct: false },
                    { wording: "Toi (féminin)", correct: false },
                    { wording: "Aucun", correct: false }
                ]
            },
            {
                statement: "Que signifie احنا aḥna ?",
                answers: [
                    { wording: "Ils", correct: false },
                    { wording: "Nous", correct: true },
                    { wording: "Vous", correct: false },
                    { wording: "Lui", correct: false }
                ]
            },
            {
                statement: "Que signifie انتُم entum ?",
                answers: [
                    { wording: "Elles", correct: false },
                    { wording: "Vous", correct: true },
                    { wording: "Toi (féminin)", correct: false },
                    { wording: "Ils", correct: false }
                ]
            },
            {
                statement: "Que signifie هُم hum ?",
                answers: [
                    { wording: "Ils", correct: true },
                    { wording: "Toi (masculin)", correct: false },
                    { wording: "Moi", correct: false },
                    { wording: "Il", correct: false }
                ]
            },
            {
                statement: "Que signifie من هو men huwa ?",
                answers: [
                    { wording: "Qui est-ce ?", correct: true },
                    { wording: "Où es-tu ?", correct: false },
                    { wording: "Comment vas-tu ?", correct: false },
                    { wording: "Pourquoi ?", correct: false }
                ]
            },
            {
                statement: "Que signifie اشكون انتَ aškūn nta ?",
                answers: [
                    { wording: "Qui es-tu ?", correct: true },
                    { wording: "Que fais-tu ?", correct: false },
                    { wording: "Comment vas-tu ?", correct: false },
                    { wording: "Où vas-tu ?", correct: false }
                ]
            },
            {
                statement: "Que signifie أنا براني ana barrāni ?",
                answers: [
                    { wording: "Je suis un étranger", correct: true },
                    { wording: "elle est une étrangere", correct: false },
                    { wording: "il est un étranger", correct: false },
                    { wording: "tu es un étranger", correct: false }
                ]
            },
            {
                statement: "Que signifie انتايا entāya ?",
                answers: [
                    { wording: "Vous", correct: false },
                    { wording: "Toi (masculin)", correct: true },
                    { wording: "Elle", correct: false },
                    { wording: "Nous", correct: false }
                ]
            },
            {
                statement: "Que signifie احنايا aḥnāya ?",
                answers: [
                    { wording: "Elle", correct: false },
                    { wording: "Ils", correct: false },
                    { wording: "Vous", correct: false },
                    { wording: "Nous", correct: true }
                ]
            },
            {
                statement: "Que signifie انتُما entuma ?",
                answers: [
                    { wording: "Aucun", correct: false },
                    { wording: "Elles", correct: false },
                    { wording: "Ils", correct: false },
                    { wording: "Vous", correct: true }
                ]
            },
            {
                statement: "Que signifie ال āla ?",
                answers: [
                    { wording: "Toi (masculin)", correct: false },
                    { wording: "Aucun", correct: true },
                    { wording: "Toi (feminin)", correct: false },
                    { wording: "Vous", correct: false }
                ]
            },
            {
                statement: "Que signifie ما هو mā huwa ?",
                answers: [
                    { wording: "Où est-il ?", correct: false },
                    { wording: "Qui est-il ?", correct: false },
                    { wording: "Qu’est-ce que c’est ?", correct: true },
                    { wording: "Comment est-il ?", correct: false }
                ]
            },
            {
                statement: "Que signifie انتِيّا entīya en français ?",
                answers: [
                    { wording: "Toi (masculin)", correct: false },
                    { wording: "Moi", correct: false },
                    { wording: "Toi (féminin)", correct: true },
                    { wording: "Lui", correct: false }
                ]
            },
            {
                statement: "Que signifie انايا anāya ?",
                answers: [
                    { wording: "Toi (féminin)", correct: false },
                    { wording: "Toi (masculin)", correct: false },
                    { wording: "Moi", correct: true },
                    { wording: "Nous", correct: false }
                ]
            },
            {
                statement: "Que signifie هُما huma ?",
                answers: [
                    { wording: "Ils", correct: false },
                    { wording: "Ils ou Elles", correct: true },
                    { wording: "Nous", correct: false },
                    { wording: "Elles", correct: false }
                ]
            },
            {
                statement: "Que signifie احنا aḥna ?",
                answers: [
                    { wording: "Aucun", correct: true },
                    { wording: "Vous", correct: false },
                    { wording: "Ils", correct: false },
                    { wording: "Toi", correct: false }
                ]
            },
            // Questions du français à l’arabe
            {
                statement: "Comment dit-on 'je' en arabe darija ?",
                answers: [
                    { wording: "انتَ enta", correct: false },
                    { wording: "انا ana", correct: true },
                    { wording: "هُوَ huwa", correct: false },
                    { wording: "احنا aḥna", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'tu' (masculin) en darija ?",
                answers: [
                    { wording: "هُوَ huwa", correct: false },
                    { wording: "انتَ enta", correct: true },
                    { wording: "انتِ enti", correct: false },
                    { wording: "هِيَ hiya", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'il' en darija ?",
                answers: [
                    { wording: "هِيَ hiya", correct: false },
                    { wording: "هُوَ huwa", correct: true },
                    { wording: "انتِ enti", correct: false },
                    { wording: "انتَ enta", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'elle' en darija ?",
                answers: [
                    { wording: "هُوَ huwa", correct: false },
                    { wording: "هِيَ hiya", correct: true },
                    { wording: "انتِ enti", correct: false },
                    { wording: "احنا aḥna", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'nous' en darija ?",
                answers: [
                    { wording: "هُم hum", correct: false },
                    { wording: "انتَ enta", correct: false },
                    { wording: "احنا aḥna", correct: true },
                    { wording: "انتُم entum", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'vous' en darija ?",
                answers: [
                    { wording: "انتُم entum", correct: true },
                    { wording: "هُم hum", correct: false },
                    { wording: "احنا aḥna", correct: false },
                    { wording: "هُوَ huwa", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'ils' en darija ?",
                answers: [
                    { wording: "هُوَ huwa", correct: false },
                    { wording: "انتِ enti", correct: false },
                    { wording: "هُم hum", correct: true },
                    { wording: "احنا aḥna", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'elles' (augmentatifs) en darija ?",
                answers: [
                    { wording: "هُم hum", correct: false },
                    { wording: "هُما huma", correct: true },
                    { wording: "هِيَ hiya", correct: false },
                    { wording: "احنا aḥna", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'je suis un étranger' en darija ?",
                answers: [
                    { wording: "أنت براني enta barrāni", correct: false },
                    { wording: "أنا براني ana barrāni", correct: true },
                    { wording: "احنا برانيين aḥna barrāniyīn", correct: false },
                    { wording: "هم برانيين hum barrāniyīn", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'qui es-tu' en darija ?",
                answers: [
                    { wording: "ما هو mā huwa", correct: false },
                    { wording: "من هو men huwa", correct: false },
                    { wording: "اشكون انتَ aškūn nta", correct: true },
                    { wording: "أين ayna", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'nous' (augmentatif) en darija ?",
                answers: [
                    { wording: "احنا aḥna", correct: false },
                    { wording: "احنايا aḥnāya", correct: true },
                    { wording: "انتُم entum", correct: false },
                    { wording: "هُما huma", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'tu (féminin)' en darija ?",
                answers: [
                    { wording: "انتَ enta", correct: false },
                    { wording: "أنتيّا entiya", correct: true },
                    { wording: "انتُم entum", correct: false },
                    { wording: "هُوَ huwa", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'vous (augmentatif)' en darija ?",
                answers: [
                    { wording: "انتُم entum", correct: false },
                    { wording: "انتُما entuma", correct: true },
                    { wording: "هُما huma", correct: false },
                    { wording: "انتِ enti", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'comment vas-tu' en darija ?",
                answers: [
                    { wording: "من هو men huwa", correct: false },
                    { wording: "aucun", correct: true },
                    { wording: "أين هو ayna huwa", correct: false },
                    { wording: "ما هو mā huwa", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'qui est-ce' en darija ?",
                answers: [
                    { wording: "من هو men huwa", correct: true },
                    { wording: "أين هو ayna huwa", correct: false },
                    { wording: "aucun", correct: false },
                    { wording: "ما هو mā huwa", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'qu’est-ce que c’est' en darija ?",
                answers: [
                    { wording: "من هو men huwa", correct: false },
                    { wording: "Aucun", correct: false },
                    { wording: "ما هو mā huwa", correct: true },
                    { wording: "أين ayna", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'moi' (augmentatif) en darija ?",
                answers: [
                    { wording: "انتَ enta", correct: false },
                    { wording: "انا ana", correct: false },
                    { wording: "أنايا anāya", correct: true },
                    { wording: "هُوَ huwa", correct: false }
                ]
            },
            {
                statement: "Comment dit-on 'tu (masculin)' en darija ?",
                answers: [
                    { wording: "أنتايا entāya", correct: true },
                    { wording: "أنتيّا entiya", correct: false },
                    { wording: "انتُم entum", correct: false },
                    { wording: "هُما huma", correct: false }
                ]
            }
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
