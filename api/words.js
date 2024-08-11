import { db } from "./firebaseConfig"; // Assurez-vous que le chemin est correct
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Fonction pour récupérer tous les documents de la collection "words"
export const getAllWords = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "words"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Erreur lors de la récupération des mots:", error);
        throw new Error('Erreur lors de la récupération des mots');
    }
};

// Nouvelle fonction pour récupérer et trier les mots français par leur première lettre
export const getAllFrenchWords = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "words"));
        let allFrenchWords = [];

        // Récupérer tous les mots français de chaque document
        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.french && Array.isArray(data.french)) {
                allFrenchWords = [...allFrenchWords, ...data.french.map(word => ({ id: doc.id, name: word }))];
            }
        });

        // Trier les mots par leur première lettre
        const sortedWords = allFrenchWords.reduce((acc, word) => {
            const firstLetter = word.name[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(word);
            return acc;
        }, {});

        // Retourner un tableau d'objets classés par première lettre
        return Object.keys(sortedWords).sort().map(letter => ({
            letter,
            words: sortedWords[letter]
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des mots français:", error);
        throw new Error('Erreur lors de la récupération des mots français');
    }
};


// Fonction pour récupérer un seul document par ID
export const getWordById = async (id) => {
    try {
        const docRef = doc(db, "words", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error('Aucun document trouvé');
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du mot:", error);
        throw new Error('Erreur lors de la récupération du mot');
    }
};