// pages/api/Unit.js
import { db } from "./firebaseConfig";
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore';


// Fonction pour récupérer les détails d'une leçon
const getLessonDetails = async (lessonRef) => {
    const lessonSnap = await getDoc(lessonRef);
    return { id: lessonSnap.id, ...lessonSnap.data() };
};

// Fonction pour récupérer toutes les unités et leurs leçons
export const getAllUnits = async () => {
    try {
        const unitsQuery = query(collection(db, 'units'), orderBy('order'));
        const querySnapshot = await getDocs(unitsQuery);

        const units = await Promise.all(querySnapshot.docs.map(async (unitDoc) => {
            const unitData = unitDoc.data();
            const lessonsRefs = unitData.lessons;
            
            // Récupérer les détails des leçons
            const lessons = await Promise.all(lessonsRefs.map(getLessonDetails));
            
            return { id: unitDoc.id, ...unitData, lessons };
        }));

        return units;
    } catch (error) {
        console.error('Erreur lors de la récupération des unités:', error);
        throw new Error('Erreur lors de la récupération des unités');
    }
};