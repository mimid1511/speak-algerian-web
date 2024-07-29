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