"use client";
import React from 'react';
import { db } from '@/api/firebaseConfig'; // Importez votre configuration Firebase
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const addQuestionsToFirestore = async () => {
    try {
        // Référence au document existant
        const docRef = doc(db, "assessments", "nsSmPSYRNc8WFUX1rpey");

        // Exemple de question à ajouter
        const newQuestions = [
            {
                statement: "Quelle est la traduction de épaule en arabe algérien ?",
                answers: [
                    { wording: "رأس (rās)", correct: false },
                    { wording: "كرش (kerš)", correct: false },
                    { wording: "يد (yed)", correct: false },
                    { wording: "كتاف (ktâf)", correct: true },
                ]
            },
            {
                statement: "Que signifie rās en français ?",
                answers: [
                    { wording: "Pieds", correct: false },
                    { wording: "Têtes", correct: true },
                    { wording: "Ventres", correct: false },
                    { wording: "Mains", correct: false },
                ]
            },
            {
                statement: "Quelle est la traduction de mains en arabe algérien ?",
                answers: [
                    { wording: "شلاغم (šelʁūma)", correct: false },
                    { wording: "يدين (yedīn)", correct: true },
                    { wording: "عينين (ɛaynīn)", correct: false },
                    { wording: "رجلين (rejīn)", correct: false },
                ]
            },
            {
                statement: "Que signifie ذرعين (drāɛīn) en français ?",
                answers: [
                    { wording: "Mains", correct: false },
                    { wording: "Pieds", correct: false },
                    { wording: "Bras", correct: true },
                    { wording: "Épaules", correct: false },
                ]
            },
            {
                statement: "Quelle est la traduction de ventres en arabe algérien ?",
                answers: [
                    { wording: "رأس (rās)", correct: false },
                    { wording: "رجلين (rejīn)", correct: false },
                    { wording: "كروش (krūš)", correct: true },
                    { wording: "جبهة (jebha)", correct: false },
                ]
            },
            {
                statement: "Que signifie رقاب (rqâb) en français ?",
                answers: [
                    { wording: "Têtes", correct: false },
                    { wording: "Cous", correct: true },
                    { wording: "Mains", correct: false },
                    { wording: "Bras", correct: false },
                ]
            },
            {
                statement: "Quelle est la traduction de pieds en arabe algérien ?",
                answers: [
                    { wording: "يد (yed)", correct: false },
                    { wording: "رأس (rās)", correct: false },
                    { wording: "رجلين (rejlīn)", correct: true },
                    { wording: "ساق (sāq)", correct: false },
                ]
            },
            {
                statement: "Que signifie ورك (urek) en français ?",
                answers: [
                    { wording: "Ventres", correct: false },
                    { wording: "Cous", correct: false },
                    { wording: "Hanches", correct: true },
                    { wording: "Épaules", correct: false },
                ]
            },
            {
                statement: "Quelle est la traduction de jambes supérieures en arabe algérien ?",
                answers: [
                    { wording: "رجلين (rejlīn)", correct: false },
                    { wording: "ساق (sāq)", correct: true },
                    { wording: "يد (yed)", correct: false },
                    { wording: "كروش (krūš)", correct: false },
                ]
            },
            {
                statement: "Que signifie كراعين (krāɛin) en français ?",
                answers: [
                    { wording: "Jambes inférieures + pieds", correct: true },
                    { wording: "Mains", correct: false },
                    { wording: "Hanches", correct: false },
                    { wording: "Langues", correct: false },
                ]
            },
            {
                statement: "Quelle est la traduction de langues en arabe algérien ?",
                answers: [
                    { wording: "فم (fumm)", correct: false },
                    { wording: "جبهة (jebha)", correct: false },
                    { wording: "لسانات (lsānāt)", correct: true },
                    { wording: "اسنان (snān)", correct: false },
                ]
            },
            {
                statement: "Que signifie فم (fumm) en français ?",
                answers: [
                    { wording: "Bouches", correct: true },
                    { wording: "Yeux", correct: false },
                    { wording: "Menton", correct: false },
                    { wording: "Joues", correct: false },
                ]
            },
            {
                statement: "Quelle est la traduction de nez en arabe algérien ?",
                answers: [
                    { wording: "نيف (nīf)", correct: true },
                    { wording: "جبين (jbīn)", correct: false },
                    { wording: "اذن (udnīn)", correct: false },
                    { wording: "خدود (χdūd)", correct: false },
                ]
            },
            {
                statement: "Que signifie عينين (ɛaynīn) en français ?",
                answers: [
                    { wording: "Joues", correct: false },
                    { wording: "Oreilles", correct: false },
                    { wording: "Yeux", correct: true },
                    { wording: "Langues", correct: false },
                ]
            },
            {
                statement: "Quelle est la traduction de sourcils en arabe algérien ?",
                answers: [
                    { wording: "شفر (šfer)", correct: false },
                    { wording: "حاجب (ḥwājeb)", correct: true },
                    { wording: "لخايا (lḥāya)", correct: false },
                    { wording: "اسنان (snān)", correct: false },
                ]
            },
            {
                statement: "Que signifie شعر (šɛar) en français ?",
                answers: [
                    { wording: "Poil", correct: false },
                    { wording: "Cils", correct: false },
                    { wording: "Cheveux", correct: true },
                    { wording: "Barbes", correct: false },
                ]
            },
            {
                statement: "Quelle est la traduction de moustaches en arabe algérien ?",
                answers: [
                    { wording: "شلاغم (šelʁūma)", correct: true },
                    { wording: "لحايا (lḥāya)", correct: false },
                    { wording: "شفر (šfer)", correct: false },
                    { wording: "شعر (šɛar)", correct: false },
                ]
            },
            {
                statement: "Que signifie لحايا (lḥāya) en français ?",
                answers: [
                    { wording: "Cheveux", correct: false },
                    { wording: "Moustaches", correct: false },
                    { wording: "Barbes", correct: true },
                    { wording: "Poil", correct: false },
                ]
            },
            {
                statement: "Quelle est la traduction de menton en arabe algérien ?",
                answers: [
                    { wording: "لسان (lsān)", correct: false },
                    { wording: "خد (χedd)", correct: false },
                    { wording: "دقنة (deqna)", correct: true },
                    { wording: "عين (eɛayn)", correct: false },
                ]
            },
            {
                statement: "Que signifie سنة (senna) en français ?",
                answers: [
                    { wording: "Menton", correct: false },
                    { wording: "Dents", correct: true },
                    { wording: "Langues", correct: false },
                    { wording: "Joues", correct: false },
                ]
            },];

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
