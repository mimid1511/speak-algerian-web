import { auth, storage, db } from "./firebaseConfig"; // Assurez-vous que le chemin est correct
import { doc, getDoc, setDoc, updateDoc, getDocs, arrayUnion, collection, where, query } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile,
    signOut // Importation directe de signOut
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export const signUp = async (email, password) => {
    try {
        // Créer l'utilisateur avec Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Envoyer un email de vérification
        await sendEmailVerification(user);

        // Créer un document dans la collection 'users' avec le même ID que celui de l'utilisateur
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
            email: email, // Facultatif: vous pouvez ajouter d'autres informations
            createdAt: new Date(), // Facultatif: ajouter une date de création
            lessonsCompleted: [], // Ajouter un tableau vide pour les unités complètes
        });

        return user;
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

            let file = photoURL;

            if (file != null) {
                file = photoURL;
                console.log("reçus : " + file);
            }
            else {
                file = user.photoURL;
                console.log("non initié : " + file);
            }

            await updateProfile(user, { displayName, photoURL: file });

            // Mettre à jour le document utilisateur dans Firestore
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                displayName: displayName,
                photoURL: file,
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
            const photoURL = await getDownloadURL(storageRef);

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
            await updateUserProfile(user.displayName, '');

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

        if (!userDocSnap.exists()) {
            throw new Error('No user data found for the given ID.');
        }

        let role = "dys"; // Default role
        const now = new Date();

        // Récupérer les paiements valides
        const paymentsRef = collection(userDocRef, 'payments');
        const paymentsQuery = query(paymentsRef, where("valid", "==", true));
        const paymentsSnap = await getDocs(paymentsQuery);

        // Filtrer les paiements valides
        const validPayments = paymentsSnap.docs.filter(doc => {
            const paymentData = doc.data();
            return paymentData.endDate && paymentData.endDate.toDate() > now;
        });

        // Si un paiement valide est trouvé, définir le rôle
        if (validPayments.length > 0) {
            const lastValidPayment = validPayments[validPayments.length - 1];
            role = lastValidPayment.data().product;
        }

        return {
            id: userDocSnap.id,
            role: role, // Ajouter le rôle à la réponse
            ...userDocSnap.data()
        };
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

// Fonction pour ajouter un ID d'unité au tableau unitsCompleted de l'utilisateur courant
export const getLastSubscription = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('No user is currently signed in.');
        }

        const userDocRef = doc(db, 'users', user.uid);
        
        const now = new Date();
        // Récupérer les paiements valides
        const paymentsRef = collection(userDocRef, 'payments');
        const paymentsQuery = query(paymentsRef, where("valid", "==", true));
        const paymentsSnap = await getDocs(paymentsQuery);

        // Filtrer les paiements valides
        const validPayments = paymentsSnap.docs.filter(doc => {
            const paymentData = doc.data();
            return paymentData.endDate && paymentData.endDate.toDate() > now;
        });

        if (validPayments.length > 0) {
            const lastValidPayment = validPayments[validPayments.length - 1];
            return {... lastValidPayment.data()};
        }

    } catch (error) {
        console.error("Erreur lors de l'ajout de la lesson complétée:", error);
        throw new Error(error.message);
    }
};


export const addProduct = async (idUser, email, session, total, date, product, valid) => {
    try {
        // console.log("idUser: " + idUser + " email: " + email + " session: " + session + " total: " + total + " date: " + date + " product: " + product);
        // Référence au document utilisateur
        const userDocRef = doc(db, 'users', idUser);
        // Référence à la sous-collection 'payments' dans ce document utilisateur
        const paymentDocRef = doc(userDocRef, 'payments', session);

        // Determination des dates de fin de validité
        let endDate = null;
        if (product === 'apm') {
            // Ajouter un mois
            endDate = new Date(date);
            endDate.setMonth(endDate.getMonth() + 1);
        } else if (product === 'apy') {
            // Ajouter un an
            endDate = new Date(date);
            endDate.setFullYear(endDate.getFullYear() + 1);
        }

        // Ajout du document à la sous-collection 'payments'
        await setDoc(paymentDocRef, {
            // session: session,
            email: email,
            product: product,
            total: parseFloat(total),
            createdAt: date,
            endDate: endDate,
            valid: valid,
        });
        console.log("Produit ajouté avec succès à la sous-collection 'payments'");
    } catch (error) {
        console.error("Erreur lors de l'ajout du produit: ", error);
        throw new Error(error.message);
    }
}