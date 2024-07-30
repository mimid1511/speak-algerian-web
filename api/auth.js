import { auth, storage } from "./firebaseConfig"; // Assurez-vous que le chemin est correct
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile,
    signOut // Importation directe de signOut
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Fonction pour l'inscription
export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);
        return { message: 'User created and verification email sent.' };
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
