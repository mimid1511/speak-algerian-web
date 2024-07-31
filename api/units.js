// pages/api/units.js
import { db } from "./firebaseConfig";
import { doc, getDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';

// Fonction pour récupérer les détails d'une leçon
const getLessonDetails = async (lessonRef) => {
    const lessonSnap = await getDoc(lessonRef);
    return { id: lessonSnap.id, ...lessonSnap.data() };
};

// Fonction pour récupérer une unité spécifique par ID
export const getUnitById = async (id) => {
    try {
        const unitRef = doc(db, 'units', id);
        const unitSnap = await getDoc(unitRef);
        
        if (!unitSnap.exists()) {
            throw new Error('Unit not found');
        }
        
        const unitData = unitSnap.data();
        const lessonsRefs = unitData.lessons;

        // Récupérer les détails des leçons
        const lessons = await Promise.all(lessonsRefs.map(getLessonDetails));

        return { id: unitSnap.id, ...unitData, lessons };
    } catch (error) {
        console.error('Erreur lors de la récupération de l’unité:', error);
        throw new Error('Erreur lors de la récupération de l’unité');
    }
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

// Fonction pour récupérer une leçon spécifique par ID
export const getLessonById = async (id) => {
    try {
        const lessonRef = doc(db, 'lessons', id); // Changez 'lessons' en fonction de votre collection réelle
        const lessonSnap = await getDoc(lessonRef);

        if (!lessonSnap.exists()) {
            throw new Error('Leçon non trouvée');
        }

        return { id: lessonSnap.id, ...lessonSnap.data() };
    } catch (error) {
        console.error('Erreur lors de la récupération de la leçon:', error);
        throw new Error('Erreur lors de la récupération de la leçon');
    }
};
