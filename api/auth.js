import { auth, storage, db } from "./firebaseConfig"; // Assurez-vous que le chemin est correct
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile,
    signOut // Importation directe de signOut
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export const signUp = async (email, password, role) => {
    try {
        // Créer l'utilisateur avec Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Envoyer un email de vérification
        await sendEmailVerification(user);

        // Créer un document dans la collection 'users' avec le même ID que celui de l'utilisateur
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
            role: role, // Assurez-vous de passer le rôle en paramètre lors de l'appel de la fonction
            email: email, // Facultatif: vous pouvez ajouter d'autres informations
            createdAt: new Date(), // Facultatif: ajouter une date de création
            lessonsCompleted: [], // Ajouter un tableau vide pour les unités complètes
        });

        return { message: 'User created, role assigned, and verification email sent.' };
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        throw new Error(error.message);
    }
};

// Fonction pour le login
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { message: 'User logged in.', user: userCredential.user };
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        throw new Error(error.message);
    }
};

// Fonction pour réinitialiser le mot de passe
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { message: 'Password reset email sent.' };
    } catch (error) {
        console.error("Erreur lors de la réinitialisation du mot de passe:", error);
        throw new Error(error.message);
    }
};

// Fonction pour envoyer un email de confirmation
export const sendConfirmationEmail = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            await sendEmailVerification(user);
            return { message: 'Verification email sent.' };
        } else {
            throw new Error('No user is currently signed in.');
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email de confirmation:", error);
        throw new Error(error.message);
    }
};

export const updateUserProfile = async (displayName, photoURL) => {
    try {
        const user = auth.currentUser;
        if (user) {
            console.log(photoURL + displayName);
            await updateProfile(user, {
                displayName,
                photoURL
            });
            return { message: 'Profile updated successfully.' };
        } else {
            throw new Error('No user is currently signed in.');
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du profil:", error);
        throw new Error(error.message);
    }
};

export const uploadProfilePicture = async (file) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const storage = getStorage();
            const storageRef = ref(storage, `user/${user.uid}/profile-picture.jpg`);

            // Téléversement du fichier
            await uploadBytes(storageRef, file);
            const photoURL = await getDownloadURL(storageRef); // Optionnel: Obtenir l'URL de téléchargement

            // Mise à jour du profil avec la nouvelle photo
            await updateUserProfile(user.displayName, photoURL);

            return { message: 'Profile picture uploaded and updated successfully.', photoURL };
        } else {
            throw new Error('No user is currently signed in.');
        }
    } catch (error) {
        console.error("Erreur lors du téléversement de la photo de profil:", error);
        throw new Error(error.message);
    }
};

export const deleteProfilePicture = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const storageRef = ref(storage, `user/${user.uid}/profile-picture.jpg`);

            // Supprimer la photo de profil du stockage
            await deleteObject(storageRef);

            // Mettre à jour le profil de l'utilisateur pour supprimer l'URL de la photo
            await updateUserProfile(user.displayName, "");

            return { message: 'Profile picture deleted successfully.' };
        } else {
            throw new Error('No user is currently signed in.');
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de la photo de profil:", error);
        throw new Error(error.message);
    }
};

// Fonction pour la déconnexion
export const signOutUser = async () => {
    try {
        await signOut(auth); // Utilisation directe de signOut
        return { message: 'User signed out successfully.' };
    } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
        throw new Error(error.message);
    }
};

//Fonction pour récuperer le détail d'un utilisateur
export const getUserDetail = async (userId) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            return { id: userDocSnap.id, ...userDocSnap.data() };
        } else {
            throw new Error('No user data found for the given ID.');
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'utilisateur:", error);
        throw new Error(error.message);
    }
};

// Fonction pour ajouter un ID d'unité au tableau unitsCompleted de l'utilisateur courant
export const addLessonCompleted = async (id) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('No user is currently signed in.');
        }

        // Référence au document de l'utilisateur dans Firestore
        const userDocRef = doc(db, 'users', user.uid);

        // Mise à jour du tableau unitsCompleted en ajoutant l'ID de l'unité
        await updateDoc(userDocRef, {
            lessonsCompleted: arrayUnion(id)
        });

        return { message: 'Lesson ID added to unitsCompleted successfully.' };
    } catch (error) {
        console.error("Erreur lors de l'ajout de la lesson complétée:", error);
        throw new Error(error.message);
    }
};