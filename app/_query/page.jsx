"use client";
import React from 'react';
import { db } from '@/api/firebaseConfig'; // Importez votre configuration Firebase
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

const addQuestionsToFirestore = async () => {
    try {
        // Référence au document eχistant
        const docRef = doc(db, "assessments", "6mQYfdf8sTog9Vs76kU0");

        // Liste des nouvelles questions
        const newQuestions = [
            // Questions sur le genre (masculin/féminin) et traduction
            {
                statement: "Le mot 'قهوة qahwa' (café) est-il masculin ou féminin en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Quel est le genre du mot 'زبدة zebda' (beurre) en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Parmi ces mots, lequel est masculin ?",
                answers: [
                    { wording: "شمس šems (soleil)", correct: false },
                    { wording: "رجل rjel (pied)", correct: true },
                    { wording: "روح rūḥ (āme)", correct: false },
                    { wording: "أرض arḍ (terre)", correct: false }
                ]
            },
            {
                statement: "Le mot 'نار nār' (feu) est-il masculin ou féminin en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Quel est le genre du mot 'روح rūḥ' (āme) en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Le mot 'أرض arḍ' (terre) est-il masculin ou féminin en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Le mot 'بيت bīt' (chambre) est-il masculin ou féminin en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Le mot 'مرسى marsa' (port) est-il masculin ou féminin en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Quel mot est féminin : 'بلاد blād' (pays) ou 'قرش kerš' (ventre) ?",
                answers: [
                    { wording: "بلاد blād", correct: true },
                    { wording: "قرش kerš", correct: false },
                    { wording: "Les deux", correct: false },
                    { wording: "Aucun", correct: false }
                ]
            },
            {
                statement: "Le mot 'جهنم jahennem' (enfer) est-il masculin ou féminin en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Quel est le genre du mot 'ماء ma' (eau) en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Le mot 'عقرب ɛaqreb' (scorpion) est-il masculin ou féminin en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Le mot 'مسيد msid' (école coranique) est-il masculin ou féminin en darija ?",
                answers: [
                    { wording: "Masculin", correct: true },
                    { wording: "Féminin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Quel est le genre du mot 'فمّ fumm' (bouche) en darija ?",
                answers: [
                    { wording: "Masculin", correct: true },
                    { wording: "Féminin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },
            {
                statement: "Le mot 'مدرسة madrasa' (école) est-il masculin ou féminin en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Inconnu", correct: false }
                ]
            },

            // Traductions simples
            {
                statement: "Que signifie le mot 'طريق trīq' en français ?",
                answers: [
                    { wording: "Route, chemin", correct: true },
                    { wording: "Maison", correct: false },
                    { wording: "Soleil", correct: false },
                    { wording: "Port", correct: false }
                ]
            },
            {
                statement: "Quel mot en darija se traduit par 'main' en français ?",
                answers: [
                    { wording: "يد yed", correct: true },
                    { wording: "رجل rjel", correct: false },
                    { wording: "قدم qadam", correct: false },
                    { wording: "شمس šems", correct: false }
                ]
            },
            {
                statement: "Quel est le mot en darija pour 'ventre' ?",
                answers: [
                    { wording: "قرش kerš", correct: true },
                    { wording: "أرض arḍ", correct: false },
                    { wording: "رجل rjel", correct: false },
                    { wording: "روح rūḥ", correct: false }
                ]
            },
            {
                statement: "Quel mot en darija signifie 'oeil' ?",
                answers: [
                    { wording: "عين ɛayn", correct: true },
                    { wording: "قدم qadam", correct: false },
                    { wording: "أذن uden", correct: false },
                    { wording: "بيت bayt", correct: false }
                ]
            },
            {
                statement: "Que signifie 'نار nār' en français ?",
                answers: [
                    { wording: "Feu", correct: true },
                    { wording: "Eau", correct: false },
                    { wording: "Soleil", correct: false },
                    { wording: "Terre", correct: false }
                ]
            },
            {
                statement: "Le mot 'عقرب ɛaqreb' en darija signifie :",
                answers: [
                    { wording: "Scorpion", correct: true },
                    { wording: "Soleil", correct: false },
                    { wording: "Eau", correct: false },
                    { wording: "Vent", correct: false }
                ]
            },
            {
                statement: "Que signifie le mot 'بيت bayt' en darija ?",
                answers: [
                    { wording: "Maison", correct: true },
                    { wording: "Soleil", correct: false },
                    { wording: "Chemin", correct: false },
                    { wording: "Vent", correct: false }
                ]
            },
            {
                statement: "Le mot 'شمس šems' en darija se traduit par :",
                answers: [
                    { wording: "Soleil", correct: true },
                    { wording: "Pluie", correct: false },
                    { wording: "Vent", correct: false },
                    { wording: "Feu", correct: false }
                ]
            },
            {
                statement: "Quel mot en darija signifie 'oreille' ?",
                answers: [
                    { wording: "أذن uden", correct: true },
                    { wording: "عين ɛayn", correct: false },
                    { wording: "يد yed", correct: false },
                    { wording: "رجل rjel", correct: false }
                ]
            },
            {
                statement: "Le mot 'ماء ma' en darija signifie :",
                answers: [
                    { wording: "Eau", correct: true },
                    { wording: "Feu", correct: false },
                    { wording: "Vent", correct: false },
                    { wording: "Terre", correct: false }
                ]
            },

            // Questions culturelles
            {
                statement: "Quel est le rôle de la 'ta marbouta' dans la détermination du genre d'un nom en darija ?",
                answers: [
                    { wording: "Indique que le nom est féminin", correct: true },
                    { wording: "Indique que le nom est masculin", correct: false },
                    { wording: "Indique le pluriel", correct: false },
                    { wording: "Indique le neutre", correct: false }
                ]
            },
            {
                statement: "Les noms de villes en darija sont généralement de quel genre ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Cela dépend du nom", correct: false }
                ]
            },
            {
                statement: "Comment se distingue généralement un nom féminin d'un nom masculin en darija ?",
                answers: [
                    { wording: "Par la présence de la 'ta marbouta' à la fin", correct: true },
                    { wording: "Par la voyelle initiale", correct: false },
                    { wording: "Par le nombre de syllabes", correct: false },
                    { wording: "Par l'accent tonique", correct: false }
                ]
            },
            {
                statement: "Les mots en darija se terminant par 'ة' ('ta marbouta') sont-ils toujours féminins ?",
                answers: [
                    { wording: "Oui", correct: true },
                    { wording: "Non, ils sont toujours masculins", correct: false },
                    { wording: "Non, cela dépend du contexte", correct: false },
                    { wording: "Non, ils peuvent être neutres", correct: false }
                ]
            },
            {
                statement: "Les mots sans 'ta marbouta' mais qui sont féminins, doivent être :",
                answers: [
                    { wording: "Appris par cœur", correct: true },
                    { wording: "Identifiés par leur terminaison", correct: false },
                    { wording: "Mémorisés grâce à une règle spéciale", correct: false },
                    { wording: "Toujours écrits au pluriel", correct: false }
                ]
            },
            {
                statement: "Quel est le genre des noms des pays en darija ?",
                answers: [
                    { wording: "Féminin", correct: true },
                    { wording: "Masculin", correct: false },
                    { wording: "Neutre", correct: false },
                    { wording: "Cela varie selon le pays", correct: false }
                ]
            },
            {
                statement: "Quel type de mots en darija peut être masculin même sans 'ta marbouta' ?",
                answers: [
                    { wording: "Les noms de certains objets", correct: true },
                    { wording: "Les noms des couleurs", correct: false },
                    { wording: "Les verbes conjugués", correct: false },
                    { wording: "Les adverbes", correct: false }
                ]
            },        
            {
                statement: "Quelle ville est surnommée 'el-bahja' en Algérie ?",
                answers: [
                    { wording: "Alger", correct: true },
                    { wording: "Tlemcen", correct: false },
                    { wording: "Béjaïa", correct: false },
                    { wording: "Constantine", correct: false }
                ]
            },
            {
                statement: "Quelle est la ville surnommée 'el-mahrūssa' ?",
                answers: [
                    { wording: "Alger", correct: true },
                    { wording: "Béjaïa", correct: false },
                    { wording: "Tlemcen", correct: false },
                    { wording: "Constantine", correct: false }
                ]
            },
            {
                statement: "Quelle ville est surnommée 'el-bayda' en Algérie ?",
                answers: [
                    { wording: "Alger", correct: true },
                    { wording: "Tlemcen", correct: false },
                    { wording: "Béjaïa", correct: false },
                    { wording: "Constantine", correct: false }
                ]
            }
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
            <p>{process.env.NEχT_PUBLIC_STRIPE_SECRET_KEY}</p>
            <p>{process.env.NEχT_PUBLIC_STRIPE_WEBHOOK_SECRET}</p>
        </div>
    );
};

export default QueryPage;
