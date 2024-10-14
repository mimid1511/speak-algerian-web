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
export const getAllFrenchWordsByLetter = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "words"));
        let allFrenchWords = new Map(); // Utilisation d'une Map pour éviter les doublons

        const normalizeString = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        };

        // Récupérer tous les mots français de chaque document
        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.french && Array.isArray(data.french)) {
                data.french.forEach(word => {
                    const normalizedWord = normalizeString(word);
                    if (!allFrenchWords.has(normalizedWord)) {
                        allFrenchWords.set(normalizedWord, { id: doc.id, name: word });
                    }
                });
            }
        });

        // Trier les mots par leur première lettre
        const sortedWords = Array.from(allFrenchWords.values()).reduce((acc, word) => {
            const firstLetter = normalizeString(word.name[0]).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(word);
            return acc;
        }, {});

        // **Ajout : Trier chaque groupe de mots de manière lexicographique**
        Object.keys(sortedWords).forEach(letter => {
            sortedWords[letter].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
        });

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

        return allFrenchWords;

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
            const data = docSnap.data();
            // Vérifier si le champ "darija" existe et est un tableau
            if (data.darija && Array.isArray(data.darija)) {
                // Trier le tableau "darija" par la clé "order"
                data.darija.sort((a, b) => (a.order > b.order ? 1 : -1));
            }
            return { id: docSnap.id, ...data };
        } else {
            throw new Error('Aucun document trouvé');
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du mot:", error);
        throw new Error('Erreur lors de la récupération du mot');
    }
};